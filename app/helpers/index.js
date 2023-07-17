const method = "POST";
const headers = {
  "Content-Type": "application/json",
};

export async function postData(url, body) {
  const response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(body),
  });

  return response;
}
