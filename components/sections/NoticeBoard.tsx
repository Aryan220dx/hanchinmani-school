import { notices } from "@/lib/data/site";
import { Badge } from "@/components/ui/Badge";

export function NoticeBoard() {
  const doubled = [...notices, ...notices];

  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="container-padded grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <Badge>Latest News</Badge>
          <h2 className="mt-5 font-display text-4xl font-semibold md:text-5xl">Institutional Bulletin</h2>
          <p className="mt-5 text-lg leading-8 text-text-muted">A modern notice board that keeps admissions, compliance and campus updates visible without the clutter of the old Bootstrap sidebar.</p>
        </div>
        <div className="glass h-[330px] overflow-hidden rounded-2xl p-4 shadow-glass">
          <div className="space-y-4 hover:[animation-play-state:paused]" style={{ animation: "ticker 18s linear infinite" }}>
            {doubled.map((notice, index) => (
              <article className="rounded-2xl bg-white p-5" key={`${notice.title}-${index}`}>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-amber/10 px-3 py-1 text-xs font-bold text-amber">{notice.date}</span>
                  <h3 className="font-semibold text-primary">{notice.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-text-muted">{notice.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
