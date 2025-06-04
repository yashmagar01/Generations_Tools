import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const PlaceholderImage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);

  const generateImage = () => {
    const url = `https://picsum.photos/${width}/${height}?random=${Date.now()}`;
    setImageUrl(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(imageUrl);
  };

  return (
    <Card className="p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">🖼️</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Placeholder Image Generator</h2>
          <p className="text-gray-600">Generate placeholder images for your projects</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📏 Width (px)
            </label>
            <Input
              type="number"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value) || 300)}
              className="w-full"
              min="50"
              max="2000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📐 Height (px)
            </label>
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value) || 200)}
              className="w-full"
              min="50"
              max="2000"
            />
          </div>
        </div>
        
        <Button 
          onClick={generateImage}
          className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          🎨 Generate Placeholder Image
        </Button>
        
        {imageUrl && (
          <div className="mt-6 animate-scale-in">
            <div className="bg-gray-50 p-4 rounded-lg border text-center">
              <img 
                src={imageUrl} 
                alt={`Placeholder ${width}x${height}`}
                className="max-w-full h-auto rounded-lg shadow-md mx-auto mb-4"
                style={{ maxHeight: '300px' }}
              />
              
              <div className="bg-white p-3 rounded border mb-3">
                <code className="text-sm font-mono text-gray-800 break-all">{imageUrl}</code>
              </div>
              
              <div className="flex justify-center gap-2">
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                >
                  📋 Copy URL
                </Button>
                <Button
                  onClick={() => window.open(imageUrl, '_blank')}
                  variant="outline"
                  size="sm"
                >
                  🔗 Open Image
                </Button>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mt-2 text-center">
              🖼️ Perfect for wireframes, mockups, and development!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PlaceholderImage;