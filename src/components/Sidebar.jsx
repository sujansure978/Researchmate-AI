
import {
  LayoutDashboard,
  BookOpen,
  Database,
  Bookmark,
  FolderOpen,
  Settings,
  GraduationCap,
  X
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Research Papers", icon: BookOpen },
  { name: "Datasets", icon: Database },
  { name: "My Library", icon: Bookmark },
  { name: "Workspace", icon: FolderOpen },
];

export default function Sidebar({ active, setActive, open, setOpen }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white p-5 transition-transform md:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-blue-600 p-2 text-white">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="font-bold text-slate-900">
                ResearchMate
              </h1>
              <p className="text-xs text-slate-500">AI Research Assistant</p>
            </div>
          </div>

          <button
            className="md:hidden"
            onClick={() => setOpen(false)}
          >
            <X />
          </button>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Workspace
        </p>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() => {
                  setActive(item.name);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  active === item.name
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon size={19} />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto space-y-4">
          <button className="flex items-center gap-3 px-4 text-sm text-slate-500">
            <Settings size={18} /> Settings
          </button>

          <div className="rounded-2xl bg-blue-50 p-4">
            <p className="text-sm font-semibold text-blue-900">
              Research smarter!
            </p>
            <p className="mt-1 text-xs text-blue-700">
              Discover papers and resources for your next project.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
