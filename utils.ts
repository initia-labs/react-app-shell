const BREAK_POINT_MD = 1280;
const BREAK_POINT_LG = 1920;

export enum ScreenSize {
  XS = "xs",
  SM = "sm",
  MD = "md",
  LG = "lg",
}

export const getScreenSize = () => {
  const width = window.innerWidth;
  if (width <= BREAK_POINT_MD) {
    return ScreenSize.SM;
  } else if (width <= BREAK_POINT_LG) {
    return ScreenSize.MD;
  }
  return ScreenSize.LG;
};

export const isSm = () => {
  return getScreenSize() === ScreenSize.SM;
};
