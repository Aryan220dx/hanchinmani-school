import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  return (
    <section className="bg-surface pb-24 pt-36">
      <div className="container-padded max-w-xl rounded-2xl bg-white p-8 text-center shadow-glass md:p-12">
        <h1 className="font-display text-5xl font-semibold">Login</h1>
        <p className="mt-5 leading-7 text-text-muted">The legacy login entry point is preserved. Connect this page to the official school portal when credentials are available.</p>
        <Button href="/" className="mt-8">Back to Home</Button>
      </div>
    </section>
  );
}
