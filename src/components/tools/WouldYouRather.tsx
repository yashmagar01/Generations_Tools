import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Question {
  option1: string;
  option2: string;
}

const WouldYouRather = () => {
  const [question, setQuestion] = useState<Question | null>(null);

  const questions: Question[] = [
    { option1: "Have the ability to fly", option2: "Have the ability to read minds" },
    { option1: "Be able to time travel", option2: "Be able to teleport anywhere instantly" },
    { option1: "Live forever", option2: "Live a perfect life for 50 years" },
    { option1: "Be incredibly wealthy", option2: "Be incredibly famous" },
    { option1: "Have unlimited pizza for life", option2: "Have unlimited tacos for life" },
    { option1: "Always be 10 minutes late", option2: "Always be 20 minutes early" },
    { option1: "Speak every language fluently", option2: "Play every musical instrument perfectly" },
    { option1: "Live in the mountains", option2: "Live by the ocean" },
    { option1: "Have super strength", option2: "Have super intelligence" },
    { option1: "Never use the internet again", option2: "Never watch TV/movies again" },
    { option1: "Be the funniest person alive", option2: "Be the smartest person alive" },
    { option1: "Always tell the truth", option2: "Always lie" },
    { option1: "Be able to control fire", option2: "Be able to control water" },
    { option1: "Live in a world without music", option2: "Live in a world without colors" },
    { option1: "Have dinner with your hero", option2: "Have dinner with your worst enemy" }
  ];

  const generateQuestion = () => {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setQuestion(randomQuestion);
  };

  const shareQuestion = () => {
    if (question && navigator.share) {
      navigator.share({
        title: 'Would You Rather',
        text: `Would you rather: ${question.option1} OR ${question.option2}?`,
      });
    }
  };

  return (
    <Card className="p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">🤔</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Would You Rather</h2>
          <p className="text-gray-600">Fun question generator for conversations</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <Button 
          onClick={generateQuestion}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          🎲 Get Random Question
        </Button>
        
        {question && (
          <div className="mt-6 animate-scale-in">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-xl border border-yellow-200">
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Would you rather...</h3>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-400 shadow-sm">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🅰️</span>
                    <p className="text-lg text-gray-800 font-medium">{question.option1}</p>
                  </div>
                </div>
                
                <div className="text-center text-3xl font-bold text-yellow-600">OR</div>
                
                <div className="bg-white p-4 rounded-lg border-l-4 border-orange-400 shadow-sm">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🅱️</span>
                    <p className="text-lg text-gray-800 font-medium">{question.option2}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                {navigator.share && (
                  <Button
                    onClick={shareQuestion}
                    variant="outline"
                    className="border-yellow-300 text-yellow-700 hover:bg-yellow-100"
                  >
                    📤 Share Question
                  </Button>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-3 text-center">
              💭 Perfect icebreaker for parties and conversations!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default WouldYouRather;