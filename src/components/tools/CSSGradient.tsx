import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CSSGradient = () => {
  const [gradient, setGradient] = useState('');
  const [gradientCSS, setGradientCSS] = useState('');

  const generateGradient = () => {
    const colors = [];
    for (let i = 0; i < 3; i++) {
      colors.push(`#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`);
    }
    
    const directions = ['to right', 'to left', 'to bottom', 'to top', 'to bottom right', 'to bottom left'];
    const direction = directions[Math.floor(Math.random() * directions.length)];
    
    const cssGradient = `linear-gradient(${direction}, ${colors.join(', ')})`;
    setGradient(cssGradient);
    setGradientCSS(`background: ${cssGradient};`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(gradientCSS);
  };

  return (
    <Card className="p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">🌈</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">CSS Gradient Generator</h2>
          <p className="text-gray-600">Create beautiful CSS gradients</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <Button 
          onClick={generateGradient}
          className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          🎨 Generate CSS Gradient
        </Button>
        
        {gradient && (
          <div className="mt-6 animate-scale-in space-y-4">
            <div 
              className="h-32 rounded-lg border-2 border-gray-200 shadow-md"
              style={{ background: gradient }}
            />
            
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <code className="text-sm font-mono text-gray-800 break-all">{gradientCSS}</code>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  className="ml-2 flex-shrink-0"
                >
                  📋 Copy
                </Button>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 text-center">
              🎯 Perfect gradient for your next project!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CSSGradient;