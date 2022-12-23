import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLogin } = useSelector((state) => state.Login);

  if (!isLogin) return <Navigate to="/" replace={true} />;
  return children;
};
export default ProtectedRoute;
