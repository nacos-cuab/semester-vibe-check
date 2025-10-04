import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Share2, RotateCcw, Download } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";

interface ResultData {
  stressLevel: number;
  stressMessage: string;
  role: string;
  fortune: string;
  badge: string;
}

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<ResultData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const answersJson = localStorage.getItem("quizAnswers");
    if (!answersJson) {
      navigate("/");
      return;
    }

    const answers = JSON.parse(answersJson);
    const calculatedResults = calculateResults(answers);
    
    setTimeout(() => {
      setResults(calculatedResults);
      setIsLoading(false);
    }, 1500);
  }, [navigate]);

  const calculateResults = (answers: Record<string, string>): ResultData => {
    // Stress level calculation
    const stressFactors = {
      vibe: { dedicated: 60, survivor: 75, chilling: 40, sleeper: 30 },
      course: { automata: 90, os: 80, algo: 85, all: 95 },
      allnighters: { zero: 40, few: 65, many: 85, infinite: 99 },
      study: { early: 50, cram: 80, stackoverflow: 70, wing: 90 },
    };

    let totalStress = 0;
    let count = 0;

    for (const [key, value] of Object.entries(answers)) {
      if (key !== "goal" && stressFactors[key as keyof typeof stressFactors]) {
        const factor = stressFactors[key as keyof typeof stressFactors];
        totalStress += factor[value as keyof typeof factor] || 50;
        count++;
      }
    }

    const stressLevel = Math.round(totalStress / count);

    // Stress message
    const stressMessages = {
      automata: "Automata Theory will humble you",
      os: "Operating Systems gonna test your patience",
      algo: "Those algorithms won't solve themselves",
      all: "Every course picked violence this semester",
    };
    const stressMessage = stressMessages[answers.course as keyof typeof stressMessages] || "This semester is giving main character energy";

    // Role calculation - randomized student archetypes
    const roles = [
      "Debugger Wizard 🧙‍♂️",
      "Last-Minute Coder ⏰",
      "Stack Overflow Prophet 📖",
      "Jollof-Driven Dev 🍛",
      "Power Outage Survivor 💡",
      "Infinite Loop Master 🔄",
      "Compiler Victim 🤯",
      "All-Nighter Ninja 🌙",
      "Coffee-Powered Coder ☕",
      "Group Project Ghost 👻",
      "Hello World Hero 🌍",
      "Syntax Error Machine ❌",
      "Git Commit Philosopher 📝",
      "Bug Smasher 🔨🐛",
      "The Eternal Fresher 🍼",
    ];

    // Use answer-based seed for consistent but varied results
    const roleSeed = Object.values(answers).join("").length;
    const role = roles[roleSeed % roles.length];

    // Fortune generation - funny predictions
    const fortunes = [
      "By Week 6, you'll wonder if Java has a personal beef with you",
      "Your GPA is loading… pray your power supply doesn't interrupt",
      "You will meet your true love… in Compiler Construction",
      "Stack Overflow will save your life 27 times this semester",
      "Your lecturer will ask for an assignment you didn't even know existed",
      "Your code will run perfectly… during the demo only",
      "Sleep will become a myth — like unicorns and bug-free code",
      "You'll start Automata strong… and end it speaking in hieroglyphics",
      "By week 6, you'll realize sleep is a luxury",
      "Your IDE will become your best friend",
      "Coffee consumption will reach unprecedented levels",
      "You'll debug code in your dreams",
      "Group projects will test your patience",
      "The syllabus is more of a suggestion anyway",
      "Your laptop fan will work overtime",
    ];

    // Use answer-based seed for consistent results per session
    const fortuneSeed = Object.values(answers).join("").charCodeAt(0) || 0;
    const fortune = fortunes[fortuneSeed % fortunes.length];

    // Emoji Badge
    const badges = [
      "📚💻☕",
      "🐛🔨🔥",
      "🛌⚡📘",
      "😭🍞📶",
      "🤓🎧⌨️",
      "🧃🍜💡",
      "🎓🔥💪",
      "😴📱✨",
      "🚀💡🎯",
      "🌙⚡📖",
    ];

    const badgeSeed = Object.keys(answers).length * Object.values(answers).join("").length;
    const badge = badges[badgeSeed % badges.length];

    return { stressLevel, stressMessage, role, fortune, badge };
  };

  const handleDownload = async () => {
    const element = document.getElementById("results-card");
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: "#1a1625",
        scale: 2,
      });
      
      const link = document.createElement("a");
      link.download = "my-semester-wrap.png";
      link.href = canvas.toDataURL();
      link.click();
      
      toast.success("Downloaded! Share it with your friends 🎉");
    } catch (error) {
      toast.error("Failed to download. Try screenshot instead!");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Student Kickoff Wrap",
          text: `Just got my semester forecast! ${results?.stressLevel}% stress incoming 😅`,
          url: window.location.origin,
        });
      } catch (error) {
        toast.info("Sharing cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.origin);
      toast.success("Link copied! Share with your classmates");
    }
  };

  const handleTryAgain = () => {
    localStorage.removeItem("quizAnswers");
    navigate("/quiz");
  };

  if (isLoading || !results) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 animate-pulse">
          <div className="text-6xl">🔮</div>
          <h2 className="text-2xl font-bold text-foreground">Calculating your semester forecast...</h2>
          <p className="text-muted-foreground">Reading the vibes ✨</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background p-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Results Card */}
        <Card
          id="results-card"
          className="bg-gradient-card border-border shadow-card p-8 mb-6 animate-scale-in"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2">
              Your Semester Kickoff Report 💻🔥
            </h1>
            <div className="text-4xl mb-4">{results.badge}</div>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            {/* Stress Level */}
            <div className="bg-background/50 rounded-xl p-6 border border-border">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">STRESS PREDICTION</h3>
              <div className="flex items-end gap-3 mb-3">
                <span className="text-5xl font-black text-primary">{results.stressLevel}%</span>
                <span className="text-lg text-muted-foreground mb-2">chance</span>
              </div>
              <p className="text-lg text-foreground font-medium">{results.stressMessage}</p>
            </div>

            {/* Role */}
            <div className="bg-background/50 rounded-xl p-6 border border-border">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">YOUR SEMESTER ROLE</h3>
              <p className="text-2xl font-bold text-foreground">{results.role}</p>
            </div>

            {/* Fortune */}
            <div className="bg-background/50 rounded-xl p-6 border border-border">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">SEMESTER FORTUNE</h3>
              <p className="text-lg text-foreground italic">"{results.fortune}"</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Generated by Student Kickoff Wrap ✨
            </p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 animate-slide-up">
          <Button
            onClick={handleDownload}
            className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button
            onClick={handleShare}
            className="bg-gradient-secondary hover:opacity-90 text-secondary-foreground font-semibold"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button
            onClick={handleTryAgain}
            variant="outline"
            className="border-border hover:bg-card font-semibold"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Results;
