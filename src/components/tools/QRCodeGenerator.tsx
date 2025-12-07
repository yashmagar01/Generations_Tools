import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'sonner';
import { Download, Link, Settings2, Share2 } from 'lucide-react';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');

  const downloadQR = () => {
    if (!text) {
        toast.error("Generate a QR code first!");
        return;
    }
    const svg = document.getElementById("qr-code-svg");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = size;
        canvas.height = size;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "qrcode.png";
        downloadLink.href = pngFile;
        downloadLink.click();
        toast.success("QR Code downloaded!");
      };
      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      {/* --- Left Panel: Controls --- */}
      <Card className="lg:col-span-1 glass-card p-6 flex flex-col gap-6 h-fit">
        <div>
           <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
             <Settings2 className="w-5 h-5 text-indigo-500" />
             Config
           </h2>
           <p className="text-sm text-slate-500">Customize your QR code</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Content</label>
            <div className="relative">
                <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="https://example.com"
                    className="pl-9 bg-white/50 border-slate-200 focus:ring-indigo-500"
                />
            </div>
          </div>

          <div className="space-y-2">
             <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Colors</label>
             <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <span className="text-xs text-slate-500">Foreground</span>
                    <div className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-white/50">
                        <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent" />
                        <span className="text-xs font-mono text-slate-600">{fgColor}</span>
                    </div>
                </div>
                <div className="space-y-1">
                    <span className="text-xs text-slate-500">Background</span>
                    <div className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-white/50">
                        <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent" />
                        <span className="text-xs font-mono text-slate-600">{bgColor}</span>
                    </div>
                </div>
             </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
           <Button 
             onClick={downloadQR}
             className="w-full bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/10"
             disabled={!text}
           >
             <Download className="w-4 h-4 mr-2" />
             Download PNG
           </Button>
        </div>
      </Card>

      {/* --- Right Panel: Preview --- */}
      <div className="lg:col-span-2 flex items-center justify-center p-8 rounded-3xl bg-slate-100/50 border border-slate-200/60 shadow-inner relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />
          
          <div className="relative z-10 flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
             <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100">
                {text ? (
                    <QRCodeSVG 
                        id="qr-code-svg"
                        value={text} 
                        size={size}
                        level={"H"}
                        includeMargin={true}
                        fgColor={fgColor}
                        bgColor={bgColor}
                    />
                ) : (
                    <div className="w-64 h-64 flex flex-col items-center justify-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 text-slate-300">
                        <Share2 className="w-12 h-12 mb-2 opacity-50" />
                        <span className="text-sm font-medium">Enter text to preview</span>
                    </div>
                )}
             </div>
             
             {text && (
                 <p className="text-sm text-slate-400 font-medium">
                    Preview Mode • {size}x{size}px
                 </p>
             )}
          </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;