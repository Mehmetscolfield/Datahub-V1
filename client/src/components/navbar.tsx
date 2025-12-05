import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const { t, setLanguage, language } = useI18n();
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              E
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">EduGuide KZ</span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/universities">
            <a className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/universities') ? 'text-primary' : 'text-muted-foreground'}`}>
              {t('nav.universities')}
            </a>
          </Link>
          <Link href="/compare">
             <a className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/compare') ? 'text-primary' : 'text-muted-foreground'}`}>
              {t('compare.title')}
            </a>
          </Link>
           {/* 
          <Link href="/programs">
            <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {t('nav.programs')}
            </a>
          </Link>
           */}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Globe className="h-4 w-4" />
                <span className="sr-only">Switch language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-accent' : ''}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('kz')} className={language === 'kz' ? 'bg-accent' : ''}>
                Қазақша
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('ru')} className={language === 'ru' ? 'bg-accent' : ''}>
                Русский
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="default" className="rounded-full px-6 font-medium">
            {t('nav.login')}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('kz')}>Қазақша</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('ru')}>Русский</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-8 mt-8">
                <Link href="/universities" onClick={() => setIsOpen(false)}>
                  <a className="text-lg font-medium">{t('nav.universities')}</a>
                </Link>
                 <Link href="/compare" onClick={() => setIsOpen(false)}>
                  <a className="text-lg font-medium">{t('compare.title')}</a>
                </Link>
                <Button className="w-full">{t('nav.login')}</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
