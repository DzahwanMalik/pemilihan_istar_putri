import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import useAddData from "../api/useAddData";
import Alert from "../components/molecules/Alert";
import { useEffect } from "react";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const candidateSchema = z.object({
  name: z.string().min(3),
  origin: z.string().min(3),
  image: z
    .custom<FileList>()
    .refine((fileList) => fileList.length > 0, "Expected File")
    .transform((file) => file[0] as File)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Tipe file harus jpg, jpeg, atau png",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, "Ukuran file maksimal 5MB"),
  vision: z.string().min(3),
  mission: z.string().min(3),
  motto: z.string().min(3),
  votes: z.coerce.number().min(0).default(0),
});

type Candidate = z.infer<typeof candidateSchema>;

const AddCandidatesPage = () => {
  const { register, handleSubmit, formState } = useForm<Candidate>({
    resolver: zodResolver(candidateSchema) as unknown as Resolver<Candidate>,
  });

  const { addLoading, addError, addSuccess, addCandidate } = useAddData();

  const onSubmit = async (data: Candidate) => {
    await addCandidate(data);
  };

  useEffect(() => {
    if (addSuccess) {
      setTimeout(() => {
        window.location.href = "/admin/candidates";
      }, 1000);
    }
  });

  return (
    <div className="bg-base-100 h-full p-5 rounded-xl">
      <Alert variant="error" message={addError} />
      <Alert variant="success" message={addSuccess} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full flex flex-col justify-between"
      >
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full flex flex-col gap-5">
            <label>
              <p className="font-semibold mb-2">Username</p>
              <input
                type="text"
                placeholder="Masukkan Username"
                className="input w-full mb-2"
                {...register("name")}
              />
              {formState.errors.name && (
                <p className="text-error text-xs font-semibold">
                  {formState.errors?.name?.message}
                </p>
              )}
            </label>
            <label>
              <p className="font-semibold mb-2">Asal</p>
              <input
                type="text"
                placeholder="Masukkan Asal"
                className="input w-full mb-2"
                {...register("origin")}
              />
              {formState.errors.origin && (
                <p className="text-error text-xs font-semibold">
                  {formState.errors?.origin?.message}
                </p>
              )}
            </label>
            <label>
              <p className="font-semibold mb-2">Motto</p>
              <input
                type="text"
                placeholder="Masukkan Motto"
                className="input w-full mb-2"
                {...register("motto")}
              />
              {formState.errors.motto && (
                <p className="text-error text-xs font-semibold">
                  {formState.errors?.motto?.message}
                </p>
              )}
            </label>
            <label>
              <p className="font-semibold mb-2">Foto</p>
              <input
                type="file"
                className="input w-full file-input mb-2"
                {...register("image")}
              />
              {formState.errors.image && (
                <p className="text-error text-xs font-semibold">
                  {formState.errors?.image?.message}
                </p>
              )}
            </label>
          </div>
          <div className="w-full flex flex-col gap-5">
            <label>
              <p className="font-semibold mb-2">Visi</p>
              <textarea
                placeholder="Masukkan Visi"
                className="textarea textarea-bordered w-full mb-2"
                {...register("vision")}
              />
              {formState.errors.vision && (
                <p className="text-error text-xs font-semibold">
                  {formState.errors?.vision?.message}
                </p>
              )}
            </label>
            <label>
              <p className="font-semibold mb-2">Misi</p>
              <textarea
                placeholder="Masukkan Misi"
                className="textarea textarea-bordered w-full mb-2"
                {...register("mission")}
              />
              {formState.errors.mission && (
                <p className="text-error text-xs font-semibold">
                  {formState.errors?.mission?.message}
                </p>
              )}
            </label>
          </div>
        </div>
        <div className="flex gap-5">
          <button type="submit" className="btn btn-neutral">
            {addLoading ? (
              <>
                <span className="loading loading-dots loading-xs"></span>{" "}
                Loading...
              </>
            ) : (
              "Submit"
            )}
          </button>
          <button type="reset" className="btn">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCandidatesPage;
