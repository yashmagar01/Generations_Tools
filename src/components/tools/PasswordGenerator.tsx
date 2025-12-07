import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Shield, ShieldAlert, ShieldCheck, Copy, RefreshCw } from 'lucide-react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [strength, setStrength] = useState(0);

  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length > 8) score += 1;
    if (pwd.length > 12) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };

  const getStrengthColor = (score: number) => {
    if (score <= 2) return 'bg-red-500';
    if (score <= 4) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  const getStrengthLabel = (score: number) => {
    if (score <= 2) return 'Weak';
    if (score <= 4) return 'Strong';
    return 'Very Strong';
  };

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
    setStrength(calculateStrength(newPassword));
  };
  
  // Generate on mount and when settings change
  useEffect(() => {
     generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard!");
  };

  return (
    <Card className="p-6 animate-fade-in shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl bg-emerald-100 p-2 rounded-lg">🔒</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Password Generator</h2>
          <p className="text-gray-600">Create cryptographically secure passwords</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 relative group text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
                 {strength > 4 ? <ShieldCheck className="text-emerald-400 w-5 h-5"/> : 
                  strength > 2 ? <Shield className="text-yellow-400 w-5 h-5"/> : 
                  <ShieldAlert className="text-red-400 w-5 h-5"/>}
                 <span className={`text-xs font-bold uppercase tracking-wider ${
                    strength > 4 ? 'text-emerald-400' : strength > 2 ? 'text-yellow-400' : 'text-red-400'
                 }`}>
                    {getStrengthLabel(strength)}
                 </span>
            </div>
            
            <code className="text-2xl font-mono text-white break-all block mb-4 tracking-wider">
            {password}
            </code>

            {/* Strength Bar */}
            <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden max-w-xs mx-auto mb-4">
                <div 
                    className={`h-full transition-all duration-500 ${getStrengthColor(strength)}`} 
                    style={{ width: `${(strength / 6) * 100}%` }}
                />
            </div>

            <div className="flex justify-center gap-3">
                <Button
                    onClick={generatePassword}
                    variant="secondary"
                    size="sm"
                    className="bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700"
                >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                </Button>
                <Button
                    onClick={copyToClipboard}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    size="sm"
                >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                </Button>
            </div>
        </div>
        
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
                className="w-full cursor-pointer accent-emerald-500"
             />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Checkbox 
              id="uppercase" 
              checked={includeUppercase}
              onCheckedChange={(checked) => setIncludeUppercase(checked === true)}
              className="data-[state=checked]:bg-emerald-500"
            />
            <label htmlFor="uppercase" className="text-sm font-medium cursor-pointer flex-1">🔤 Uppercase</label>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Checkbox 
              id="lowercase" 
              checked={includeLowercase}
              onCheckedChange={(checked) => setIncludeLowercase(checked === true)}
              className="data-[state=checked]:bg-emerald-500"
            />
            <label htmlFor="lowercase" className="text-sm font-medium cursor-pointer flex-1">🔡 Lowercase</label>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Checkbox 
              id="numbers" 
              checked={includeNumbers}
              onCheckedChange={(checked) => setIncludeNumbers(checked === true)}
              className="data-[state=checked]:bg-emerald-500"
            />
            <label htmlFor="numbers" className="text-sm font-medium cursor-pointer flex-1">🔢 Numbers</label>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Checkbox 
              id="symbols" 
              checked={includeSymbols}
              onCheckedChange={(checked) => setIncludeSymbols(checked === true)}
              className="data-[state=checked]:bg-emerald-500"
            />
            <label htmlFor="symbols" className="text-sm font-medium cursor-pointer flex-1">🔣 Symbols</label>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PasswordGenerator;