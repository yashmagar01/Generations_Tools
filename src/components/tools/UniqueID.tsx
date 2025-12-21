import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, Copy, Fingerprint, ShieldCheck, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard, shareContent, canShare, hapticFeedback } from '@/lib/native';

type IDType = 'uuid' | 'nanoid' | 'cuid';

const UniqueID = () => {
  const [id, setId] = useState('');
  const [type, setType] = useState<IDType>('uuid');

  const generateID = () => {
    let newId = '';
    if(type === 'uuid') {
        newId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    } else if (type === 'nanoid') {
        const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-';
        for (let i = 0; i < 21; i++) newId += alphabet[Math.floor(Math.random() * alphabet.length)];
    } else {
        newId = `c${Date.now().toString(36)}${Math.random().toString(36).substr(2, 4)}`;
    }
    setId(newId);
  };
  
  useEffect(() => { generateID(); }, [type]);

  const handleCopy = async () => {
    const success = await copyToClipboard(id);
    if (success) {
      toast.success("Copied!");
    }
  };

  const handleShare = async () => {
    await hapticFeedback('medium');
    await shareContent({ title: 'Generated ID', text: id });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
       <Card className="lg:col-span-1 glass-card p-6 flex flex-col gap-6 h-fit">
          <div className="flex items-center gap-2 mb-2">
             <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Fingerprint className="w-5 h-5"/></div>
             <h2 className="font-bold text-slate-800">ID System</h2>
          </div>

          <div className="space-y-4">
             <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400">Format</label>
                <Select value={type} onValueChange={(v: IDType) => setType(v)}>
                   <SelectTrigger className="bg-white/50 border-slate-200"><SelectValue /></SelectTrigger>
                   <SelectContent>
                      <SelectItem value="uuid">UUID v4</SelectItem>
                      <SelectItem value="nanoid">NanoID</SelectItem>
                      <SelectItem value="cuid">CUID</SelectItem>
                   </SelectContent>
                </Select>
             </div>
             
             <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-500 leading-relaxed border border-slate-100">
                {type === 'uuid' && "Universal unique identifier. Best for database primary keys."}
                {type === 'nanoid' && "URL-friendly, compact, and secure. Great for frontend routes."}
                {type === 'cuid' && "Collision-resistant ids optimized for horizontal scaling."}
             </div>

             <Button onClick={generateID} variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                <RefreshCw className="w-4 h-4 mr-2"/> Regenerate
             </Button>
          </div>
       </Card>

       <div className="lg:col-span-2 flex items-center justify-center p-8 rounded-3xl bg-slate-900 shadow-2xl relative overflow-hidden text-center min-h-[400px]">
           <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(79,70,229,0.1)_1px,transparent_1px),linear-gradient(-45deg,rgba(79,70,229,0.1)_1px,transparent_1px)] [background-size:20px_20px]" />
           
           <div className="relative z-10 w-full max-w-2xl animate-in fade-in zoom-in">
               <div className="inline-flex items-center gap-2 mb-8 px-4 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-mono uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  Collision Resistant
               </div>
               
               <div onClick={handleCopy} className="group cursor-pointer">
                  <h1 className="text-3xl md:text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-white to-indigo-200 tracking-wider break-all leading-tight">
                     {id}
                  </h1>
                  <p className="mt-4 text-slate-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                     Click to Copy
                  </p>
               </div>
               
               {canShare() && (
                 <Button onClick={handleShare} variant="outline" size="sm" className="mt-4 rounded-full border-indigo-400 text-indigo-300 hover:bg-indigo-900/30">
                   <Share2 className="w-4 h-4 mr-2" /> Share
                 </Button>
               )}
           </div>
       </div>
    </div>
  );
};

export default UniqueID;