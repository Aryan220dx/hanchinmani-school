import { leaders } from "@/lib/data/site";

export default function BoardMembersPage() {
  return (
    <section className="bg-surface pb-24 pt-36">
      <div className="container-padded">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber">Board of Members</p>
        <h1 className="mt-5 font-display text-5xl font-semibold">Institutional Leadership</h1>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {leaders.map((leader) => (
            <article className="rounded-2xl bg-white p-7 shadow-glass" key={leader.name}>
              <h2 className="font-display text-2xl font-semibold">{leader.name}</h2>
              <p className="mt-2 font-semibold text-primary">{leader.title}</p>
              <p className="mt-4 text-sm leading-6 text-text-muted">{leader.organization}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
