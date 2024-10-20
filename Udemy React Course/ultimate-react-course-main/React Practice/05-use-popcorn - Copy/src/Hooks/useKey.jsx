import { useEffect } from "react";

export function useKey(key, action) {
    useEffect(
        function () {
            function handleKeyPress(e) {
                if (e.code.toLowerCase() === key.toLowerCase()) {
                    action();
                }
            }
            document.addEventListener("keydown", handleKeyPress);

            return function () {
                document.removeEventListener("keydown", handleKeyPress);
            };
        },
        [action, key]
    );
}
