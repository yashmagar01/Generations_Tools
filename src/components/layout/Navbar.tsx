import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Github, Sparkles } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for glassmorphism intensity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    // Handle scroll effect for glassmorphism intensity and update state
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'All Tools', href: '/tools' },
  ];

  const handleNavigation = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }
    
    if (href.startsWith('/')) {
      navigate(href);
    } else {
      // Scroll to section if on home, otherwise go home first
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
           document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm' 
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <span className="font-bold text-lg sm:text-xl">U</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              UtilityHub
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavigation(link.href)}
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                {link.name}
              </button>
            ))}
            
            <div className="h-6 w-px bg-slate-200" />
            
            <a 
              href="https://github.com/yashmagar01/Generations_Tools" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-900 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>

            <Button 
              onClick={() => navigate('/tools')}
              className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl animate-in slide-in-from-top-2">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavigation(link.href)}
                className="block w-full text-left px-4 py-3 text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
              >
                {link.name}
              </button>
            ))}
            <div className="h-px bg-slate-100 my-2" />
             <button
                onClick={() => handleNavigation('https://github.com/yashmagar01/Generations_Tools')}
                className="w-full flex items-center gap-2 px-4 py-3 text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
              >
                <Github className="w-5 h-5" />
                GitHub Repo
              </button>
            <Button 
              onClick={() => handleNavigation('/tools')}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl py-6 text-lg shadow-lg"
            >
              Launch App <Sparkles className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
