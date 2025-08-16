import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, BarChart3 } from "lucide-react";
import heroImage from "@/assets/health-hero.jpg";

interface HeroSectionProps {
  onStartTracking?: () => void;
}

export const HeroSection = ({ onStartTracking }: HeroSectionProps) => {
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
      <div className="relative responsive-container py-16 md:py-20 lg:py-32 xl:py-40">
        <div className="max-w-none md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 lg:mb-8 leading-tight animate-fade-in">
            Your AI-Powered
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 animate-shimmer">
              Health Companion
            </span>
          </h2>
          
          <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl mb-6 md:mb-8 lg:mb-12 text-white/90 max-w-none md:max-w-3xl lg:max-w-4xl mx-auto animate-slide-up">
            Track symptoms, build healthy habits, and receive personalized preventive alerts 
            to stay ahead of your health journey.
          </p>
          
          <div className="flex justify-center mb-8 md:mb-12 lg:mb-16 animate-float">
            <Button 
              variant="hero" 
              size="lg" 
              className="group animate-bounce-subtle hover:animate-none hover-lift text-base md:text-lg lg:text-xl px-6 md:px-8 lg:px-12 py-3 md:py-4 lg:py-6" 
              onClick={onStartTracking}
            >
              Start Tracking Today
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-none md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto stagger-fade">
            <div className="flex flex-col items-center p-4 md:p-6 lg:p-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover-lift group animate-float">
              <Shield className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 mb-2 md:mb-3 lg:mb-4 text-white group-hover:scale-110 group-hover:animate-bounce-subtle transition-transform" />
              <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base lg:text-lg">Secure & Private</h3>
              <p className="text-xs md:text-sm lg:text-base text-white/80 text-center">
                Your health data is encrypted and stored securely
              </p>
            </div>
            
            <div className="flex flex-col items-center p-4 md:p-6 lg:p-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover-lift group animate-float" style={{animationDelay: '0.2s'}}>
              <Zap className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 mb-2 md:mb-3 lg:mb-4 text-white group-hover:scale-110 group-hover:animate-bounce-subtle transition-transform" />
              <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base lg:text-lg">Smart Alerts</h3>
              <p className="text-xs md:text-sm lg:text-base text-white/80 text-center">
                AI-powered preventive health recommendations
              </p>
            </div>
            
            <div className="flex flex-col items-center p-4 md:p-6 lg:p-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover-lift group md:col-span-2 lg:col-span-1 animate-float" style={{animationDelay: '0.4s'}}>
              <BarChart3 className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 mb-2 md:mb-3 lg:mb-4 text-white group-hover:scale-110 group-hover:animate-bounce-subtle transition-transform" />
              <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base lg:text-lg">Detailed Insights</h3>
              <p className="text-xs md:text-sm lg:text-base text-white/80 text-center">
                Comprehensive analytics of your health patterns
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};