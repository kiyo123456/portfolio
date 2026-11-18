import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
};

export function LinkButton({ href, children, primary }: Props) {
  const external = href.startsWith("http");
  const className = `inline-flex items-center gap-1 rounded-full border px-4 py-1.5 text-sm transition-colors ${
    primary
      ? "border-accent bg-accent text-ink hover:bg-transparent hover:text-accent"
      : "border-line text-text hover:border-accent hover:text-accent"
  }`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
        <span aria-hidden>↗</span>
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
      <span aria-hidden>→</span>
    </Link>
  );
}
