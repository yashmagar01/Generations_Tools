import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, LayoutGrid, Sparkles, Menu, Home, 
  ChevronRight, Search, Zap 
} from 'lucide-react';
import ColorPalette from '@/components/tools/ColorPalette';
import LoremIpsum from '@/components/tools/LoremIpsum';
import RandomNumber from '@/components/tools/RandomNumber';
import PasswordGenerator from '@/components/tools/PasswordGenerator';
import CSSGradient from '@/components/tools/CSSGradient';
import ProfileGenerator from '@/components/tools/ProfileGenerator';
import PlaceholderImage from '@/components/tools/PlaceholderImage';
import UniqueID from '@/components/tools/UniqueID';
import RandomQuote from '@/components/tools/RandomQuote';
import HashtagGenerator from '@/components/tools/HashtagGenerator';
import WouldYouRather from '@/components/tools/WouldYouRather';
import QRCodeGenerator from '@/components/tools/QRCodeGenerator';
import { useState, useEffect } from 'react';

const Tools = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const activeGenerator = searchParams.get('active') || 'qr-code';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const setActiveGenerator = (id: string) => {
    setSearchParams({ active: id });
    setIsMobileMenuOpen(false); // Close mobile menu on selection
  };
  
  // Scroll to top on tool change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeGenerator]);

  const generators = [
    { id: 'qr-code', name: 'QR Code', icon: '📱', gradient: 'from-orange-500 to-amber-500', component: <QRCodeGenerator /> },
    { id: 'color-palette', name: 'Color Palette', icon: '🎨', gradient: 'from-slate-600 to-gray-700', component: <ColorPalette /> },
    { id: 'password', name: 'Password', icon: '🔒', gradient: 'from-emerald-500 to-teal-500', component: <PasswordGenerator /> },
    { id: 'random-number', name: 'Random Number', icon: '🎲', gradient: 'from-purple-500 to-indigo-500', component: <RandomNumber /> },
    { id: 'css-gradient', name: 'CSS Gradient', icon: '🌈', gradient: 'from-violet-500 to-purple-500', component: <CSSGradient /> },
    { id: 'profile', name: 'Profile', icon: '👤', gradient: 'from-teal-500 to-cyan-500', component: <ProfileGenerator /> },
    { id: 'lorem-ipsum', name: 'Lorem Ipsum', icon: '📝', gradient: 'from-blue-500 to-cyan-500', component: <LoremIpsum /> },
    { id: 'unique-id', name: 'Unique ID', icon: '🆔', gradient: 'from-slate-500 to-gray-500', component: <UniqueID /> },
    { id: 'placeholder', name: 'Placeholder Image', icon: '🖼️', gradient: 'from-red-500 to-pink-500', component: <PlaceholderImage /> },
    { id: 'quotes', name: 'Random Quote', icon: '💭', gradient: 'from-indigo-500 to-blue-500', component: <RandomQuote /> },
    { id: 'hashtags', name: 'Hashtag Generator', icon: '#️⃣', gradient: 'from-emerald-500 to-teal-500', component: <HashtagGenerator /> },
    { id: 'would-you-rather', name: 'Would You Rather', icon: '🤔', gradient: 'from-yellow-500 to-orange-500', component: <WouldYouRather /> }
  ];

  const currentTool = generators.find(gen => gen.id === activeGenerator);

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-50/50 to-transparent" />
         <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] rounded-full bg-purple-100/30 blur-[100px] animate-float" />
         <div className="absolute top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-blue-100/20 blur-[80px] animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* --- Desktop Sidebar --- */}
      <aside className="hidden lg:flex fixed inset-y-4 left-4 w-72 glass-panel rounded-3xl flex-col z-50 overflow-hidden transition-all duration-300">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-100/50 flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            U
          </div>
          <div>
             <h1 className="font-bold text-lg text-slate-900 leading-tight">UtilityHub</h1>
             <p className="text-xs text-slate-500 font-medium tracking-wide">PRO SUITE</p>
          </div>
        </div>
        
        {/* Tools List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 sidebar-scroll">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-3 pt-2">Generators</div>
          {generators.map((gen) => (
            <button
              key={gen.id}
              onClick={() => setActiveGenerator(gen.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden ${
                activeGenerator === gen.id
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm'
              }`}
            >
              {activeGenerator === gen.id && (
                 <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-full" />
              )}
              <span className={`text-lg transition-transform duration-300 ${activeGenerator === gen.id ? 'scale-110' : 'group-hover:scale-110'}`}>{gen.icon}</span>
              {gen.name}
              {activeGenerator === gen.id && <ChevronRight className="ml-auto w-4 h-4 text-indigo-400 opacity-100" />}
            </button>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-100/50 bg-white/50">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 text-slate-500 hover:text-slate-900 hover:bg-white transition-all"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="lg:pl-80 min-h-screen transition-all duration-300">
        
        {/* Desktop Header / Breadcrumbs */}
        <header className="hidden lg:flex items-center justify-between px-8 py-6 max-w-7xl mx-auto animate-in-fade">
           <div className="flex items-center gap-2 text-sm text-slate-500 bg-white/50 px-4 py-2 rounded-full border border-white/60 shadow-sm backdrop-blur-sm">
              <Home className="w-4 h-4" />
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <span className="font-medium text-slate-800">Tools</span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <span className="font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{currentTool?.name}</span>
           </div>
           
           <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="hidden xl:flex gap-2 bg-white/50 hover:bg-white border-white/60">
                 <Search className="w-4 h-4" />
                 <span className="text-xs text-slate-400">Press / to search</span>
              </Button>
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 ring-2 ring-white shadow-md" />
           </div>
        </header>

        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 p-4 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="-ml-2 hover:bg-slate-100 rounded-full">
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </Button>
              <div className="flex items-center gap-2">
                 <span className="text-xl">{currentTool?.icon}</span>
                 <span className="font-bold text-lg text-slate-900">{currentTool?.name}</span>
              </div>
           </div>
           <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={isMobileMenuOpen ? 'bg-slate-100' : ''}>
              <LayoutGrid className="w-5 h-5 text-slate-700" />
           </Button>
        </header>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
           <div className="lg:hidden fixed inset-x-0 top-[73px] bottom-0 z-30 bg-white/95 backdrop-blur-2xl p-4 overflow-y-auto animate-in slide-in-from-top-2">
              <div className="grid grid-cols-2 gap-3 pb-20">
                 {generators.map((gen) => (
                    <button
                      key={gen.id}
                      onClick={() => setActiveGenerator(gen.id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${
                        activeGenerator === gen.id 
                          ? 'border-indigo-200 bg-indigo-50/50 text-indigo-700 shadow-sm' 
                          : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'
                      }`}
                    >
                       <span className="text-3xl mb-2">{gen.icon}</span>
                       <span className="text-sm font-medium">{gen.name}</span>
                    </button>
                 ))}
              </div>
           </div>
        )}

        {/* Tool Workspace */}
        <div className="px-4 pb-8 lg:px-8 lg:pb-12 max-w-7xl mx-auto">
          {/* Tool Title Block (Desktop Only - Mobile has header) */}
          <div className="hidden lg:flex items-end justify-between mb-8 animate-in-up delay-100">
             <div>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2 flex items-center gap-4">
                  <span className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-4xl">{currentTool?.icon}</span>
                  {currentTool?.name}
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl ml-1">
                   Professional grade generator. 
                   <span className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100">
                      <Zap className="w-3 h-3" /> FAST
                   </span>
                </p>
             </div>
          </div>
          
          {/* Component Canvas */}
          <div className="animate-in-up delay-200 lg:bg-white/40 lg:backdrop-blur-sm lg:border lg:border-white/50 lg:p-1 lg:rounded-[32px] lg:shadow-xl lg:shadow-slate-200/50">
             <div className="w-full h-full min-h-[400px]">
                {currentTool?.component}
             </div>
          </div>
          
          <div className="h-20" /> {/* Spacer */}
        </div>
      </main>
    </div>
  );
};

export default Tools;
