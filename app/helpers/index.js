const method = "POST";
const headers = {
  "Content-Type": "application/json",
};

export async function postData(url, body) {
  console.log("postData: ", url);
  const response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(body),
  });
  console.log("response: ", response);

  return response;
}
