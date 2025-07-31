import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EbookNavigation from "@/components/EbookNavigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Download, Shield, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
const EbookPayment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Kérjük, töltse ki az összes mezőt!");
      return;
    }
    setIsSubmitting(true);
    try {
      // Insert into database
      const {
        error: dbError
      } = await supabase.from('ebook_purchases').insert([{
        name: formData.name.trim(),
        email: formData.email.trim(),
        status: 'pending'
      }]);
      if (dbError) {
        console.error('Database error:', dbError);
        toast.error("Hiba történt az adatok mentése során. Kérjük, próbálja újra!");
        return;
      }

      // Send confirmation email
      const {
        error: emailError
      } = await supabase.functions.invoke('send-ebook-payment-confirmation', {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim()
        }
      });
      if (emailError) {
        console.error('Email error:', emailError);
        toast.error("Az email küldése sikertelen, de a rendelés rögzítve lett!");
      } else {
        toast.success("Sikeres rendelés! Elküldtük a fizetési utasításokat emailben.");
      }

      // Redirect to success page or reset form
      setFormData({
        name: "",
        email: ""
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast.error("Hiba történt a rendelés során. Kérjük, próbálja újra!");
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="min-h-screen bg-background">
      <EbookNavigation />
      
      <div className="container mx-auto px-4 py-10 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              E-book Megrendelés
            </h1>
            <p className="text-white/70 text-lg">Szerezze be az "tanulj úgy, mint aki 2030-ban el - de ne bukj le a tanárnál" e-book-ot és tanuld meg, hogyan használj hatékonyan az AI-t a tanulmányaidhoz</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* E-book Details */}
            <Card className="bg-card/50 border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                    Digitális E-book
                  </Badge>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">4.990 Ft</div>
                  </div>
                </div>
                <CardTitle className="text-xl text-white">
                  Tanulj úgy, mint aki 2030-ban él, de ne bukj le a tanárnál!
                </CardTitle>
                <CardDescription className="text-white/70">
                  A jövő iskolai trükkjei ma, AI-val, egyszerűen.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[3/4] bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg overflow-hidden mb-6">
                  <img src="/lovable-uploads/7c6fb6a2-d14f-41d7-afe8-8c8096419975.png" alt="Tanulj úgy, mint aki 2030-ban él" className="w-full h-full object-cover" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-400" />
                    <span className="text-white/80">Rengeteg gyakorlati tanács</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-400" />
                    <span className="text-white/80">Valós esettanulmányok</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-400" />
                    <span className="text-white/80">Lépésről-lépésre útmutatók</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-400" />
                    <span className="text-white/80">2025-ös legfrissebb trendek</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Purchase Form */}
            <Card className="bg-card/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-xl text-white">
                  Rendelési Adatok
                </CardTitle>
                <CardDescription className="text-white/70">
                  Adja meg az adatait a megrendeléshez
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Teljes név *
                    </Label>
                    <Input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} placeholder="Írja be a teljes nevét" required className="bg-background/50 border-white/20 text-white placeholder:text-white/50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email cím *
                    </Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="példa@email.com" required className="bg-background/50 border-white/20 text-white placeholder:text-white/50" />
                  </div>

                  <div className="bg-blue-950/30 p-4 rounded-lg border border-blue-500/20">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Shield size={18} className="text-blue-400" />
                      Fizetési Információk
                    </h4>
                    <div className="space-y-2 text-sm text-white/80">
                      <div>
                        <strong>Bankszámlaszám:</strong> 12345678-12345678-12345678
                      </div>
                      <div>
                        <strong>Összeg:</strong> 4.990 Ft
                      </div>
                      <div>
                        <strong>Közlemény:</strong> [Az Ön neve] - E-book megrendelés
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-950/30 p-4 rounded-lg border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={18} className="text-green-400" />
                      <span className="text-white font-semibold">Automatikus email</span>
                    </div>
                    <p className="text-sm text-white/80">
                      Azonnal küldünk egy email-t a fizetési utasításokkal. 
                      Az e-book-ot az utalás feldolgozása után 1-2 munkanapon belül küldjük ki.
                    </p>
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3">
                    {isSubmitting ? "Feldolgozás..." : "Megrendelés Elküldése"}
                  </Button>

                  <p className="text-xs text-white/60 text-center">
                    A megrendeléssel elfogadja az általános szerződési feltételeket és 
                    hozzájárul adatai kezeléséhez.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>;
};
export default EbookPayment;