import { logger } from "@/lib/logger";
import { AppConstants, notify } from "@/lib/utils";
import { uploadDoc } from "@/repo/doc";
import { AxiosError } from "axios";
import React, { useRef, useState } from "react";
import { FiFilePlus } from "react-icons/fi";
import { RiUploadCloudLine } from "react-icons/ri";
import { useRevalidator } from "react-router-dom";

export function UploadFile() {
  const ref = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { revalidate, state } = useRevalidator();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files.length > 0) {
        if (e.target.files[0].size > AppConstants.max_file_size) {
          setError(AppConstants.file_size_error);
        }
        logger("File Size", "", e.target.files[0].size)
        setUploading(true);
        const res = await uploadDoc(e.target.files[0], "Doc");
        if (res.data) {
          revalidate();
          setError("");
          notify(res.message);
        }
      }
    } catch (error) {
      logger("RESPONSE DATA FOR UPLOAD", "" ,error)
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-96 relative flex justify-center items-center gap-2 cursor-pointer">
        {uploading ? (
          <>
            <RiUploadCloudLine />
            <p className="text-sm">Uploading...</p>
          </>
        ) : (
          <>
            <input
              ref={ref}
              type="file"
              disabled={state == "loading"}
              onChange={(e) => handleFileChange(e)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />

            <FiFilePlus />
            <p className="text-sm">Drop a file</p>
          </>
        )}
      </div>
      <p className="text-sm text-red-600">{error}</p>
    </>
  );
}
