import type { HostingOption } from "@/data/projects";

export function HostingTable({ rows }: { rows: HostingOption[] }) {
  return (
    <ul className="mt-5 divide-y divide-line border-y border-line">
      {rows.map((r) => (
        <li key={r.name} className="grid gap-1 py-3 sm:grid-cols-[11rem_4rem_1fr] sm:gap-4">
          <p className="text-text">{r.name}</p>
          <p className={`text-sm ${r.decision === "採用" ? "text-accent" : "text-muted"}`}>{r.decision}</p>
          <p className="text-sm leading-6 text-muted">{r.reason}</p>
        </li>
      ))}
    </ul>
  );
}
