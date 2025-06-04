import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const RandomNumber = () => {
  const [number, setNumber] = useState<string>('');
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [includeDecimals, setIncludeDecimals] = useState(false);
  const [includeNegative, setIncludeNegative] = useState(false);
  const [includeFraction, setIncludeFraction] = useState(false);
  const [isInteger, setIsInteger] = useState(true);

  const generateNumber = () => {
    let result: number | string;
    
    if (includeFraction) {
      // Generate fraction
      const numerator = Math.floor(Math.random() * 50) + 1;
      const denominator = Math.floor(Math.random() * 50) + 1;
      result = `${numerator}/${denominator}`;
    } else if (includeDecimals && !isInteger) {
      // Generate decimal
      result = (Math.random() * (max - min) + min).toFixed(2);
      if (includeNegative && Math.random() < 0.5) {
        result = '-' + result;
      }
    } else {
      // Generate integer
      result = Math.floor(Math.random() * (max - min + 1)) + min;
      if (includeNegative && Math.random() < 0.5) {
        result = -result;
      }
    }
    
    setNumber(result.toString());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(number);
  };

  return (
    <Card className="p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">🎲</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Random Number Generator</h2>
          <p className="text-gray-600">Generate random numbers with options</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📉 Minimum Value
            </label>
            <Input
              type="number"
              value={min}
              onChange={(e) => setMin(parseInt(e.target.value) || 0)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📈 Maximum Value
            </label>
            <Input
              type="number"
              value={max}
              onChange={(e) => setMax(parseInt(e.target.value) || 100)}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="integer" 
              checked={isInteger}
              onCheckedChange={(checked) => setIsInteger(checked === true)}
            />
            <label htmlFor="integer" className="text-sm">🔢 Integer Only</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="decimals" 
              checked={includeDecimals}
              onCheckedChange={(checked) => setIncludeDecimals(checked === true)}
            />
            <label htmlFor="decimals" className="text-sm">🔸 Include Decimals</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="negative" 
              checked={includeNegative}
              onCheckedChange={(checked) => setIncludeNegative(checked === true)}
            />
            <label htmlFor="negative" className="text-sm">➖ Include Negative</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="fraction" 
              checked={includeFraction}
              onCheckedChange={(checked) => setIncludeFraction(checked === true)}
            />
            <label htmlFor="fraction" className="text-sm">🔀 Generate Fraction</label>
          </div>
        </div>
        
        <Button 
          onClick={generateNumber}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          🎯 Generate Random Number
        </Button>
        
        {number && (
          <div className="mt-6 animate-scale-in">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-200 text-center">
              <div className="text-4xl font-bold text-purple-700 mb-2">{number}</div>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
                className="border-purple-300 text-purple-700 hover:bg-purple-100"
              >
                📋 Copy Number
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">
              🎲 Your randomly generated number is ready!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default RandomNumber;