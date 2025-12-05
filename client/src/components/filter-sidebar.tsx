import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/lib/i18n";
import { Search, X } from "lucide-react";

export interface FiltersState {
  search: string;
  regions: string[];
  cities: string[];
  programs: string[];
  languages: string[];
  tuitionMax: number;
  minIelts: number;
  minUnt: number;
}

interface FilterSidebarProps {
  filters: FiltersState;
  setFilters: (filters: FiltersState) => void;
  className?: string;
}

export function FilterSidebar({ filters, setFilters, className }: FilterSidebarProps) {
  const { t } = useI18n();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const toggleRegion = (region: string) => {
    const newRegions = filters.regions.includes(region)
      ? filters.regions.filter((r) => r !== region)
      : [...filters.regions, region];
    setFilters({ ...filters, regions: newRegions });
  };
  
  const toggleCity = (city: string) => {
    const newCities = filters.cities.includes(city)
      ? filters.cities.filter((c) => c !== city)
      : [...filters.cities, city];
    setFilters({ ...filters, cities: newCities });
  };

  const toggleProgram = (program: string) => {
    const newPrograms = filters.programs.includes(program)
      ? filters.programs.filter((p) => p !== program)
      : [...filters.programs, program];
    setFilters({ ...filters, programs: newPrograms });
  };

  const toggleLanguage = (lang: string) => {
    const newLangs = filters.languages.includes(lang)
      ? filters.languages.filter((l) => l !== lang)
      : [...filters.languages, lang];
    setFilters({ ...filters, languages: newLangs });
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      regions: [],
      cities: [],
      programs: [],
      languages: [],
      tuitionMax: 5000000,
      minIelts: 0,
      minUnt: 0,
    });
  };

  const regionsList = [
    "Astana", "Almaty", "Shymkent", "Karaganda", "Pavlodar", "Taraz", "Semey", "East Kazakhstan", "West Kazakhstan"
  ];
  
  // Common cities list derived from regions for simplicity, or distinct
  const citiesList = [
    "Astana", "Almaty", "Shymkent", "Karaganda", "Pavlodar", "Taraz", "Semey", "Kaskelen", "Turkistan"
  ];

  const programsList = [
    "IT", "Computer Science", "Engineering", "Business", "Medicine", "Law", "Education", "Arts", "Agriculture"
  ];
  
  const languagesList = [
    "English", "Kazakh", "Russian"
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('search.placeholder')}
          className="pl-9 bg-white"
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Filters</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs h-8 text-muted-foreground hover:text-foreground">
          {t('filters.reset')}
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["regions", "programs", "tuition", "languages"]} className="w-full">
        {/* Regions */}
        <AccordionItem value="regions" className="border-b-0">
          <AccordionTrigger className="py-3 hover:no-underline font-medium text-sm">{t('filters.region')}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {regionsList.map((region) => (
                <div key={region} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`region-${region}`} 
                    checked={filters.regions.includes(region)}
                    onCheckedChange={() => toggleRegion(region)}
                  />
                  <Label htmlFor={`region-${region}`} className="text-sm font-normal cursor-pointer text-muted-foreground peer-data-[state=checked]:text-foreground">
                    {region}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Cities (Optional separate filter as per requirements) */}
         <AccordionItem value="cities" className="border-b-0">
          <AccordionTrigger className="py-3 hover:no-underline font-medium text-sm">{t('filters.city')}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1 max-h-40 overflow-y-auto">
              {citiesList.map((city) => (
                <div key={city} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`city-${city}`} 
                    checked={filters.cities.includes(city)}
                    onCheckedChange={() => toggleCity(city)}
                  />
                  <Label htmlFor={`city-${city}`} className="text-sm font-normal cursor-pointer text-muted-foreground peer-data-[state=checked]:text-foreground">
                    {city}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Tuition */}
        <AccordionItem value="tuition" className="border-b-0">
          <AccordionTrigger className="py-3 hover:no-underline font-medium text-sm">{t('filters.tuition')}</AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 px-1 pb-2">
              <Slider
                defaultValue={[filters.tuitionMax]}
                max={5000000}
                step={100000}
                onValueChange={(val) => setFilters({ ...filters, tuitionMax: val[0] })}
                className="mb-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0 ₸</span>
                <span>{filters.tuitionMax.toLocaleString()} ₸</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Languages */}
        <AccordionItem value="languages" className="border-b-0">
          <AccordionTrigger className="py-3 hover:no-underline font-medium text-sm">Language</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {languagesList.map((lang) => (
                <div key={lang} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`lang-${lang}`}
                    checked={filters.languages.includes(lang)}
                    onCheckedChange={() => toggleLanguage(lang)}
                  />
                  <Label htmlFor={`lang-${lang}`} className="text-sm font-normal cursor-pointer text-muted-foreground peer-data-[state=checked]:text-foreground">
                    {lang}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Programs */}
        <AccordionItem value="programs" className="border-b-0">
          <AccordionTrigger className="py-3 hover:no-underline font-medium text-sm">{t('filters.programs')}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {programsList.map((prog) => (
                <div key={prog} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`prog-${prog}`}
                    checked={filters.programs.includes(prog)}
                    onCheckedChange={() => toggleProgram(prog)}
                  />
                  <Label htmlFor={`prog-${prog}`} className="text-sm font-normal cursor-pointer text-muted-foreground peer-data-[state=checked]:text-foreground">
                    {prog}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Requirements */}
        <AccordionItem value="reqs" className="border-b-0">
           <AccordionTrigger className="py-3 hover:no-underline font-medium text-sm">Requirements</AccordionTrigger>
           <AccordionContent>
             <div className="space-y-4 pt-2">
               <div className="space-y-2">
                 <Label className="text-xs text-muted-foreground">Min IELTS Score</Label>
                 <div className="flex gap-2 flex-wrap">
                   {[4.0, 4.5, 5.0, 5.5, 6.0, 6.5].map(score => (
                     <Button 
                        key={score} 
                        variant={filters.minIelts === score ? "default" : "outline"} 
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => setFilters({...filters, minIelts: filters.minIelts === score ? 0 : score})}
                     >
                       {score}
                     </Button>
                   ))}
                 </div>
               </div>
               
               <div className="space-y-2">
                 <Label className="text-xs text-muted-foreground">Min UNT Score</Label>
                 <Input 
                    type="number" 
                    placeholder="e.g. 70" 
                    value={filters.minUnt || ''} 
                    onChange={(e) => setFilters({...filters, minUnt: parseInt(e.target.value) || 0})}
                    className="h-8 text-sm"
                 />
               </div>
             </div>
           </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  );
}
