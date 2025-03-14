/* eslint-disable @next/next/no-img-element */
import { forwardRef, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { APP_LIST, SHOW_APP_MENU_CLASS } from "./constants";
import {
  AppType,
  getAppLogoUrl,
  getAppUrl,
  handleDrawerClose,
  handleDrawerOpen,
  handlePopoverClose,
  handlePopoverOpen,
  updateAppMenuPopoverPosition,
} from "./utils";
import { InitiaCheckIcon } from "../initia-check-icon";
import { ScreenSize, isSm } from "../utils";

const AppMenuListItemLogo = ({ app }: { app: AppType }) => (
  <img
    className="initia-app-menu-list-item-logo"
    src={getAppLogoUrl(app)}
    alt={app}
  />
);

const AppMenuList = ({
  currentApp,
  subdomain,
  size,
}: {
  currentApp: AppType;
  subdomain?: string;
  size: ScreenSize;
}) => {
  const hasFaucet = subdomain === "testnet";
  const filteredApps = hasFaucet
    ? APP_LIST
    : APP_LIST.filter((app) => app !== "faucet");

  return (
    <div className="initia-app-menu-list">
      {filteredApps.map((app) =>
        app === currentApp ? (
          <div
            key={app}
            className={`initia-app-menu-list-item ${size} current`}
          >
            <AppMenuListItemLogo app={app} />
            <InitiaCheckIcon color="white" size={size} />
          </div>
        ) : (
          <a
            key={app}
            className={`initia-app-menu-list-item ${size} link`}
            href={getAppUrl(app, subdomain)}
          >
            <AppMenuListItemLogo app={app} />
          </a>
        )
      )}
    </div>
  );
};

const AppMenuDrawer = forwardRef<
  HTMLDivElement,
  { currentApp: AppType; subdomain?: string; handleClose: () => void }
>(({ currentApp, subdomain, handleClose }, ref) => (
  <div className="initia-app-menu-drawer" onClick={handleClose} ref={ref}>
    <div
      className="initia-app-menu-drawer-content"
      onClick={(e) => e.stopPropagation()}
    >
      <AppMenuList
        currentApp={currentApp}
        subdomain={subdomain}
        size={ScreenSize.MD}
      />
    </div>
  </div>
));

const AppMenuPopover = forwardRef<
  HTMLDivElement,
  { currentApp: AppType; subdomain?: string }
>(({ currentApp, subdomain }, ref) => (
  <div className="initia-app-menu-popover" ref={ref}>
    <AppMenuList
      currentApp={currentApp}
      size={ScreenSize.SM}
      subdomain={subdomain}
    />
  </div>
));

export const InitiaAppMenu = ({
  app,
  subdomain,
}: {
  app: AppType;
  subdomain?: string;
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const [showDrawer, setShowDrawer] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  const drawerTimeoutIdRef = useRef<NodeJS.Timeout>();
  const popoverTimeoutIdRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (showPopover) {
      updateAppMenuPopoverPosition(triggerRef, popoverRef);

      const controller = new AbortController();
      document.addEventListener(
        "mousemove",
        (e) => {
          if (
            triggerRef.current &&
            !triggerRef.current.contains(e.target as Node) &&
            popoverRef.current &&
            !popoverRef.current.contains(e.target as Node)
          ) {
            handlePopoverClose(popoverRef, popoverTimeoutIdRef, setShowPopover);
          }
        },
        { signal: controller.signal }
      );
      return () => controller.abort();
    }
    return () => {};
  }, [showPopover]);

  useEffect(() => {
    if (showDrawer) {
      const controller = new AbortController();
      document.addEventListener(
        "keydown",
        (e) =>
          e.key === "Escape" &&
          handleDrawerClose(drawerRef, drawerTimeoutIdRef, setShowDrawer),
        { signal: controller.signal }
      );
      return () => controller.abort();
    }
    return () => {};
  }, [showDrawer]);

  useEffect(() => {
    const controller = new AbortController();
    window.addEventListener(
      "resize",
      () => {
        if (isSm() && document.body.contains(popoverRef.current)) {
          popoverRef.current?.classList.remove(SHOW_APP_MENU_CLASS);
          setShowPopover(false);
        }
        if (!isSm() && document.body.contains(drawerRef.current)) {
          drawerRef.current?.classList.remove(SHOW_APP_MENU_CLASS);
          setShowDrawer(false);
        }
      },
      { signal: controller.signal }
    );

    return () => controller.abort();
  }, []);

  return (
    <>
      <div className="initia-app-menu" data-app={app}>
        <div
          className="initia-app-menu-trigger"
          ref={triggerRef}
          onClick={() =>
            handleDrawerOpen(drawerRef, drawerTimeoutIdRef, setShowDrawer)
          }
          onMouseOver={() =>
            handlePopoverOpen(popoverRef, popoverTimeoutIdRef, setShowPopover)
          }
        >
          <div className="initia-app-menu-trigger-icon-container">
            <svg
              className="initia-app-menu-trigger-icon"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.333 3.333h3.333v3.333H3.333zM3.333 9.333h3.333v3.333H3.333zM9.333 3.333h3.333v3.333H9.333zM9.333 9.333h3.333v3.333H9.333z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
      {showPopover &&
        createPortal(
          <AppMenuPopover
            ref={popoverRef}
            currentApp={app}
            subdomain={subdomain}
          />,
          document.body
        )}
      {showDrawer &&
        createPortal(
          <AppMenuDrawer
            ref={drawerRef}
            currentApp={app}
            subdomain={subdomain}
            handleClose={() =>
              handleDrawerClose(drawerRef, drawerTimeoutIdRef, setShowDrawer)
            }
          />,
          document.body
        )}
    </>
  );
};
