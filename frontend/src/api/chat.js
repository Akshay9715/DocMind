import api from "./axios";

export const sendMessage = (query) =>
  api.post("/chat/", {
    query,
  });

export const getHistory = (sessionId) =>
  api.get(`/chathistory/${sessionId}`);