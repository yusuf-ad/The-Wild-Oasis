import { useEffect, useRef } from "react";

export function useClickOutside(handler) {
  const refElement = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (refElement.current && !refElement.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("mousedown", handleClick);
      // document.addEventListener("click", handleClick, true);

      return () => {
        document.removeEventListener("mousedown", handleClick);
        // document.removeEventListener("click", handleClick, true);
      };
    },
    [handler, refElement]
  );

  return refElement;
}
