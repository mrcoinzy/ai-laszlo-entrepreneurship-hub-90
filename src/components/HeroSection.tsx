
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] md:min-h-screen flex items-center bg-background text-foreground overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-32 w-[40rem] h-[40rem] rounded-full blur-[140px] opacity-50 bg-[hsl(var(--primary)/0.35)]" />
        <div className="absolute -bottom-48 -right-32 w-[36rem] h-[36rem] rounded-full blur-[140px] opacity-40 bg-white/10" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 pt-28 pb-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Left: Copy */}
          <div>
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm px-3 py-1 rounded-full border border-white/15 bg-white/5 backdrop-blur">
              Tartsd biztonságban a pénzed
            </span>

            <h1 className="mt-6 font-bold tracking-tight leading-[1.05] text-4xl sm:text-5xl md:text-6xl xl:text-7xl">
              A <span className="text-[hsl(var(--primary))]">legjobb</span> befektetési
              <br />
              <span className="text-foreground">platform a</span>
              <br />
              <span className="text-[hsl(var(--primary))]">jövődért</span>
            </h1>

            <p className="mt-6 text-white/80 text-base sm:text-lg md:text-xl max-w-xl">
              Profi, megbízható és modern rendszer, ahol a design és a biztonság
              találkozik. Egyszerű indulás, gyors eredmények, fókusz a növekedésen.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link to="/consultation" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto rounded-full px-7 py-6 text-base font-semibold bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:brightness-110 shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)]">
                  Kezdjük el
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>

              {/* Social proof */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {["A", "B", "C", "D", "E"].map((l, i) => (
                    <div
                      key={i}
                      aria-hidden
                      className="size-9 rounded-full bg-white text-black font-semibold grid place-items-center ring-2 ring-[hsl(var(--primary))]"
                    >
                      {l}
                    </div>
                  ))}
                </div>
                <div className="rounded-full border border-white/15 px-3 py-1 text-xs sm:text-sm bg-white/5">
                  168K+ valós idejű felhasználó
                </div>
              </div>
            </div>
          </div>

          {/* Right: Phone mockup */}
          <div className="relative flex justify-center md:justify-end">
            <div className="absolute -top-8 -right-8 -z-10 w-[26rem] h-[26rem] rounded-full blur-[120px] opacity-40 bg-[hsl(var(--primary)/0.35)]" />

            <div className="relative w-[240px] sm:w-[280px] md:w-[320px] aspect-[9/19] rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 shadow-2xl rotate-6 overflow-hidden">
              {/* status bar */}
              <div className="h-6 bg-black/30" />
              {/* screen content */}
              <div className="relative h-full p-4">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.25),_transparent_60%)]" />
                <div className="relative space-y-3">
                  <div className="h-10 rounded-xl bg-[hsl(var(--primary)/0.9)]/90 text-[hsl(var(--primary-foreground))] grid place-items-center font-semibold">
                    Portfolio
                  </div>
                  <div className="h-24 rounded-xl bg-white/10 border border-white/10" />
                  <div className="h-14 rounded-xl bg-white/10 border border-white/10" />
                  <div className="h-14 rounded-xl bg-white/10 border border-white/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
