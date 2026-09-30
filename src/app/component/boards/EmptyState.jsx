import { ClipboardList } from "lucide-react";

export default function EmptyState({ title }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white/60 px-4 text-center">

      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
        <ClipboardList size={21} />
      </div>

      <p className="text-sm font-medium text-gray-600">
        No tasks {title === "To Do" ? "yet" : "here"}
      </p>

      <p className="mt-1 text-xs text-gray-400">
        Tasks will appear here when available.
      </p>
    </div>
  );
}