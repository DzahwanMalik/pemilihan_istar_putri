import { useState } from "react";

const useDownload = () => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);

  const downloadFormatUsers = (url: string) => {
    setDownloadSuccess("Download Berhasil!");
    try {
      window.open(url, "_blank");
    } catch (error) {
      setDownloadError("Download Gagal!");
    } finally {
      setDownloadLoading(false);
    }
  };

  return {
    downloadFormatUsers,
    downloadSuccess,
    downloadError,
    downloadLoading,
  };
};

export default useDownload;
