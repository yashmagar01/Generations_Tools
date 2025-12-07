import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Github, Sparkles } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Generators', href: '/tools' },
    { name: 'About', href: '/#features' },
  ];

  const handleNavigation = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noreferrer');
      return;
    }
    
    if (href.startsWith('/#')) {
       // Handle hash navigation
       navigate('/');
       setTimeout(() => {
          const element = document.getElementById(href.substring(2));
          element?.scrollIntoView({ behavior: 'smooth' });
       }, 100);
    } else {
       navigate(href);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm py-3' 
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
         <div className="flex items-center justify-between">
            
            {/* Logo Area */}
            <div 
               onClick={() => navigate('/')}
               className="flex items-center gap-3 cursor-pointer group"
            >
               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
                  <Sparkles className="w-5 h-5" />
               </div>
               <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-purple-600 transition-colors">
                  UtilityHub
               </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
               <div className="flex items-center gap-6">
                  {navLinks.map(link => (
                     <button 
                        key={link.name}
                        onClick={() => handleNavigation(link.href)}
                        className="text-sm font-semibold text-slate-600 hover:text-purple-600 transition-colors"
                     >
                        {link.name}
                     </button>
                  ))}
               </div>

               <div className="h-5 w-px bg-slate-200" />

               <div className="flex items-center gap-4">
                  <a 
                     href="https://github.com/yashmagar01/Generations_Tools" 
                     target="_blank"
                     rel="noreferrer"
                     className="text-slate-500 hover:text-slate-900 transition-colors"
                  >
                     <Github className="w-5 h-5" />
                  </a>
                  
                  <Button
                     onClick={() => navigate('/tools')}
                     className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-lg px-6 h-10 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all duration-300"
                  >
                     Launch App
                  </Button>
               </div>
            </div>

            {/* Mobile Toggle */}
            <button 
               className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
               {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
         </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
         <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-4 md:hidden animate-in slide-in-from-top-2 shadow-xl">
            <div className="flex flex-col gap-2">
               {navLinks.map(link => (
                  <button 
                     key={link.name}
                     onClick={() => handleNavigation(link.href)}
                     className="text-left px-4 py-3 rounded-lg hover:bg-slate-50 font-semibold text-slate-700"
                  >
                     {link.name}
                  </button>
               ))}
               <div className="h-px bg-slate-100 my-2" />
               <Button 
                  onClick={() => handleNavigation('/tools')}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold h-12"
               >
                  Launch App
               </Button>
            </div>
         </div>
      )}
    </nav>
  );
};

export default Navbar;
