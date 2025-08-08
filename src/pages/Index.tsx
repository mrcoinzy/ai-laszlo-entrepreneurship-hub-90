import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MaintenanceNotice from "@/components/MaintenanceNotice";

const Index = () => {
  React.useEffect(() => {
    document.title = "Webfejlesztés és online marketing | AI László";
    const desc = "Modern weboldal, arculat és online hirdetés – mind egy kézből, hogy vállalkozásod ne csak létezzen, hanem növekedjen is.";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = desc;
  }, []);

  return (
    <div className="min-h-screen w-full bg-black overflow-visible">
      <Navbar />
      <MaintenanceNotice />
      <main className="w-full overflow-visible">
        <HeroSection />
      </main>
    </div>
  );
};

export default Index;
