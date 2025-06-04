import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Quote {
  text: string;
  author: string;
}

const RandomQuote = () => {
  const [quote, setQuote] = useState<Quote | null>(null);

  const quotes: Quote[] = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", author: "Martin Luther King Jr." },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
    { text: "You learn more from failure than from success. Don't let it stop you. Failure builds character.", author: "Unknown" },
    { text: "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you.", author: "Steve Jobs" },
    { text: "People who are crazy enough to think they can change the world, are the ones who do.", author: "Rob Siltanen" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas A. Edison" }
  ];

  const generateQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  };

  const copyToClipboard = () => {
    if (quote) {
      const text = `"${quote.text}" - ${quote.author}`;
      navigator.clipboard.writeText(text);
    }
  };

  const shareQuote = () => {
    if (quote && navigator.share) {
      navigator.share({
        title: 'Inspirational Quote',
        text: `"${quote.text}" - ${quote.author}`,
      });
    }
  };

  return (
    <Card className="p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">💭</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Random Quote Generator</h2>
          <p className="text-gray-600">Get inspired with motivational quotes</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <Button 
          onClick={generateQuote}
          className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          ✨ Get Random Quote
        </Button>
        
        {quote && (
          <div className="mt-6 animate-scale-in">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200 relative overflow-hidden">
              <div className="absolute top-4 left-4 text-6xl text-indigo-200 opacity-50">❝</div>
              <div className="relative z-10">
                <blockquote className="text-xl font-medium text-gray-800 leading-relaxed mb-4 pl-8">
                  {quote.text}
                </blockquote>
                <div className="flex items-center justify-between">
                  <cite className="text-lg font-semibold text-indigo-700">
                    — {quote.author}
                  </cite>
                  <div className="flex gap-2">
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      size="sm"
                      className="border-indigo-300 text-indigo-700 hover:bg-indigo-100"
                    >
                      📋 Copy
                    </Button>
                    {navigator.share && (
                      <Button
                        onClick={shareQuote}
                        variant="outline"
                        size="sm"
                        className="border-indigo-300 text-indigo-700 hover:bg-indigo-100"
                      >
                        📤 Share
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 text-6xl text-indigo-200 opacity-50 rotate-180">❝</div>
            </div>
            <p className="text-sm text-gray-600 mt-3 text-center">
              🌟 Let this quote inspire your day!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default RandomQuote;