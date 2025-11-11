import { useRef, useState, type ChangeEvent } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import type { CandidateArray } from "../../types/TypeCandidate";
import Alert from "../molecules/Alert";

type Props = {
  data: CandidateArray;
  getLoading: boolean;
  getError: string | null;
};

const ReportTable = ({ data, getLoading, getError }: Props) => {
  const tableRef = useRef<HTMLTableElement>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 10;

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
  const handleDownloadPDF = async () => {
    const dataUrl = await toPng(tableRef.current!);
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const img = new Image();
    img.src = dataUrl;

    pdf.addImage(img, "PNG", 10, 10, imgWidth, 0);
    pdf.save("Laporan-Hasil-Pemilihan.pdf");
  };

  return (
    <div className="p-4">
      {/* Alert */}
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
        <button onClick={handleDownloadPDF} className="btn">
          Download Table Page as PDF
        </button>
      </div>

      <table className="table table-zebra" ref={tableRef}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nama Lengkap</th>
            <th>Asal</th>
            <th>Visi</th>
            <th>Misi</th>
            <th>Motto</th>
            <th>Perolehan Suara</th>
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
                <td>
                  <div className="h-56 overflow-hidden rounded-md">
                    <img
                      src={item.image}
                      alt=""
                      className="h-full object-cover"
                    />
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.origin}</td>
                <td>{item.vision}</td>
                <td>{item.mission}</td>
                <td>{item.motto}</td>
                <td>{item.votes}</td>
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

export default ReportTable;
