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
import { MapPin, Globe, Trophy, Heart, Play, Calendar, DollarSign, CheckCircle } from "lucide-react";
import { useCompare } from "@/lib/compare-context";
import { useFavorites } from "@/lib/favorites-context";

export default function UniversityDetails() {
  const [, params] = useRoute("/university/:id");
  const university = useUniversity(params?.id || "");
  const { isInCompare, addToCompare, removeFromCompare } = useCompare();
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!university) {
    return <Layout><div className="p-8 text-center">University not found</div></Layout>;
  }

  const isCompared = isInCompare(university.id);
  const isFav = isFavorite(university.id);
  
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
              <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight">{university.name}</h1>
              <div className="flex items-center gap-4 text-slate-300">
                <span>Founded {university.founded}</span>
                <span>•</span>
                <a href={university.official_website} target="_blank" rel="noreferrer" className="flex items-center hover:text-white hover:underline">
                  <Globe className="w-4 h-4 mr-1" />
                  Official Website
                </a>
              </div>
            </div>
            <div className="flex gap-3">
               <Button 
                variant={isCompared ? "destructive" : "secondary"} 
                onClick={() => isCompared ? removeFromCompare(university.id) : addToCompare(university)}
              >
                 {isCompared ? "Remove from Compare" : "Compare University"}
               </Button>
               <Button 
                  variant="outline" 
                  className={`bg-white/10 border-white/20 hover:bg-white/20 ${isFav ? 'text-red-400 border-red-400' : 'text-white'}`}
                  onClick={() => toggleFavorite(university.id)}
               >
                 <Heart className={`w-4 h-4 mr-2 ${isFav ? 'fill-current' : ''}`} />
                 {isFav ? "Saved" : "Save"}
               </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-16">
        
        {/* About Section */}
        <section className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-3xl font-bold font-heading">About the University</h2>
            <div className="prose max-w-none text-muted-foreground">
              <p className="text-lg text-foreground font-medium">{university.about?.mission}</p>
              <p>{university.about?.history}</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {university.about?.achievements?.map((ach, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{ach}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
             <Card>
               <CardHeader>
                 <CardTitle className="text-lg">Quick Facts</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="flex justify-between py-2 border-b">
                   <span className="text-muted-foreground">Location</span>
                   <span className="font-medium">{university.city}</span>
                 </div>
                 <div className="flex justify-between py-2 border-b">
                   <span className="text-muted-foreground">Founded</span>
                   <span className="font-medium">{university.founded}</span>
                 </div>
                 <div className="flex justify-between py-2 border-b">
                   <span className="text-muted-foreground">Tuition Range</span>
                   <span className="font-medium text-primary">{university.tuition_range}</span>
                 </div>
                 <div className="flex justify-between py-2 border-b">
                   <span className="text-muted-foreground">Programs</span>
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
              Virtual Tour
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
          <h2 className="text-3xl font-bold font-heading mb-8">Academic Programs</h2>
          <div className="rounded-xl border shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-[30%]">Program</TableHead>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead className="text-right">Tuition/Year</TableHead>
                  <TableHead className="text-right">Action</TableHead>
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
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Admission */}
        <section>
           <h2 className="text-3xl font-bold font-heading mb-8">Admission & Enrollment</h2>
           <Tabs defaultValue="local" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-8">
              <TabsTrigger value="local">Local Students</TabsTrigger>
              <TabsTrigger value="international">International Students</TabsTrigger>
            </TabsList>
            
            <TabsContent value="local" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                 <Card>
                   <CardHeader>
                     <CardTitle className="flex items-center gap-2">
                       <CheckCircle className="w-5 h-5 text-green-500" />
                       Steps to Apply
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
                       Deadlines & Requirements
                     </CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-4">
                     <p className="text-sm text-muted-foreground">Standard UNT deadlines apply for state grants.</p>
                     <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 text-amber-900 text-sm">
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
                       International Application
                     </CardTitle>
                   </CardHeader>
                   <CardContent>
                     <ul className="space-y-3">
                       {university.admission_and_enrollment?.international?.steps?.map((step: string, i: number) => (
                         <li key={i} className="flex items-start gap-3">
                           <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
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

        {/* Partners */}
        {university.international_cooperation?.partners && (
           <section className="bg-slate-900 text-white rounded-2xl p-8 md:p-12">
             <h2 className="text-2xl font-bold font-heading mb-8 text-center">International Partners</h2>
             <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-center opacity-80">
                {university.international_cooperation.partners.map((partner: string, i: number) => (
                  <div key={i} className="px-6 py-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                    <span className="font-medium text-lg">{partner}</span>
                  </div>
                ))}
             </div>
           </section>
        )}
      </div>
    </Layout>
  );
}
