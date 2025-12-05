import { Layout } from "@/components/layout";
import { useUniversity } from "@/lib/data";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MapPin, Globe, Trophy, Heart, Play, Calendar, CheckCircle } from "lucide-react";
import { useCompare } from "@/lib/compare-context";
import { useFavorites } from "@/lib/favorites-context";
import { useI18n } from "@/lib/i18n";

// Mock function to get a logo if not present (for demo)
function getLogo(id: string) {
  // Deterministic logo selection based on ID length/char
  const logos = [
    "/assets/generated_images/academic_university_logo_crest_blue.png",
    "/assets/generated_images/academic_university_logo_crest_red.png",
    "/assets/generated_images/academic_university_logo_crest_green.png"
  ];
  const index = id.length % logos.length;
  return logos[index];
}

export default function UniversityDetails() {
  const [, params] = useRoute("/university/:id");
  const university = useUniversity(params?.id || "");
  const { isInCompare, addToCompare, removeFromCompare } = useCompare();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t } = useI18n();

  if (!university) {
    return <Layout><div className="p-8 text-center">University not found</div></Layout>;
  }

  const isCompared = isInCompare(university.id);
  const isFav = isFavorite(university.id);
  const logo = university.logo || getLogo(university.id);
  
  const mainImage = university.images && university.images.length > 0 
    ? university.images[0] 
    : "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop";

  return (
    <Layout>
      {/* Hero Header */}
      <div className="relative h-[400px] w-full bg-slate-900 overflow-hidden">
        <img 
          src={mainImage} 
          alt={university.name} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-end gap-6">
              {/* Logo */}
              <div className="hidden md:block h-32 w-32 rounded-xl bg-white p-2 shadow-lg shrink-0">
                <img src={logo} alt={`${university.name} Logo`} className="h-full w-full object-contain" />
              </div>
              
              <div className="space-y-4 text-white">
                <div className="flex flex-wrap gap-3">
                   {university.ranking_kz && (
                    <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black border-0">
                      <Trophy className="w-3 h-3 mr-1" />
                      #{university.ranking_kz} in Kazakhstan
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-white border-white/30 backdrop-blur-md">
                     <MapPin className="w-3 h-3 mr-1" />
                     {university.city}
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-5xl font-heading font-bold leading-tight drop-shadow-md">{university.name}</h1>
                <div className="flex items-center gap-4 text-slate-200 font-medium">
                  <span>{t('details.founded')} {university.founded}</span>
                  <span>•</span>
                  <a href={university.official_website} target="_blank" rel="noreferrer" className="flex items-center hover:text-white hover:underline transition-colors">
                    <Globe className="w-4 h-4 mr-1" />
                    {t('details.official_site')}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
               <Button 
                variant={isCompared ? "destructive" : "secondary"} 
                onClick={() => isCompared ? removeFromCompare(university.id) : addToCompare(university)}
              >
                 {isCompared ? t('details.remove_compare') : t('details.compare')}
               </Button>
               <Button 
                  variant="outline" 
                  className={`bg-white/10 border-white/20 hover:bg-white/20 ${isFav ? 'text-red-400 border-red-400' : 'text-white'}`}
                  onClick={() => toggleFavorite(university.id)}
               >
                 <Heart className={`w-4 h-4 mr-2 ${isFav ? 'fill-current' : ''}`} />
                 {isFav ? t('details.saved') : t('details.save')}
               </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-16">
        
        {/* About Section */}
        <section className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-3xl font-bold font-heading text-foreground">{t('details.about')}</h2>
            <div className="prose max-w-none text-muted-foreground">
              <p className="text-lg text-foreground font-medium">{university.about?.mission}</p>
              <p>{university.about?.history}</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {university.about?.achievements?.map((ach, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{ach}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
             <Card>
               <CardHeader>
                 <CardTitle className="text-lg">{t('details.facts')}</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="flex justify-between py-2 border-b">
                   <span className="text-muted-foreground">{t('details.location')}</span>
                   <span className="font-medium">{university.city}</span>
                 </div>
                 <div className="flex justify-between py-2 border-b">
                   <span className="text-muted-foreground">{t('details.founded')}</span>
                   <span className="font-medium">{university.founded}</span>
                 </div>
                 <div className="flex justify-between py-2 border-b">
                   <span className="text-muted-foreground">{t('details.tuition')}</span>
                   <span className="font-medium text-primary">{university.tuition_range}</span>
                 </div>
                 <div className="flex justify-between py-2 border-b">
                   <span className="text-muted-foreground">{t('details.programs_count')}</span>
                   <span className="font-medium">{university.programs?.length || 0}+</span>
                 </div>
               </CardContent>
             </Card>
          </div>
        </section>

        {/* 3D Tour / Video */}
        {university.tour_video && (
          <section>
            <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2">
              <Play className="w-6 h-6 text-primary" />
              {t('details.tour')}
            </h2>
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src={university.tour_video}
                title="Virtual Tour"
                allowFullScreen
                className="border-0"
              />
            </div>
             {/* Gallery Preview */}
             {university.images && university.images.length > 1 && (
               <div className="grid grid-cols-4 gap-4 mt-4">
                  {university.images.slice(1, 5).map((img, i) => (
                    <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                      <img src={img} alt="Campus" className="w-full h-full object-cover" />
                    </div>
                  ))}
               </div>
             )}
          </section>
        )}

        {/* Programs */}
        <section>
          <h2 className="text-3xl font-bold font-heading mb-8">{t('details.programs')}</h2>
          <div className="rounded-xl border shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-slate-900">
                <TableRow>
                  <TableHead className="w-[35%]">{t('program.program')}</TableHead>
                  <TableHead>{t('program.faculty')}</TableHead>
                  <TableHead>{t('program.duration')}</TableHead>
                  <TableHead>{t('program.language')}</TableHead>
                  <TableHead className="text-right">{t('program.tuition')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {university.programs?.map((prog, i) => (
                  <TableRow key={i} className="group">
                    <TableCell className="font-medium">
                      <div>{prog.program}</div>
                      <div className="text-xs text-muted-foreground mt-1 line-clamp-1">{prog.description}</div>
                    </TableCell>
                    <TableCell>{prog.faculty}</TableCell>
                    <TableCell>{prog.duration}</TableCell>
                    <TableCell>{prog.language}</TableCell>
                    <TableCell className="text-right font-medium text-primary">{prog.tuition_fee_year}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Admission */}
        <section>
           <h2 className="text-3xl font-bold font-heading mb-8">{t('details.admission')}</h2>
           <Tabs defaultValue="local" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-8">
              <TabsTrigger value="local">{t('adm.local')}</TabsTrigger>
              <TabsTrigger value="international">{t('adm.intl')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="local" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                 <Card>
                   <CardHeader>
                     <CardTitle className="flex items-center gap-2">
                       <CheckCircle className="w-5 h-5 text-green-500" />
                       {t('adm.steps')}
                     </CardTitle>
                   </CardHeader>
                   <CardContent>
                     <ul className="space-y-3">
                       {university.admission_and_enrollment?.local?.steps?.map((step: string, i: number) => (
                         <li key={i} className="flex items-start gap-3">
                           <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                             {i + 1}
                           </span>
                           <span>{step}</span>
                         </li>
                       ))}
                     </ul>
                   </CardContent>
                 </Card>
                 
                 <Card>
                   <CardHeader>
                     <CardTitle className="flex items-center gap-2">
                       <Calendar className="w-5 h-5 text-blue-500" />
                       {t('adm.deadlines')}
                     </CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-4">
                     <p className="text-sm text-muted-foreground">Standard UNT deadlines apply for state grants.</p>
                     <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-900/50 text-amber-900 dark:text-amber-100 text-sm">
                       <strong>Note:</strong> Check specific program requirements for profile subjects.
                     </div>
                   </CardContent>
                 </Card>
              </div>
            </TabsContent>

            <TabsContent value="international" className="space-y-6">
               <div className="grid md:grid-cols-2 gap-8">
                 <Card>
                   <CardHeader>
                     <CardTitle className="flex items-center gap-2">
                       <Globe className="w-5 h-5 text-indigo-500" />
                       {t('adm.intl_app')}
                     </CardTitle>
                   </CardHeader>
                   <CardContent>
                     <ul className="space-y-3">
                       {university.admission_and_enrollment?.international?.steps?.map((step: string, i: number) => (
                         <li key={i} className="flex items-start gap-3">
                           <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                             {i + 1}
                           </span>
                           <span>{step}</span>
                         </li>
                       ))}
                     </ul>
                   </CardContent>
                 </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Campus Life */}
        {university.campus_life && (
          <section>
            <h2 className="text-3xl font-bold font-heading mb-8">Campus Life</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {university.campus_life.student_population && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Student Population</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">{university.campus_life.student_population.toLocaleString()}</div>
                    {university.campus_life.international_students && (
                      <div className="text-sm text-muted-foreground mt-2">
                        {university.campus_life.international_students.toLocaleString()} international students
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
              
              {university.campus_life.campus_size_hectares && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Campus Size</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">{university.campus_life.campus_size_hectares}</div>
                    <div className="text-sm text-muted-foreground">hectares</div>
                  </CardContent>
                </Card>
              )}

              {university.campus_life.libraries && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Libraries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">{university.campus_life.libraries}</div>
                    <div className="text-sm text-muted-foreground">on campus</div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {university.campus_life.sports_facilities && university.campus_life.sports_facilities.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Sports & Recreation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {university.campus_life.sports_facilities.map((facility: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{facility}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {university.campus_life.clubs_societies && university.campus_life.clubs_societies.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Clubs & Societies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {university.campus_life.clubs_societies.map((club: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{club}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            {university.campus_life.accommodation && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Accommodation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Type</div>
                    <div className="font-medium">{university.campus_life.accommodation.type}</div>
                  </div>
                  {university.campus_life.accommodation.capacity && (
                    <div>
                      <div className="text-sm text-muted-foreground">Capacity</div>
                      <div className="font-medium">{university.campus_life.accommodation.capacity.toLocaleString()} students</div>
                    </div>
                  )}
                  {university.campus_life.accommodation.cost_per_month && (
                    <div>
                      <div className="text-sm text-muted-foreground">Monthly Cost</div>
                      <div className="font-medium">{university.campus_life.accommodation.cost_per_month}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </section>
        )}

        {/* Scholarships & Financial Aid */}
        {university.scholarships_and_financial_aid && (
          <section>
            <h2 className="text-3xl font-bold font-heading mb-8">Scholarships & Financial Aid</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {university.scholarships_and_financial_aid.state_grants && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">State Grants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{university.scholarships_and_financial_aid.state_grants}</p>
                  </CardContent>
                </Card>
              )}

              {university.scholarships_and_financial_aid.merit_scholarships && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Merit Scholarships</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{university.scholarships_and_financial_aid.merit_scholarships}</p>
                  </CardContent>
                </Card>
              )}

              {university.scholarships_and_financial_aid.need_based_aid && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Need-Based Aid</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{university.scholarships_and_financial_aid.need_based_aid}</p>
                  </CardContent>
                </Card>
              )}

              {university.scholarships_and_financial_aid.international_scholarships && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">International Scholarships</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{university.scholarships_and_financial_aid.international_scholarships}</p>
                  </CardContent>
                </Card>
              )}

              {university.scholarships_and_financial_aid.industry_sponsorships && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Industry Sponsorships</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{university.scholarships_and_financial_aid.industry_sponsorships}</p>
                  </CardContent>
                </Card>
              )}

              {university.scholarships_and_financial_aid.corporate_sponsorships && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Corporate Sponsorships</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{university.scholarships_and_financial_aid.corporate_sponsorships}</p>
                  </CardContent>
                </Card>
              )}

              {university.scholarships_and_financial_aid.research_grants && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Research Grants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{university.scholarships_and_financial_aid.research_grants}</p>
                  </CardContent>
                </Card>
              )}

              {university.scholarships_and_financial_aid.agricultural_grants && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Agricultural Grants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{university.scholarships_and_financial_aid.agricultural_grants}</p>
                  </CardContent>
                </Card>
              )}

              {university.scholarships_and_financial_aid.teacher_grants && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Teacher Grants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{university.scholarships_and_financial_aid.teacher_grants}</p>
                  </CardContent>
                </Card>
              )}

              {university.scholarships_and_financial_aid.energy_sector_grants && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Energy Sector Grants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{university.scholarships_and_financial_aid.energy_sector_grants}</p>
                  </CardContent>
                </Card>
              )}

              {university.scholarships_and_financial_aid.internship_grants && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Internship Grants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{university.scholarships_and_financial_aid.internship_grants}</p>
                  </CardContent>
                </Card>
              )}

              {university.scholarships_and_financial_aid.language_grants && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Language Grants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{university.scholarships_and_financial_aid.language_grants}</p>
                  </CardContent>
                </Card>
              )}

              {university.scholarships_and_financial_aid.regional_grants && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Regional Grants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{university.scholarships_and_financial_aid.regional_grants}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        )}

        {/* Accreditations */}
        {university.accreditations && university.accreditations.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold font-heading mb-8">Accreditations</h2>
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {university.accreditations.map((accred: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{accred}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        )}

        
           <section className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 mb-20">
             <h2 className="text-2xl font-bold font-heading mb-8 text-center">{t('details.partners')}</h2>
             <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-center opacity-80">
                {university.international_cooperation.partners.map((partner: string, i: number) => (
                  <div key={i} className="px-6 py-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors cursor-default">
                    <span className="font-medium text-lg">{partner}</span>
                  </div>
                ))}
             </div>
           </section>
        )}
        </div>
      </div>
    </Layout>
  );
}
