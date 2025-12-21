import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Dices, Hash, Gauge, Copy } from 'lucide-react';
import { copyToClipboard as nativeCopy } from '@/lib/native';

const RandomNumber = () => {
  const [result, setResult] = useState<string>('?');
  const [min, setMin] = useState<number | string>(1);
  const [max, setMax] = useState<number | string>(100);
  const [config, setConfig] = useState({
      decimals: false,
      precision: 2,
      count: 1
  });

  const generate = () => {
    const minVal = Number(min);
    const maxVal = Number(max);
    if(isNaN(minVal) || isNaN(maxVal)) return toast.error("Invalid range");
    
    if(config.count === 1) {
       let num;
       if(config.decimals) {
         num = (Math.random() * (maxVal - minVal) + minVal).toFixed(config.precision);
       } else {
         num = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
       }
       setResult(num.toString());
    } else {
       // Multi generation logic simplified for UI demo
       const nums = Array.from({length: config.count}, () => Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal);
       setResult(nums.join(', '));
    }
  };

  const handleCopy = async () => {
     const success = await nativeCopy(result);
     if (success) {
       toast.success("Copied!");
     }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
       <Card className="lg:col-span-1 glass-card p-6 flex flex-col gap-6 h-fit">
          <div className="flex items-center gap-2 mb-2">
             <div className="p-2 bg-violet-100 rounded-lg text-violet-600"><Dices className="w-5 h-5"/></div>
             <h2 className="font-bold text-slate-800">Configuration</h2>
          </div>

          <div className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase text-slate-400">Min</label>
                   <Input type="number" value={min} onChange={e => setMin(e.target.value)} className="bg-white/50 border-slate-200" />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase text-slate-400">Max</label>
                   <Input type="number" value={max} onChange={e => setMax(e.target.value)} className="bg-white/50 border-slate-200" />
                </div>
             </div>
             
             <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                   <Checkbox id="dec" checked={config.decimals} onCheckedChange={(c) => setConfig({...config, decimals: c === true})} />
                   <label htmlFor="dec" className="text-sm text-slate-600">Include Decimals</label>
                </div>
             </div>

             <Button onClick={generate} className="w-full bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/20">
                Generate
             </Button>
          </div>
       </Card>

       <div className="lg:col-span-2 flex items-center justify-center p-8 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden min-h-[400px]">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:20px_20px]" />
          
          <div className="text-center relative z-10 animate-in fade-in zoom-in duration-300">
             <div className="text-[120px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-violet-500 to-indigo-600 leading-none select-all relative">
                 {result}
             </div>
             <Button variant="ghost" size="sm" onClick={handleCopy} className="mt-4 text-slate-400 hover:text-violet-600">
                <Copy className="w-4 h-4 mr-2" /> Copy Result
             </Button>
          </div>
       </div>
    </div>
  );
};

export default RandomNumber;