import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { Candidate, CandidateArray } from "../../types/TypeCandidate";
import useRemoveData from "../../api/useRemoveData";
import Alert from "../molecules/Alert";
import { Link } from "react-router";
import CandidateModal from "../molecules/CandidateModal";

type Props = {
  data: CandidateArray;
  onRefresh: () => void;
  getLoading: boolean;
  getError: string | null;
};

const CandidatesTable = ({ data, onRefresh, getLoading, getError }: Props) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 10;

  // API Method
  const {
    removeCandidate,
    removeCandidates,
    removeLoading,
    removeError,
    removeSuccess,
  } = useRemoveData();

  // Filter data (username dan kelas)
  const filteredData = data.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
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
  const handleEdit = (id: string) => {
    window.location.href = `/admin/candidates/edit/${id}`;
  };
  const handleDeleteById = async (id: string) => {
    let confirmAlert = "Yakin menghapus data ini?";

    if (!confirm(confirmAlert)) return;

    await removeCandidate(id);
  };
  const handleDelete = async () => {
    let confirmAlert = "Yakin menghapus data ini?";

    if (!confirm(confirmAlert)) return;

    await removeCandidates();
  };
  const handleDetail = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    modalRef.current?.showModal();
  };

  // Re-render after remove success
  useEffect(() => {
    if (removeSuccess) {
      onRefresh();
    }
  }, [removeSuccess]);

  return (
    <div className="p-4">
      {/* Modal */}
      <CandidateModal data={selectedCandidate} ref={modalRef} />

      {/* Alert */}
      {removeSuccess && <Alert variant="success" message={removeSuccess} />}
      {removeError && <Alert variant="error" message={removeError} />}
      {getError && <Alert variant="error" message={getError} />}

      {/* 🔍 Search Input & Add / Import Data Button */}
      <div className="flex gap-5 justify-between items-center">
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
        <Link to={"/admin/candidates/add"} className="btn">
          Tambah Data
        </Link>
        <button className="btn btn-error" onClick={handleDelete}>
          {removeLoading ? (
            <>
              <span className="loading loading-dots loading-xs"></span>{" "}
              Loading...
            </>
          ) : (
            "Hapus Semua Kandidat"
          )}
        </button>
      </div>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Lengkap</th>
            <th>Asal</th>
            <th>Votes</th>
            <th>Aksi</th>
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
                <td>{item.name}</td>
                <td>{item.origin}</td>
                <td>{item.votes}</td>
                <td className="flex gap-3">
                  <button className="btn" onClick={() => handleDetail(item)}>
                    Info Detail
                  </button>
                  <button onClick={() => handleEdit(item.id)} className="btn">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteById(item.id)}
                    className="btn btn-error"
                  >
                    {removeLoading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>{" "}
                        Loading ...
                      </>
                    ) : (
                      "Hapus"
                    )}
                  </button>
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

export default CandidatesTable;
