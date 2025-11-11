import { useState } from "react";
import axiosInstance from "../lib/axios";

type Candidate = {
  name: string;
  origin: string;
  image: File | undefined;
  vision: string;
  mission: string;
  motto: string;
};

type User = {
  username: string;
  kelas: string;
  jenisKelamin: string;
};

const useEditData = () => {
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [editSuccess, setEditSuccess] = useState<string | null>(null);

  const handleError = (error: any) => {
    console.log(error);
    const message =
      error?.response?.data?.message ||
      error.message ||
      "Terjadi Kesalahan Saat Mengambil Data!";
    setEditError(message);
  };

  const editUser = async (user: User, id: string) => {
    try {
      setEditLoading(true);
      const response = await axiosInstance.patch(`/users/${id}`, user);
      setEditSuccess(response?.data?.message);
    } catch (error: any) {
      handleError(error);
    } finally {
      setEditLoading(false);
    }
  };

  const editCandidate = async (candidate: Candidate, id: string) => {
    try {
      setEditLoading(true);
      const response = await axiosInstance.patch(`/candidates/${id}`, candidate, {
        headers: {
          "Content-Type": candidate.image ? "multipart/form-data" : "application/json",
        },
      });
      setEditSuccess(response?.data?.message);
    } catch (error: any) {
      handleError(error);
    } finally {
      setEditLoading(false);
    }
  };

  return { editLoading, editError, editSuccess, editUser, editCandidate };
};

export default useEditData;
