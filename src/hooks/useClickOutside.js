import { useEffect, useRef } from "react";

// export function useClickOutside(handler) {
//   const refElement = useRef();

//   useEffect(
//     function () {
//       function handleClick(e) {
//         if (refElement.current && !refElement.current.contains(e.target)) {
//           handler();
//         }
//       }

//       document.addEventListener("mousedown", handleClick);
//       // document.addEventListener("click", handleClick, true);

//       return () => {
//         document.removeEventListener("mousedown", handleClick);
//         // document.removeEventListener("click", handleClick, true);
//       };
//     },
//     [handler, refElement]
//   );

//   return refElement;
// }

export function useClickOutside(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
