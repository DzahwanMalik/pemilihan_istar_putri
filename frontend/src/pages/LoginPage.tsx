import LoginForm from "../components/molecules/LoginForm";

const LoginPage = () => {
  const date = new Date();

  return (
    <div className="min-h-screen p-5 flex justify-center items-center">
      <div className="w-full max-w-5xl m-auto p-2 flex justify-center shadow-xl rounded-xl">
        <div
          className="hidden relative inset-shadow-sm/50 bg-base-200 overflow-hidden px-20 rounded-xl w-1/2 md:block"
        >
          <div className="relative z-20 flex gap-7 flex-col justify-center h-full">
            <img src="./tarhud-logo.png" alt="" width="60px" />
            <h1 className="text-3xl flex flex-col gap-1">
              <span className="font-bold">Pemilihan Ketua ISTAR</span>
              <span className="text-xl">
                Tahun Ajaran {date.getFullYear()} - {date.getFullYear() + 1}
              </span>
            </h1>
            <p className="text-xs">Copyright &copy; All Right Reserved.</p>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
