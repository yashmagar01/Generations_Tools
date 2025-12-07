import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const HashtagGenerator = () => {
  const [keyword, setKeyword] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);

  const generateHashtags = () => {
    if (!keyword.trim()) return;
    
    const base = keyword.toLowerCase().replace(/\s+/g, '');
    const variations = [
      `#${base}`,
      `#${base}daily`,
      `#${base}love`,
      `#${base}life`,
      `#${base}vibes`,
      `#${base}goals`,
      `#trending${base}`,
      `#${base}community`,
      `#${base}inspiration`,
      `#${base}motivation`
    ];
    
    setHashtags(variations);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hashtags.join(' '));
    toast.success("Hashtags copied to clipboard!");
  };

  return (
    <Card className="p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">#️⃣</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Hashtag Generator</h2>
          <p className="text-gray-600">Generate trending hashtags</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🔤 Enter keyword:
          </label>
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g., photography, fitness, travel..."
            className="w-full"
          />
        </div>
        
        <Button 
          onClick={generateHashtags}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          🚀 Generate Hashtags
        </Button>
        
        {hashtags.length > 0 && (
          <div className="mt-6 animate-scale-in">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex flex-wrap gap-2 mb-4">
                {hashtags.map((tag, index) => (
                  <span key={index} className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
                className="w-full"
              >
                📋 Copy All Hashtags
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default HashtagGenerator;