import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "paper" | "sticky";
  arrow?: boolean;
};

// Craft Desk の Button（ステッカー風）。1枚の紙に primary は1つまで
export function LinkButton({ href, children, variant = "paper", arrow = true }: Props) {
  const className = `cd-btn${variant === "primary" ? "" : ` cd-btn--${variant}`}`;

  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children} <span aria-hidden>↗</span>
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
      {arrow && <span aria-hidden>→</span>}
    </Link>
  );
}
