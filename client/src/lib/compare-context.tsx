import React, { createContext, useContext, useState } from 'react';
import { University } from './data';
import { useToast } from '@/hooks/use-toast';

type CompareContextType = {
  selectedUniversities: University[];
  addToCompare: (uni: University) => void;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
};

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [selectedUniversities, setSelectedUniversities] = useState<University[]>([]);
  const { toast } = useToast();

  const addToCompare = (uni: University) => {
    if (selectedUniversities.find((u) => u.id === uni.id)) {
      toast({
        title: "Already added",
        description: `${uni.name} is already in your comparison list.`,
      });
      return;
    }
    if (selectedUniversities.length >= 3) {
       toast({
        title: "Limit reached",
        description: "You can compare up to 3 universities at a time.",
        variant: "destructive"
      });
      return;
    }
    setSelectedUniversities([...selectedUniversities, uni]);
    toast({
      title: "Added to comparison",
      description: `${uni.name} added.`,
    });
  };

  const removeFromCompare = (id: string) => {
    setSelectedUniversities(selectedUniversities.filter((u) => u.id !== id));
  };

  const isInCompare = (id: string) => {
    return !!selectedUniversities.find((u) => u.id === id);
  };

  return (
    <CompareContext.Provider value={{ selectedUniversities, addToCompare, removeFromCompare, isInCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
