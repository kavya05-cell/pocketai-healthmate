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
      <main id="main-content" className="container mx-auto px-4 py-6 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8 h-auto p-1">
            <TabsTrigger value="dashboard" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 text-xs sm:text-sm">
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Dashboard</span>
              <span className="xs:hidden">Stats</span>
            </TabsTrigger>
            <TabsTrigger value="symptoms" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 text-xs sm:text-sm">
              <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Symptoms</span>
              <span className="xs:hidden">Track</span>
            </TabsTrigger>
            <TabsTrigger value="habits" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 text-xs sm:text-sm">
              <Target className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Habits</span>
              <span className="xs:hidden">Goals</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <HealthDashboard />
          </TabsContent>
          
          <TabsContent value="symptoms">
            <SymptomTracker />
          </TabsContent>
          
          <TabsContent value="habits">
            <HabitTracker />
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Footer */}
      <footer className="border-t bg-muted/30 py-6 sm:py-8 mt-12 sm:mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
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
