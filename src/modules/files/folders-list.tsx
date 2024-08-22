import { Pagination } from "@/components/pagination";
import { IDocumentResponse } from "@/types/doc";
import { useLoaderData } from "react-router-dom";
import { UploadFile } from "./upload-file";
import { FileCard } from "@/components/file-card";

export function DocsList() {
  const docs = useLoaderData() as IDocumentResponse;
  const docsList = docs.list;
  const metaData = docs.metadata;

  return (
    <>
      <div className="grid grid-cols-[1fr,2fr] gap-4 h-full">
        {/* File Upload */}
        <div>
          <UploadFile />
        </div>

        {/* File List */}
        <div className="flex flex-col shadow-md p-4">
          {docsList && docsList.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {docsList.map((doc) => (
                <FileCard key={doc._id} file={doc} />
              ))}
            </div>
          ) : (
            <NoFilesUI />
          )}

          {metaData && docsList.length > 0 && (
            <div className="p-4 mt-auto">
              <Pagination totalPages={metaData?.totalPages} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function NoFilesUI() {
  return <div className="text-gray-500">No Files</div>;
}
