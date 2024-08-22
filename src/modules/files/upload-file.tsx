import { uploadDoc } from "@/repo/doc";
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
        setUploading(true);
        const res = await uploadDoc(e.target.files[0], "Doc");
        if (!res.error) {
          revalidate();
        } else {
          setError(res.message);
        }
      }
    } catch (error) {
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-96 relative flex justify-center items-center gap-2">
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
              className="absolute inset-0 opacity-0"
            />

            <FiFilePlus />
            <p className="text-sm">Drop an image</p>
          </>
        )}
      </div>
      <p>{error}</p>
    </>
  );
}
