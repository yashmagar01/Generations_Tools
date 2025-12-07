import { useState } from 'react';
import { Github, Twitter, Heart, Linkedin, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmail('');
      toast.success('Subscribed!', {
        description: 'You have been added to our newsletter.',
      });
    }, 1500);
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1 space-y-4">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                   <span className="font-bold">U</span>
                </div>
                <span className="text-lg font-bold text-slate-900">UtilityHub</span>
             </div>
             <p className="text-slate-500 text-sm leading-relaxed">
                Premium developer tools designed for speed and privacy. 
                100% Client-side and open source.
             </p>
             
             {/* Large Social Icons */}
             <div className="flex items-center gap-3 pt-2">
                <a href="https://github.com/yashmagar01" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-purple-600 hover:border-purple-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                   <Github className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-500 hover:border-blue-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                   <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-700 hover:border-blue-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                   <Linkedin className="w-5 h-5" />
                </a>
             </div>
          </div>

          {/* Product Links */}
          <div>
             <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider">Product</h4>
             <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li><a href="/tools" className="hover:text-purple-600 transition-colors">All Generators</a></li>
                <li><a href="/#features" className="hover:text-purple-600 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Changelog</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Roadmap</a></li>
             </ul>
          </div>

          {/* Legal Links */}
          <div>
             <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider">Legal</h4>
             <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li><a href="#" className="hover:text-purple-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Licenses</a></li>
             </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
             <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider">Stay Updated</h4>
             <p className="text-sm text-slate-500 mb-4">
                Get the latest tools and features sent to your inbox.
             </p>
             <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-white" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" className="bg-slate-900 hover:bg-slate-800" disabled={isLoading}>
                   {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
             </form>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium">
           <p className="text-slate-400">© 2024 UtilityHub. All rights reserved.</p>
           <div className="flex items-center gap-1 text-slate-500">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> by 
              <a href="https://github.com/yashmagar01" className="text-slate-900 hover:text-purple-600 transition-colors">
                 Yash Magar
              </a>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
