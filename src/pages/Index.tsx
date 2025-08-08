import React from "react";

const Index = () => {
  React.useEffect(() => {
    document.title = "Karbantartás | AI László";
    const desc = "Átmenetileg karbantartás van az oldalon.";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = desc;
  }, []);

  return (
    <div className="min-h-screen w-full bg-white text-black flex items-center justify-center">
      <main className="w-full">
        <p className="text-center text-base sm:text-lg md:text-xl">Átmenetileg karbantartás van az oldalon.</p>
      </main>
    </div>
  );
};

export default Index;
