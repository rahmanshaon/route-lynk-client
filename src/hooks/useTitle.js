import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | RouteLynk`;
  }, [title]);
};

export default useTitle;
