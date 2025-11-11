import type { JSX } from "react";
import { Navigate } from "react-router";

type Props = {
  path: string;
  role: string;
  children: JSX.Element;
};

const ProtectedRoutes = ({children, path, role }: Props) => {
  const selectedRole = localStorage.getItem(role);

  if (!selectedRole) {
    return <Navigate to={path} replace />;
  }

  return children;
};

export default ProtectedRoutes;
