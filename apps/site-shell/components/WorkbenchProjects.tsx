/**
 * "From the Workbench" section — lighter display for side-quest projects
 * These are tools and experiments that emerged from building the Gang of Four.
 */

import Link from 'next/link';
import { Wrench } from 'lucide-react';
import { getProjectsByTier, toCardModel } from '@/lib/projects/loader';

export function WorkbenchProjects() {
  const sideQuests = getProjectsByTier('side-quest');

  if (sideQuests.length === 0) return null;

  return (
    <section
      id="workbench"
      className="rounded-2xl border border-shell-border bg-g2k-bg-raised/30 px-6 py-6 md:px-8 md:py-8"
      style={{ boxShadow: 'var(--g2k-shadow-sm)' }}
      aria-labelledby="workbench-heading"
    >
      {/* Section header */}
      <div className="mb-6 flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-md flex items-center justify-center"
          style={{
            background: 'hsl(var(--g2k-brass) / 0.1)',
            border: '1px solid hsl(var(--g2k-brass) / 0.2)',
          }}
        >
          <Wrench
            className="w-4 h-4"
            style={{ color: 'hsl(var(--g2k-brass))' }}
          />
        </div>
        <div>
          <h2
            id="workbench-heading"
            className="font-brand text-xl md:text-2xl"
            style={{ color: 'hsl(var(--g2k-fg-primary))' }}
          >
            From the Workbench
          </h2>
          <p className="text-xs text-g2k-fg-muted">
            Tools and experiments that emerged from building the Gang of Four.
          </p>
        </div>
      </div>

      {/* Side quest grid — compact cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sideQuests.map((project, index) => {
          const card = toCardModel(project, 4);
          return (
            <Link
              key={project.slug}
              href={card.href}
              className="group relative block rounded-xl border border-shell-border bg-g2k-bg-raised p-4 transition-all duration-200 hover:-translate-y-0.5 overflow-hidden animate-fadeInUp"
              style={{
                boxShadow: 'var(--g2k-shadow-sm)',
                animationDelay: `${0.05 + index * 0.07}s`,
              }}
            >
              {/* Brass border highlight on hover — same technique as FeaturedProjects glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                  boxShadow: 'inset 0 0 0 1px hsl(var(--g2k-brass) / 0.4)',
                }}
                aria-hidden="true"
              />

              <div className="flex items-start justify-between mb-2">
                <h3
                  className="font-brand text-lg leading-tight group-hover:text-g2k-brass transition-colors duration-200"
                  style={{ color: 'hsl(var(--g2k-fg-primary))' }}
                >
                  {project.name}
                </h3>
                <span
                  className="shrink-0 ml-2 text-sm group-hover:translate-x-0.5 transition-all duration-200"
                  style={{ color: 'hsl(var(--g2k-fg-muted) / 0.3)' }}
                  aria-hidden="true"
                >
                  →
                </span>
              </div>

              <p className="text-xs text-g2k-fg-secondary leading-relaxed mb-3 line-clamp-2">
                {project.summary}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 rounded text-xs font-medium"
                    style={{
                      background: 'hsl(var(--g2k-brass) / 0.08)',
                      color: 'hsl(var(--g2k-brass))',
                      border: '1px solid hsl(var(--g2k-brass) / 0.15)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer closer — mirrors FeaturedProjects pattern */}
      <div className="mt-6 text-right">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs text-g2k-fg-muted hover:text-g2k-brass transition-colors duration-200"
        >
          <span>All projects</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
