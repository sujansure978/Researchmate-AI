
import { useEffect, useMemo, useState } from "react";

import {
  Search,
  BookOpen,
  Bookmark,
  Sparkles,
  Database,
  FileSearch,
  GraduationCap,
  LoaderCircle,
  AlertCircle
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ResourceCard from "./components/ResourceCard";
import DatasetCard from "./components/DatasetCard";

import { searchResearchPapers } from "./services/openAlex";
import { searchDatasets } from "./services/datasetService";
import useSavedResources from "./hooks/useSavedResources";

export default function App() {
  const [active, setActive] = useState("Dashboard");
  const [search, setSearch] = useState("Artificial Intelligence");

  const [papers, setPapers] = useState([]);
  const [datasets, setDatasets] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const { saved, toggleSave } = useSavedResources();

  // Search research papers
  async function handleSearch(topic = search) {
    if (!topic.trim()) {
      setError("Please enter a research topic.");
      return;
    }

    setLoading(true);
    setError("");
    setActive("Research Papers");

    try {
      const results = await searchResearchPapers(topic);
      setPapers(results);
    } catch (err) {
      console.error(err);
      setError("Unable to retrieve research papers.");
    } finally {
      setLoading(false);
    }
  }

  // Search datasets
  async function handleDatasetSearch(topic = search) {
    if (!topic.trim()) {
      setError("Please enter a dataset topic.");
      return;
    }

    setLoading(true);
    setError("");
    setActive("Datasets");

    try {
      const results = await searchDatasets(topic);
      setDatasets(results);
    } catch (err) {
      console.error(err);
      setError("Unable to retrieve datasets.");
    } finally {
      setLoading(false);
    }
  }

  // Initial paper search
  useEffect(() => {
    handleSearch("Artificial Intelligence");
  }, []);

  // Load saved items according to their type
  const savedPapers = useMemo(
    () => saved.filter(item => item.type !== "Dataset"),
    [saved]
  );

  const savedDatasets = useMemo(
    () => saved.filter(item => item.type === "Dataset"),
    [saved]
  );

  const filteredPapers = papers.filter(paper =>
    active === "My Library"
      ? savedPapers.some(item => item.id === paper.id)
      : true
  );

  const filteredDatasets = datasets.filter(dataset =>
    active === "My Library"
      ? savedDatasets.some(item => item.id === dataset.id)
      : true
  );

  // Search based on selected page
  function handleGlobalSearch(topic = search) {
    if (active === "Datasets") {
      handleDatasetSearch(topic);
    } else {
      handleSearch(topic);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <Sidebar
        active={active}
        setActive={setActive}
        open={open}
        setOpen={setOpen}
      />

      <div className="min-h-screen md:ml-64">

        <Header
          setOpen={setOpen}
          search={search}
          setSearch={setSearch}
          onSearch={() => handleGlobalSearch()}
        />

        <main className="mx-auto max-w-7xl p-4 md:p-8">

          {/* HERO SECTION */}

          <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-600 p-7 text-white md:p-10">

            <div className="relative z-10 max-w-2xl">

              <div className="mb-4 flex items-center gap-2 text-sm text-blue-100">
                <Sparkles size={17} />
                Your academic research companion
              </div>

              <h1 className="text-3xl font-bold leading-tight md:text-4xl">
                Discover knowledge.
                <br />
                Research smarter.
              </h1>

              <p className="mt-4 text-sm leading-6 text-blue-100">
                Discover research papers, datasets and resources
                for your next academic project.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleGlobalSearch();
                }}
                className="mt-7 flex max-w-lg items-center gap-2 rounded-xl bg-white p-2"
              >
                <Search className="ml-2 shrink-0 text-slate-400" size={20} />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Enter a research topic..."
                  className="min-w-0 flex-1 px-2 py-2 text-sm text-slate-800 outline-none"
                />

                <button
                  disabled={loading}
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
                >
                  Search
                </button>
              </form>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => handleSearch()}
                  className="rounded-lg bg-white/15 px-3 py-2 text-sm hover:bg-white/25"
                >
                  Research Papers
                </button>

                <button
                  onClick={() => handleDatasetSearch()}
                  className="rounded-lg bg-white/15 px-3 py-2 text-sm hover:bg-white/25"
                >
                  Datasets
                </button>
              </div>

            </div>

            <GraduationCap
              className="absolute -bottom-8 -right-5 text-white/10"
              size={230}
            />

          </section>

          {/* STATISTICS */}

          <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

            {[
              {
                title: "Research Papers",
                value: papers.length,
                icon: BookOpen,
                color: "text-blue-600 bg-blue-50"
              },
              {
                title: "Datasets",
                value: datasets.length,
                icon: Database,
                color: "text-purple-600 bg-purple-50"
              },
              {
                title: "Saved Resources",
                value: saved.length,
                icon: Bookmark,
                color: "text-green-600 bg-green-50"
              }
            ].map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <div className={`mb-4 inline-flex rounded-xl p-3 ${stat.color}`}>
                    <Icon size={21} />
                  </div>

                  <p className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {stat.title}
                  </p>
                </div>
              );
            })}

          </section>

          {/* PAGE HEADING */}

          <section>

            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {active === "My Library"
                    ? "My Saved Resources"
                    : active === "Datasets"
                      ? "Dataset Discovery"
                      : active === "Research Papers"
                        ? "Research Paper Discovery"
                        : "Explore Research Resources"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {active === "Datasets"
                    ? "Discover datasets from Hugging Face."
                    : "Find resources relevant to your research topic."}
                </p>
              </div>

              <span className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700">
                {active === "Datasets"
                  ? datasets.length + " datasets"
                  : active === "My Library"
                    ? saved.length + " saved"
                    : papers.length + " papers"}
              </span>

            </div>

            {/* LOADING */}

            {loading && (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-12">

                <LoaderCircle
                  className="mb-4 animate-spin text-blue-600"
                  size={38}
                />

                <p className="font-medium text-slate-700">
                  Searching resources...
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  Please wait.
                </p>

              </div>
            )}

            {/* ERROR */}

            {!loading && error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">

                <AlertCircle className="mx-auto mb-3 text-red-500" size={30} />

                <p className="text-sm text-red-700">{error}</p>

                <button
                  onClick={() => handleGlobalSearch()}
                  className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm text-white"
                >
                  Try again
                </button>

              </div>
            )}

            {/* DATASET RESULTS */}

            {!loading && !error && active === "Datasets" && (

              datasets.length > 0 ? (

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                  {datasets.map((dataset) => (
                    <DatasetCard
                      key={dataset.id}
                      item={{ ...dataset, type: "Dataset" }}
                      saved={saved.some(item => item.id === dataset.id)}
                      onSave={() => toggleSave({
                        ...dataset,
                        type: "Dataset"
                      })}
                    />
                  ))}

                </div>

              ) : (

                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

                  <Database className="mx-auto mb-3 text-blue-500" size={38} />

                  <h3 className="font-semibold text-slate-800">
                    No datasets found
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Search for a research topic to find datasets.
                  </p>

                </div>

              )

            )}

            {/* SAVED LIBRARY */}

            {!loading && !error && active === "My Library" && (

              saved.length > 0 ? (

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                  {saved.map((item) => (

                    item.type === "Dataset" ? (

                      <DatasetCard
                        key={item.id}
                        item={item}
                        saved={true}
                        onSave={() => toggleSave(item)}
                      />

                    ) : (

                      <ResourceCard
                        key={item.id}
                        item={item}
                        saved={true}
                        onSave={() => toggleSave(item.id)}
                      />

                    )

                  ))}

                </div>

              ) : (

                <div className="rounded-2xl bg-white p-12 text-center">
                  <Bookmark className="mx-auto mb-3 text-slate-400" size={35} />
                  <h3 className="font-semibold">Your library is empty</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Save papers and datasets to access them here.
                  </p>
                </div>

              )

            )}

            {/* RESEARCH PAPERS */}

            {!loading && !error && active !== "Datasets" && active !== "My Library" && (

              filteredPapers.length > 0 ? (

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">

                  {filteredPapers.map((paper) => (

                    <ResourceCard
                      key={paper.id}
                      item={paper}
                      saved={saved.some(item => item.id === paper.id)}
                      onSave={() => toggleSave({
                        ...paper,
                        type: "Paper"
                      })}
                    />

                  ))}

                </div>

              ) : (

                <div className="rounded-2xl bg-white p-12 text-center">
                  <FileSearch className="mx-auto mb-3 text-slate-400" size={38} />
                  <h3 className="font-semibold">No research papers found</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Try searching with another topic.
                  </p>
                </div>

              )

            )}

          </section>

          <footer className="mt-12 border-t border-slate-200 py-6 text-center text-xs text-slate-400">
            © 2026 ResearchMate AI | Powered by OpenAlex and Hugging Face
          </footer>

        </main>
      </div>
    </div>
  );
}
