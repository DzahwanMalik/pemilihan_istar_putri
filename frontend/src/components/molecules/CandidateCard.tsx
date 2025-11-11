import type { Candidate } from "../../types/TypeCandidate";

type Props = {
  item: Candidate;
  loading: boolean;
  handleOpenModal: (item: Candidate) => void;
  handleVote: (candidateId: string) => void;
};

const CandidateCard = ({ item, loading, handleOpenModal, handleVote }: Props) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={item.image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-center text-xl">{item.name}</h2>
        <p className="text-center mb-5 text-base-content/70 font-semibold">
          Ikatan Santri Tarbiyatul Huda ( ISTAR )
        </p>
        <div className="card-actions">
          <button
            className="btn w-full"
            onClick={() => handleVote(item.id)}
          >
            {loading ? <><span className="loading loading-dots loading-xs"></span> Loading...</> : "Vote"}
          </button>
          <button
            className="btn btn-outline w-full"
            onClick={() => handleOpenModal(item)}
          >
            Info Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
