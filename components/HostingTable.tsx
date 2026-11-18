import type { HostingOption } from "@/data/projects";

export function HostingTable({ rows }: { rows: HostingOption[] }) {
  return (
    <ul className="divide-y-2 divide-dashed divide-ink-900/25 border-y-2 border-ink-900">
      {rows.map((r) => (
        <li key={r.name} className="grid gap-1 py-3 sm:grid-cols-[11rem_5rem_1fr] sm:items-center sm:gap-4">
          <p className="m-0 font-bold">{r.name}</p>
          <p className="m-0">
            {r.decision === "採用" ? (
              <span className="cd-label text-[15px]">採用</span>
            ) : (
              <span className="text-sm text-ink-600">見送り</span>
            )}
          </p>
          <p className="m-0 text-[15px] leading-6">{r.reason}</p>
        </li>
      ))}
    </ul>
  );
}
