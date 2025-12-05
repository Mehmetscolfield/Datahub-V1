import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { ArrowRight, GraduationCap, Globe2 } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { t } = useI18n();

  return (
    <Layout>
      <div className="flex-1">
        {/* Hero Section */}
        <section className="relative py-12 md:py-24 lg:py-32 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight text-foreground">
              Discover Your Future in <span className="text-primary">Kazakhstan</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              The most comprehensive guide to universities, programs, and scholarships for local and international students.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Local Students Tile */}
            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 h-[500px] flex flex-col">
              <div className="absolute inset-0 z-0">
                <img 
                  src="/assets/generated_images/kazakhstan_students_studying_outdoors.png" 
                  alt="Local Students" 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              
              <div className="relative z-10 mt-auto p-8 text-white space-y-4">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/20 backdrop-blur-md mb-2">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold font-heading leading-none">
                  {t('hero.local.title')}
                </h2>
                <p className="text-white/80 text-lg max-w-md">
                  {t('hero.local.subtitle')}
                </p>
                <Link href="/universities?mode=local">
                  <Button size="lg" className="w-full sm:w-auto mt-4 font-semibold bg-white text-black hover:bg-white/90 border-0">
                    {t('hero.local.btn')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* International Students Tile */}
            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 h-[500px] flex flex-col">
               <div className="absolute inset-0 z-0">
                <img 
                  src="/assets/generated_images/international_students_at_airport_or_travel.png" 
                  alt="International Students" 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent" />
              </div>

              <div className="relative z-10 mt-auto p-8 text-white space-y-4">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/20 backdrop-blur-md mb-2">
                  <Globe2 className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold font-heading leading-none">
                  {t('hero.intl.title')}
                </h2>
                <p className="text-white/80 text-lg max-w-md">
                  {t('hero.intl.subtitle')}
                </p>
                 <Link href="/universities?mode=international">
                  <Button size="lg" className="w-full sm:w-auto mt-4 font-semibold bg-blue-500 text-white hover:bg-blue-600 border-0">
                    {t('hero.intl.btn')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features/Trust Section (Optional for depth) */}
        <section className="bg-slate-50 py-16 border-y border-slate-200">
           <div className="container mx-auto px-4 max-w-6xl">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-primary">120+</h3>
                  <p className="text-muted-foreground font-medium">Universities</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-primary">500+</h3>
                  <p className="text-muted-foreground font-medium">Programs</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-primary">Top 5</h3>
                  <p className="text-muted-foreground font-medium">Global Rankings</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-primary">Free</h3>
                  <p className="text-muted-foreground font-medium">Guidance</p>
                </div>
             </div>
           </div>
        </section>
      </div>
    </Layout>
  );
}
