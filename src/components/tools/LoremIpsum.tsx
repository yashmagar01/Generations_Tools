import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const LoremIpsum = () => {
  const [text, setText] = useState('');
  const [paragraphs, setParagraphs] = useState(3);
  
  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ];

  const generateLorem = () => {
    let result = '';
    for (let p = 0; p < paragraphs; p++) {
      let paragraph = '';
      const sentenceCount = Math.floor(Math.random() * 4) + 3; // 3-6 sentences per paragraph
      
      for (let s = 0; s < sentenceCount; s++) {
        const wordCount = Math.floor(Math.random() * 10) + 5; // 5-14 words per sentence
        let sentence = '';
        
        for (let w = 0; w < wordCount; w++) {
          const word = loremWords[Math.floor(Math.random() * loremWords.length)];
          sentence += (w === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word) + ' ';
        }
        
        paragraph += sentence.trim() + '. ';
      }
      
      result += paragraph.trim() + '\n\n';
    }
    
    setText(result.trim());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast.success("Text copied to clipboard!");
  };

  return (
    <Card className="p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">📝</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Lorem Ipsum Generator</h2>
          <p className="text-gray-600">Generate placeholder text</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📄 Number of Paragraphs: {paragraphs}
          </label>
          <Input
            type="range"
            min="1"
            max="10"
            value={paragraphs}
            onChange={(e) => setParagraphs(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        
        <Button 
          onClick={generateLorem}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          ✍️ Generate Lorem Ipsum
        </Button>
        
        {text && (
          <div className="mt-6 animate-scale-in">
            <div className="bg-gray-50 p-4 rounded-lg border max-h-80 overflow-y-auto">
              <p className="text-gray-800 leading-relaxed whitespace-pre-line">{text}</p>
            </div>
            <div className="flex justify-center mt-3">
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="flex items-center gap-2"
              >
                📋 Copy Text
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">
              📄 Perfect for mockups and design layouts
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default LoremIpsum;