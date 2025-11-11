import type { JSX } from "react";

type Props = {
  variant: Variant;
  message: string | null;
};

type Variant = "success" | "error" | "info" | "warning";

const variantsStyle: Record<Variant, { className: string; icon: JSX.Element }> =
  {
    success: {
      className: "alert-success",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    error: {
      className: "alert-error",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    info: {
      className: "alert-info",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      ),
    },
    warning: {
      className: "alert-warning",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
    },
  };

const Alert = ({ variant, message }: Props) => {
  const { className, icon } = variantsStyle[variant];

  const baseStyle =
    "alert opacity-0 fixed z-50 top-5 left-1/2 -translate-y-10 -translate-x-1/2 w-2/3 md:w-1/3 transition-all duration-300 ease-in-out";

  return (
    <div
      role="alert"
      className={`${baseStyle} ${className} ${
        message ? "opacity-100 translate-y-0" : ""
      }`}
    >
      {icon}
      <span className="font-semibold">{message}</span>
    </div>
  );
};

export default Alert;
