
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface MultiStepFormProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
  isSubmitting?: boolean;
}

interface FormStepProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

const FormStep = ({ children, title, description, className }: FormStepProps) => (
  <div className={cn("w-full", className)}>
    {title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}
    {description && <p className="text-muted-foreground mb-6">{description}</p>}
    {children}
  </div>
);

const MultiStepForm = ({ children, onSubmit, className, isSubmitting = false }: MultiStepFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    // Filter valid FormStep components from children
    const validSteps = React.Children.toArray(children).filter(
      (child) => React.isValidElement(child) && child.type === FormStep
    ) as React.ReactElement[];
    
    setSteps(validSteps);
  }, [children]);

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  };

  const isLastStep = currentStep === steps.length - 1;

  // If onSubmit is provided, wrap in a form, otherwise just render the content
  const content = (
    <div className={cn("w-full", className)}>
      {/* Progress indicator */}
      <div className="w-full mb-8">
        <div className="flex justify-between items-center w-full">
          {steps.map((_, index) => (
            <React.Fragment key={index}>
              <button
                type="button"
                onClick={() => goToStep(index)}
                className={cn(
                  "flex flex-col items-center justify-center w-8 h-8 rounded-full transition-all duration-200",
                  currentStep >= index 
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    : "bg-white/10 text-white/40"
                )}
              >
                {index + 1}
              </button>
              
              {index < steps.length - 1 && (
                <div className={cn(
                  "h-[2px] flex-1 transition-all duration-300",
                  currentStep > index 
                    ? "bg-gradient-to-r from-purple-600 to-blue-600" 
                    : "bg-white/10"
                )} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative min-h-[400px] flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full grow flex flex-col"
          >
            {steps[currentStep]}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={prev}
            className={cn(
              "px-6 py-2 rounded-full border border-white/20 text-white/80 hover:bg-white/5 transition-all",
              currentStep === 0 && "invisible"
            )}
          >
            Vissza
          </button>
          
          {isLastStep ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-[0_8px_15px_-5px_rgba(138,43,226,0.5)] transition-all duration-300 hover:-translate-y-1",
                isSubmitting && "opacity-70 cursor-not-allowed"
              )}
            >
              {isSubmitting ? "Küldés folyamatban..." : "Konzultáció kérése"}
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-[0_8px_15px_-5px_rgba(138,43,226,0.5)] transition-all"
            >
              Tovább
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Return content wrapped in a form if onSubmit is provided
  if (onSubmit) {
    return (
      <form onSubmit={onSubmit} className={cn("w-full", className)}>
        {content}
      </form>
    );
  }

  return content;
};

export { MultiStepForm, FormStep };
