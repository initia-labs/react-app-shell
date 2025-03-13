import { Fragment, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { INITIA_TERMS } from "./constants";
import { addTermsCookie, hasTermsCookie } from "./utils";
import { InitiaCheckIcon } from "../initia-check-icon";
import { getScreenSize, ScreenSize } from "../utils";

const InitiaTermsHeader = () => (
  <p className="initia-terms-header">
    Important Disclaimers And Acknowledgement of Terms
  </p>
);

const InitiaTermsDescription = () => (
  <div className="initia-terms-description">
    <svg
      className="initia-terms-description-info-icon"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.75-11.75v1.5h-1.5v-1.5zm0 2.5v5h-1.5v-5z"
        fill="currentColor"
      />
    </svg>
    <div className="initia-terms-description-text">
      Please Read Carefully Before Accessing and Using the Initia Platform and
      Services
    </div>
  </div>
);

const InitiaTermsBody = () => (
  <div className="initia-terms-body">
    {INITIA_TERMS.map(([k, v], index) => (
      <Fragment key={`${index}-${k}`}>
        {k.length > 0 && <p className="initia-terms-body-topic">{k}</p>}
        <p dangerouslySetInnerHTML={{ __html: v }} />
      </Fragment>
    ))}
  </div>
);

const InitiaTermsFooter = ({
  handleOnAccept,
}: {
  handleOnAccept: () => void;
}) => {
  const footerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="initia-terms-footer" ref={footerRef}>
      <div
        className="initia-terms-footer-checkbox"
        onClick={() => footerRef.current?.classList.toggle("checked")}
      >
        <div className="initia-terms-footer-checkbox-box">
          <InitiaCheckIcon color="dark" size={ScreenSize.XS} />
        </div>
        <div className="initia-terms-footer-checkbox-label">
          I have read the above and do not need to be shown this disclaimer
          again in the future.
        </div>
      </div>
      <button
        className="initia-terms-footer-accept-button"
        onClick={() => {
          if (!footerRef.current?.classList.contains("checked")) return;
          handleOnAccept();
        }}
      >
        Accept
      </button>
    </div>
  );
};

export const InitiaTerms = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isAccepted, setIsAccepted] = useState(hasTermsCookie);

  useEffect(() => {
    if (!isAccepted) {
      const controller = new AbortController();
      document.body.style.overflow = "hidden";
      window.addEventListener(
        "resize",
        () => {
          const size = getScreenSize();
          if (size !== ref.current?.getAttribute("data-screen-size")) {
            ref.current?.setAttribute("data-screen-size", size);
          }
        },
        { signal: controller.signal }
      );
      return () => {
        controller.abort();
        document.body.style.overflow = "auto";
      };
    }
    return () => {};
  }, [isAccepted]);

  if (isAccepted) return null;
  return createPortal(
    <div className="initia-terms" data-screen-size={getScreenSize()} ref={ref}>
      <div className="initia-terms-container">
        <InitiaTermsHeader />
        <InitiaTermsDescription />
        <InitiaTermsBody />
        <InitiaTermsFooter
          handleOnAccept={() => {
            addTermsCookie();

            ref.current?.classList.add("accepted");
            setTimeout(() => {
              setIsAccepted(true);
            }, 200);
          }}
        />
      </div>
    </div>,
    document.body
  );
};
