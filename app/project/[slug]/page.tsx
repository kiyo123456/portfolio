import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HostingTable } from "@/components/HostingTable";
import { LinkButton } from "@/components/LinkButton";
import { SecurityTable } from "@/components/SecurityTable";
import { TechTag } from "@/components/TechTag";
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
    <main>
      <Link href="/project" className="text-sm text-muted hover:text-accent">
        ← Projects
      </Link>

      <header className="mt-8 border-b border-line pb-10">
        <h1 className="font-display text-4xl sm:text-5xl">{project.title}</h1>
        <p className="mt-3 text-text/90">{project.tagline}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="使った技術">
          {project.tech.map((t) => (
            <TechTag key={t} name={t} />
          ))}
        </ul>
        <p className="mt-6 text-sm leading-7 text-muted">{detail.lead}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.map((l) => (
            <LinkButton key={l.href} href={l.href}>
              {l.label}
            </LinkButton>
          ))}
        </div>
      </header>

      {detail.sections.map((s) => (
        <section key={s.heading} className="border-b border-line py-10">
          <h2 className="font-display text-xl text-accent sm:text-2xl">{s.heading}</h2>
          {s.body?.map((b, i) => (
            <p key={i} className="mt-4 text-sm leading-7 text-text/85">
              {b}
            </p>
          ))}
          {s.points && (
            <ol className="mt-5 space-y-4">
              {s.points.map((pt) => (
                <li key={pt.title} className="border-l-2 border-line pl-4">
                  <p className="font-semibold text-text">{pt.title}</p>
                  <p className="mt-1 text-sm leading-7 text-muted">{pt.text}</p>
                </li>
              ))}
            </ol>
          )}
          {s.table === "security" && detail.security && <SecurityTable rows={detail.security} />}
          {s.table === "hosting" && detail.hosting && <HostingTable rows={detail.hosting} />}
        </section>
      ))}

      <p className="pt-10">
        <Link href="/project" className="text-sm text-muted hover:text-accent">
          ← Projects に戻る
        </Link>
      </p>
    </main>
  );
}
