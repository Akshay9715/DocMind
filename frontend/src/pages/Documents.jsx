import { useEffect, useState } from "react";

import { Upload, Trash2, FileText } from "lucide-react";

import { uploadDocument, getDocuments, deleteDocument } from "../api/documents";

export default function Documents() {
  const [documents, setDocuments] = useState([]);

  const [loading, setLoading] = useState(false);

  const loadDocuments = async () => {
    try {
      const res = await getDocuments();

      console.log("Documents:", res.data);

      setDocuments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setLoading(true);

      await uploadDocument(file);

      await loadDocuments();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDocument(id);

      await loadDocuments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Documents</h1>

          <label className="cursor-pointer bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2">
            <Upload size={18} />
            Upload Document
            <input type="file" hidden onChange={handleUpload} />
          </label>
        </div>

        {loading && <p>Uploading...</p>}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl p-5 shadow-sm border"
            >
              <div className="flex justify-between">
                <FileText className="text-blue-700" />

                <button onClick={() => handleDelete(doc.id)}>
                  <Trash2 className="text-red-500" />
                </button>
              </div>

              <h3 className="mt-4 font-semibold">
                {doc.name || doc.filename || "Document"}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
