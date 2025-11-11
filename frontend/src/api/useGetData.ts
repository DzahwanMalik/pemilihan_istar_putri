import { useState } from "react";
import axiosInstance from "../lib/axios";
import type { User, UserArray } from "../types/TypeUser";
import type { Candidate, CandidateArray } from "../types/TypeCandidate";
import type { ResultArray } from "../types/TypeResult";
import type { VoteHistoryArray } from "../types/TypeVoteHistory";

const useGetData = () => {
  const [users, setUsers] = useState<UserArray>([]);
  const [user, setUser] = useState<User | null>(null);
  const [candidates, setCandidates] = useState<CandidateArray>([]);
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [results, setResult] = useState<ResultArray>([]);
  const [participation, setParticipation] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalVoted, setTotalVoted] = useState<number>(0);
  const [totalUsersHasNotVote, setTotalUsersHasNotVote] = useState<number>(0);
  const [voteHistory, setVoteHistory] = useState<VoteHistoryArray>([]);
  const [getLoading, setGetLoading] = useState<boolean>(false);
  const [getError, setGetError] = useState<string | null>(null);

  const handleError = (error: any) => {
    console.log(error);
    const message =
      error?.response?.data?.message ||
      error.message ||
      "Terjadi Kesalahan Saat Mengambil Data!";
    setGetError(message);
  };

  const getUsers = async () => {
    try {
      setGetLoading(true);
      const { data } = await axiosInstance.get("/users");
      setUsers(data);
    } catch (error: any) {
      handleError(error);
    } finally {
      setGetLoading(false);
    }
  };

  const getUserById = async (id: string) => {
    try {
      setGetLoading(true);
      const { data } = await axiosInstance.get(`/users/${id}`);
      setUser(data);
    } catch (error: any) {
      handleError(error);
    } finally {
      setGetLoading(false);
    }
  };

  const getCandidates = async () => {
    try {
      setGetLoading(true);
      const { data } = await axiosInstance.get("/candidates");
      setCandidates(data);
    } catch (error: any) {
      handleError(error);
    } finally {
      setGetLoading(false);
    }
  };

  const getCandidateById = async (id: string) => {
    try {
      setGetLoading(true);
      const { data } = await axiosInstance.get(`/candidates/${id}`);
      setCandidate(data);
    } catch (error: any) {
      handleError(error);
    } finally {
      setGetLoading(false);
    }
  };

  const getResults = async () => {
    try {
      setGetLoading(true);
      const { data } = await axiosInstance.get("/results");
      setResult(data.results);
      setParticipation(data.participation);
      setTotalUsers(data.totalUsers);
      setTotalVoted(data.totalVoted);
      setTotalUsersHasNotVote(data.totalUsersHasNotVote);
    } catch (error: any) {
      handleError(error);
    } finally {
      setGetLoading(false);
    }
  };

  const getVoteHistory = async () => {
    try {
      setGetLoading(true);
      const response = await axiosInstance.get(`/history`);
      setVoteHistory(response?.data);
    } catch (error: any) {
      handleError(error);
    } finally {
      setGetLoading(false);
    }
  };

  return {
    users,
    user,
    candidates,
    candidate,
    results,
    participation,
    totalUsers,
    totalVoted,
    totalUsersHasNotVote,
    voteHistory,
    getLoading,
    getError,
    getUsers,
    getUserById,
    getCandidates,
    getCandidateById,
    getResults,
    getVoteHistory,
  };
};

export default useGetData;
