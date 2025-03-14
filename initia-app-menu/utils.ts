/* eslint-disable no-param-reassign */
import type {
  Dispatch,
  MutableRefObject,
  RefObject,
  SetStateAction,
} from "react";
import { SHOW_APP_MENU_CLASS } from "./constants";
import { isSm } from "../utils";
import { AppType } from "./types";

export const getAppUrl = (app: AppType, subdomain?: string) =>
  subdomain
    ? `https://${app}.${subdomain}.initia.xyz`
    : `https://${app}.initia.xyz`;

export const getAppLogoUrl = (app: AppType) =>
  `https://assets.initia.xyz/images/dapps/${app}/logo.webp`;

export const handleDrawerOpen = (
  drawerRef: RefObject<HTMLDivElement>,
  drawerTimeoutIdRef: MutableRefObject<NodeJS.Timeout | undefined>,
  setShowDrawer: Dispatch<SetStateAction<boolean>>
) => {
  if (isSm() && !drawerRef.current?.classList.contains(SHOW_APP_MENU_CLASS)) {
    if (document.body.contains(drawerRef.current)) {
      clearTimeout(drawerTimeoutIdRef.current);
      drawerRef.current?.classList.add(SHOW_APP_MENU_CLASS);
    } else {
      setShowDrawer(true);
      setTimeout(() => {
        drawerRef.current?.classList.add(SHOW_APP_MENU_CLASS);
      }, 10);
    }
  }
};

export const handleDrawerClose = (
  drawerRef: RefObject<HTMLDivElement>,
  drawerTimeoutIdRef: MutableRefObject<NodeJS.Timeout | undefined>,
  setShowDrawer: Dispatch<SetStateAction<boolean>>
) => {
  if (isSm() && drawerRef.current?.classList.contains(SHOW_APP_MENU_CLASS)) {
    drawerRef.current.classList.remove(SHOW_APP_MENU_CLASS);
    drawerTimeoutIdRef.current = setTimeout(() => {
      setShowDrawer(false);
    }, 200);
  }
};

export const handlePopoverOpen = (
  popoverRef: RefObject<HTMLDivElement>,
  popoverTimeoutIdRef: MutableRefObject<NodeJS.Timeout | undefined>,
  setShowPopover: Dispatch<SetStateAction<boolean>>
) => {
  if (!isSm() && !popoverRef.current?.classList.contains(SHOW_APP_MENU_CLASS)) {
    if (document.body.contains(popoverRef.current)) {
      clearTimeout(popoverTimeoutIdRef.current);
      popoverRef.current?.classList.add(SHOW_APP_MENU_CLASS);
    } else {
      setShowPopover(true);
      setTimeout(() => {
        popoverRef.current?.classList.add(SHOW_APP_MENU_CLASS);
      }, 10);
    }
  }
};

export const handlePopoverClose = (
  popoverRef: RefObject<HTMLDivElement>,
  popoverTimeoutIdRef: MutableRefObject<NodeJS.Timeout | undefined>,
  setShowPopover: Dispatch<SetStateAction<boolean>>
) => {
  if (!isSm() && popoverRef.current?.classList.contains(SHOW_APP_MENU_CLASS)) {
    popoverRef.current.classList.remove(SHOW_APP_MENU_CLASS);
    popoverTimeoutIdRef.current = setTimeout(() => {
      setShowPopover(false);
    }, 200);
  }
};

export const updateAppMenuPopoverPosition = (
  triggerRef: RefObject<HTMLDivElement>,
  popoverRef: RefObject<HTMLDivElement>
) => {
  if (!triggerRef.current || !popoverRef.current) return;

  const triggerRect = triggerRef.current.getBoundingClientRect();
  popoverRef.current.style.top = `${triggerRect.bottom - 10}px`;
  popoverRef.current.style.left = `${triggerRect.left + 10}px`;
};
