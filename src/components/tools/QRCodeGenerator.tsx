import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');

  const generateQR = () => {
    if (text.trim()) {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
      setQrCode(qrUrl);
    }
  };

  return (
    <Card className="p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">📱</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">QR Code Generator</h2>
          <p className="text-gray-600">Generate QR codes instantly</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📝 Enter text or URL:
          </label>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text, URL, or any data..."
            className="w-full"
          />
        </div>
        
        <Button 
          onClick={generateQR}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          🔄 Generate QR Code
        </Button>
        
        {qrCode && (
          <div className="mt-6 text-center animate-scale-in">
            <div className="bg-white p-4 rounded-lg border-2 border-orange-200 inline-block">
              <img src={qrCode} alt="Generated QR Code" className="mx-auto" />
            </div>
            <p className="text-sm text-gray-600 mt-2">📱 Scan with your phone camera</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default QRCodeGenerator;