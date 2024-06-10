export const MARVEL_PUBLIC_KEY = "3a1b49c04680bf0717ab0c222f363ffc";
export const DEFAULT_PAGE_LIMIT = 20;

async function get<T>(url = ""): Promise<T> {
  const response = await fetch(`${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

export const api = {
  get,
};
