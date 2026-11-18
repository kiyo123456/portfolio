import type { Project } from "@/data/projects";
import { LinkButton } from "./LinkButton";
import { TechChips } from "./TechChips";

type Props = { project: Project; index: number };

// Craft Desk の ProjectCard：テープで留めた破れ紙1枚に1プロジェクト
export function ProjectItem({ project, index }: Props) {
  const tilt = index % 2 === 0 ? "-0.8deg" : "0.9deg";
  const num = String(index + 1).padStart(2, "0");
  // 主ボタンは1つだけ：詳細ページがあればそれ、なければ最初のリンク
  const primaryHref = project.detail ? `/project/${project.slug}` : project.links[0]?.href;

  return (
    <article className="cd-project cd-lift" style={{ transform: `rotate(${tilt})` }}>
      <span className="cd-tape" />
      {index % 2 === 0 && <span className="cd-tape cd-tape--right" />}
      <div className="cd-paper">
        <div className="cd-project__head">
          <span className="cd-num">{num}</span>
          <h2 className="cd-project__title">{project.title}</h2>
          {project.badge && <span className="cd-label cd-label--paper">{project.badge}</span>}
        </div>
        <TechChips items={project.tech} />
        <p className="cd-project__body font-bold">{project.tagline}</p>
        {project.summary.map((p, i) => (
          <p key={i} className="cd-project__body">
            {p}
          </p>
        ))}
        {(project.context || project.period) && (
          <p className="cd-project__note">
            {[project.context, project.period].filter(Boolean).join(" · ")}
          </p>
        )}
        <div className="cd-project__actions">
          {project.detail && (
            <LinkButton href={`/project/${project.slug}`} variant="primary">
              View Details
            </LinkButton>
          )}
          {project.links.map((l) => (
            <LinkButton key={l.href} href={l.href} variant={l.href === primaryHref ? "primary" : "paper"}>
              {l.label}
            </LinkButton>
          ))}
        </div>
      </div>
      {project.note && (
        <div
          className="cd-sticky relative z-[3] -mt-3 mr-2 ml-auto block w-40 px-3.5 pt-3 pb-4 text-[15px] leading-[22px] whitespace-pre-line md:absolute md:-right-4 md:-bottom-8 md:mt-0 md:mr-0"
          style={{ transform: `rotate(${index % 2 === 0 ? 3 : -3}deg)` }}
        >
          {project.note}
        </div>
      )}
    </article>
  );
}
