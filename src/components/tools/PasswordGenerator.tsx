import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Shield, Copy, RefreshCw, Sliders, CheckCircle2 } from 'lucide-react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
     uppercase: true,
     lowercase: true,
     numbers: true,
     symbols: true
  });
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

  const generatePassword = () => {
    let charset = '';
    if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) charset += '0123456789';
    if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (charset === '') {
       // fallback
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
  
  useEffect(() => {
     generatePassword();
  }, [length, options]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast.success("Password copied!");
  };

  const toggleOption = (key: keyof typeof options) => {
      setOptions(prev => {
          const newState = { ...prev, [key]: !prev[key] };
          // Prevent unchecking all
          if (!Object.values(newState).some(Boolean)) return prev;
          return newState;
      });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
       {/* Controls */}
       <Card className="lg:col-span-1 glass-card p-6 flex flex-col gap-6 h-fit">
          <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-500" />
                Settings
              </h2>
              <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">{length} chars</span>
          </div>

          <div className="space-y-6">
              <div className="space-y-3">
                 <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Length</label>
                 <Input 
                    type="range" 
                    min="8" 
                    max="64" 
                    value={length} 
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="cursor-pointer accent-emerald-500 h-2 bg-slate-100 rounded-lg appearance-none"
                 />
              </div>

              <div className="space-y-3">
                 <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Include</label>
                 <div className="grid grid-cols-2 gap-3">
                    {Object.entries(options).map(([key, value]) => (
                        <div 
                          key={key}
                          onClick={() => toggleOption(key as any)}
                          className={`cursor-pointer p-3 rounded-xl border flex items-center gap-2 transition-all ${
                              value ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                          }`}
                        >
                           <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${value ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>
                              {value && <CheckCircle2 className="w-3 h-3 text-white" />}
                           </div>
                           <span className="capitalize text-sm font-medium">{key}</span>
                        </div>
                    ))}
                 </div>
              </div>
          </div>

          <Button onClick={generatePassword} variant="outline" className="w-full mt-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50">
             <RefreshCw className="w-4 h-4 mr-2" /> Regenerate
          </Button>
       </Card>

       {/* Results */}
       <div className="lg:col-span-2 flex flex-col items-center justify-center p-8 rounded-3xl bg-slate-900 shadow-2xl relative overflow-hidden text-center min-h-[400px]">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)]" />
           
           <div className="relative z-10 w-full max-w-xl space-y-8 animate-in-up">
               <div className="space-y-2">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700">
                      <Shield className={`w-4 h-4 ${strength > 4 ? 'text-emerald-400' : 'text-yellow-400'}`} />
                      <span className={`text-xs font-bold uppercase ${strength > 4 ? 'text-emerald-400' : 'text-yellow-400'}`}>
                          {strength > 4 ? 'Cryptographically Secure' : 'Improving Strength...'}
                      </span>
                   </div>
               </div>

               <div onClick={copyToClipboard} className="group cursor-pointer relative break-all">
                   <h1 className="text-4xl md:text-5xl font-mono font-bold text-white tracking-wider group-hover:text-emerald-200 transition-colors">
                      {password}
                   </h1>
                   <div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Copy className="w-6 h-6 text-white" />
                   </div>
               </div>

               <div className="h-1.5 w-64 mx-auto bg-slate-800 rounded-full overflow-hidden">
                  <div 
                      className={`h-full transition-all duration-700 ease-out ${strength > 4 ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : strength > 2 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                      style={{ width: `${(strength / 6) * 100}%` }}
                  />
               </div>

               <div className="pt-8">
                  <Button onClick={copyToClipboard} size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8 shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform">
                     Copy Password
                  </Button>
               </div>
           </div>
       </div>
    </div>
  );
};

export default PasswordGenerator;