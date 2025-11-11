import { useState } from "react";
import axiosInstance from "../lib/axios";

type Candidate = {
  name: string;
  origin: string;
  image: File;
  vision: string;
  mission: string;
  motto: string;
};

type User = {
  id: string;
  username: string;
  password: string;
  kelas: string;
  jenisKelamin: string;
};

type Excel = {
  file: File;
}

const useAddData = () => {
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [addSuccess, setAddSuccess] = useState<string | null>(null);

  const handleError = (error: any) => {
    console.log(error);
    const message =
      error?.response?.data?.message ||
      error.message ||
      "Terjadi Kesalahan Saat Mengambil Data!";
    setAddError(message);
  };

  const addUser = async (user: User) => {
    try {
      setAddLoading(true);
      const response = await axiosInstance.post("/users", user);
      setAddSuccess(response.data.message);
    } catch (error: any) {
      handleError(error);
    } finally {
      setAddLoading(false);
    }
  };

  const addCandidate = async (candidate: Candidate) => {
    try {
      setAddLoading(true);
      const response = await axiosInstance.post("/candidates", candidate, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setAddSuccess(response?.data?.message);
    } catch (error: any) {
      handleError(error);
    } finally {
      setAddLoading(false);
    }
  };

  const addUserByExcel = async (file: Excel) => {
    try {
      setAddLoading(true);

      const response = await axiosInstance.post("/users/import", file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setAddSuccess(response?.data?.message);
    } catch (error: any) {
      handleError(error);
    } finally {
      setAddLoading(false);
    }
  };

  return {
    addLoading,
    addError,
    addSuccess,
    addUser,
    addCandidate,
    addUserByExcel,
  };
};

export default useAddData;
