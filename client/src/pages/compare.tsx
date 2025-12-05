import { Layout } from "@/components/layout";
import { useCompare } from "@/lib/compare-context";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { X, Check, ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "wouter";

export default function Compare() {
  const { selectedUniversities, removeFromCompare } = useCompare();
  const { t } = useI18n();

  if (selectedUniversities.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center max-w-lg mx-auto">
          <div className="bg-slate-50 rounded-2xl p-12 border border-dashed border-slate-200">
            <h1 className="text-2xl font-bold font-heading mb-4">{t('compare.none_selected')}</h1>
            <p className="text-muted-foreground mb-8">
              {t('compare.add_to_compare')}
            </p>
            <Link href="/universities">
              <Button size="lg" className="w-full sm:w-auto">
                {t('compare.browse_unis')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold font-heading mb-8">{t('compare.title')}</h1>
        
        <div className="overflow-x-auto rounded-xl border shadow-sm">
          <Table className="min-w-[800px]">
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-[200px] bg-slate-50 sticky left-0 z-10 font-bold text-foreground">{t('compare.feature')}</TableHead>
                {selectedUniversities.map((uni) => (
                  <TableHead key={uni.id} className="min-w-[250px] relative group">
                    <div className="flex justify-between items-start pt-2">
                       <span className="font-bold text-foreground text-lg">{uni.name}</span>
                       <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 opacity-50 hover:opacity-100 text-destructive"
                        onClick={() => removeFromCompare(uni.id)}
                       >
                         <X className="h-4 w-4" />
                       </Button>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium bg-slate-50/50 sticky left-0 z-10">City</TableCell>
                {selectedUniversities.map((uni) => (
                  <TableCell key={uni.id}>{uni.city}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-slate-50/50 sticky left-0 z-10">Ranking (KZ)</TableCell>
                {selectedUniversities.map((uni) => (
                  <TableCell key={uni.id}>#{uni.ranking_kz}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-slate-50/50 sticky left-0 z-10">Tuition Range</TableCell>
                {selectedUniversities.map((uni) => (
                  <TableCell key={uni.id} className="font-medium text-primary">{uni.tuition_range}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-slate-50/50 sticky left-0 z-10">Min IELTS</TableCell>
                {selectedUniversities.map((uni) => (
                  <TableCell key={uni.id}>{uni.comparison?.ielts_required || "N/A"}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-slate-50/50 sticky left-0 z-10">Program Count</TableCell>
                {selectedUniversities.map((uni) => (
                  <TableCell key={uni.id}>{uni.comparison?.program_count || uni.programs?.length || "N/A"}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-slate-50/50 sticky left-0 z-10">Key Strengths</TableCell>
                {selectedUniversities.map((uni) => (
                  <TableCell key={uni.id}>
                    <div className="flex flex-wrap gap-1">
                      {uni.comparison?.strengths?.map(s => (
                        <span key={s} className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-700 border border-slate-200">{s}</span>
                      ))}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-slate-50/50 sticky left-0 z-10"></TableCell>
                {selectedUniversities.map((uni) => (
                  <TableCell key={uni.id}>
                     <Link href={`/university/${uni.id}`}>
                       <Button className="w-full" variant="outline">View Full Details</Button>
                     </Link>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
