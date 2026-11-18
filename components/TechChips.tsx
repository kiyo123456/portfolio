export function TechChips({ items }: { items: string[] }) {
  return (
    <ul className="cd-chips" aria-label="使った技術">
      {items.map((t) => (
        <li key={t} className="cd-chip">
          {t}
        </li>
      ))}
    </ul>
  );
}
