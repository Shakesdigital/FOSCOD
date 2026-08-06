import { Button } from "@/components/ui/Button";

export function FeeSelector() {
  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
      <h2 className="text-2xl">Request a current program quote</h2>
      <p className="mt-3 leading-relaxed text-[var(--ink-soft)]">Program costs depend on pathway, duration, group size, accommodation, supervision, and field logistics. FOSCOD confirms the full breakdown in writing before an applicant makes a payment.</p>
      <div className="mt-6 flex flex-wrap gap-3"><Button href="/apply">Request a quote</Button><Button href="/contact" variant="secondary">Ask a question</Button></div>
    </div>
  );
}
