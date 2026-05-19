import { SectionHeader } from "@/components/ui/SectionHeader";
import { disclosureRows } from "@/lib/data/site";

export default function MandatoryDisclosurePage() {
  return (
    <section className="bg-surface pb-24 pt-36">
      <div className="container-padded">
        <SectionHeader eyebrow="CBSE Compliance" title="Mandatory Public Disclosure" description="Official data is preserved in a clean compliance-first table. Visual styling is modernized without changing the institutional details." />
        <div className="mt-14 overflow-hidden rounded-2xl bg-white shadow-glass">
          <table className="w-full border-collapse text-left">
            <tbody>
              {disclosureRows.map(([label, value]) => (
                <tr className="border-b border-slate-100 last:border-0" key={label}>
                  <th className="w-1/3 bg-slate-50 p-5 text-sm font-semibold uppercase tracking-[0.12em] text-primary">{label}</th>
                  <td className="p-5 text-slate-700">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
