import { useEffect } from "react";
import useGetData from "../api/useGetData";
import HistoryTable from "../components/organisms/HistoryTable";

const HistoryPage = () => {
  const { voteHistory, getVoteHistory, getLoading, getError } = useGetData();

  useEffect(() => {
    getVoteHistory();
  }, []);

  return (
    <HistoryTable
      data={voteHistory}
      getLoading={getLoading}
      getError={getError}
    />
  );
};

export default HistoryPage;
