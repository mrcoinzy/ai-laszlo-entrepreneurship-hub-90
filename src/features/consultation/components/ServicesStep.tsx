
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { UseFormReturn } from "react-hook-form";
import { ConsultationFormValues } from "../schema";

interface ServicesStepProps {
  form: UseFormReturn<ConsultationFormValues>;
}

export const ServicesStep = ({ form }: ServicesStepProps) => {
  const formatBudget = (value: number) => {
    return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: 'HUF',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="interestedServices"
        render={() => (
          <FormItem>
            <div className="mb-2">
              <FormLabel className="text-white">Milyen szolgáltatások érdeklik? (több is választható)</FormLabel>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { id: "website", label: "Weboldal fejlesztés" },
                { id: "strategy", label: "Marketing stratégia" },
                { id: "ads", label: "Online hirdetések" },
                { id: "video", label: "Videó marketing" },
                { id: "seo", label: "SEO optimalizálás" },
                { id: "notsure", label: "Még nem tudom pontosan" }
              ].map((service) => (
                <FormField
                  key={service.id}
                  control={form.control}
                  name="interestedServices"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={service.id}
                        className="flex flex-row items-start space-x-3 space-y-0 border border-white/10 p-3 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(service.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, service.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== service.id
                                    )
                                  )
                            }}
                            className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-white">
                          {service.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="budgetRange"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white mb-6 block">
              Tervezett költségvetési keret (opcionális)
            </FormLabel>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-white/70">
                <span>0 Ft</span>
                <span>2,900,000 Ft</span>
              </div>
              <FormControl>
                <Slider
                  min={0}
                  max={2900000}
                  step={100000}
                  value={field.value}
                  onValueChange={field.onChange}
                  className="w-full"
                />
              </FormControl>
              <div className="text-center font-medium text-lg text-white">
                {formatBudget(field.value[0])}
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="p-4 border border-blue-500/20 bg-blue-500/5 rounded-lg mt-8">
        <p className="text-blue-300 text-sm">
          24 órán belül személyre szabott válasszal keresem a megadott email címen.
        </p>
      </div>
    </div>
  );
};
