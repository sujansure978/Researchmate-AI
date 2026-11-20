
import {
  Bookmark,
  ExternalLink,
  FileText,
  Database
} from "lucide-react";

export default function ResourceCard({ item, saved, onSave }) {
  const Icon =
    item.type === "Dataset" ? Database : FileText;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg">

      <div className="mb-4 flex items-start justify-between">
        <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
          <Icon size={22} />
        </div>

        <button
          onClick={() => onSave(item.id)}
          aria-label="Bookmark resource"
          className={`rounded-lg p-2 ${
            saved
              ? "bg-blue-100 text-blue-700"
              : "text-slate-400 hover:bg-slate-100"
          }`}
        >
          <Bookmark
            size={19}
            fill={saved ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          {item.type}
        </span>

        {item.source && (
          <span className="rounded-full bg-green-50 px-3 py-1 text-xs text-green-700">
            {item.source}
          </span>
        )}

        {item.isOpenAccess && (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
            Open Access
          </span>
        )}
      </div>

      <h3 className="text-base font-bold leading-6 text-slate-900">
        {item.title}
      </h3>

      <p className="mt-2 line-clamp-4 text-sm leading-6 text-slate-500">
        {item.description}
      </p>

      <div className="mt-4 space-y-1">
        <p className="text-xs text-slate-600">
          <strong>Authors:</strong> {item.author}
        </p>

        <p className="text-xs text-slate-500">
          Publication year: {item.year}
        </p>

        {item.citations !== undefined && (
          <p className="text-xs text-slate-500">
            Cited by: {item.citations}
          </p>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-xs text-slate-400">
          {item.source || item.category}
        </span>

        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800"
        >
          View paper <ExternalLink size={15} />
        </a>
      </div>
    </article>
  );
}
