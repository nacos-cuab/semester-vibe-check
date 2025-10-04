import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: { label: string; value: string; emoji: string }[];
}

const questions: Question[] = [
  {
    id: "vibe",
    question: "What's your vibe this semester?",
    options: [
      { label: "I'll attend all classes", value: "dedicated", emoji: "📚" },
      { label: "I just dey survive", value: "survivor", emoji: "😅" },
      { label: "Came for vibes only", value: "chilling", emoji: "🎉" },
      { label: "Sleep > Everything", value: "sleeper", emoji: "😴" },
    ],
  },
  {
    id: "course",
    question: "Which course are you most scared of?",
    options: [
      { label: "Automata Theory", value: "automata", emoji: "🤖" },
      { label: "Operating Systems", value: "os", emoji: "💻" },
      { label: "Algorithms & Data Structures", value: "algo", emoji: "📊" },
      { label: "All of them tbh", value: "all", emoji: "😰" },
    ],
  },
  {
    id: "allnighters",
    question: "How many all-nighters will you pull?",
    options: [
      { label: "0 - I value my health", value: "zero", emoji: "😇" },
      { label: "1-3 - Only when necessary", value: "few", emoji: "🌙" },
      { label: "5+ - It's giving chaos", value: "many", emoji: "☕" },
      { label: "I've lost count already", value: "infinite", emoji: "💀" },
    ],
  },
  {
    id: "study",
    question: "Your study strategy is:",
    options: [
      { label: "Start early, stay consistent", value: "early", emoji: "✅" },
      { label: "Day before exam cramming", value: "cram", emoji: "📖" },
      { label: "Stack Overflow is my textbook", value: "stackoverflow", emoji: "🔍" },
      { label: "Wing it and pray", value: "wing", emoji: "🙏" },
    ],
  },
  {
    id: "goal",
    question: "One word that sums up your goal this semester:",
    options: [
      { label: "Survive", value: "survive", emoji: "🛡️" },
      { label: "Excel", value: "excel", emoji: "🏆" },
      { label: "Graduate", value: "graduate", emoji: "🎓" },
      { label: "Sleep", value: "sleep", emoji: "💤" },
    ],
  },
];

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleAnswer = (value: string) => {
    setSelectedOption(value);
    const newAnswers = {
      ...answers,
      [questions[currentQuestion].id]: value,
    };
    setAnswers(newAnswers);

    // Auto-advance after a brief delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(newAnswers[questions[currentQuestion + 1]?.id] || "");
      } else {
        // Store answers and navigate to results
        localStorage.setItem("quizAnswers", JSON.stringify(newAnswers));
        navigate("/results");
      }
    }, 400);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[questions[currentQuestion - 1].id] || "");
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <main className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question card */}
        <Card className="bg-gradient-card border-border shadow-card p-8 animate-scale-in">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all hover:scale-102 hover:shadow-glow animate-slide-up ${
                  selectedOption === option.value
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card/50 hover:border-primary/50"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="text-lg font-medium text-foreground">
                    {option.label}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className="text-muted-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              variant="ghost"
              onClick={() => selectedOption && handleAnswer(selectedOption)}
              disabled={!selectedOption}
              className="text-primary"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default Quiz;
