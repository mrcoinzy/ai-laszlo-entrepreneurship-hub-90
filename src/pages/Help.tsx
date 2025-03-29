
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Search } from "lucide-react";

const Help = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // FAQ data
  const faqs = [
    {
      question: "How do I track time for a project?",
      answer: "You can track time for a project by navigating to the Projects page, finding the project you want to track time for, and clicking the 'Start Working' button. This will start the timer for that specific project. When you're done, click 'Stop Working' to end the timer."
    },
    {
      question: "How do I accept a new client?",
      answer: "To accept a new client, go to the Clients tab in your admin panel and look for the 'Incoming Clients' section. Find the client you want to accept and click the 'Accept' button. This will move them to your active clients list and automatically notify them via email."
    },
    {
      question: "Can I customize the dashboard view?",
      answer: "Yes, you can customize your dashboard view by going to the Settings page and selecting the 'Dashboard' tab. From there, you can choose which widgets to display and rearrange them according to your preferences."
    },
    {
      question: "How do I generate an invoice?",
      answer: "To generate an invoice, navigate to the Billing page and click on the 'Create Invoice' button. Fill in the required information including client details, services provided, and amounts. You can then preview the invoice before sending it to your client."
    },
    {
      question: "How do I communicate with clients?",
      answer: "You can communicate with clients through the Messages section. Simply select the client you want to communicate with from your contacts list, type your message, and click send. All conversations are saved for future reference."
    },
    {
      question: "How do I change my password?",
      answer: "To change your password, go to the Settings page and select the 'Account' tab. Scroll down to the 'Password' section, enter your current password, and then your new password twice to confirm. Click 'Update Password' to save your changes."
    },
    {
      question: "What happens when I decline a client?",
      answer: "When you decline a client, they will automatically receive an email notification explaining that you are unable to take on their project at this time due to capacity constraints. They will be removed from your 'Incoming Clients' list."
    },
    {
      question: "How can I see my revenue statistics?",
      answer: "Your revenue statistics are displayed on the main Dashboard in the form of charts and graphs. For more detailed information, you can click on the revenue card to see a breakdown by month, client, or project type."
    }
  ];

  // Filter FAQs based on search query
  const filteredFaqs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 overflow-auto p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold gradient-text">Help Center</h1>
            <p className="text-white/70 mt-2">Find answers to your questions</p>
          </div>
          
          <Card className="bg-accent/30 border-accent mb-6">
            <CardContent className="pt-6">
              <div className="relative">
                <Input 
                  placeholder="Search for help topics..." 
                  className="bg-secondary/50 pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-accent/30 border-accent">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions and answers</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-white/70 mb-4">No results found for "{searchQuery}"</p>
                    <Button variant="outline" onClick={() => setSearchQuery("")}>Clear Search</Button>
                  </div>
                )}
              </Accordion>
            </CardContent>
          </Card>
          
          <Card className="bg-accent/30 border-accent mt-6">
            <CardHeader>
              <CardTitle>Still Need Help?</CardTitle>
              <CardDescription>We're here to assist you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white/80">
                If you couldn't find what you're looking for, feel free to reach out to our support team directly.
              </p>
              <Button>Contact Support</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Help;
