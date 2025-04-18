
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ConsultationFormValues } from "../schema";

interface GoalsStepProps {
  form: UseFormReturn<ConsultationFormValues>;
}

export const GoalsStep = ({ form }: GoalsStepProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="mainGoal"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Fő cél a konzultációval</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                placeholder="Pl. Szeretném növelni az online értékesítést, vagy új weboldalt szeretnék készíteni..." 
                className="border-white/20 bg-white/5 text-white min-h-[100px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="biggestChallenge"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Legnagyobb jelenlegi kihívás</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                placeholder="Milyen nehézségekkel küzd jelenleg az online jelenléttel vagy marketinggel kapcsolatban?" 
                className="border-white/20 bg-white/5 text-white min-h-[120px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
