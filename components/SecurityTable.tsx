import type { SecurityCheck } from "@/data/projects";

// 点検表。対応済みは紙ラベル、未対応は赤いスタンプ（Craft Desk の状態表示）
export function SecurityTable({ rows }: { rows: SecurityCheck[] }) {
  return (
    <ul className="divide-y-2 divide-dashed divide-ink-900/25 border-y-2 border-ink-900">
      {rows.map((r) => (
        <li key={r.attack} className="grid gap-2 py-4 sm:grid-cols-[9.5rem_1fr_auto] sm:gap-4">
          <p className="m-0 font-bold">{r.attack}</p>
          <div>
            <p className="m-0 text-[15px] leading-6">{r.defense}</p>
            <p className="m-0 mt-1 text-sm text-ink-600">守っているもの：{r.owner}</p>
          </div>
          <p className="m-0 sm:text-right">
            {r.status === "done" ? (
              <span className="cd-label cd-label--paper text-[15px]">対応済み</span>
            ) : (
              <span className="cd-stamp text-[15px]">未対応</span>
            )}
          </p>
        </li>
      ))}
    </ul>
  );
}
