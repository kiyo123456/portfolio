import type { SecurityCheck } from "@/data/projects";

export function SecurityTable({ rows }: { rows: SecurityCheck[] }) {
  return (
    <ul className="mt-5 divide-y divide-line border-y border-line">
      {rows.map((r) => (
        <li key={r.attack} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr_auto] sm:gap-4">
          <p className="font-semibold text-text">{r.attack}</p>
          <div>
            <p className="text-sm leading-6 text-muted">{r.defense}</p>
            <p className="mt-1 text-xs text-muted/80">守っているもの：{r.owner}</p>
          </div>
          <p className="sm:text-right">
            <span
              className={`inline-block whitespace-nowrap rounded-full border px-2 py-0.5 text-xs ${
                r.status === "done" ? "border-violet text-ok" : "border-warn bg-warn font-semibold text-ink"
              }`}
            >
              {r.status === "done" ? "対応済み" : "未対応（これから対応）"}
            </span>
          </p>
        </li>
      ))}
    </ul>
  );
}
