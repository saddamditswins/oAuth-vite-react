import apiHelper, { END_POINTS } from "@/lib/api-helper";

export async function getDoc(path: string) {
  const res = await apiHelper.get(END_POINTS.GET_FILE(path));
  return res.data;
}

export async function uploadDoc(file: File, type: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("document_type", type);

  const res = await apiHelper.post(END_POINTS.UPLOAD_FILE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}
