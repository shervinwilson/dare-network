import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "dayschedule-widget": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        url: string;
        options: string;
      };
    }
  }
}
