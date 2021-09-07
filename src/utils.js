// const API_URL = "http://localhost:1337";
export const callApi = async (path, method, body, isUpload) => {
  let headers = {
    "Content-Type": "application/json",
  };

  if (isUpload) {
    headers = {}
  }



  const response = await fetch(`${path}`, {
    method,
    headers,
    credentials: "include",
    //body body werkt niet voor register en login omdat ie body.jsonstrinfy moet zijn
    body: isUpload ? body  : JSON.stringify(body)
  });
  const data = await response.json();

  return data;
};
