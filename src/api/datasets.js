const API_URL = import.meta.env.VITE_API_URL;

export async function getDatasets() {
  const res = await fetch(`${API_URL}/datasets`);
  if (!res.ok) throw new Error("Failed to load datasets");
  return res.json();
}

export async function getDatasetById(id) {
  const res = await fetch(`${API_URL}/datasets/${id}`);
  if (!res.ok) throw new Error("Dataset not found");
  return res.json();
}

export async function searchDatasets(query, signal) {
  const res = await fetch(`${API_URL}/search/datasets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
    signal,
  });

  if (!res.ok) throw new Error("Search failed");
  return res.json();
}