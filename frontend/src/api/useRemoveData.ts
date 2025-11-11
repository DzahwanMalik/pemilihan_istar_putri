import { useState } from "react";
import axiosInstance from "../lib/axios";

const useRemoveData = () => {
  const [removeLoading, setRemoveLoading] = useState<boolean>(false);
  const [removeError, setRemoveError] = useState<string | null>(null);
  const [removeSuccess, setRemoveSuccess] = useState<string | null>(null);

  const handleError = (error: any) => {
    console.log(error);
    const message =
      error?.response?.data?.message ||
      error.message ||
      "Terjadi Kesalahan Saat Mengambil Data!";
    setRemoveError(message);
  };

  const removeUser = async (id: string) => {
    try {
      setRemoveLoading(true);
      const response = await axiosInstance.delete(`/users/${id}`);
      setRemoveSuccess(response?.data?.message);
    } catch (error: any) {
      handleError(error);
    } finally {
      setRemoveLoading(false);
    }
  };

  const removeUsers = async () => {
    try {
      setRemoveLoading(true);
      const response = await axiosInstance.delete("/users");
      setRemoveSuccess(response?.data?.message);
    } catch (error: any) {
      handleError(error);
    } finally {
      setRemoveLoading(false);
    }
  };

  const removeCandidate = async (id: string) => {
    try {
      setRemoveLoading(true);
      const response = await axiosInstance.delete(`/candidates/${id}`);
      setRemoveSuccess(response?.data?.message);
    } catch (error: any) {
      handleError(error);
    } finally {
      setRemoveLoading(false);
    }
  };

  const removeCandidates = async () => {
    try {
      setRemoveLoading(true);
      const response = await axiosInstance.delete("/candidates");
      setRemoveSuccess(response?.data?.message);
    } catch (error: any) {
      handleError(error);
    } finally {
      setRemoveLoading(false);
    }
  };

  return {
    removeLoading,
    removeError,
    removeSuccess,
    removeUser,
    removeUsers,
    removeCandidate,
    removeCandidates,
  };
};

export default useRemoveData;
