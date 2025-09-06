import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const MediumRedirect = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    let path = pathname.replace(/^\/+/, "").replace(/^medium\/?/, "");
    path = path.replace(/^https?:\/\/kapillamba4\.medium\.com\/?/i, "");
    const target = `https://kapillamba4.medium.com/${path}${search || ""}`;
    window.location.replace(target);
  }, [pathname, search]);

  return null;

};

export default MediumRedirect;
