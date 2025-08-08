import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "1. Igényfelmérés",
    text:
      "A kapcsolatfelvétel után egy rövid beszélgetésből és kérdőívből kiderül, pontosan mire van szükséged.",
  },
  {
    title: "2. Tűpontos ajánlat",
    text:
      "A feltárt igények alapján személyre szabott, átlátható ajánlatot küldünk.",
  },
  {
    title: "3. Tiszta működés",
    text:
      "Nincsenek apróbetűs részek. Szerződünk, és kétoldali védelemmel, garanciával dolgozunk.",
  },
  {
    title: "4. Fogjuk a kezed",
    text:
      "A projekt során dedikált kapcsolattartóval haladunk, minden fontos lépésről értesítünk.",
  },
];

const ProcessSection = () => {
  return (
    <section id="folyamat" className="relative py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs border border-border text-muted-foreground">
            Mire számíthatsz a közös munka során?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-8">
            Letesztelt 4 lépéses onboarding folyamatunk
          </h2>
        </div>

        {/* timeline */}
        <div className="mt-6 md:mt-10">
          <div className="hidden md:block h-1 w-full bg-border/50 rounded-full relative">
            <div className="absolute left-0 top-0 h-1 w-1/4 bg-primary rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mt-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-xl bg-background/50 border border-border p-5"
              >
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
