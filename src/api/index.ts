export const MARVEL_PUBLIC_KEY = "3a1b49c04680bf0717ab0c222f363ffc";
export const DEFAULT_PAGE_LIMIT = 20;

async function post(url = "", data = {}) {
  const response = await fetch(`${url}`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });

  return response.json();
}

async function get<T>(url = ""): Promise<T> {
  const response = await fetch(`${url}`, {
    method: "GET",
    // mode: "cors",
    // cache: "no-cache",
    // credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // referrerPolicy: "no-referrer",
  });

  return response.json();
}

export const api = {
  post,
  get,
};
