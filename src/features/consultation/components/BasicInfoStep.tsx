
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ConsultationFormValues } from "../schema";

interface BasicInfoStepProps {
  form: UseFormReturn<ConsultationFormValues>;
}

export const BasicInfoStep = ({ form }: BasicInfoStepProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Név</FormLabel>
            <FormControl>
              <Input 
                {...field}
                placeholder="Teljes neve" 
                className="border-white/20 bg-white/5 text-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Email cím</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                type="email" 
                placeholder="email@pelda.hu" 
                className="border-white/20 bg-white/5 text-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="website"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Weboldal (opcionális)</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="https://az-on-oldala.hu" 
                className="border-white/20 bg-white/5 text-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
