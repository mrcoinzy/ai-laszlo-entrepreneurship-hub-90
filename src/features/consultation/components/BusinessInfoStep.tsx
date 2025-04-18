
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ConsultationFormValues } from "../schema";

interface BusinessInfoStepProps {
  form: UseFormReturn<ConsultationFormValues>;
}

export const BusinessInfoStep = ({ form }: BusinessInfoStepProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="businessType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Vállalkozás típusa</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="border-white/20 bg-white/5 text-white">
                  <SelectValue placeholder="Válasszon egy típust" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="border-white/20 bg-black/90 backdrop-blur-lg text-white">
                <SelectItem value="service">Szolgáltató</SelectItem>
                <SelectItem value="webshop">Webáruház</SelectItem>
                <SelectItem value="coach">Coach / Tanácsadó</SelectItem>
                <SelectItem value="realestate">Ingatlan</SelectItem>
                <SelectItem value="startup">Startup</SelectItem>
                <SelectItem value="restaurant">Vendéglátás</SelectItem>
                <SelectItem value="other">Egyéb</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch("businessType") === "other" && (
        <FormField
          control={form.control}
          name="businessDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Egyéb vállalkozás részletei</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  placeholder="Kérjük, írja le a vállalkozás típusát" 
                  className="border-white/20 bg-white/5 text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="onlinePresence"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-white">Jelenlegi online jelenlét</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-2"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="yes" className="border-white/30 text-purple-500" />
                  </FormControl>
                  <FormLabel className="font-normal text-white">
                    Van weboldalam és aktív közösségi média jelenlétem
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="social" className="border-white/30 text-purple-500" />
                  </FormControl>
                  <FormLabel className="font-normal text-white">
                    Csak közösségi médián vagyok jelen
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="no" className="border-white/30 text-purple-500" />
                  </FormControl>
                  <FormLabel className="font-normal text-white">
                    Nincs online jelenlétem
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
