import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-card to-background">
        <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
          {/* Hero badge */}
          <div className="inline-flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 animate-slide-up">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Semester Kickoff Edition</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-black text-foreground leading-tight">
            Your <span className="bg-gradient-primary bg-clip-text text-transparent">Student</span>
            <br />
            <span className="bg-gradient-secondary bg-clip-text text-transparent">Kickoff Wrap</span>
            <span className="text-4xl ml-2">🎓</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            Get your personalized semester forecast! Find out your stress levels, survival mode, and which CS course will humble you this term. 
          </p>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="bg-gradient-card border border-border rounded-xl p-4 shadow-card animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <TrendingUp className="w-6 h-6 text-primary mb-2 mx-auto" />
              <h3 className="font-semibold text-foreground">Stress Prediction</h3>
              <p className="text-sm text-muted-foreground mt-1">See what's coming</p>
            </div>
            <div className="bg-gradient-card border border-border rounded-xl p-4 shadow-card animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <Zap className="w-6 h-6 text-secondary mb-2 mx-auto" />
              <h3 className="font-semibold text-foreground">Your Role</h3>
              <p className="text-sm text-muted-foreground mt-1">Find your archetype</p>
            </div>
            <div className="bg-gradient-card border border-border rounded-xl p-4 shadow-card animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <Sparkles className="w-6 h-6 text-accent mb-2 mx-auto" />
              <h3 className="font-semibold text-foreground">Fortune</h3>
              <p className="text-sm text-muted-foreground mt-1">Get your prophecy</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Button
              onClick={() => navigate("/quiz")}
              size="lg"
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-bold text-lg px-8 py-6 rounded-full shadow-glow transition-all hover:scale-105"
            >
              Start Your Wrap ✨
            </Button>
            <p className="text-sm text-muted-foreground mt-4">Takes less than 2 minutes</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
