
const HF_API = "https://huggingface.co/api/datasets";

export async function searchDatasets(query) {
  if (!query.trim()) return [];

  const params = new URLSearchParams({
    search: query.trim(),
    limit: "12",
    sort: "downloads",
    direction: "-1"
  });

  const response = await fetch(`${HF_API}?${params}`);

  if (!response.ok) {
    throw new Error("Unable to fetch datasets. Please try again.");
  }

  const data = await response.json();

  return data.map((dataset) => ({
    id: dataset.id,
    title: dataset.id,
    author: dataset.author || "Unknown",
    downloads: dataset.downloads ?? 0,
    likes: dataset.likes ?? 0,
    tags: dataset.tags || [],
    url: `https://huggingface.co/datasets/${dataset.id}`
  }));
}
