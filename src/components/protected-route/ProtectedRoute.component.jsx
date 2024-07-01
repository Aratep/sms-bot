import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isUserSubscribed, redirectPath = "/", children }) => {
  if (!isUserSubscribed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
