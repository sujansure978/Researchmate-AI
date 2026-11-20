
const API_URL = "https://api.openalex.org/works";

function reconstructAbstract(invertedIndex) {
  if (!invertedIndex) return "";

  const words = [];

  Object.entries(invertedIndex).forEach(([word, positions]) => {
    positions.forEach((position) => {
      words[position] = word;
    });
  });

  return words.filter(Boolean).join(" ");
}

export async function searchResearchPapers(query) {
  if (!query.trim()) return [];

  const params = new URLSearchParams({
    search: query.trim(),
    per_page: "12",
    sort: "relevance_score:desc",
    select: [
      "id",
      "title",
      "publication_year",
      "authorships",
      "doi",
      "abstract_inverted_index",
      "primary_location",
      "open_access",
      "cited_by_count"
    ].join(",")
  });

  const response = await fetch(`${API_URL}?${params}`);

  if (!response.ok) {
    throw new Error(
      `OpenAlex request failed: ${response.status}`
    );
  }

  const data = await response.json();

  return data.results.map((paper) => {
    const authors = (paper.authorships || [])
      .slice(0, 3)
      .map((author) => author.author?.display_name)
      .filter(Boolean)
      .join(", ");

    const abstract = reconstructAbstract(
      paper.abstract_inverted_index
    );

    const doiUrl = paper.doi
      ? (paper.doi.startsWith("http")
          ? paper.doi
          : `https://doi.org/${paper.doi}`)
      : null;

    const landingUrl =
      paper.primary_location?.landing_page_url;

    return {
      id: paper.id,
      title: paper.title || "Untitled research paper",
      type: "Paper",
      category: "Research",
      author: authors || "Author information unavailable",
      year: paper.publication_year || "Year unavailable",
      description:
        abstract.slice(0, 350) ||
        "Abstract not available in the OpenAlex record.",
      url: doiUrl || landingUrl || paper.id,
      citations: paper.cited_by_count ?? 0,
      isOpenAccess: paper.open_access?.is_oa ?? false,
      source: "OpenAlex"
    };
  });
}
