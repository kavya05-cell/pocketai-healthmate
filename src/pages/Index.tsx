import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { HealthDashboard } from "@/components/HealthDashboard";
import { SymptomTracker } from "@/components/SymptomTracker";
import { HabitTracker } from "@/components/HabitTracker";
import { HealthAssistantSidebar } from "@/components/HealthAssistantSidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, AlertTriangle, Target, Bot } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleStartTracking = () => {
    setActiveTab("dashboard");
    // Scroll to dashboard section
    const dashboardElement = document.getElementById("main-content");
    if (dashboardElement) {
      dashboardElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <HeroSection onStartTracking={handleStartTracking} />
      
      {/* Main Content */}
      <main id="main-content" className="responsive-container py-6 md:py-8 lg:py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-none">
          <TabsList className="grid w-full grid-cols-3 mb-6 md:mb-8 lg:mb-12 h-auto p-1 mx-auto max-w-2xl md:max-w-4xl lg:max-w-none">
            <TabsTrigger value="dashboard" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-2 md:py-3 text-xs md:text-sm hover-lift group">
              <BarChart3 className="h-3 w-3 md:h-4 md:w-4 group-hover:animate-bounce-subtle transition-transform" />
              <span className="hidden xs:inline">Dashboard</span>
              <span className="xs:hidden">Stats</span>
            </TabsTrigger>
            <TabsTrigger value="symptoms" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-2 md:py-3 text-xs md:text-sm hover-lift group">
              <AlertTriangle className="h-3 w-3 md:h-4 md:w-4 group-hover:animate-bounce-subtle transition-transform" />
              <span className="hidden xs:inline">Symptoms</span>
              <span className="xs:hidden">Track</span>
            </TabsTrigger>
            <TabsTrigger value="habits" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-2 md:py-3 text-xs md:text-sm hover-lift group">
              <Target className="h-3 w-3 md:h-4 md:w-4 group-hover:animate-bounce-subtle transition-transform" />
              <span className="hidden xs:inline">Habits</span>
              <span className="xs:hidden">Goals</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="animate-fade-in">
            <HealthDashboard />
          </TabsContent>
          
          <TabsContent value="symptoms" className="animate-fade-in">
            <SymptomTracker />
          </TabsContent>
          
          <TabsContent value="habits" className="animate-fade-in">
            <HabitTracker />
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Footer */}
      <footer className="border-t bg-muted/30 py-6 md:py-8 lg:py-12 mt-12 md:mt-16 lg:mt-24">
        <div className="responsive-container text-center">
          <p className="text-xs md:text-sm lg:text-base text-muted-foreground animate-fade-in">
            © 2024 PocketAI HealthMate. Your privacy and health data are secure.
          </p>
        </div>
      </footer>

      {/* Floating Chatbot Button */}
      <div className="fixed bottom-4 right-4 z-40 group">
        <Button
          onClick={() => setIsChatbotOpen(true)}
          className="h-16 w-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow gradient-primary border-2 border-white/20 group relative"
          size="icon"
        >
          <Bot className="h-7 w-7 text-white group-hover:scale-110 transition-transform" />
        </Button>
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-background border rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          <span className="text-sm text-foreground">text goes here</span>
        </div>
      </div>

      {/* Health Assistant Sidebar */}
      <HealthAssistantSidebar 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)} 
      />
    </div>
  );
};

export default Index;
