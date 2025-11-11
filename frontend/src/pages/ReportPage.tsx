import { useEffect } from "react";
import useGetData from "../api/useGetData";
import ReportTable from "../components/organisms/ReportTable";

const ReportPage = () => {
  const { getCandidates, getLoading, getError, candidates } = useGetData();

  useEffect(() => {
    getCandidates();
  }, []);

  return (
    <ReportTable
      data={candidates}
      getLoading={getLoading}
      getError={getError}
    />
  );
};

export default ReportPage;
