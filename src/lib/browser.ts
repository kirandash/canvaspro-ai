/**
 * Exports a boolean value reporting whether the given API is supported or not
 */
const isAPISupported = (api: string): boolean =>
  typeof window !== "undefined" ? api in window : false;

/**
 * Exports a boolean value reporting whether is client side or server side by checking on the window object
 */
const canUseDOM = (): boolean =>
  typeof window !== "undefined" &&
  typeof window.document !== "undefined" &&
  typeof window.document.createElement !== "undefined";

const BrowserUtil = {
  isAPISupported,
  canUseDOM,
};

export default BrowserUtil;
