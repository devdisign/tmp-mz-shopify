import { useCallback, useState } from "preact/hooks";

import type { HistoryUrl } from "@utils/types";

const useHistoryUrl = (): HistoryUrl => {
  const [history, setHistory] = useState(Object.assign({}, window.history));
  const [url, setUrl] = useState(new URL(window.location.href));

  const updateHistory = useCallback(
    (action: "pushState" | "replaceState", pathname: string, state?: Record<string, string>) => {
      window.history[action](state, "", pathname);
      setHistory(Object.assign({}, window.history));
      setUrl(new URL(window.location.href));
    },
    []
  );

  const back = useCallback(
    () => new Promise<void>((resolve) => {
      window.addEventListener(
        "popstate",
        () => {
          setHistory(Object.assign({}, window.history));
          setUrl(new URL(window.location.href));
          resolve();
        },
        { once: true },
      );
      window.history.back();
    }),
    []
  );

  const push = useCallback(
    (pathname: string, state?: Record<string, string>) => updateHistory("pushState", pathname, state),
    [updateHistory]
  );

  const replace = useCallback(
    (pathname: string, state?: Record<string, string>) => updateHistory("replaceState", pathname, state),
    [updateHistory]
  );

  return {
    history: {
      replace,
      push,
      back,
      length: history.length,
      state: history.state,
    },
    url,
  };
};

export default useHistoryUrl;
