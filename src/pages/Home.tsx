import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, ArrowRight, Zap, Shield, MousePointerClick, Command } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Holographic spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
         const rect = containerRef.current.getBoundingClientRect();
         setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
         });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const tools = [
    { id: 'qr-code', name: 'QR Code', icon: '📱', description: 'Generate QR codes instantly', gradient: 'from-orange-500 to-amber-500', category: 'Utility' },
    { id: 'color-palette', name: 'Color Palette', icon: '🎨', description: 'Generate beautiful color schemes', gradient: 'from-slate-600 to-gray-700', category: 'Design' },
    { id: 'password', name: 'Password', icon: '🔒', description: 'Create secure passwords', gradient: 'from-green-500 to-emerald-500', category: 'Security' },
    { id: 'random-number', name: 'Random Number', icon: '🎲', description: 'Generate random numbers', gradient: 'from-purple-500 to-indigo-500', category: 'Utility' },
    { id: 'lorem-ipsum', name: 'Lorem Ipsum', icon: '📝', description: 'Generate placeholder text', gradient: 'from-blue-500 to-cyan-500', category: 'Design' },
    { id: 'css-gradient', name: 'CSS Gradient', icon: '🌈', description: 'Create CSS gradients', gradient: 'from-violet-500 to-purple-500', category: 'Design' },
    { id: 'profile', name: 'Profile', icon: '👤', description: 'Generate dummy profiles', gradient: 'from-teal-500 to-cyan-500', category: 'Data' },
    { id: 'placeholder', name: 'Placeholder Image', icon: '🖼️', description: 'Generate placeholder images', gradient: 'from-red-500 to-pink-500', category: 'Design' },
    { id: 'unique-id', name: 'Unique ID', icon: '🆔', description: 'Generate unique identifiers', gradient: 'from-slate-500 to-gray-500', category: 'Dev' },
    { id: 'quotes', name: 'Random Quote', icon: '💭', description: 'Get inspirational quotes', gradient: 'from-indigo-500 to-blue-500', category: 'Fun' },
    { id: 'hashtags', name: 'Hashtag Generator', icon: '#️⃣', description: 'Generate trending hashtags', gradient: 'from-emerald-500 to-teal-500', category: 'Social' },
    { id: 'would-you-rather', name: 'Would You Rather', icon: '🤔', description: 'Fun question generator', gradient: 'from-yellow-500 to-orange-500', category: 'Fun' }
  ];

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FAFAFA] font-sans overflow-x-hidden selection:bg-violet-100 selection:text-violet-900">
      <Navbar />
      
      {/* --- 3D Perspective Hero --- */}
      <div className="relative pt-32 pb-20 perspective-container">
         {/* 3D Grid Floor */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [transform:rotateX(60deg)_scale(2.5)] origin-top opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFA] via-transparent to-[#FAFAFA]" />
         </div>

         <div className="container mx-auto px-4 relative z-10 text-center">
             {/* Badge */}
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] mb-8 animate-in-up">
                 <span className="relative flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                 </span>
                 <span className="text-xs font-semibold text-slate-600 tracking-wide uppercase">Generations V2.0</span>
             </div>
             
             {/* Headline */}
             <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-slate-900 mb-6 animate-in-up delay-100">
                The <span className="text-gradient">Power</span> To<br/>
                Create.
             </h1>
             
             <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto mb-12 font-light leading-relaxed animate-in-up delay-200">
                A premium suite of dev tools. No backend. No limits. <br />
                <span className="text-slate-900 font-medium">Just pure utility.</span>
             </p>

             {/* Search Bar with Glow */}
             <div className="max-w-xl mx-auto relative group animate-in-up delay-300">
                 <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                 <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                       <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <Input 
                      type="text"
                      placeholder="Search for a tool..."
                      className="pl-12 h-14 bg-white/80 backdrop-blur-xl border-slate-200 text-lg rounded-xl shadow-lg focus:ring-2 focus:ring-violet-500/20"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center">
                       <kbd className="hidden md:inline-flex h-6 select-none items-center gap-1 rounded border bg-slate-50 px-2 font-mono text-[10px] font-medium text-slate-500 border-slate-200">
                          <span className="text-xs">⌘</span>K
                       </kbd>
                    </div>
                 </div>
             </div>
         </div>
      </div>

      {/* --- Value Props --- */}
      <div className="py-16 border-y border-slate-100 bg-white/50 backdrop-blur-sm">
         <div className="container mx-auto px-4">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[
                    { icon: MousePointerClick, title: 'One Click', desc: 'Instant results, zero friction.' },
                    { icon: Zap, title: 'Lightning Fast', desc: '100% Client-side processing.' },
                    { icon: Shield, title: 'Secure by Default', desc: 'Your data never leaves local.' }
                 ].map((feature, i) => (
                    <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all duration-300">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 mb-4 shadow-inner">
                           <feature.icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg mb-1">{feature.title}</h3>
                        <p className="text-slate-500 text-sm">{feature.desc}</p>
                    </div>
                 ))}
             </div>
         </div>
      </div>

      {/* --- Tools Grid --- */}
      <div className="container mx-auto px-4 py-20">
         <div className="flex items-end justify-between mb-12">
            <div>
               <h2 className="text-3xl font-bold text-slate-900 tracking-tight">System Tools</h2>
               <p className="text-slate-500 mt-2">Everything you need to ship faster.</p>
            </div>
            <div className="hidden md:block text-sm text-slate-400 font-mono">
               {filteredTools.length} MODULES READY
            </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTools.map((tool, index) => (
               <div 
                  key={tool.id}
                  onClick={() => navigate(`/tools?active=${tool.id}`)}
                  className="group relative bg-white border border-slate-200 rounded-3xl p-6 cursor-pointer overflow-hidden hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-500 hover:-translate-y-1 animate-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
               >
                  {/* Hover Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                     <div className="flex justify-between items-start mb-6">
                        <span className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">{tool.icon}</span>
                        <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center bg-slate-50 group-hover:bg-violet-50 group-hover:text-violet-600 transition-colors">
                           <ArrowRight className="w-4 h-4" />
                        </div>
                     </div>
                     
                     <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-violet-700 transition-colors">{tool.name}</h3>
                     <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{tool.description}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;