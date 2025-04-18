
import { z } from "zod";

export const consultationFormSchema = z.object({
  name: z.string().min(2, { message: "A név legalább 2 karakter hosszú kell legyen" }),
  email: z.string().email({ message: "Érvénytelen email cím" }),
  website: z.string().optional(),
  businessType: z.string().min(1, { message: "Kérjük válasszon egy üzleti típust" }),
  businessDetails: z.string().optional(),
  mainGoal: z.string().min(1, { message: "Kérjük adja meg fő célját" }),
  onlinePresence: z.enum(["yes", "no", "social"], { 
    required_error: "Kérjük válasszon egy opciót" 
  }),
  biggestChallenge: z.string().min(5, { message: "Kérjük, fejtse ki bővebben" }),
  interestedServices: z.array(z.string()).min(1, { message: "Válasszon legalább egy szolgáltatást" }),
  budgetRange: z.array(z.number()).length(1, { message: "Kérjük állítsa be a költségvetési tartományt" })
});

export type ConsultationFormValues = z.infer<typeof consultationFormSchema>;
