export function TechTag({ name }: { name: string }) {
  return (
    <li className="rounded-full border border-violet/70 px-2.5 py-0.5 text-xs text-violet-soft">{name}</li>
  );
}
