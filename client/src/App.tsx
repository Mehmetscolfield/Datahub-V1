import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/lib/i18n";
import { CompareProvider } from "@/lib/compare-context";
import { FavoritesProvider } from "@/lib/favorites-context";

import Home from "@/pages/home";
import Universities from "@/pages/universities";
import UniversityDetails from "@/pages/university-details";
import Compare from "@/pages/compare";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/universities" component={Universities} />
      <Route path="/university/:id" component={UniversityDetails} />
      <Route path="/compare" component={Compare} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <I18nProvider>
          <CompareProvider>
            <FavoritesProvider>
              <Toaster />
              <Router />
            </FavoritesProvider>
          </CompareProvider>
        </I18nProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
