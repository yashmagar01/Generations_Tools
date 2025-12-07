import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'sonner';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const generateQR = () => {
    if (text.trim()) {
      setGeneratedText(text);
      toast.success("QR Code generated successfully!");
    } else {
      toast.error("Please enter some text to generate a QR Code");
    }
  };

  const downloadQR = () => {
    const svg = document.getElementById("qr-code-svg");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
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
    <Card className="p-6 animate-fade-in shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl bg-orange-100 p-2 rounded-lg">📱</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">QR Code Generator</h2>
          <p className="text-gray-600">Generate QR codes instantly & privately</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📝 Enter text or URL:
          </label>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your link or text here..."
            className="w-full border-orange-200 focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        
        <Button 
          onClick={generateQR}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 rounded-xl shadow-md transition-all duration-200 transform hover:-translate-y-1"
        >
          Generate QR Code
        </Button>
        
        {generatedText && (
          <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-6 rounded-2xl border-2 border-orange-100 shadow-inner inline-block relative group">
              <QRCodeSVG 
                id="qr-code-svg"
                value={generatedText} 
                size={200}
                level={"H"}
                includeMargin={true}
              />
              <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <Button onClick={downloadQR} variant="secondary" className="text-white bg-transparent border border-white hover:bg-white/20">
                    Download PNG
                 </Button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4 flex items-center justify-center gap-2">
              <span>📱</span> Scan with your phone camera
            </p>
            <p className="text-xs text-orange-400 mt-1">Generated locally in your browser</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default QRCodeGenerator;