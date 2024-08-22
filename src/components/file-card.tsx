import { logger } from "@/lib/logger";
import { getDoc } from "@/repo/doc";
import { IDocument } from "@/types/doc";
import { BiDownload, BiFolderOpen } from "react-icons/bi";
import { GrDocument } from "react-icons/gr";
import { saveAs } from 'file-saver';
import { bytesToMB, notify } from "@/lib/utils";
import {DateTime} from "luxon"

export function FileCard({ file }: { file: IDocument }) {
  const fileSize = bytesToMB(+file.filesize);
  const fileUploadDate = DateTime.fromISO(file.upload_date);
  const dateStr = fileUploadDate.toLocaleString(DateTime.DATETIME_MED);

  const downloadFile = async () => {
    const res = await getDoc(file.filepath);
    if (!res) {
      throw new Error(res);
    }

    logger("Save File", "", res)
    saveAs(res.blob, res.name);
    notify("File Downloaded")
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
          <p>Size: {fileSize} MB</p>
          <p>Uploaded At: {dateStr}</p>
        </div>
        <button onClick={downloadFile} className="p-1 rounded-full text-blue-600 hover:text-blue-800 hover:bg-gray-100">
          <BiDownload className="h-5 w-6" />
        </button>
      </div>
    </div>
  );
}
