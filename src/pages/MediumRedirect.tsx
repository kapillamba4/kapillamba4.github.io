import { Navigate, useLocation } from "react-router-dom";

const MediumRedirect = () => {
  const location = useLocation();
  const path = location.pathname.replace(/^\/medium\/?/, "");
  const target = `https://kapillamba4.medium.com/${path}${location.search}${location.hash}`;
  return <Navigate to={target} replace />;
};

export default MediumRedirect;
