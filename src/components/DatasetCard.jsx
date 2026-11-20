
import { Database, Bookmark, ExternalLink, Heart, Download } from "lucide-react";

export default function DatasetCard({ item, saved, onSave }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-lg transition">
      <div className="flex justify-between">
        <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
          <Database size={23} />
        </div>

        <button
          onClick={() => onSave(item)}
          className={saved ? "text-blue-600" : "text-slate-400"}
          aria-label="Save dataset"
        >
          <Bookmark size={21} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>

      <h3 className="mt-4 break-words font-bold text-slate-900">
        {item.title}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        Author: {item.author}
      </p>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <Download size={14} />
          {Number(item.downloads).toLocaleString()}
        </span>

        <span className="flex items-center gap-1">
          <Heart size={14} />
          {Number(item.likes).toLocaleString()}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {item.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
      >
        View Dataset <ExternalLink size={16} />
      </a>
    </article>
  );
}
