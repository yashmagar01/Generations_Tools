import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Unlock, Copy, RefreshCw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

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
        r = Math.floor((Math.random() * 127) + 127);
        g = Math.floor((Math.random() * 127) + 127);
        b = Math.floor((Math.random() * 127) + 127);
        break;
      case 'neon':
        const primary = Math.floor(Math.random() * 3);
        r = primary === 0 ? 255 : Math.floor(Math.random() * 100);
        g = primary === 1 ? 255 : Math.floor(Math.random() * 100);
        b = primary === 2 ? 255 : Math.floor(Math.random() * 100);
        break;
      case 'dark':
        r = Math.floor(Math.random() * 100);
        g = Math.floor(Math.random() * 100);
        b = Math.floor(Math.random() * 100);
        break;
      case 'warm':
        r = Math.floor((Math.random() * 100) + 155);
        g = Math.floor((Math.random() * 150) + 50);
        b = Math.floor(Math.random() * 100);
        break;
      case 'cool':
        r = Math.floor(Math.random() * 100);
        g = Math.floor((Math.random() * 150) + 50);
        b = Math.floor((Math.random() * 100) + 155);
        break;
      default: // random
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
    }

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const generatePalette = () => {
    setColors(prev => {
      if (prev.length === 0) {
        return Array(5).fill(null).map(() => ({
          hex: generateRandomColor(paletteType),
          locked: false
        }));
      }

      return prev.map(color => {
        if (color.locked) return color;
        return {
          ...color,
          hex: generateRandomColor(paletteType)
        };
      });
    });
  };
  
  // Initial generation
  useEffect(() => {
     if(colors.length === 0) generatePalette();
  }, []);

  const toggleLock = (index: number) => {
    setColors(prev => prev.map((c, i) => 
      i === index ? { ...c, locked: !c.locked } : c
    ));
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success(`Copied ${color} to clipboard`);
  };

  return (
    <Card className="p-6 animate-fade-in shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="text-3xl bg-pink-100 p-2 rounded-lg">🎨</div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Color Palette</h2>
            <p className="text-gray-600">Generate themed color schemes</p>
          </div>
        </div>
        <div className="w-40">
           <Select value={paletteType} onValueChange={(v: PaletteType) => setPaletteType(v)}>
             <SelectTrigger>
               <SelectValue placeholder="Theme" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="random">Random</SelectItem>
               <SelectItem value="pastel">Pastel</SelectItem>
               <SelectItem value="neon">Neon</SelectItem>
               <SelectItem value="dark">Dark</SelectItem>
               <SelectItem value="warm">Warm</SelectItem>
               <SelectItem value="cool">Cool</SelectItem>
             </SelectContent>
           </Select>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 h-96 sm:h-64">
          {colors.map((color, index) => (
            <div 
              key={index} 
              className="group relative h-full rounded-2xl shadow-md transition-all duration-300 hover:scale-105 hover:z-10 flex flex-col justify-end overflow-hidden"
              style={{ backgroundColor: color.hex }}
            >
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 p-2 rounded-full cursor-pointer hover:bg-black/40 backdrop-blur-sm"
                   onClick={(e) => { e.stopPropagation(); toggleLock(index); }}>
                {color.locked ? <Lock className="w-4 h-4 text-white" /> : <Unlock className="w-4 h-4 text-white" />}
              </div>
              
              <div className="bg-white/90 backdrop-blur-md p-3 m-3 rounded-xl flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                <span className="font-mono font-bold text-gray-800 uppercase text-sm">{color.hex}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-gray-200/50"
                  onClick={() => copyToClipboard(color.hex)}
                >
                  <Copy className="w-4 h-4 text-gray-600" />
                </Button>
              </div>

               {/* Always visible lock indicator if locked, even when not hovering */}
               {color.locked && (
                  <div className="absolute top-3 right-3 group-hover:hidden bg-black/20 p-2 rounded-full backdrop-blur-sm animate-in fade-in">
                     <Lock className="w-3 h-3 text-white/80" />
                  </div>
               )}
            </div>
          ))}
        </div>

        <Button 
          onClick={generatePalette}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-4 rounded-xl shadow-md transition-all duration-200 transform hover:-translate-y-1 flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Generate New Palette
        </Button>
        
        <p className="text-sm text-gray-500 text-center">
           💡 Tip: Click the lock icon to keep a color you like!
        </p>
      </div>
    </Card>
  );
};

export default ColorPalette;