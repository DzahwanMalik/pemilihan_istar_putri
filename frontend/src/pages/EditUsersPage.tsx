import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import Alert from "../components/molecules/Alert";
import useEditData from "../api/useEditData";
import { useParams } from "react-router";
import useGetData from "../api/useGetData";
import { useEffect } from "react";

const userSchmea = z.object({
  username: z.string().min(3),
  kelas: z.string().min(3),
  jenisKelamin: z.string().min(3),
});

type User = z.infer<typeof userSchmea>;

const EditUsersPage = () => {
  const { id } = useParams();

  const { register, handleSubmit, formState, reset } = useForm<User>({
    resolver: zodResolver(userSchmea) as unknown as Resolver<User>,
  });

  const { editUser, editError, editSuccess, editLoading } = useEditData();
  const { getUserById, user } = useGetData();

  const onSubmit = async (data: User) => {
    await editUser(data, id!);
    setTimeout(() => {
      window.location.href = "/admin/users";
    }, 1000);
  };

  useEffect(() => {
    (async () => await getUserById(id!))();
  }, [id]);

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        kelas: user.kelas,
        jenisKelamin: user.jenisKelamin,
      });
    }
  }, [user, reset]);

  return (
    <div className="bg-base-100 h-full p-5 rounded-xl">
      <Alert variant="error" message={editError} />
      <Alert variant="success" message={editSuccess} />
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
                {...register("username")}
              />
              {formState.errors.username && (
                <p className="text-error text-xs font-semibold">
                  {formState.errors?.username?.message}
                </p>
              )}
            </label>
            <label>
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
            {editLoading ? (
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

export default EditUsersPage;
