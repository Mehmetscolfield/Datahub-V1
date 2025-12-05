import { Layout } from "@/components/layout";
import { UniversityCard } from "@/components/university-card";
import { FilterSidebar, FiltersState } from "@/components/filter-sidebar";
import { useUniversities } from "@/lib/data";
import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Universities() {
  const allUniversities = useUniversities();
  const [location] = useLocation();
  const queryParams = new URLSearchParams(window.location.search);
  const mode = queryParams.get("mode"); // 'local' or 'international'

  const [filters, setFilters] = useState<FiltersState>({
    search: "",
    regions: [],
    cities: [],
    programs: [],
    languages: [],
    tuitionMax: 5000000,
    minIelts: 0,
    minUnt: 0,
  });

  const [sortBy, setSortBy] = useState("ranking");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Update filters if mode changes
  useMemo(() => {
    if (mode === 'international') {
       setFilters(prev => ({ ...prev, languages: ['English'] }));
    } else {
       // Optional: Reset languages if navigating back to local? 
       // For now, let's leave it flexible.
    }
  }, [mode]);

  const filteredUniversities = useMemo(() => {
    return allUniversities.filter((uni) => {
      // Search
      if (filters.search && !uni.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Region
      if (filters.regions.length > 0) {
        const inRegion = filters.regions.some(r => uni.city.includes(r));
        if (!inRegion) return false;
      }
      
      // City
      if (filters.cities.length > 0) {
        const inCity = filters.cities.some(c => uni.city.includes(c));
        if (!inCity) return false;
      }

      // Programs & Languages
      if (filters.programs.length > 0 || filters.languages.length > 0) {
        const hasMatchingProgram = uni.programs?.some(p => {
          const matchProg = filters.programs.length === 0 || filters.programs.some(filterProg => 
            p.program.toLowerCase().includes(filterProg.toLowerCase()) || 
            p.description.toLowerCase().includes(filterProg.toLowerCase())
          );
          const matchLang = filters.languages.length === 0 || filters.languages.some(filterLang => 
            p.language.toLowerCase().includes(filterLang.toLowerCase())
          );
          return matchProg && matchLang;
        });
        
        // Only filter if both programs AND languages are specified
        if (filters.programs.length > 0 && filters.languages.length > 0 && !hasMatchingProgram) {
          return false;
        }
      }


      // Tuition (parsing "850 000 - 1 300 000 ₸")
      if (uni.tuition_range) {
        // Extract first number found
        const priceStr = uni.tuition_range.replace(/\s/g, '').match(/(\d+)/);
        if (priceStr) {
           const price = parseInt(priceStr[0]);
           if (price > filters.tuitionMax) return false;
        }
      }

      // Min IELTS
      if (filters.minIelts > 0) {
        // Check if any program meets the requirement or if general uni req meets it
        // The data structure has requirements nested in programs or sometimes comparison object.
        // Let's check comparison object first for simplicity
        if (uni.comparison?.ielts_required) {
           const required = parseFloat(uni.comparison.ielts_required);
           if (!isNaN(required) && required > filters.minIelts) {
              // If required is higher than our min filter, wait... 
              // The filter is "I have this score", so I can apply if required <= my score.
              // Wait, usually filter means "Show universities that require AT MOST X" or "Show universities that require AT LEAST X"?
              // "Minimum IELTS" filter usually means "I have score X, show me where I can apply".
              // So we show universities where required_score <= filters.minIelts.
              if (required > filters.minIelts) return false; 
           }
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "ranking") {
        return (a.ranking_kz || 999) - (b.ranking_kz || 999);
      }
      if (sortBy === "tuition_asc") {
         const getPrice = (u: any) => parseInt(u.tuition_range?.replace(/\s/g, '').match(/(\d+)/)?.[0] || "0");
         return getPrice(a) - getPrice(b);
      }
      if (sortBy === "tuition_desc") {
         const getPrice = (u: any) => parseInt(u.tuition_range?.replace(/\s/g, '').match(/(\d+)/)?.[0] || "0");
         return getPrice(b) - getPrice(a);
      }
      return 0;
    });
  }, [allUniversities, filters, sortBy]);

  return (
    <Layout>
      <div className="bg-slate-50 border-b py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold font-heading text-foreground">
            {mode === 'international' ? 'International Programs' : 'Universities in Kazakhstan'}
          </h1>
          <p className="text-muted-foreground mt-2">
            Found {filteredUniversities.length} universities matching your criteria
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
             <FilterSidebar filters={filters} setFilters={setFilters} />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter & Sort Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center">
              <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden w-full sm:w-auto">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] overflow-y-auto">
                   <div className="py-4">
                     <h3 className="font-bold text-lg mb-4">Filters</h3>
                     <FilterSidebar filters={filters} setFilters={setFilters} />
                   </div>
                </SheetContent>
              </Sheet>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-sm text-muted-foreground whitespace-nowrap hidden sm:inline">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px] bg-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ranking">Ranking (High to Low)</SelectItem>
                    <SelectItem value="tuition_asc">Tuition (Low to High)</SelectItem>
                    <SelectItem value="tuition_desc">Tuition (High to Low)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Grid */}
            {filteredUniversities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredUniversities.map((uni) => (
                  <UniversityCard key={uni.id} university={uni} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <div className="text-muted-foreground">No universities found matching your filters.</div>
                <Button variant="link" onClick={() => setFilters({ ...filters, search: "", regions: [], cities: [], programs: [], languages: [], tuitionMax: 5000000, minIelts: 0, minUnt: 0 })}>
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
