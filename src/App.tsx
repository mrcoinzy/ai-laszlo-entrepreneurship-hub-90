
import React from "react"
import { Routes, Route } from "react-router-dom"
import Index from "@/pages/Index"
import Consultation from "@/pages/Consultation"
import ConsultationThankYou from "@/pages/ConsultationThankYou"
import NotFound from "@/pages/NotFound"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/consultation-thankyou" element={<ConsultationThankYou />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default App
