import React from "react";
import { Wrench } from "lucide-react";

const MaintenanceNotice: React.FC = () => {
  return (
    <section aria-live="polite" role="status" className="w-full">
      <div className="container mx-auto px-4">
        <div className="mt-2 rounded-xl border border-[hsl(var(--primary)/0.35)] bg-[hsl(var(--primary)/0.12)] text-foreground shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.35)]">
          <div className="flex items-center justify-center gap-3 px-4 py-3 text-sm sm:text-base font-medium">
            <Wrench className="size-4 sm:size-5 text-[hsl(var(--primary))]" aria-hidden />
            <span>Átmenetileg a weboldal karbantartás alatt van.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaintenanceNotice;
