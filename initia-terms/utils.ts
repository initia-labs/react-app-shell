import { COOKIE_NAME, INITIA_DOMAIN } from "./constants";

export const getCurrentDomain = () => {
  if (location.hostname.endsWith(INITIA_DOMAIN)) return INITIA_DOMAIN;
  return location.hostname;
};

export const hasTermsCookie = () => {
  const cookies = document.cookie.split(";");
  return cookies.some((cookie) => {
    const [k, v] = cookie.trim().split("=");
    return k === COOKIE_NAME && v === "true";
  });
};

export const addTermsCookie = () => {
  const assign = COOKIE_NAME + "=" + "true" + ";";
  const maxAge = "max-age=" + "34560000" + ";"; // 400 days chrome limit
  const domain = "domain=" + getCurrentDomain() + ";";
  const path = "path=/;";
  document.cookie = assign + maxAge + path + domain;
};

export const createTermsHeader = () => {
  const termsHeader = document.createElement("p");
  termsHeader.className = "initia-terms-header";
  termsHeader.innerHTML = "Important Disclaimers And Acknowledgement of Terms";

  return termsHeader;
};
