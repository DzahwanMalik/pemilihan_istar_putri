import { forwardRef } from "react";
import type { Candidate } from "../../types/TypeCandidate";

type Props = {
  data: Candidate | null;
};

const CandidateModal = forwardRef<HTMLDialogElement, Props>(
  ({ data }: Props, ref) => {
    // Admin Modal
    const admin = JSON.parse(localStorage.getItem("admin")!);

    return (
      <dialog className="modal" ref={ref}>
        <div className="modal-box">
          <ul className="flex gap-7 flex-col">
            {data?.image && (
              <li>
                <img src={data.image} alt="" />
              </li>
            )}
            {admin && (
              <li>
                <h3 className="font-semibold mb-3">ID:</h3>{" "}
                <p className="text-base-content text-sm">{data?.id}</p>
              </li>
            )}
            <li>
              <h3 className="font-semibold mb-3">Nama:</h3>{" "}
              <p className="text-base-content text-sm">{data?.name}</p>
            </li>
            <li>
              <h3 className="font-semibold mb-3">Asal:</h3>{" "}
              <p className="text-base-content text-sm">{data?.origin}</p>
            </li>
            <li>
              <h3 className="font-semibold mb-3">Visi:</h3>{" "}
              <p className="text-base-content text-sm">{data?.vision}</p>
            </li>
            <li>
              <h3 className="font-semibold mb-3">Misi:</h3>{" "}
              <p className="text-base-content text-sm">{data?.mission}</p>
            </li>
            <li>
              <h3 className="font-semibold mb-3">Motto:</h3>{" "}
              <p className="text-base-content text-sm">{data?.motto}</p>
            </li>
            {admin && (
              <li>
                <h3 className="font-semibold mb-3">Pemilih:</h3>{" "}
                <p className="text-base-content text-sm">{data?.votes}</p>
              </li>
            )}
          </ul>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    );
  }
);

export default CandidateModal;
