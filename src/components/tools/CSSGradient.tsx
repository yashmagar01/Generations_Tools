import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, Copy, Layers } from 'lucide-react';
import { toast } from 'sonner';

type GradientType = 'linear' | 'radial' | 'conic';

const CSSGradient = () => {
  const [gradient, setGradient] = useState('');
  const [gradientCSS, setGradientCSS] = useState('');
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
    let css = '';
    const colorString = colors.join(', ');

    switch (type) {
        case 'linear':
            css = `linear-gradient(${angle}deg, ${colorString})`;
            break;
        case 'radial':
            css = `radial-gradient(circle, ${colorString})`;
            break;
        case 'conic':
            css = `conic-gradient(from ${angle}deg, ${colorString})`;
            break;
    }

    setGradient(css);
    setGradientCSS(`background: ${css};`);
  }, [type, angle, colors]);

  // Initial generation
  useEffect(() => {
      generateRandomColors();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(gradientCSS);
    toast.success("CSS copied to clipboard!");
  };

  return (
    <Card className="p-6 animate-fade-in shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="text-3xl bg-violet-100 p-2 rounded-lg">🌈</div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">CSS Gradient</h2>
            <p className="text-gray-600">Advanced gradient generator</p>
          </div>
        </div>
        
        <div className="w-40">
           <Select value={type} onValueChange={(v: GradientType) => setType(v)}>
             <SelectTrigger>
               <SelectValue placeholder="Type" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="linear">Linear</SelectItem>
               <SelectItem value="radial">Radial</SelectItem>
               <SelectItem value="conic">Conic</SelectItem>
             </SelectContent>
           </Select>
        </div>
      </div>
      
      <div className="space-y-6">
        <div 
            className="h-64 rounded-2xl shadow-inner border border-gray-100 transition-all duration-500"
            style={{ background: gradient }}
        />

        <div className="space-y-4">
             {type !== 'radial' && (
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600 font-medium">
                        <span>Angle</span>
                        <span>{angle}°</span>
                    </div>
                    <Slider 
                        value={[angle]} 
                        min={0} 
                        max={360} 
                        step={1} 
                        onValueChange={(vals) => setAngle(vals[0])}
                        className="cursor-pointer"
                    />
                </div>
             )}

             <div className="flex gap-3">
                <Button 
                    onClick={generateRandomColors}
                    variant="outline"
                    className="flex-1 h-12 border-violet-200 text-violet-700 hover:bg-violet-50"
                >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Randomize Colors
                </Button>
                
                <Button 
                    onClick={copyToClipboard}
                    className="flex-[2] h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold shadow-md"
                >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy CSS
                </Button>
             </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 overflow-x-auto relative group">
              <code className="text-sm font-mono text-violet-300 whitespace-nowrap">
                {gradientCSS}
              </code>
        </div>
      </div>
    </Card>
  );
};

export default CSSGradient;