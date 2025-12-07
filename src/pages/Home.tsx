import { useState } from 'react';
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
  CheckCircle2
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Home = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  const tools = [
    { 
      id: 'qr-code', 
      name: 'QR Code', 
      icon: QrCode, 
      description: 'Generate customizable QR codes instantly.', 
      gradient: 'from-indigo-500 to-purple-500', 
      category: 'Utility' 
    },
    { 
      id: 'color-palette', 
      name: 'Color Palette', 
      icon: Palette, 
      description: 'Create harmonious color schemes for web.', 
      gradient: 'from-pink-500 to-rose-500', 
      category: 'Design' 
    },
    { 
      id: 'password', 
      name: 'Password Gen', 
      icon: Lock, 
      description: 'Generate cryptographically secure passwords.', 
      gradient: 'from-emerald-500 to-teal-500', 
      category: 'Security' 
    },
    { 
      id: 'random-number', 
      name: 'Random Number', 
      icon: Dices, 
      description: 'Pick random numbers or roll dice.', 
      gradient: 'from-amber-400 to-orange-500', 
      category: 'Utility' 
    },
    { 
      id: 'lorem-ipsum', 
      name: 'Lorem Ipsum', 
      icon: FileText, 
      description: 'Generate placeholder text for layouts.', 
      gradient: 'from-blue-500 to-cyan-500', 
      category: 'Design' 
    },
    { 
      id: 'css-gradient', 
      name: 'CSS Gradient', 
      icon: Paintbrush, 
      description: 'Create linear and radial gradients.', 
      gradient: 'from-violet-500 to-fuchsia-500', 
      category: 'Design' 
    },
    { 
      id: 'profile', 
      name: 'Profile Gen', 
      icon: User, 
      description: 'Create realistic dummy user profiles.', 
      gradient: 'from-cyan-500 to-blue-600', 
      category: 'Data' 
    },
    { 
      id: 'placeholder', 
      name: 'Placeholder', 
      icon: ImageIcon, 
      description: 'Generate dummy images with dimensions.', 
      gradient: 'from-red-500 to-pink-600', 
      category: 'Design' 
    },
    { 
      id: 'unique-id', 
      name: 'Unique ID', 
      icon: Fingerprint, 
      description: 'Generate UUIDs, NanoIDs, and CUIDs.', 
      gradient: 'from-slate-500 to-gray-600', 
      category: 'Dev' 
    },
    { 
      id: 'quotes', 
      name: 'Random Quote', 
      icon: Quote, 
      description: 'Get inspired with random quotes.', 
      gradient: 'from-indigo-400 to-purple-500', 
      category: 'Fun' 
    },
    { 
      id: 'hashtags', 
      name: 'Hashtags', 
      icon: Hash, 
      description: 'Generate trending hashtags for social.', 
      gradient: 'from-fuchsia-500 to-pink-500', 
      category: 'Social' 
    },
    { 
      id: 'would-you-rather', 
      name: 'Would You Rather', 
      icon: Split, 
      description: 'Generate fun social questions.', 
      gradient: 'from-lime-500 to-green-500', 
      category: 'Fun' 
    }
  ];

  const categories = ['All', 'Utility', 'Design', 'Security', 'Dev', 'Data', 'Fun'];
  
  const filteredTools = activeCategory === 'All' 
    ? tools 
    : tools.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-purple-100 selection:text-purple-900 overflow-x-hidden">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] orb orb-purple opacity-30 translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] orb orb-cyan opacity-20 -translate-x-1/3 translate-y-1/4" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-8 animate-in slide-in-from-bottom-4 duration-700">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                <span className="text-xs font-bold text-slate-700 tracking-wide uppercase">Generations V2.0</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1] animate-in slide-in-from-bottom-6 duration-700 delay-100">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500">Power</span> To<br />
                Create Anything.
              </h1>

              <p className="text-xl text-slate-500 mb-10 leading-relaxed font-medium max-w-lg animate-in slide-in-from-bottom-8 duration-700 delay-200">
                Premium developer tools designed for speed. <br/>
                No server. No trackers. Just pure utility.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom-10 duration-700 delay-300">
                <Button 
                   onClick={() => {
                     const element = document.getElementById('all-tools');
                     element?.scrollIntoView({ behavior: 'smooth' });
                   }}
                   className="h-14 px-8 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg font-bold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-1 transition-all duration-300"
                >
                  Start Creating Now
                </Button>
                <Button 
                   variant="outline"
                   onClick={() => navigate('/tools')}
                   className="h-14 px-8 rounded-xl border-2 border-slate-200 text-slate-600 hover:border-purple-200 hover:bg-purple-50/50 hover:text-purple-700 text-lg font-medium transition-all duration-300"
                >
                  View All 12 Tools
                </Button>
              </div>

              <div className="mt-8 flex items-center gap-6 text-sm text-slate-500 font-medium animate-in slide-in-from-bottom-12 duration-700 delay-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                   <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                   <span>Client-side Secure</span>
                </div>
                <div className="flex items-center gap-2">
                   <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                   <span>No Signup</span>
                </div>
              </div>
            </div>

            {/* Right Visual (Mockup) */}
            <div className="relative hidden lg:block animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
               <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-2xl -z-10" />
                  
                  {/* Mock UI Header */}
                  <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-4">
                     <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                        <div className="w-3 h-3 rounded-full bg-emerald-400" />
                     </div>
                     <div className="h-2 w-32 bg-slate-100 rounded-full" />
                  </div>

                  {/* Mock content representing tools */}
                  <div className="grid grid-cols-2 gap-4">
                      {[1,2,3,4].map(i => (
                         <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <div className={`w-10 h-10 rounded-lg mb-3 bg-gradient-to-br ${i % 2 === 0 ? 'from-purple-100 to-indigo-100' : 'from-blue-100 to-cyan-100'}`} />
                            <div className="h-2 w-20 bg-slate-200 rounded-full mb-2" />
                            <div className="h-2 w-12 bg-slate-100 rounded-full" />
                         </div>
                      ))}
                  </div>
               </div>

               {/* Decorative elements behind */}
               <div className="absolute -top-10 -right-10 w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl opacity-10 -z-10 rotate-6" />
            </div>

          </div>
        </div>
      </div>

      {/* --- FEATURE CARDS --- */}
      <div className="py-20 bg-white border-y border-slate-100">
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                  { icon: MousePointerClick, title: 'One Click', desc: 'Instant results with zero friction. Designed for efficiency.' },
                  { icon: Zap, title: 'Lightning Fast', desc: '100% Client-side processing using WebAssembly.' },
                  { icon: Shield, title: 'Secure by Default', desc: 'Your data never leaves your browser. Privacy first.' }
               ].map((feature, i) => (
                  <div key={i} className="group p-8 rounded-3xl bg-white border border-slate-100 hover:border-purple-100 hover:shadow-2xl hover:shadow-purple-100/50 transition-all duration-300 hover:-translate-y-2">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                            <feature.icon className="w-5 h-5" />
                         </div>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                      <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* --- TOOLS GRID --- */}
      <div id="all-tools" className="container mx-auto px-4 py-24">
         {/* Section Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
               <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                  System <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">Tools</span>
               </h2>
               <p className="text-xl text-slate-500 font-medium">Everything you need to ship faster.</p>
            </div>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-full text-white text-sm font-bold shadow-lg shadow-slate-900/20">
               <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
               12 MODULES READY
            </div>
         </div>

         {/* Filter Chips */}
         <div className="flex flex-wrap gap-2 mb-12">
            {categories.map(cat => (
               <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                     activeCategory === cat 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 scale-105' 
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-purple-300 hover:text-purple-600'
                  }`}
               >
                  {cat}
               </button>
            ))}
         </div>

         {/* Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
               <div 
                  key={tool.id}
                  onClick={() => navigate(`/tools?active=${tool.id}`)}
                  className="group relative bg-white border border-slate-200 rounded-2xl p-6 cursor-pointer hover:border-violet-500 hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-300 hover:-translate-y-1"
               >
                  <div className="flex justify-between items-start mb-6">
                     {/* Gradient Icon Container */}
                     <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <tool.icon className="w-7 h-7" />
                     </div>

                     <div className="text-slate-300 group-hover:text-violet-500 group-hover:translate-x-1 transition-all duration-300">
                        <ArrowRight className="w-5 h-5" />
                     </div>
                  </div>
                  
                  <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-violet-700 transition-colors">{tool.name}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">{tool.description}</p>
               </div>
            ))}
         </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;