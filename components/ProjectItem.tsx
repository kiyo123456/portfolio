import type { Project } from "@/data/projects";
import { LinkButton } from "./LinkButton";
import { TechTag } from "./TechTag";

export function ProjectItem({ project }: { project: Project }) {
  return (
    <article className="border-t border-line py-10">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="font-display text-2xl text-text sm:text-3xl">{project.title}</h2>
        {project.badge && (
          <span className="rounded-full bg-violet px-2 py-0.5 text-xs text-text">
            {project.badge}
          </span>
        )}
        {project.period && <span className="text-xs text-muted">{project.period}</span>}
      </div>
      <p className="mt-2 text-text/90">{project.tagline}</p>

      <ul className="mt-4 flex flex-wrap gap-2" aria-label="使った技術">
        {project.tech.map((t) => (
          <TechTag key={t} name={t} />
        ))}
      </ul>

      <div className="mt-5 space-y-3 text-sm leading-7 text-muted">
        {project.summary.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.detail && (
          <LinkButton href={`/project/${project.slug}`} primary>
            詳しく見る
          </LinkButton>
        )}
        {project.links.map((l) => (
          <LinkButton key={l.href} href={l.href}>
            {l.label}
          </LinkButton>
        ))}
      </div>
    </article>
  );
}
