import { University } from "@/lib/data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Heart, Trophy } from "lucide-react";
import { Link } from "wouter";
import { useI18n } from "@/lib/i18n";
import { useFavorites } from "@/lib/favorites-context";

interface UniversityCardProps {
  university: University;
}

export function UniversityCard({ university }: UniversityCardProps) {
  const { t } = useI18n();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(university.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(university.id);
  };

  // Fallback image if none provided or logic to pick one
  const mainImage = university.images && university.images.length > 0 
    ? university.images[0] 
    : "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop";

  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden bg-muted">
        <img 
          src={mainImage} 
          alt={university.name} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
             (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop";
          }}
        />
        <div className="absolute top-3 right-3">
          <Button 
            variant="secondary" 
            size="icon" 
            className={`rounded-full h-8 w-8 backdrop-blur-sm bg-white/80 hover:bg-white ${isFav ? 'text-red-500' : 'text-muted-foreground'}`}
            onClick={handleToggleFavorite}
          >
            <Heart className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
          </Button>
        </div>
        {university.ranking_kz && (
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-xs font-medium border-0 shadow-sm">
              <Trophy className="h-3 w-3 mr-1 text-yellow-500" />
              #{university.ranking_kz} in KZ
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-heading font-bold text-lg leading-tight text-foreground line-clamp-2">
              {university.name}
            </h3>
            <div className="flex items-center text-muted-foreground mt-1 text-sm">
              <MapPin className="h-3 w-3 mr-1" />
              {university.city}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2 flex-1">
        <div className="mb-4">
          <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Tuition / Year</div>
          <div className="font-semibold text-primary">{university.tuition_range || t('card.check_details')}</div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {university.programs?.slice(0, 3).map((prog, idx) => (
            <Badge key={idx} variant="outline" className="text-xs bg-slate-50 font-normal text-muted-foreground border-slate-200">
              {prog.program}
            </Badge>
          ))}
          {(university.programs?.length || 0) > 3 && (
            <Badge variant="outline" className="text-xs bg-slate-50 font-normal text-muted-foreground border-slate-200">
              +{(university.programs?.length || 0) - 3} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto">
        <Link href={`/university/${university.id}`} className="w-full">
          <Button className="w-full rounded-lg font-medium group-hover:bg-primary/90">
            {t('card.details')}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
