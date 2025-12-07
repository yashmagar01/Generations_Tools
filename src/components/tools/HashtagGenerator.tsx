import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Hash, Copy, TrendingUp } from 'lucide-react';

const HashtagGenerator = () => {
  const [keyword, setKeyword] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);

  const generate = () => {
    if (!keyword.trim()) return;
    const base = keyword.toLowerCase().replace(/\s+/g, '');
    setHashtags([
      `#${base}`, `#${base}daily`, `#${base}love`, `#${base}life`, `#${base}vibes`,
      `#${base}goals`, `#trending${base}`, `#${base}community`, `#${base}inspiration`, `#${base}motivation`
    ]);
  };

  const copy = () => {
    navigator.clipboard.writeText(hashtags.join(' '));
    toast.success("Hashtags copied!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
       <Card className="lg:col-span-1 glass-card p-6 flex flex-col gap-6 h-fit">
          <div className="flex items-center gap-2 mb-2">
             <div className="p-2 bg-pink-50 rounded-lg text-pink-600"><Hash className="w-5 h-5"/></div>
             <h2 className="font-bold text-slate-800">Tag Generator</h2>
          </div>

          <div className="space-y-4">
             <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400">Keyword</label>
                <Input 
                   value={keyword} 
                   onChange={e => setKeyword(e.target.value)} 
                   placeholder="e.g. travel"
                   className="bg-white/50 border-slate-200"
                />
             </div>
             <Button onClick={generate} className="w-full bg-pink-500 hover:bg-pink-600 text-white shadow-lg shadow-pink-500/20">
                <TrendingUp className="w-4 h-4 mr-2"/> Generate
             </Button>
          </div>
       </Card>

       <div className="lg:col-span-2 relative min-h-[400px]">
           <div className="absolute inset-0 bg-white shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-100 p-8">
               {hashtags.length > 0 ? (
                  <div className="h-full flex flex-col">
                     <div className="flex-1 flex flex-wrap content-start gap-3">
                        {hashtags.map((tag, i) => (
                           <span key={i} className="px-4 py-2 rounded-full bg-pink-50 text-pink-600 font-medium text-sm border border-pink-100 animate-in zoom-in" style={{ animationDelay: `${i*50}ms` }}>
                              {tag}
                           </span>
                        ))}
                     </div>
                     <Button onClick={copy} variant="outline" className="w-full mt-6 border-pink-200 text-pink-700 hover:bg-pink-50">
                        <Copy className="w-4 h-4 mr-2"/> Copy All
                     </Button>
                  </div>
               ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-300">
                     <Hash className="w-16 h-16 mb-4 opacity-20" />
                     <p>Enter a keyword to generate tags</p>
                  </div>
               )}
           </div>
       </div>
    </div>
  );
};

export default HashtagGenerator;