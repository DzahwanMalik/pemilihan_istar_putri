import { Outlet } from "react-router";
import Header from "../molecules/Header";

const MainLayout = () => {
  const user = JSON.parse(localStorage.getItem("user")!);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <>
      <Header user={user?.data.username} handleClick={handleLogout} img="/profile.png" />
      <Outlet />
    </>
  );
};

export default MainLayout;
