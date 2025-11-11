import { useState } from "react";
import axiosInstance from "../lib/axios";
import { type UserArray } from "../types/TypeUser";
import { type AdminArray } from "../types/TypeAdmin";

const useLogin = () => {
  const [user, setUser] = useState<UserArray | null>([]);
  const [admin, setAdmin] = useState<AdminArray | null>([]);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<string | null>(null);

  const handleError = (error: any) => {
    console.log(error);
    const message =
      error?.response?.data?.message ||
      error.message ||
      "Terjadi Kesalahan Saat Mengambil Data!";
    setLoginError(message);
  };

  const loginUser = async (id: string, password: string) => {
    try {
      setLoginLoading(true);
      const response = await axiosInstance.post("/users/login", {
        id,
        password,
      });
      setLoginSuccess(response.data.message);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoginLoading(false);
    }
  };

  const loginAdmin = async (username: string, password: string) => {
    try {
      setLoginLoading(true);
      const response = await axiosInstance.post("/admin/login", {
        username,
        password,
      });
      setLoginSuccess(response.data.message);
      setAdmin(response.data);
      localStorage.setItem("admin", JSON.stringify(response.data));
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoginLoading(false);
    }
  };

  return {
    user,
    admin,
    loginUser,
    loginAdmin,
    loginLoading,
    loginError,
    loginSuccess,
  };
};

export default useLogin;
