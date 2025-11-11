import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import useLoginUser from "../../api/useLogin";
import Alert from "./Alert";
import { useEffect } from "react";

const zodSchema = z.object({
  ID: z.string().min(3),
  password: z.string().min(3),
});

type FormData = z.infer<typeof zodSchema>;

const LoginForm = () => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(zodSchema) as Resolver<FormData>,
  });

  const { loginUser, loginAdmin, loginLoading, loginError, loginSuccess } =
    useLoginUser();

  const onSubmit = async (data: FormData) => {
    if (data.ID === "admin") await loginAdmin(data.ID, data.password);
    await loginUser(data.ID, data.password);

    setTimeout(() => {
      if (localStorage.getItem("user")) window.location.href = "/voting";
      if (localStorage.getItem("admin")) window.location.href = "/admin";
    }, 1000);
  };

  useEffect(() => {
    if (loginSuccess) {
      if (localStorage.getItem("user")) {
        setTimeout(() => {
          window.location.href = "/voting";
        }, 1000);
      }
      if (localStorage.getItem("admin")) {
        setTimeout(() => {
          window.location.href = "/admin";
        }, 1000);
      }
    }
  }, [loginSuccess]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:px-10 md:py-28 md:w-1/2 w-full p-5 flex flex-col gap-5 items-center justify-center bg-base-100 rounded-sm"
    >
      <div className="text-center mb-7">
        <h2 className="text-3xl font-bold mb-3">Selamat Datang</h2>
        <p className="text-sm text-base-content/50">
          Silahkan Masukkan ID dan Password Anda
        </p>
      </div>
      <div className="w-full">
        <label className="input validator w-full">
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
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </g>
          </svg>
          <input
            type="text"
            required
            minLength={3}
            placeholder="Masukkan ID"
            {...register("ID")}
          />
        </label>
        <p className="validator-hint hidden">ID minimal 3 karakter</p>
      </div>
      <div className="w-full">
        <label className="input validator w-full">
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
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type="password"
            required
            minLength={3}
            placeholder="Password"
            {...register("password")}
          />
        </label>
        <p className="validator-hint hidden">Password minimal 3 karakter</p>
      </div>
      <button type="submit" className="btn btn-neutral w-full">
        {loginLoading ? (
          <>
            <span className="loading loading-dots loading-xs"></span> Loading...
          </>
        ) : (
          "Login"
        )}
      </button>
      <Alert variant="error" message={loginError} />
      <Alert variant="success" message={loginSuccess} />
    </form>
  );
};

export default LoginForm;
