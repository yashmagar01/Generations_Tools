import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Unlock, Copy, RefreshCw, Palette } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { copyToClipboard as nativeCopy, hapticFeedback } from '@/lib/native';

interface Color {
  hex: string;
  locked: boolean;
}

type PaletteType = 'random' | 'pastel' | 'neon' | 'dark' | 'warm' | 'cool';

const ColorPalette = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [paletteType, setPaletteType] = useState<PaletteType>('random');

  const generateRandomColor = (type: PaletteType) => {
    let r, g, b;
    switch (type) {
      case 'pastel':
        r = Math.floor((Math.random() * 127) + 127); g = Math.floor((Math.random() * 127) + 127); b = Math.floor((Math.random() * 127) + 127); break;
      case 'neon':
        const primary = Math.floor(Math.random() * 3);
        r = primary === 0 ? 255 : Math.floor(Math.random() * 100); g = primary === 1 ? 255 : Math.floor(Math.random() * 100); b = primary === 2 ? 255 : Math.floor(Math.random() * 100); break;
      case 'dark':
        r = Math.floor(Math.random() * 100); g = Math.floor(Math.random() * 100); b = Math.floor(Math.random() * 100); break;
      case 'warm':
        r = Math.floor((Math.random() * 100) + 155); g = Math.floor((Math.random() * 150) + 50); b = Math.floor(Math.random() * 100); break;
      case 'cool':
        r = Math.floor(Math.random() * 100); g = Math.floor((Math.random() * 150) + 50); b = Math.floor((Math.random() * 100) + 155); break;
      default:
        r = Math.floor(Math.random() * 256); g = Math.floor(Math.random() * 256); b = Math.floor(Math.random() * 256);
    }
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const generatePalette = () => {
    setColors(prev => {
      if (prev.length === 0) return Array(5).fill(null).map(() => ({ hex: generateRandomColor(paletteType), locked: false }));
      return prev.map(color => color.locked ? color : { ...color, hex: generateRandomColor(paletteType) });
    });
  };
  
  useEffect(() => { if(colors.length === 0) generatePalette(); }, []);

  const toggleLock = (index: number) => {
    setColors(prev => prev.map((c, i) => i === index ? { ...c, locked: !c.locked } : c));
  };

  const handleCopyColor = async (color: string) => {
    const success = await nativeCopy(color);
    if (success) {
      toast.success(`Copied ${color}`);
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full">
       {/* Top Bar Controls */}
       <Card className="glass-panel p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
             <div className="p-2 bg-pink-50 rounded-lg text-pink-500"><Palette className="w-5 h-5"/></div>
             <h2 className="font-bold text-slate-800">Palette Generator</h2>
          </div>
          
          <div className="flex items-center gap-3">
             <Select value={paletteType} onValueChange={(v: PaletteType) => setPaletteType(v)}>
               <SelectTrigger className="w-32 bg-white/50 border-slate-200">
                 <SelectValue placeholder="Theme" />
               </SelectTrigger>
               <SelectContent>
                 {['random', 'pastel', 'neon', 'dark', 'warm', 'cool'].map(t => (
                    <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>
                 ))}
               </SelectContent>
             </Select>
             <Button onClick={generatePalette} className="bg-slate-900 text-white hover:bg-slate-800 shadow-md">
                <RefreshCw className="w-4 h-4 mr-2" /> Generate
             </Button>
          </div>
       </Card>

       {/* Palette Display */}
       <div className="flex-1 min-h-[500px] rounded-3xl overflow-hidden shadow-2xl flex flex-col sm:flex-row">
          {colors.map((color, index) => (
             <div 
               key={index}
               className="flex-1 relative group transition-all duration-300 hover:flex-[1.5]"
               style={{ backgroundColor: color.hex }}
             >
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-black/40 to-transparent">
                   <div className="flex flex-col items-center gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <Button 
                        variant="secondary" 
                        size="icon" 
                        className="rounded-full h-12 w-12 bg-white/90 hover:bg-white text-slate-900 shadow-lg"
                        onClick={() => toggleLock(index)}
                      >
                         {color.locked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5"/>}
                      </Button>
                      <button 
                         type="button"
                         onClick={() => handleCopyColor(color.hex)}
                         aria-label={`Copy color ${color.hex} to clipboard`}
                         className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl font-mono text-lg font-bold shadow-lg hover:scale-105 transition-transform cursor-pointer"
                      >
                         {color.hex}
                      </button>
                   </div>
                </div>
                
                {/* Always visible lock */}
                {color.locked && (
                   <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/20 p-2 rounded-full text-white/90 backdrop-blur-md">
                      <Lock className="w-4 h-4" />
                   </div>
                )}
             </div>
          ))}
       </div>
    </div>
  );
};

export default ColorPalette;