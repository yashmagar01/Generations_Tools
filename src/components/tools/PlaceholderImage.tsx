import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Image as ImageIcon, Copy, ExternalLink } from 'lucide-react';

const PlaceholderImage = () => {
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(400);
  const [url, setUrl] = useState('');

  const generate = () => {
    setUrl(`https://picsum.photos/${width}/${height}?random=${Date.now()}`);
  };

  const copy = () => {
    if(!url) return;
    navigator.clipboard.writeText(url);
    toast.success("URL Copied!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
       <Card className="lg:col-span-1 glass-card p-6 flex flex-col gap-6 h-fit">
          <div className="flex items-center gap-2 mb-2">
             <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><ImageIcon className="w-5 h-5"/></div>
             <h2 className="font-bold text-slate-800">Mockup Image</h2>
          </div>

          <div className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase text-slate-400">Width</label>
                   <Input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} className="bg-white/50 border-slate-200" />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase text-slate-400">Height</label>
                   <Input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="bg-white/50 border-slate-200" />
                </div>
             </div>
             
             <Button onClick={generate} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20">
                <ImageIcon className="w-4 h-4 mr-2"/> Generate
             </Button>
          </div>
       </Card>

       <div className="lg:col-span-2 flex items-center justify-center p-8 rounded-3xl bg-slate-900 shadow-2xl relative overflow-hidden min-h-[400px]">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent)]" />
           
           {url ? (
               <div className="relative z-10 animate-in fade-in zoom-in duration-500">
                   <img src={url} alt="Random Placeholder" className="rounded-lg shadow-2xl border border-slate-700 max-h-[400px] w-auto mx-auto" />
                   
                   <div className="flex justify-center gap-3 mt-6">
                      <Button onClick={copy} variant="secondary" size="sm">
                         <Copy className="w-4 h-4 mr-2"/> Copy URL
                      </Button>
                      <Button onClick={() => window.open(url, '_blank')} variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                         <ExternalLink className="w-4 h-4 mr-2"/> Open
                      </Button>
                   </div>
               </div>
           ) : (
               <div className="text-slate-600 text-center">
                  <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>Configure & Generate to see preview</p>
               </div>
           )}
       </div>
    </div>
  );
};

export default PlaceholderImage;