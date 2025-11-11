import useGetData from "../api/useGetData";
import { useEffect } from "react";
import CandidatesTable from "../components/organisms/CandidatesTable";

const UsersPage = () => {
  // API Method
  const { candidates, getCandidates, getLoading, getError } = useGetData();

  useEffect(() => {
    getCandidates();
  }, []);

  // Re-render users data
  const onRefresh = () => getCandidates();

  return (
    <CandidatesTable
      data={candidates}
      onRefresh={onRefresh}
      getLoading={getLoading}
      getError={getError}
    />
  );
};

export default UsersPage;
