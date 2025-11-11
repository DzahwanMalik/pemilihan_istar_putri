import { useState } from "react";
import axiosInstance from "../lib/axios";

const useVote = () => {
  const [voteLoading, setVoteLoading] = useState<boolean>(false);
  const [voteError, setVoteError] = useState<string | null>(null);
  const [voteSuccess, setVoteSuccess] = useState<string | null>(null);

  const handleError = (error: any) => {
    console.log(error);
    const message =
      error?.response?.data?.message ||
      error.message ||
      "Terjadi Kesalahan Saat Mengambil Data!";
    setVoteError(message);
  };

  const vote = async (userId: string, candidateId: string) => {
    try {
      setVoteLoading(true);
      const response = await axiosInstance.post(`/vote`, {
        userId,
        candidateId,
      });
      setVoteSuccess(response.data.message);
    } catch (error: any) {
      handleError(error);
    } finally {
      setVoteLoading(false);
    }
  };

  return { voteLoading, voteError, voteSuccess, vote };
};

export default useVote;
