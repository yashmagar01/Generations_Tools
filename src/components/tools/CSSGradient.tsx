import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, Copy, Layers, Palette } from 'lucide-react';
import { toast } from 'sonner';

type GradientType = 'linear' | 'radial' | 'conic';

const CSSGradient = () => {
  const [gradient, setGradient] = useState('');
  const [type, setType] = useState<GradientType>('linear');
  const [angle, setAngle] = useState(90);
  const [colors, setColors] = useState<string[]>(['#4158D0', '#C850C0', '#FFCC70']);

  const generateRandomColors = () => {
    const newColors = [];
    for (let i = 0; i < 3; i++) {
        newColors.push(`#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`);
    }
    setColors(newColors);
  };

  useEffect(() => {
    const colorString = colors.join(', ');
    let css = '';
    switch (type) {
        case 'linear': css = `linear-gradient(${angle}deg, ${colorString})`; break;
        case 'radial': css = `radial-gradient(circle, ${colorString})`; break;
        case 'conic': css = `conic-gradient(from ${angle}deg, ${colorString})`; break;
    }
    setGradient(css);
  }, [type, angle, colors]);

  useEffect(() => { generateRandomColors(); }, []);

  const copyCSS = () => {
    navigator.clipboard.writeText(`background: ${gradient};`);
    toast.success("CSS copied!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
       <Card className="lg:col-span-1 glass-card p-6 flex flex-col gap-6 h-fit">
          <div className="flex items-center gap-2 mb-2">
             <div className="p-2 bg-pink-50 rounded-lg text-pink-500"><Layers className="w-5 h-5"/></div>
             <h2 className="font-bold text-slate-800">Gradient Editor</h2>
          </div>

          <div className="space-y-6">
             <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400">Type</label>
                <Select value={type} onValueChange={(v: GradientType) => setType(v)}>
                   <SelectTrigger className="bg-white/50 border-slate-200"><SelectValue /></SelectTrigger>
                   <SelectContent>
                      <SelectItem value="linear">Linear</SelectItem>
                      <SelectItem value="radial">Radial</SelectItem>
                      <SelectItem value="conic">Conic</SelectItem>
                   </SelectContent>
                </Select>
             </div>

             {type !== 'radial' && (
                 <div className="space-y-4">
                    <div className="flex justify-between text-xs font-bold uppercase text-slate-400">
                        <span>Angle</span>
                        <span>{angle}°</span>
                    </div>
                    <Slider value={[angle]} min={0} max={360} step={1} onValueChange={(v) => setAngle(v[0])} className="cursor-pointer" />
                 </div>
             )}

             <div className="flex gap-3 pt-4 border-t border-slate-100">
                <Button onClick={generateRandomColors} variant="outline" className="flex-1 border-slate-200">
                   <Palette className="w-4 h-4 mr-2"/> Random
                </Button>
                <Button onClick={copyCSS} className="flex-[2] bg-slate-900 border-slate-200">
                   <Copy className="w-4 h-4 mr-2"/> Copy CSS
                </Button>
             </div>
          </div>
       </Card>

       <div className="lg:col-span-2 rounded-3xl overflow-hidden shadow-2xl relative min-h-[400px] flex items-center justify-center group" style={{ background: gradient }}>
           <div className="absolute inset-x-8 bottom-8 bg-black/30 backdrop-blur-md rounded-2xl p-4 text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
               <h3 className="text-xs font-bold uppercase text-white/50 mb-1">Preview CSS</h3>
               <code className="font-mono text-sm break-all">background: {gradient};</code>
           </div>
       </div>
    </div>
  );
};

export default CSSGradient;