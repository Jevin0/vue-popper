import type { Middleware } from "@layui/popper-core";
import { unref } from "vue";
import { arrow } from "@layui/popper-core";

export const TOOLTIP_INJECTION_KEY = Symbol("LayPopper");

export const arrowMiddleware = ({ arrowRef, padding }): Middleware => {
  return {
    name: "arrow",
    options: {
      element: arrowRef,
      padding,
    },

    fn(args) {
      const arrowEl = unref(arrowRef);
      if (!arrowEl) return {};

      return arrow({
        element: arrowEl,
        padding,
      }).fn(args);
    },
  };
};
