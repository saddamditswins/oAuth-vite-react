import apiHelper, { END_POINTS } from "@/lib/api-helper";
import { IDocument, IDocumentResponse } from "@/types/doc";

export async function getDoc(path: string) {  
  return (await apiHelper.getFile(END_POINTS.GET_FILE(path)))
}

export async function uploadDoc(file: File, type: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("document_type", type);

  const res = await apiHelper.post<IDocument, FormData>(
    END_POINTS.UPLOAD_FILE,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
}

export async function getAllFiles(page: number, limit?: number) {
  const res = await apiHelper.get<IDocumentResponse>(
    END_POINTS.GET_FILES(page, limit)
  );
  return res.data;
}
