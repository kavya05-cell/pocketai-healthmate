import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, BarChart3, Send } from "lucide-react";
import heroImage from "@/assets/health-hero.jpg";
import { HealthAssistantSidebar } from "./HealthAssistantSidebar";

interface HeroSectionProps {
  onStartTracking?: () => void;
}

export const HeroSection = ({ onStartTracking }: HeroSectionProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setIsSidebarOpen(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Health tracking dashboard" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-16 sm:py-20 lg:py-32">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Your AI-Powered
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
              Health Companion
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto px-4">
            Track symptoms, build healthy habits, and receive personalized preventive alerts 
            to stay ahead of your health journey.
          </p>
          
          <div className="flex flex-col gap-4 sm:gap-6 justify-center mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            <Button 
              variant="hero" 
              size="lg" 
              className="group w-full sm:w-auto" 
              onClick={onStartTracking}
            >
              Start Tracking Today
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            {/* Health Assistant Input */}
            <div className="relative">
              <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Talk to your personal health assistant"
                  className="flex-1 bg-transparent text-white placeholder:text-white/70 border-none outline-none text-sm"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-white/10 flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10"
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4">
            <div className="flex flex-col items-center p-4 sm:p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 mb-2 sm:mb-3 text-white" />
              <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Secure & Private</h3>
              <p className="text-xs sm:text-sm text-white/80 text-center">
                Your health data is encrypted and stored securely
              </p>
            </div>
            
            <div className="flex flex-col items-center p-4 sm:p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Zap className="h-6 w-6 sm:h-8 sm:w-8 mb-2 sm:mb-3 text-white" />
              <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Smart Alerts</h3>
              <p className="text-xs sm:text-sm text-white/80 text-center">
                AI-powered preventive health recommendations
              </p>
            </div>
            
            <div className="flex flex-col items-center p-4 sm:p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 sm:col-span-2 lg:col-span-1">
              <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 mb-2 sm:mb-3 text-white" />
              <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Detailed Insights</h3>
              <p className="text-xs sm:text-sm text-white/80 text-center">
                Comprehensive analytics of your health patterns
              </p>
            </div>
          </div>
        </div>
      </div>

      <HealthAssistantSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </section>
  );
};