import { useEffect, useRef, useState } from "react";
import useGetData from "../api/useGetData";
import CandidateModal from "../components/molecules/CandidateModal";
import type { Candidate } from "../types/TypeCandidate";
import CandidateCard from "../components/molecules/CandidateCard";
import useVote from "../api/useVote";
import Alert from "../components/molecules/Alert";

const VotingPage = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const modalRef = useRef<HTMLDialogElement>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );

  const { candidates, getCandidates, getLoading, getError } = useGetData();
  const { vote, voteLoading, voteError, voteSuccess } = useVote();

  useEffect(() => {
    getCandidates();
  }, []);

  const openVisionModal = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    modalRef.current?.showModal();
  };

  const handleVote = async (candidateId: string) => {
    const confirmAlert = "Yakin memilih kandidat ini?";
    
    if (!confirm(confirmAlert)) return;
    
    await vote(user.data.id, candidateId);
  };

  // Auto Logout
  useEffect(() => {
    if (voteSuccess) {
      setTimeout(() => {
        localStorage.removeItem("user");
        window.location.href = "/";
      }, 1000);
    }
  }, [voteSuccess]);

  if (getLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );

  return (
    <div className="relative flex justify-center items-center">
      {/* Alert */}
      <Alert variant="error" message={getError} />
      <Alert variant="error" message={voteError} />
      <Alert variant="success" message={voteSuccess} />

      <div className="px-2 py-10 w-full max-w-[1444px] m-auto">
        <ul className="grid gap-5 md:gap-20 grid-cols-3">
          {candidates?.map((item) => (
            <li key={item.id} className="col-span-3 md:col-span-1">
              <CandidateCard
                item={item}
                handleOpenModal={openVisionModal}
                handleVote={handleVote}
                loading={voteLoading}
              />
            </li>
          ))}
        </ul>
        <CandidateModal data={selectedCandidate} ref={modalRef} />
      </div>
    </div>
  );
};

export default VotingPage;
