
import { Bell, Menu, Search } from "lucide-react";

export default function Header({
  setOpen,
  search,
  setSearch,
  onSearch
}) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:px-8">

      <button
        className="text-slate-600 md:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu size={24} />
      </button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
        className="relative max-w-xl flex-1"
      >
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={19}
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search research papers..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </form>

      <div className="flex items-center gap-3">
        <button className="rounded-full p-2 text-slate-500 hover:bg-slate-100">
          <Bell size={21} />
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
          R
        </div>
      </div>
    </header>
  );
}
