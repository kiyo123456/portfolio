import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Star } from "@/components/Doodles";
import { HostingTable } from "@/components/HostingTable";
import { LinkButton } from "@/components/LinkButton";
import { SecurityTable } from "@/components/SecurityTable";
import { TechChips } from "@/components/TechChips";
import { getProject, projects } from "@/data/projects";

// 詳細ページを持つプロジェクトだけを、ビルドのときに作る。それ以外の slug は 404 にする
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.filter((p) => p.detail).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/project/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.tagline };
}

export default async function ProjectDetailPage({ params }: PageProps<"/project/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.detail) notFound();
  const { detail } = project;

  return (
    <div className="mx-auto max-w-[820px] px-4 pb-12 sm:px-8">
      <nav className="py-6">
        <LinkButton href="/project" variant="paper" arrow={false}>
          ← Projects
        </LinkButton>
      </nav>

      {/* 見出しの紙 */}
      <header className="relative mt-6 mb-14">
        <span className="absolute -top-8 -right-2 z-[3] hidden sm:block">
          <Star size={52} />
        </span>
        <div className="cd-lift relative">
          <span className="cd-tape -top-3.5 left-6" />
          <span className="cd-tape cd-tape--right -top-3.5 right-6" />
          <div className="cd-paper grid gap-4 px-6 pt-10 pb-8 sm:px-10">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="m-0 font-display text-[52px] leading-none font-normal sm:text-[72px]">{project.title}</h1>
              {project.badge && <span className="cd-label cd-label--paper">{project.badge}</span>}
            </div>
            <p className="m-0 text-lg font-bold">{project.tagline}</p>
            <TechChips items={project.tech} />
            <p className="m-0 max-w-[60ch] leading-7">{detail.lead}</p>
            <div className="cd-project__actions">
              {project.links.map((l) => (
                <LinkButton key={l.href} href={l.href} variant="primary">
                  {l.label}
                </LinkButton>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* セクションごとに紙を1枚。長い文章は紙の上だけに置く */}
      <div className="grid gap-12">
        {detail.sections.map((s, i) => (
          <section key={s.heading} className="cd-lift relative">
            <span className={`cd-tape -top-3 ${i % 2 === 0 ? "left-8" : "cd-tape--right right-8"}`} />
            <div className="cd-paper grid gap-4 px-6 sm:px-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="cd-num">{String(i + 1).padStart(2, "0")}</span>
                <span className={`cd-label ${i % 2 === 0 ? "" : "cd-label--orange"}`}>{s.label}</span>
                <h2 className="m-0 w-full font-display text-[28px] leading-9 font-normal sm:w-auto">{s.heading}</h2>
              </div>
              {s.body?.map((b, j) => (
                <p key={j} className="m-0 max-w-[60ch] leading-7">
                  {b}
                </p>
              ))}
              {s.points && (
                <ol className="m-0 grid list-none gap-3 p-0">
                  {s.points.map((pt) => (
                    <li key={pt.title} className="rounded-[3px] border-[1.5px] border-ink-900 bg-paper-200 px-4 py-3">
                      <p className="m-0 font-bold">{pt.title}</p>
                      <p className="m-0 mt-1 text-[15px] leading-6 text-ink-600">{pt.text}</p>
                    </li>
                  ))}
                </ol>
              )}
              {s.table === "security" && detail.security && <SecurityTable rows={detail.security} />}
              {s.table === "hosting" && detail.hosting && <HostingTable rows={detail.hosting} />}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-14 text-center">
        <LinkButton href="/project" variant="sticky" arrow={false}>
          ← Back to Projects
        </LinkButton>
      </p>
    </div>
  );
}
