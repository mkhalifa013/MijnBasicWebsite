// const API_URL = "http://localhost:1337";
export const callApi = async (path, method, body) => {
  let headers = {
    "content-type": "application/json",
  };

  const response = await fetch(`${path}`, {
    method,
    headers,
    credentials: "include",
    body: JSON.stringify(body),
  });
  const data = await response.json();

  return data;
};
