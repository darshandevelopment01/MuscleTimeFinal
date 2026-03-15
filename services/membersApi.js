import API from "./api";

export const getMembers = async () => {
  const response = await API.get("/members");
  return response.data;
};

export const getMemberDetails = async (id) => {
  const response = await API.get(`/members/${id}`);
  return response.data;
};

export const createMember = async (data) => {
  const response = await API.post("/members", data);
  return response.data;
};

export const updateMember = async (id, data) => {
  const response = await API.put(`/members/${id}`, data);
  return response.data;
};