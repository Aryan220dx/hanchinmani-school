export default function VisionMissionPage() {
  return (
    <section className="bg-surface pb-24 pt-36">
      <div className="container-padded grid gap-6 md:grid-cols-2">
        {[
          ["Vision", "To develop Smt. V.P Hanchinmani International School, Dharwad into a centre of excellence rooted in intellectual growth and civic responsibility."],
          ["Mission", "To mould young students into upright citizens through creative teaching, trained faculty, disciplined academics and holistic development."]
        ].map(([title, body]) => (
          <article className="rounded-2xl bg-white p-8 shadow-glass md:p-12" key={title}>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber">{title}</p>
            <h1 className="mt-5 font-display text-4xl font-semibold">{title}</h1>
            <p className="mt-6 text-lg leading-8 text-text-muted">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
