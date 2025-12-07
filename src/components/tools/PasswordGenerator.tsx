import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (charset === '') {
      toast.error('Please select at least one character type');
      return;
    }
    
    const newPassword = Array(length)
      .fill(0)
      .map(() => {
        const randomValues = new Uint32Array(1);
        crypto.getRandomValues(randomValues);
        return charset[randomValues[0] % charset.length];
      })
      .join('');

    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard!");
  };

  return (
    <Card className="p-6 animate-fade-in shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl bg-green-100 p-2 rounded-lg">🔒</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Password Generator</h2>
          <p className="text-gray-600">Create cryptographically secure passwords</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-4 flex justify-between">
            <span>📏 Password Length</span>
            <span className="bg-white px-2 py-0.5 rounded border text-sm font-mono">{length}</span>
          </label>
          <div className="flex items-center gap-4">
             <Input
                type="range"
                min="8"
                max="64"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full cursor-pointer"
             />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Checkbox 
              id="uppercase" 
              checked={includeUppercase}
              onCheckedChange={(checked) => setIncludeUppercase(checked === true)}
            />
            <label htmlFor="uppercase" className="text-sm font-medium cursor-pointer flex-1">🔤 Uppercase</label>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Checkbox 
              id="lowercase" 
              checked={includeLowercase}
              onCheckedChange={(checked) => setIncludeLowercase(checked === true)}
            />
            <label htmlFor="lowercase" className="text-sm font-medium cursor-pointer flex-1">🔡 Lowercase</label>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Checkbox 
              id="numbers" 
              checked={includeNumbers}
              onCheckedChange={(checked) => setIncludeNumbers(checked === true)}
            />
            <label htmlFor="numbers" className="text-sm font-medium cursor-pointer flex-1">🔢 Numbers</label>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Checkbox 
              id="symbols" 
              checked={includeSymbols}
              onCheckedChange={(checked) => setIncludeSymbols(checked === true)}
            />
            <label htmlFor="symbols" className="text-sm font-medium cursor-pointer flex-1">🔣 Symbols</label>
          </div>
        </div>
        
        <Button 
          onClick={generatePassword}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-4 rounded-xl shadow-md transition-all duration-200 transform hover:-translate-y-1"
        >
          Generate Secure Password
        </Button>
        
        {password && (
          <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 relative group text-center">
              <code className="text-xl font-mono text-emerald-400 break-all display-block mb-2">
                {password}
              </code>
              <Button
                  onClick={copyToClipboard}
                  variant="secondary"
                  size="sm"
                  className="mt-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  Copy Password
                </Button>
            </div>
            <p className="text-xs text-center text-gray-500 mt-3 flex items-center justify-center gap-1">
              🔐 Generated locally on your device
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PasswordGenerator;