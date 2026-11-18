import type { Metadata } from "next";
import { ProjectItem } from "@/components/ProjectItem";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: { absolute: "Projects | 清水康聖" },
};

export default function ProjectsPage() {
  return (
    <main>
      <header className="pb-10">
        <p className="text-sm text-accent">清水康聖 / Kousei Shimizu</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Selected Projects</h1>
        <p className="mt-4 text-sm leading-7 text-muted">
          作ったものと、作りながら考えたこと。なぜ作ったのか、何を基準に選んだのか、何が分かったのかを書いています。
        </p>
      </header>
      {projects.map((p) => (
        <ProjectItem key={p.slug} project={p} />
      ))}
      <footer className="border-t border-line pt-8 text-xs text-muted">© 2026 Kousei Shimizu</footer>
    </main>
  );
}
