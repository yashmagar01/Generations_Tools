import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
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
      alert('Please select at least one character type');
      return;
    }
    
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <Card className="p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">🔒</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Password Generator</h2>
          <p className="text-gray-600">Create secure passwords</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📏 Password Length: {length}
          </label>
          <Input
            type="range"
            min="8"
            max="50"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="uppercase" 
              checked={includeUppercase}
              onCheckedChange={(checked) => setIncludeUppercase(checked === true)}
            />
            <label htmlFor="uppercase" className="text-sm">🔤 Uppercase</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="lowercase" 
              checked={includeLowercase}
              onCheckedChange={(checked) => setIncludeLowercase(checked === true)}
            />
            <label htmlFor="lowercase" className="text-sm">🔡 Lowercase</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="numbers" 
              checked={includeNumbers}
              onCheckedChange={(checked) => setIncludeNumbers(checked === true)}
            />
            <label htmlFor="numbers" className="text-sm">🔢 Numbers</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="symbols" 
              checked={includeSymbols}
              onCheckedChange={(checked) => setIncludeSymbols(checked === true)}
            />
            <label htmlFor="symbols" className="text-sm">🔣 Symbols</label>
          </div>
        </div>
        
        <Button 
          onClick={generatePassword}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          🛡️ Generate Secure Password
        </Button>
        
        {password && (
          <div className="mt-6 animate-scale-in">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <code className="text-lg font-mono break-all text-gray-800">{password}</code>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  className="ml-2"
                >
                  📋 Copy
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">🔐 Keep this password secure and don't share it</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PasswordGenerator;