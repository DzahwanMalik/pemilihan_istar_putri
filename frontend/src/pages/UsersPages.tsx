import UsersTable from "../components/organisms/UsersTable";
import useGetData from "../api/useGetData";
import { useEffect } from "react";

const UsersPage = () => {
  // API Method
  const { users, getUsers, getLoading, getError } = useGetData();

  useEffect(() => {
    getUsers();
  }, []);

  // Re-render users data
  const onRefresh = () => getUsers();

  return (
    <UsersTable
      data={users}
      onRefresh={onRefresh}
      getLoading={getLoading}
      getError={getError}
    />
  );
};

export default UsersPage;
