import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAddData from "../../api/useAddData";
import Alert from "./Alert";
import useDownload from "../../hook/useDownload";
import { useEffect } from "react";

const ACCEPTED_EXCEL_TYPES = [
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const importExcelSchema = z.object({
  file: z
    .custom<FileList>()
    .refine((fileList) => fileList.length > 0, {
      message: "Expected File",
    })
    .transform((file) => file[0] as File)
    .refine((file) => ACCEPTED_EXCEL_TYPES.includes(file.type), {
      message: "Tipe file harus excel",
    }),
});

type ImportExcelSchema = z.infer<typeof importExcelSchema>;

type Props = {
  onRefresh: () => void;
};

const FormInputUsers = ({ onRefresh }: Props) => {
  // Custom Hooks
  const {
    downloadFormatUsers,
    downloadSuccess,
    downloadError,
    downloadLoading,
  } = useDownload();

  // UseForm
  const { register, handleSubmit, formState } = useForm<ImportExcelSchema>({
    resolver: zodResolver(
      importExcelSchema
    ) as unknown as Resolver<ImportExcelSchema>,
  });

  //   API Method
  const { addUserByExcel, addLoading, addSuccess, addError } = useAddData();

  //   Events Handler
  const onSubmit = async (data: ImportExcelSchema) => {
    await addUserByExcel(data);
  };
  const handleDownload = () => {
    const URL =
      "https://diwyxtpgvqqfothgggfg.supabase.co/storage/v1/object/public/pemilihan_istar_tarhud/format-data-users.xlsx";
    downloadFormatUsers(URL);
  };

  // Re-render after import
  useEffect(() => {
    if (addSuccess) onRefresh();
  }, [addSuccess]);

  return (
    <div className="bg-base-200 inset-shadow-sm rounded-md p-5 my-5">
      {/* Alert */}
      <Alert variant="error" message={addError} />
      <Alert variant="success" message={addSuccess} />
      <Alert variant="error" message={downloadError} />
      <Alert variant="success" message={downloadSuccess} />

      {/* Import Excel Form */}
      <button onClick={handleDownload} className="btn btn-outline mb-5">
        {downloadLoading ? (
          <>
            <span className="loading loading-spinner loading-sm"></span> Loading
            ...
          </>
        ) : (
          "Download Format"
        )}
      </button>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5">
        <input type="file" className="file-input" {...register("file")} />
        <button type="submit" className="btn btn-outline">
          {addLoading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>{" "}
              Loading ...
            </>
          ) : (
            "Import Data"
          )}
        </button>
      </form>
      {formState.errors?.file && (
        <p className="text-error font-semibold text-xs mt-2">
          {formState.errors?.file?.message}
        </p>
      )}
    </div>
  );
};

export default FormInputUsers;
