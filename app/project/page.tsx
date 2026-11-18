import type { Metadata } from "next";
import { Clip, Star } from "@/components/Doodles";
import { ProjectItem } from "@/components/ProjectItem";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: { absolute: "Projects | 清水康聖" },
};

export default function ProjectsPage() {
  return (
    <div className="pb-12">
      <nav className="flex items-center justify-between px-4 py-6 sm:px-12">
        <span className="cd-label cd-label--paper px-4 py-1 text-[22px] sm:text-[26px]">Kousei Shimizu</span>
      </nav>

      <header className="relative mx-4 mt-6 mb-16 max-w-[820px] sm:mx-auto sm:mt-8 sm:px-8">
        <span className="absolute -top-2 left-0 hidden sm:block sm:-left-16 sm:top-5">
          <Star size={64} />
        </span>
        <span className="absolute top-28 right-0 hidden sm:block sm:-right-10">
          <Star size={44} />
        </span>
        <span className="absolute -top-10 right-6 hidden sm:block">
          <Clip />
        </span>
        <div className="cd-lift relative">
          <span className="cd-tape -top-3.5 -left-4 sm:-left-8" />
          <span className="cd-tape cd-tape--right -top-3.5 -right-4 sm:-right-8" />
          <div className="cd-paper px-6 pt-12 pb-10 text-center sm:px-12 sm:pt-14 sm:pb-12">
            <h1 className="m-0 font-display text-[56px] leading-[0.95] font-normal tracking-[0.02em] sm:text-[96px]">
              Selected Projects
            </h1>
            <p className="mx-auto mt-4 mb-0 max-w-[46ch] text-ink-600">
              作ったものと、作りながら考えたこと。なぜ作ったのか、何を基準に選んだのか、何が分かったのかを書いています。
            </p>
          </div>
        </div>
        <span className="cd-label absolute -bottom-4 left-8 z-[3] sm:left-14">Portfolio</span>
        <span className="cd-label cd-label--orange absolute right-10 -bottom-4 z-[3] rotate-3 sm:right-16">2026</span>
      </header>

      <section className="mx-auto grid max-w-[1104px] gap-x-8 gap-y-16 px-4 sm:px-8 md:grid-cols-2 md:gap-y-12">
        {projects.map((p, i) => (
          <div key={p.slug} className={i % 2 === 1 ? "md:mt-12" : undefined}>
            <ProjectItem project={p} index={i} />
          </div>
        ))}
      </section>

      <footer className="mt-20 text-center font-display text-xl">© 2026 Kousei Shimizu</footer>
    </div>
  );
}
