import { Link, Outlet, useLocation } from "react-router";
import { type JSX } from "react";
import {
  ArrowLeftStartOnRectangleIcon,
  ChartBarIcon,
  CircleStackIcon,
  ClockIcon,
  DocumentTextIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

type List = {
  id: number;
  name: string;
  link?: string;
  icon: JSX.Element;
};

const DashboardLayout = () => {
  const admin = JSON.parse(localStorage.getItem("admin")!);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    window.location.href = "/";
  };

  const list: List[] = [
    {
      id: 1,
      name: "Dashboard",
      link: "/admin/dashboard",
      icon: <ChartBarIcon className="size-4" />,
    },
    {
      id: 2,
      name: "Kandidat",
      link: "/admin/candidates",
      icon: <UserGroupIcon className="size-4" />,
    },
    {
      id: 3,
      name: "Data Pemilih",
      link: "/admin/users",
      icon: <CircleStackIcon className="size-4" />,
    },
    {
      id: 4,
      name: "History",
      link: "/admin/history",
      icon: <ClockIcon className="size-4" />,
    },
    {
      id: 5,
      name: "Laporan",
      link: "/admin/report",
      icon: <DocumentTextIcon className="size-4" />,
    },
  ];

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-base-100 p-10 min-h-screen">
        {/* Page content here */}
        <label htmlFor="my-drawer-3" className="btn drawer-button lg:hidden">
          Open drawer
        </label>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu h-full w-80 p-4 bg-base-200 justify-between">
          <div className="flex flex-col gap-5">
            <div
              className="py-5 bg-base-300 flex items-center gap-2 rounded-md px-3"
            >
              <UserIcon className="size-10" />{" "}
              <div className="flex flex-col">
                <p className="text-xl font-bold">Welcome Back,</p>
                <p>{admin?.data.username}</p>
              </div>
            </div>
            <ul className="flex flex-col">
              <div className="flex flex-col gap-2">
                {list.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.link!}
                      className={`py-3 font-semibold ${
                        useLocation().pathname === item.link
                          ? "menu-active"
                          : ""
                      }`}
                    >
                      {item.icon} {item.name}
                    </Link>
                  </li>
                ))}
              </div>
            </ul>
          </div>
          <button className="btn btn-outline" onClick={handleLogout}>
            <ArrowLeftStartOnRectangleIcon className="size-4" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
