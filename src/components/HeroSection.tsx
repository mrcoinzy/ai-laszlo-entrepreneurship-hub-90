
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";

import { ScrollRevealY } from "@/components/ui/scroll-reveal";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const isMobile = useIsMobile();

  return (
    <section className="relative min-h-screen flex items-center bg-background text-foreground overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[36rem] h-[36rem] rounded-full blur-[140px] opacity-40 bg-primary/20" />
        <div className="absolute bottom-0 -right-24 w-[28rem] h-[28rem] rounded-full blur-[120px] opacity-30 bg-accent/30" />
      </div>

      {/* Decorative sparkles */}
      {!isMobile && (
        <div className="absolute left-6 top-24 text-primary/70">
          <Sparkles className="size-6" />
        </div>
      )}

      <div className="container relative z-10 mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-28 w-full">
        <div className="max-w-5xl">
          <ScrollRevealY width="100%">
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm px-3 py-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-md">
              <Sparkles className="size-3" /> Prémium webfejlesztés és marketing
            </span>
          </ScrollRevealY>

          <ScrollRevealY width="100%" delay={0.1} className="mt-6">
            <h1 className="font-extrabold tracking-tight leading-[0.95] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Szerezd meg a <span className="text-foreground">legjobb</span>
              <br />
              <span className="text-foreground">digitális szolgáltatásokat</span>
              <br />
              <span className="bg-[hsl(var(--brand-accent))] text-[hsl(var(--brand-accent-foreground))] px-3 -mx-1 rounded">nálunk</span>
            </h1>
          </ScrollRevealY>

          <ScrollRevealY width="100%" delay={0.2} className="mt-6 max-w-2xl">
            <p className="text-white/80 text-base sm:text-lg md:text-xl">
              Modern weboldal, erős márka és eredményorientált hirdetések – egy kézből, hogy a vállalkozásod ne csak látható legyen, hanem növekedjen is.
            </p>
          </ScrollRevealY>

          <ScrollRevealY width="100%" delay={0.3} className="mt-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link to="/consultation" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto rounded-full px-7 py-6 text-base font-semibold bg-[hsl(var(--brand-accent))] text-[hsl(var(--brand-accent-foreground))] hover:brightness-110 shadow-[0_10px_30px_-10px_hsl(var(--brand-accent)/0.6)]">
                  Kezdjük el
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>

              {/* Avatar group + social proof */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {["A","B","C","D"].map((l, i) => (
                    <div key={i} aria-hidden className="size-9 rounded-full bg-white text-black font-semibold grid place-items-center ring-2 ring-[hsl(var(--brand-accent))]">
                      {l}
                    </div>
                  ))}
                </div>
                <div className="rounded-full border border-white/15 px-3 py-1 text-xs sm:text-sm bg-white/5">
                  50+ elégedett projekt
                </div>
              </div>
            </div>
          </ScrollRevealY>
        </div>

        {/* Neon ribbon */}
        <div className="pointer-events-none select-none absolute left-0 right-0 -bottom-6 sm:-bottom-10">
          <div className="mx-[-10%] rotate-[-6deg]">
            <div className="bg-[hsl(var(--brand-accent))] text-[hsl(var(--brand-accent-foreground))] py-3 sm:py-4 font-bold tracking-wide">
              <div className="container mx-auto px-6 flex items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm">
                <span className="uppercase">Webdesign</span>
                <Star className="opacity-70" />
                <span className="uppercase">App fejlesztés</span>
                <Star className="opacity-70" />
                <span className="uppercase">Branding</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
