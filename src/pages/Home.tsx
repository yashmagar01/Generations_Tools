import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Sparkles, 
  QrCode, 
  Palette, 
  Lock, 
  Dices, 
  FileText, 
  Paintbrush, 
  User, 
  Image as ImageIcon, 
  Fingerprint, 
  Quote, 
  Hash, 
  Split,
  Zap,
  Shield,
  MousePointerClick,
  CheckCircle2,
  Code2,
  Terminal,
  Cpu
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Hook for scroll reveal animations
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

const ToolCard = ({ tool, navigate }: { tool: any, navigate: any }) => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <div 
      ref={ref}
      onClick={() => navigate(`/tools?active=${tool.id}`)}
      className={`bento-card p-6 cursor-pointer group relative overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <tool.icon className="w-7 h-7" />
          </div>
          <div className="text-slate-300 group-hover:text-violet-500 group-hover:translate-x-1 transition-all duration-300">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
        
        <div className="relative z-10">
          <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-violet-700 transition-colors font-display tracking-tight">{tool.name}</h3>
          <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">{tool.description}</p>
        </div>
    </div>
  );
};

const MarqueeItem = ({ icon: Icon, color }: { icon: any, color: string }) => (
  <div className="mx-8 flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
    <Icon className={`w-8 h-8 ${color}`} />
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  const tools = [
    { id: 'qr-code', name: 'QR Code', icon: QrCode, description: 'Generate customizable QR codes instantly.', gradient: 'from-indigo-500 to-purple-500', category: 'Utility' },
    { id: 'color-palette', name: 'Color Palette', icon: Palette, description: 'Create harmonious color schemes for web.', gradient: 'from-pink-500 to-rose-500', category: 'Design' },
    { id: 'password', name: 'Password Gen', icon: Lock, description: 'Generate cryptographically secure passwords.', gradient: 'from-emerald-500 to-teal-500', category: 'Security' },
    { id: 'random-number', name: 'Random Number', icon: Dices, description: 'Pick random numbers or roll dice.', gradient: 'from-amber-400 to-orange-500', category: 'Utility' },
    { id: 'lorem-ipsum', name: 'Lorem Ipsum', icon: FileText, description: 'Generate placeholder text for layouts.', gradient: 'from-blue-500 to-cyan-500', category: 'Design' },
    { id: 'css-gradient', name: 'CSS Gradient', icon: Paintbrush, description: 'Create linear and radial gradients.', gradient: 'from-violet-500 to-fuchsia-500', category: 'Design' },
    { id: 'profile', name: 'Profile Gen', icon: User, description: 'Create realistic dummy user profiles.', gradient: 'from-cyan-500 to-blue-600', category: 'Data' },
    { id: 'placeholder', name: 'Placeholder', icon: ImageIcon, description: 'Generate dummy images with dimensions.', gradient: 'from-red-500 to-pink-600', category: 'Design' },
    { id: 'unique-id', name: 'Unique ID', icon: Fingerprint, description: 'Generate UUIDs, NanoIDs, and CUIDs.', gradient: 'from-slate-500 to-gray-600', category: 'Dev' },
    { id: 'quotes', name: 'Random Quote', icon: Quote, description: 'Get inspired with random quotes.', gradient: 'from-indigo-400 to-purple-500', category: 'Fun' },
    { id: 'hashtags', name: 'Hashtags', icon: Hash, description: 'Generate trending hashtags for social.', gradient: 'from-fuchsia-500 to-pink-500', category: 'Social' },
    { id: 'would-you-rather', name: 'Would You Rather', icon: Split, description: 'Generate fun social questions.', gradient: 'from-lime-500 to-green-500', category: 'Fun' }
  ];

  const categories = ['All', 'Utility', 'Design', 'Security', 'Dev', 'Data', 'Fun'];
  const filteredTools = activeCategory === 'All' ? tools : tools.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-violet-100 selection:text-violet-900 overflow-x-hidden">
      <Navbar />

      {/* --- MASTERPIECE HERO --- */}
      <div className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-[100px] animate-float-slow" />
          <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-cyan-200/20 rounded-full blur-[100px] animate-float-medium" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center">
            
            {/* Announcement Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm mb-10 animate-in slide-in-from-bottom-4 duration-700 hover:scale-105 transition-transform cursor-default">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              <span className="text-xs font-bold text-slate-600 tracking-wider uppercase">Generations V2.0 is Live</span>
            </div>

            {/* Massive Headline */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-slate-900 mb-8 leading-[0.9] font-display animate-in slide-in-from-bottom-8 duration-700 delay-100">
              The <span className="text-gradient-electric">Ultimate</span><br />
              Toolkit.
            </h1>

            <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl leading-relaxed font-body font-medium animate-in slide-in-from-bottom-10 duration-700 delay-200">
              Twelve premium developer tools. Zero friction. <br className="hidden md:block"/>
              Designed for those who build the future.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row gap-5 animate-in slide-in-from-bottom-12 duration-700 delay-300">
              <Button 
                onClick={() => {
                  document.getElementById('tool-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="h-14 px-10 rounded-2xl bg-slate-900 text-white text-lg font-bold shadow-2xl shadow-slate-900/30 hover:scale-105 hover:bg-slate-800 transition-all duration-300"
              >
                Start Building
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/tools')}
                className="h-14 px-10 rounded-2xl border-2 border-slate-200 text-slate-700 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 text-lg font-bold transition-all duration-300"
              >
                Explore Modules
              </Button>
            </div>
          </div>
        </div>

        {/* --- FLOATING BENTO CARDS (Decorational) --- */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none -z-10 opacity-50">
           {/* Left Floaters */}
           <div className="absolute left-[5%] top-[-200px] w-64 p-4 bento-card animate-float-slow rotate-[-6deg]">
              <div className="h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl mb-3" />
              <div className="h-4 w-3/4 bg-slate-100 rounded-full mb-2" />
              <div className="h-3 w-1/2 bg-slate-50 rounded-full" />
           </div>
           <div className="absolute left-[15%] bottom-[-300px] w-56 p-4 bento-card animate-float-medium rotate-[3deg]">
              <div className="flex items-center gap-3 mb-3">
                 <div className="w-10 h-10 rounded-full bg-cyan-100" />
                 <div className="h-3 w-20 bg-slate-100 rounded-full" />
              </div>
              <div className="h-20 bg-slate-50 rounded-xl" />
           </div>

           {/* Right Floaters */}
           <div className="absolute right-[5%] top-[-150px] w-72 p-5 bento-card animate-float-medium rotate-[6deg]">
              <div className="grid grid-cols-2 gap-2 mb-3">
                 <div className="h-20 bg-rose-50 rounded-lg" />
                 <div className="h-20 bg-orange-50 rounded-lg" />
              </div>
              <div className="h-4 w-1/2 bg-slate-100 rounded-full" />
           </div>
             <div className="absolute right-[12%] bottom-[-250px] w-60 p-4 bento-card animate-float-slow rotate-[-4deg]">
              <div className="h-8 w-8 rounded-lg bg-emerald-100 mb-3" />
              <div className="h-4 w-full bg-slate-100 rounded-full mb-2" />
              <div className="h-4 w-2/3 bg-slate-100 rounded-full" />
           </div>
        </div>
      </div>

      {/* --- INFINITE MARQUEE --- */}
      <div className="py-12 bg-white border-y border-slate-100 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
        
        <div className="flex w-max animate-marquee">
          {/* Repeat twice for seamless loop */}
          {[...Array(2)].map((_, i) => (
             <div key={i} className="flex">
                <MarqueeItem icon={Code2} color="text-blue-500" />
                <MarqueeItem icon={Terminal} color="text-slate-800" />
                <MarqueeItem icon={Cpu} color="text-rose-500" />
                <MarqueeItem icon={Zap} color="text-amber-500" />
                <MarqueeItem icon={Shield} color="text-emerald-500" />
                <MarqueeItem icon={Lock} color="text-cyan-500" />
                <MarqueeItem icon={Palette} color="text-fuchsia-500" />
                <MarqueeItem icon={Share} color="text-indigo-500" />
                <MarqueeItem icon={QrCode} color="text-slate-500" />
             </div>
          ))}
        </div>
      </div>

      {/* --- MAIN TOOL GRID --- */}
      <div id="tool-grid" className="container mx-auto px-4 py-32">
        <div className="flex flex-col items-center text-center mb-20 animate-in slide-in-from-bottom-8 duration-700">
           <h2 className="text-4xl md:text-5xl font-bold font-display text-slate-900 mb-6">
             Crafted for <span className="text-gradient-electric">Perfectionists</span>.
           </h2>
           <p className="text-xl text-slate-500 max-w-2xl">
             Every tool you need to ship faster, debug less, and create more.
           </p>

           {/* Filter Chips */}
           <div className="mt-12 flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
               <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                     activeCategory === cat 
                        ? 'bg-slate-900 text-white shadow-xl scale-105' 
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:text-slate-900'
                  }`}
               >
                  {cat}
               </button>
            ))}
           </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {filteredTools.map(tool => (
             <ToolCard key={tool.id} tool={tool} navigate={navigate} />
           ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};
function Share(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  )
}


export default Home;