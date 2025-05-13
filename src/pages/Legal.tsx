
import React from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollRevealY } from "@/components/ui/scroll-reveal";

const Legal = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <ScrollRevealY>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold mb-8 gradient-text">Jogi nyilatkozat</h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-white/70 mb-8">
                A weboldal (ailaszlo.com) használatával Ön elfogadja a jelen jogi nyilatkozatban foglalt feltételeket. 
                Amennyiben a feltételekkel nem ért egyet, kérjük, ne használja a weboldalt.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Impresszum</h2>
              <p className="text-white/70">A weboldal üzemeltetője:</p>
              <p className="text-white/70">AI László (magánszemély)</p>
              <p className="text-white/70">E-mail: hello@ailaszlo.com</p>
              <p className="text-white/70">Székhely: [adja meg, ha kívánja]</p>
              <p className="text-white/70">Tárhelyszolgáltató: [tárhelyszolgáltató neve, címe, e-mailje]</p>
              <p className="text-white/70 mt-4">
                Az impresszum közzététele a 2001. évi CVIII. törvény (Eker. tv.) 4. § (1) bekezdése értelmében kötelező, 
                és a fenti adatok folyamatosan, közvetlenül és könnyen elérhető módon jelennek meg a weboldalon.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Szolgáltatások</h2>
              <p className="text-white/70 mb-4">
                A weboldalon bemutatott és elérhető szolgáltatások köre különösen, de nem kizárólag az alábbiakat foglalja magában:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li>Weboldal- és webalkalmazás-fejlesztés modern technológiákkal (pl. Tailwind, Vibe Coding, Supabase, Node.js)</li>
                <li>Reszponzív, konverzióra optimalizált felületek kialakítása</li>
                <li>Automatizált ügyfélkezelési rendszerek fejlesztése</li>
                <li>Online marketing szolgáltatások, értékesítési tölcsérek és kampányok tervezése, kivitelezése</li>
                <li>TikTok és Instagram tartalomgyártás, különös tekintettel pszichológiai és AI-alapú videószkriptekre</li>
                <li>Vizuális tartalmak készítése (videóvágás, CapCut, AI-eszközökkel támogatott dizájn)</li>
                <li>Automatizálás és mesterséges intelligencia integráció</li>
                <li>Automatizált ügyfélszerzés, CRM rendszerek bevezetése</li>
                <li>No-code megoldások alkalmazása (pl. Lovable, databutton, tempo, bolt.new)</li>
                <li>Konzultáció és mentorálás fiatal vállalkozók számára, üzleti tanácsadás, célcsoportdefiníció, kampánystratégia</li>
                <li>Időpontfoglalás konzultációra</li>
              </ul>
              <p className="text-white/70 mt-4">
                A szolgáltatások részletes leírása, elérhetősége és feltételei a weboldalon, valamint az Általános Szerződési Feltételek (ÁSZF) dokumentumban találhatók.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Szerzői jogok és szellemi tulajdon</h2>
              <p className="text-white/70">
                A weboldal teljes tartalma – beleértve, de nem kizárólagosan: szövegek, képek, grafikák, videók, arculati elemek, forráskód, 
                egyedi fejlesztések, AI-alapú szkriptek és dizájnok – szerzői jogi védelem alatt áll a 1999. évi LXXVI. törvény (Szjt.) alapján.
              </p>
              <p className="text-white/70 mt-4">
                A tartalom jogosulatlan másolása, terjesztése, átdolgozása, nyilvánossághoz közvetítése vagy kereskedelmi célú felhasználása 
                kizárólag a szerző előzetes írásbeli engedélyével lehetséges.
              </p>
              <p className="text-white/70 mt-4">
                A weboldalon feltüntetett védjegyek, logók, harmadik féltől származó szoftverek és egyéb szellemi alkotások a jogosult 
                engedélye nélkül nem használhatók fel.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Felelősség kizárása</h2>
              <p className="text-white/70">
                A weboldal tartalma kizárólag tájékoztató jellegű. AI László mindent megtesz a tartalom pontosságáért és naprakészségéért, 
                azonban nem vállal felelősséget az esetleges hibákból, hiányosságokból vagy a weboldal használatából eredő közvetlen vagy 
                közvetett károkért, kivéve, ha azt jogszabály kifejezetten előírja (2013. évi V. törvény, Ptk. 6:519. §).
              </p>
              <p className="text-white/70 mt-4">
                A pszichológiai és AI-alapú tartalmak, videószkriptek, tanácsadások nem minősülnek egészségügyi vagy pénzügyi tanácsadásnak, 
                kizárólag tájékoztató, inspirációs vagy marketing célokat szolgálnak.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Külső hivatkozások (linkek)</h2>
              <p className="text-white/70">
                A weboldal harmadik felek által üzemeltetett oldalakra mutató hivatkozásokat tartalmazhat. AI László nem vállal felelősséget 
                e külső oldalak tartalmáért, elérhetőségéért vagy adatkezelési gyakorlatáért.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Adatvédelem és adatkezelés</h2>
              <p className="text-white/70">
                A weboldal látogatása során megadott vagy automatikusan gyűjtött személyes adatok kezelésére a mindenkor hatályos 
                Általános Adatvédelmi Rendelet (GDPR, 2016/679/EU), valamint a 2011. évi CXII. törvény (Infotv.) rendelkezései irányadóak.
              </p>
              <p className="text-white/70 mt-4">
                Az adatkezelés részleteit az Adatkezelési Tájékoztató tartalmazza, amely a weboldal láblécéből közvetlenül elérhető.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Sütik (cookie-k) használata</h2>
              <p className="text-white/70">
                A weboldal sütiket (cookie-kat) használ a felhasználói élmény javítása, valamint statisztikai és marketing célokból. 
                A sütik kezeléséről és a felhasználó választási lehetőségeiről részletes tájékoztatást a Sütikezelési Tájékoztató nyújt, 
                amely a weboldal láblécéből közvetlenül elérhető. A sütik alkalmazása során a GDPR előírásai szerint járunk el.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Jogorvoslat, panaszkezelés</h2>
              <p className="text-white/70">
                Amennyiben a weboldal használatával vagy az adatkezeléssel kapcsolatban kérdése, panasza merül fel, kérjük, 
                írjon a hello@ailaszlo.com e-mail címre.
              </p>
              <p className="text-white/70 mt-4">
                Adatvédelmi jogai megsértése esetén a Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH, www.naih.hu) fordulhat.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">9. A jogi nyilatkozat módosítása</h2>
              <p className="text-white/70">
                AI László fenntartja a jogot a jelen jogi nyilatkozat bármikori, egyoldalú módosítására. A módosítások a közzététel 
                időpontjától érvényesek. Kérjük, rendszeresen tájékozódjon a jogi nyilatkozat aktuális tartalmáról.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">10. Irányadó jog</h2>
              <p className="text-white/70">
                A weboldal használatával kapcsolatos jogviszonyokra a magyar jog, különösen a Polgári Törvénykönyv, az Eker. tv., 
                az Szjt., valamint a GDPR és az Infotv. rendelkezései az irányadók.
              </p>
              
              <p className="text-white/70 mt-8 border-t border-white/10 pt-8">
                Jelen jogi nyilatkozat 2025. május 13. napjától hatályos.
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Jogszabályi háttér:</h3>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li>2001. évi CVIII. törvény az elektronikus kereskedelmi szolgáltatásokról (Eker. tv.)</li>
                <li>1999 évi LXXVI. törvény a szerzői jogról (Szjt.)</li>
                <li>2011 évi CXII. törvény az információs önrendelkezési jogról (Infotv.)</li>
                <li>2016/679/EU rendelet (GDPR)</li>
                <li>2013 évi V. törvény a Polgári Törvénykönyvről (Ptk.)</li>
              </ul>
            </div>
          </div>
        </ScrollRevealY>
      </div>
      
      <Footer />
    </div>
  );
};

export default Legal;
