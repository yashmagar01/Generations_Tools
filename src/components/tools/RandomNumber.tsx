import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Toaster } from 'sonner';
import { toast } from 'sonner';

const RandomNumber = () => {
  const [number, setNumber] = useState<string>('');
  const [min, setMin] = useState<number | string>(1);
  const [max, setMax] = useState<number | string>(100);
  const [includeDecimals, setIncludeDecimals] = useState(false);
  const [decimalPrecision, setDecimalPrecision] = useState(2);
  const [includeFraction, setIncludeFraction] = useState(false);

  const generateNumber = () => {
    const minVal = Number(min);
    const maxVal = Number(max);

    if (isNaN(minVal) || isNaN(maxVal)) {
      toast.error("Please enter valid numbers for Min and Max");
      return;
    }

    if (minVal > maxVal) {
      toast.error("Min value cannot be greater than Max value");
      return;
    }

    let result: number | string;
    
    if (includeFraction) {
      // Generate fraction
      // For fractions, we can perhaps use min/max to bound the numerator/denominator 
      // or just keep it simple as random "small" fractions.
      // Let's stick to the previous simple logic but perhaps a bit more controlled if we wanted, 
      // but for now, the user didn't specify strict range requirements for fractions, so we'll keep it randomized
      // but strictly ensure it's a valid fraction.
      const numerator = Math.floor(Math.random() * maxVal) + 1; // Basic heuristic using max as bounds
      const denominator = Math.floor(Math.random() * maxVal) + 1;
      result = `${numerator}/${denominator}`;
    } else {
      if (includeDecimals) {
        // Generate decimal
        const num = Math.random() * (maxVal - minVal) + minVal;
        result = num.toFixed(decimalPrecision);
      } else {
        // Generate integer
        result = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
      }
    }
    
    setNumber(result.toString());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(number);
    toast.success("Copied to clipboard!");
  };

  return (
    <Card className="p-6 animate-fade-in shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl bg-purple-100 p-2 rounded-lg">🎲</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Random Number Generator</h2>
          <p className="text-gray-600">Generate random numbers with options</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📉 Minimum Value
            </label>
            <Input
              type="number"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              placeholder="Min"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📈 Maximum Value
            </label>
            <Input
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              placeholder="Max"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            <Checkbox 
              id="decimals" 
              checked={includeDecimals}
              onCheckedChange={(checked) => {
                setIncludeDecimals(checked === true);
                if (checked) setIncludeFraction(false);
              }}
            />
            <div className="flex-1">
              <label htmlFor="decimals" className="text-sm font-medium cursor-pointer">Include Decimals</label>
              {includeDecimals && (
                 <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-gray-500">Precision:</span>
                    <Input 
                      type="number" 
                      min="1" 
                      max="10" 
                      value={decimalPrecision}
                      onChange={(e) => setDecimalPrecision(parseInt(e.target.value) || 2)}
                      className="h-6 w-16 text-xs"
                    />
                 </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            <Checkbox 
              id="fraction" 
              checked={includeFraction}
              onCheckedChange={(checked) => {
                setIncludeFraction(checked === true);
                if (checked) setIncludeDecimals(false);
              }}
            />
            <label htmlFor="fraction" className="text-sm font-medium cursor-pointer">Generate Fraction</label>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🔢 How many numbers?
            </label>
            <Input
              type="number"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              className="w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
        </div>
        
        <Button 
          onClick={generateNumber}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl shadow-md transition-all duration-200 transform hover:-translate-y-1"
        >
          Generate
        </Button>
        
        {number && (
          <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-xl border border-purple-100 text-center relative group">
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-4 tracking-tight font-mono">
                {number}
              </div>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 border-purple-200 text-purple-600 hover:bg-purple-100"
              >
                Copy
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default RandomNumber;