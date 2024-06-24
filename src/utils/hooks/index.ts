import { UseBoolean } from "@utils/types/hooks";
import { useEffect, useState, useCallback } from "preact/hooks";

export const useBoolean = (initialBool: boolean): UseBoolean => {
  const [bool, setBool] = useState(initialBool);

  const toggle = useCallback(() => setBool(bool => !bool), []);
  const off = useCallback(() => setBool(false), []);
  const on = useCallback(() => setBool(true), []);

  return { state: bool, toggle, off, on };
};

export const useBreakpoint = (breakpoint: number) => {
  const [breakpointExceeded, setBreakpointExceeded] = useState(window.innerWidth >= breakpoint);

  useEffect(() => {
    const evaluateBreakpoint = () => setBreakpointExceeded(window.innerWidth >= breakpoint);
    window.addEventListener("resize", evaluateBreakpoint);
    return () => window.removeEventListener("resize", evaluateBreakpoint);
  }, [breakpoint]);

  return breakpointExceeded;
};

export { default as useCart } from "./cart";
export { default as useHistoryUrl } from "./historyUrl";
export { default as useMedia } from "./media";
