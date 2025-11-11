import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import useAddData from "../api/useAddData";
import Alert from "../components/molecules/Alert";

const userSchmea = z.object({
  id: z.string().min(3),
  username: z.string().min(3),
  password: z.string().min(3),
  kelas: z.string().min(3),
  jenisKelamin: z.string().min(3),
  hasVoted: z.coerce.boolean().default(false),
});

type User = z.infer<typeof userSchmea>;

const AddUsersPage = () => {
  const { register, handleSubmit, formState } = useForm<User>({
    resolver: zodResolver(userSchmea) as unknown as Resolver<User>,
  });

  const { addLoading, addError, addSuccess, addUser } = useAddData();

  const onSubmit = async (data: User) => {
    await addUser(data);
  };

  useEffect(() => {
    if (addSuccess) {
      setTimeout(() => {
        window.location.href = "/admin/users";
      }, 1000);
    }
  }, [addSuccess]);

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
              <p className="font-semibold mb-2">ID</p>
              <input
                type="text"
                placeholder="Masukkan ID"
                className="input"
                {...register("id")}
              />
              {formState.errors.id && (
                <p className="text-error text-xs font-semibold">
                  {formState.errors?.id?.message}
                </p>
              )}
            </label>
            <label>
              <p className="font-semibold mb-2">Username</p>
              <input
                type="text"
                placeholder="Masukkan Username"
                className="input"
                {...register("username")}
              />
              {formState.errors.username && (
                <p className="text-error text-xs font-semibold">
                  {formState.errors?.username?.message}
                </p>
              )}
            </label>
            <label>
              <p className="font-semibold mb-2">Password</p>
              <input
                type="text"
                placeholder="Masukkan Username"
                className="input"
                {...register("password")}
              />
              {formState.errors.password && (
                <p className="text-error text-xs font-semibold">
                  {formState.errors?.password?.message}
                </p>
              )}
            </label>
            <label>
              <p className="font-semibold mb-2">Kelas</p>
              <select
                defaultValue="Pilih Kelas"
                className="select"
                {...register("kelas")}
              >
                <option disabled={true}>Pilih Kelas</option>
                <option>1.1 Putra</option>
                <option>1.2 Putra</option>
                <option>1.3 Putra</option>
                <option>1.4 Putra</option>
                <option>2.1 Putra</option>
                <option>2.2 Putra</option>
                <option>2.3 Putra</option>
                <option>2.4 Putra</option>
                <option>3.1 Putra</option>
                <option>3.2 Putra</option>
                <option>3.3 Putra</option>
                <option>3.4 Putra</option>
                <option>PK Putra</option>
                <option>4.1 Putra</option>
                <option>4.2 Putra</option>
                <option>5.1 Putra</option>
                <option>5.2 Putra</option>
                <option>6.1 Putra</option>
                <option>6.2 Putra</option>
              </select>
            </label>
            <label>
              <p className="font-semibold mb-2">Jenis Kelamin</p>
              <select
                defaultValue="Pilih Jenis Kelamin"
                className="select"
                {...register("jenisKelamin")}
              >
                <option disabled={true}>Pilih Jenis Kelamin</option>
                <option>Laki-laki</option>
                <option>Perempuan</option>
              </select>
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

export default AddUsersPage;
