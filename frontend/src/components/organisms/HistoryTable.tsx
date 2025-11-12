import { useEffect, useState, type ChangeEvent } from "react";
import Alert from "../molecules/Alert";
import type { VoteHistoryArray } from "../../types/TypeVoteHistory";

type Props = {
  data: VoteHistoryArray;
  getLoading: boolean;
  getError: string | null;
};

const HistoryTable = ({ data, getLoading, getError }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 10;

  // Filter data
  const filteredData = data.filter((item) => {
    return (
      item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kelas.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jenisKelamin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.votedCandidate?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  //   Handle Events
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // reset ke page 1 setiap kali search berubah
  };

  // Re-render if there is a new data
  useEffect(() => {
    setCurrentPage(1); // reset ke page 1 setiap kali data berubah
  }, [data]);

  return (
    <div className="p-4">
      {/* Alert */}
      {getError && <Alert variant="error" message={getError} />}

      {/* 🔍 Search Input & Add / Import Data Button */}
      <div className="flex gap-5 items-center">
        <label className="input w-full">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </label>
      </div>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Lengkap</th>
            <th>Kelas</th>
            <th>Jenis Kelamin</th>
            <th>Kandidat Yang Dipilih</th>
            <th>Waktu</th>
          </tr>
        </thead>
        <tbody>
          {getLoading && (
            <tr>
              <td colSpan={7} className="text-center p-4">
                <span className="loading loading-spinner loading-lg"></span>{" "}
                Loading ...
              </td>
            </tr>
          )}
          {currentData.length > 0 ? (
            currentData.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.kelas}</td>
                <td>{item.jenisKelamin}</td>
                <td>{item.votedCandidate.name}</td>
                <td>
                  {new Date(item.votedAt).toLocaleString("id-ID", {
                    weekday: "long",
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center p-4">
                Tidak ada data ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 🔄 Pagination */}
      <div className="flex justify-between items-center mt-5">
        <p>
          Halaman {currentPage} dari {totalPages || 1}
        </p>
        <div className="join">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="join-item btn"
          >
            «
          </button>
          <button className="join-item btn">{currentPage}</button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
            className="join-item btn"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryTable;
