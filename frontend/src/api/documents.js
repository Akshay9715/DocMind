import api from "./axios";

export const uploadDocument = async (file) => {
  const formData = new FormData();

  formData.append("doc", file);

  return api.post(
    "/documents/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const getDocuments = () =>
  api.get("/documents/");

export const deleteDocument = (id) =>
  api.delete(`/documents/${id}`);