import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, Share2, Shuffle } from 'lucide-react';

interface Question {
  option1: string;
  option2: string;
}

const WouldYouRather = () => {
  const [question, setQuestion] = useState<Question | null>(null);

  const generate = () => {
    const questions = [
        { option1: "Have the ability to fly", option2: "Have the ability to read minds" },
        { option1: "Be able to time travel", option2: "Be able to teleport anywhere instantly" },
        { option1: "Live forever", option2: "Live a perfect life for 50 years" },
        { option1: "Be incredibly wealthy", option2: "Be incredibly famous" },
        { option1: "Have unlimited pizza for life", option2: "Have unlimited tacos for life" }
    ];
    setQuestion(questions[Math.floor(Math.random() * questions.length)]);
  };

  return (
    <div className="flex flex-col gap-8 h-full">
       <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
             <div className="p-2 bg-orange-50 rounded-lg text-orange-500"><HelpCircle className="w-5 h-5"/></div>
             Would You Rather?
          </h2>
          <Button onClick={generate} className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20">
             <Shuffle className="w-4 h-4 mr-2" />
             Next Question
          </Button>
       </div>

       <div className="flex-1 min-h-[400px] flex flex-col md:flex-row gap-4 md:gap-8">
           {question ? (
               <>
                  <div className="flex-1 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 flex items-center justify-center text-center shadow-xl shadow-blue-500/20 animate-in slide-in-from-left duration-500 cursor-pointer hover:scale-[1.02] transition-transform">
                      <div>
                          <span className="block text-blue-200 text-sm font-bold uppercase tracking-wider mb-4">Option A</span>
                          <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight">{question.option1}</h3>
                      </div>
                  </div>
                  
                  <div className="flex items-center justify-center text-2xl font-black text-slate-300 italic">OR</div>
                  
                  <div className="flex-1 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-8 flex items-center justify-center text-center shadow-xl shadow-orange-500/20 animate-in slide-in-from-right duration-500 cursor-pointer hover:scale-[1.02] transition-transform">
                      <div>
                          <span className="block text-red-100 text-sm font-bold uppercase tracking-wider mb-4">Option B</span>
                          <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight">{question.option2}</h3>
                      </div>
                  </div>
               </>
           ) : (
               <div className="w-full h-full rounded-3xl bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400">
                   <p className="text-xl font-medium">Click "Next Question" to start</p>
               </div>
           )}
       </div>
    </div>
  );
};

export default WouldYouRather;