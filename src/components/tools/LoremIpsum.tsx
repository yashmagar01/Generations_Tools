import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { FileText, Copy, AlignLeft } from 'lucide-react';
import { copyToClipboard as nativeCopy } from '@/lib/native';

const LoremIpsum = () => {
  const [text, setText] = useState('');
  const [paragraphs, setParagraphs] = useState(3);
  
  const generateLorem = () => {
    const loremWords = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'curabitur', 'velit', 'ex', 'massa'];
    let result = '';
    for (let p = 0; p < paragraphs; p++) {
       let para = '';
       for(let s=0; s<5; s++) {
          for(let w=0; w<8; w++) {
             const word = loremWords[Math.floor(Math.random() * loremWords.length)];
             para += (w===0 ? word.charAt(0).toUpperCase() + word.slice(1) : word) + ' ';
          }
          para = para.trim() + '. ';
       }
       result += para + '\n\n';
    }
    setText(result.trim());
  };

  const handleCopy = async () => {
    if(!text) { generateLorem(); return; } // Auto generate if empty
    const success = await nativeCopy(text);
    if (success) {
      toast.success("Copied!");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
       <Card className="lg:col-span-1 glass-card p-6 flex flex-col gap-6 h-fit">
          <div className="flex items-center gap-2 mb-2">
             <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><AlignLeft className="w-5 h-5"/></div>
             <h2 className="font-bold text-slate-800">Text Generator</h2>
          </div>

          <div className="space-y-4">
             <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase text-slate-400">
                   <span>Paragraphs</span>
                   <span>{paragraphs}</span>
                </div>
                <Input 
                   type="range" min="1" max="10" 
                   value={paragraphs} 
                   onChange={(e) => setParagraphs(parseInt(e.target.value))}
                   className="cursor-pointer accent-blue-500 h-2 bg-slate-100 rounded-lg appearance-none"
                />
             </div>
             
             <Button onClick={generateLorem} className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20">
                <FileText className="w-4 h-4 mr-2"/> Generate Text
             </Button>
          </div>
       </Card>

       <div className="lg:col-span-2 relative min-h-[500px]">
           <div className="absolute inset-0 bg-white shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-100 p-8 overflow-y-auto">
               <div className="prose prose-slate max-w-none">
                  {text ? (
                     text.split('\n\n').map((p, i) => (
                        <p key={i} className="text-slate-600 leading-relaxed mb-4 animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${i*100}ms` }}>
                           {p}
                        </p>
                     ))
                  ) : (
                     <div className="h-full flex flex-col items-center justify-center text-slate-300">
                        <FileText className="w-16 h-16 mb-4 opacity-20" />
                        <p>Generated text will appear here</p>
                     </div>
                  )}
               </div>
               
               {text && (
                  <Button onClick={handleCopy} size="icon" className="absolute top-4 right-4 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 shadow-sm">
                     <Copy className="w-4 h-4" />
                  </Button>
               )}
           </div>
           
           {/* Document Stack Effect */}
           <div className="absolute top-2 left-2 right-2 bottom-0 bg-white rounded-3xl border border-slate-200 -z-10 translate-y-2 shadow-sm" />
           <div className="absolute top-4 left-4 right-4 bottom-0 bg-white rounded-3xl border border-slate-200 -z-20 translate-y-4 shadow-sm" />
       </div>
    </div>
  );
};

export default LoremIpsum;