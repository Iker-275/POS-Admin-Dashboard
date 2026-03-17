const BASE_URL =
  "https://global-water-company-management-apis.onrender.com/water";

 const getZones = async (page = 1, limit = 10) => {
  const res = await fetch(`${BASE_URL}/zone?page=${page}&limit=${limit}`);
  return res.json();
};

 const getZone = async (id: string) => {
  const res = await fetch(`${BASE_URL}/zone/${id}`);
  return res.json();
};

 const createZone = async (data: { code: string; name: string }) => {
  const res = await fetch(`${BASE_URL}/zone`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

 const updateZone = async (
  id: string,
  data: { code: string; name: string }
) => {
  const res = await fetch(`${BASE_URL}/zone/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

 const deleteZone = async (id: string) => {
  const res = await fetch(`${BASE_URL}/zone/${id}`, {
    method: "DELETE",
  });

  return res.json();
};

export {deleteZone,getZone,getZones,updateZone,createZone};