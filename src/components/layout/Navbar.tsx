import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Github, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Generators', path: '/tools' },
    { name: 'About', path: '/#how-it-works' },
  ];

  const handleNavigation = (path: string) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
           const element = document.getElementById(path.substring(2));
           element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
         const element = document.getElementById(path.substring(2));
         element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled ? 'bg-white/80 backdrop-blur-xl border-slate-200/50 shadow-sm py-3' : 'bg-transparent border-transparent py-5'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div 
             className="flex items-center gap-2 cursor-pointer group" 
             onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center text-white shadow-lg shadow-slate-900/20 group-hover:scale-105 transition-transform duration-300">
               <Sparkles className="w-4 h-4 text-violet-400" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">
               Utility<span className="text-slate-400">Hub</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
             <div className="flex items-center gap-6">
                {navLinks.map(link => (
                   <button 
                     key={link.name}
                     onClick={() => handleNavigation(link.path)}
                     className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                   >
                     {link.name}
                   </button>
                ))}
             </div>
             
             <div className="h-4 w-px bg-slate-200" />

             <div className="flex items-center gap-3">
                <Button 
                   variant="ghost" 
                   size="sm" 
                   className="text-slate-500 hover:text-slate-900"
                   onClick={() => window.open('https://github.com', '_blank')}
                >
                   <Github className="w-4 h-4" />
                </Button>
                <Button 
                   onClick={() => navigate('/tools')}
                   className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20 rounded-lg px-6 h-9 text-xs font-bold uppercase tracking-wide"
                >
                   Launch App
                </Button>
             </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
             className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
             {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
         <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-100 p-4 md:hidden animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-2">
               {navLinks.map(link => (
                   <button 
                     key={link.name}
                     onClick={() => handleNavigation(link.path)}
                     className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 font-medium text-slate-700"
                   >
                     {link.name}
                   </button>
                ))}
                <div className="h-px bg-slate-100 my-2" />
                <Button onClick={() => navigate('/tools')} className="w-full bg-slate-900 text-white">
                   Launch App
                </Button>
            </div>
         </div>
      )}
    </nav>
  );
};

export default Navbar;
