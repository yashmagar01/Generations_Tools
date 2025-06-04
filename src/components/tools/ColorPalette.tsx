import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ColorPalette = () => {
  const [palette, setPalette] = useState<string[]>([]);

  const generatePalette = () => {
    const colors = [];
    for (let i = 0; i < 5; i++) {
      const color = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
      colors.push(color);
    }
    setPalette(colors);
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
  };

  return (
    <Card className="p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">🎨</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Color Palette Generator</h2>
          <p className="text-gray-600">Generate beautiful color schemes</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <Button 
          onClick={generatePalette}
          className="w-full bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-700 hover:to-gray-800 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          🎯 Generate Professional Palette
        </Button>
        
        {palette.length > 0 && (
          <div className="mt-6 animate-scale-in">
            <div className="grid grid-cols-1 gap-3">
              {palette.map((color, index) => (
                <div key={index} className="group">
                  <div 
                    className="h-16 rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border border-gray-200"
                    style={{ backgroundColor: color }}
                    onClick={() => copyToClipboard(color)}
                  />
                  <div className="flex items-center justify-between mt-2 p-2 bg-gray-50 rounded-md">
                    <span className="font-mono text-sm font-medium text-gray-700">
                      {color.toUpperCase()}
                    </span>
                    <Button
                      onClick={() => copyToClipboard(color)}
                      variant="outline"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                    >
                      📋 Copy
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              💡 Click any color to copy its hex code
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ColorPalette;