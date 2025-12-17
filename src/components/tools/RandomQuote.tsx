import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Quote, Copy, Share2, Sparkles } from 'lucide-react';

interface QuoteData {
  text: string;
  author: string;
}

const RandomQuote = () => {
  const [quote, setQuote] = useState<QuoteData | null>(null);

  const generateQuote = () => {
    const quotes = [
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
        { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
        { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
        { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
        { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", author: "Martin Luther King Jr." },
        { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
        { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" }
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  const copy = () => {
    if (quote) {
      navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
      toast.success("Quote copied!");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
       <Card className="lg:col-span-1 glass-card p-6 flex flex-col gap-6 h-fit">
          <div className="flex items-center gap-2 mb-2">
             <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Quote className="w-5 h-5"/></div>
             <h2 className="font-bold text-slate-800">Inspiration</h2>
          </div>

          <p className="text-sm text-slate-500 leading-relaxed">
             Need a spark? Generate a random quote to motivate your day or use as a caption.
          </p>

          <Button onClick={generateQuote} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 py-6">
             <Sparkles className="w-5 h-5 mr-2" />
             Inspire Me
          </Button> 
       </Card>

       <div className="lg:col-span-2 flex items-center justify-center p-12 rounded-3xl bg-white border border-slate-100 shadow-xl relative overflow-hidden min-h-[500px] group">
           {/* Abstract Background */}
           <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-[80px] opacity-60" />
           <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-gradient-to-tr from-cyan-50 to-blue-50 rounded-full blur-[100px] opacity-60" />
           
           {quote ? (
               <div className="relative z-10 max-w-2xl text-center animate-in fade-in zoom-in duration-700 slide-in-from-bottom-4">
                  <div className="text-8xl text-indigo-100 font-display font-black mb-6 leading-none select-none">“</div>
                  <blockquote className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-8 font-display tracking-tight">
                     {quote.text}
                  </blockquote>
                  <cite className="block text-indigo-500 font-medium tracking-widest uppercase text-xs mb-12">
                     — {quote.author}
                  </cite>

                  <div className="flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                     <Button onClick={copy} variant="outline" className="border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 rounded-full h-12 px-6">
                        <Copy className="w-4 h-4 mr-2" /> Copy Quote
                     </Button>
                     {navigator.share && (
                        <Button onClick={() => navigator.share({title:'Quote', text: quote.text})} variant="ghost" className="text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full h-12 px-6">
                           <Share2 className="w-4 h-4 mr-2" /> Share
                        </Button>
                     )}
                  </div>
               </div>
           ) : (
               <div className="text-center text-slate-300 animate-pulse">
                  <Quote className="w-20 h-20 mx-auto mb-6 opacity-20 text-slate-900" />
                  <p className="font-display text-xl text-slate-400 font-medium">Waiting for inspiration...</p>
               </div>
           )}
       </div>
    </div>
  );
};

export default RandomQuote;