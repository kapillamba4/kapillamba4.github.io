import { useLocation } from "react-router-dom";

const MediumRedirect = () => {
  const { pathname, search } = useLocation();

  // Perform redirect immediately during render - no useEffect delay
  let path = pathname.replace(/^\/+/, "").replace(/^medium\/?/, "");
  path = path.replace(/^https?:\/\/kapillamba4\.medium\.com\/?/i, "");
  const target = `https://kapillamba4.medium.com/${path}${search || ""}`;
  
  // Redirect immediately
  window.location.replace(target);

  // This return will likely never render due to immediate redirect
  return null;
};

export default MediumRedirect;
