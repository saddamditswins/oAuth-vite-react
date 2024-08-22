import { logger } from "@/lib/logger";
import { getDoc } from "@/repo/doc";
import { IDocument } from "@/types/doc";
import { BiDownload, BiFolderOpen } from "react-icons/bi";
import { GrDocument } from "react-icons/gr";

export function FileCard({ file }: { file: IDocument }) {
  const downloadFile = async () => {
    try {
      const res = await getDoc(file.filepath);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      logger("Get File", "", url)
    } catch (error) {
      logger("Get File", "Error", error)
    }
  };

  return (
    <div
      key={file._id}
      className="bg-white shadow border p-4 rounded-lg flex flex-col justify-between relative max-h-60"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {file.document_type.toLowerCase() === "folder" && (
            <BiFolderOpen className="h-6 w-6 text-blue-500" />
          )}
          {file.document_type.toLowerCase() === "image" && (
            <GrDocument className="h-6 w-6 text-yellow-500" />
          )}
          {file.document_type.toLowerCase() === "doc" && (
            <GrDocument className="h-6 w-6 text-red-500" />
          )}
          <span className="ml-3 text-gray-700">{file.filepath}</span>
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div className="text-sm text-gray-500 mt-4">
          <p>Size: {file.filesize}</p>
          <p>Modified: {file.upload_date}</p>
        </div>
        <button onClick={downloadFile} className="p-1 rounded-full text-blue-600 hover:text-blue-800 hover:bg-gray-100">
          <BiDownload className="h-5 w-6" />
        </button>
      </div>
    </div>
  );
}
