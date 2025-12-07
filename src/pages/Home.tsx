import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, ArrowRight, Zap, Shield, MousePointerClick } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Define tools for the grid layout

  const tools = [
    { 
      id: 'qr-code', 
      name: 'QR Code', 
      icon: '📱', 
      description: 'Generate QR codes instantly',
      gradient: 'from-orange-500 to-amber-500',
      category: 'Utility'
    },
    { 
      id: 'color-palette', 
      name: 'Color Palette', 
      icon: '🎨', 
      description: 'Generate beautiful color schemes',
      gradient: 'from-slate-600 to-gray-700',
      category: 'Design'
    },
    { 
      id: 'password', 
      name: 'Password', 
      icon: '🔒', 
      description: 'Create secure passwords',
      gradient: 'from-green-500 to-emerald-500',
      category: 'Security'
    },
    { 
      id: 'random-number', 
      name: 'Random Number', 
      icon: '🎲', 
      description: 'Generate random numbers',
      gradient: 'from-purple-500 to-indigo-500',
      category: 'Utility'
    },
    { 
      id: 'lorem-ipsum', 
      name: 'Lorem Ipsum', 
      icon: '📝', 
      description: 'Generate placeholder text',
      gradient: 'from-blue-500 to-cyan-500',
      category: 'Design'
    },
    { 
      id: 'css-gradient', 
      name: 'CSS Gradient', 
      icon: '🌈', 
      description: 'Create CSS gradients',
      gradient: 'from-violet-500 to-purple-500',
      category: 'Design'
    },
    { 
      id: 'profile', 
      name: 'Profile', 
      icon: '👤', 
      description: 'Generate dummy profiles',
      gradient: 'from-teal-500 to-cyan-500',
      category: 'Data'
    },
    { 
      id: 'placeholder', 
      name: 'Placeholder Image', 
      icon: '🖼️', 
      description: 'Generate placeholder images',
      gradient: 'from-red-500 to-pink-500',
      category: 'Design'
    },
    { 
      id: 'unique-id', 
      name: 'Unique ID', 
      icon: '🆔', 
      description: 'Generate unique identifiers',
      gradient: 'from-slate-500 to-gray-500',
      category: 'Dev'
    },
    { 
      id: 'quotes', 
      name: 'Random Quote', 
      icon: '💭', 
      description: 'Get inspirational quotes',
      gradient: 'from-indigo-500 to-blue-500',
      category: 'Fun'
    },
    { 
      id: 'hashtags', 
      name: 'Hashtag Generator', 
      icon: '#️⃣', 
      description: 'Generate trending hashtags',
      gradient: 'from-emerald-500 to-teal-500',
      category: 'Social'
    },
    { 
      id: 'would-you-rather', 
      name: 'Would You Rather', 
      icon: '🤔', 
      description: 'Fun question generator',
      gradient: 'from-yellow-500 to-orange-500',
      category: 'Fun'
    }
  ];

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      
      {/* Hero Section */}
      {/* Hero Section with Dot Pattern */}
      <div className="relative overflow-hidden bg-white pt-24 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/50 to-white" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 hover:scale-105 transition-transform cursor-default">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-medium text-slate-700">The Ultimate Developer Toolkit</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-slate-900 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Create. <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600">Generate.</span> Done.
          </h1>
          
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Premium privacy-first tools for developers. No server. No trackers. Just code.
          </p>

          <div className="max-w-xl mx-auto relative animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input 
              type="text"
              placeholder="Search tools (e.g., 'QR', 'Password', 'Color')..."
              className="pl-11 h-14 rounded-2xl shadow-xl shadow-indigo-100/50 border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 text-lg transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Features / How it works - Compact & Stylish */}
      <div id="how-it-works" className="py-8 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4">
           <div className="flex flex-col md:flex-row justify-center gap-6 max-w-6xl mx-auto">
              <div className="flex-1 flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group">
                 <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                   <MousePointerClick className="w-6 h-6" />
                 </div>
                 <div className="text-left">
                    <h3 className="font-bold text-slate-900">1. Select Tool</h3>
                    <p className="text-slate-500 text-sm">Browse our suite of 12+ generators.</p>
                 </div>
              </div>
              <div className="flex-1 flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group">
                 <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                   <Zap className="w-6 h-6" />
                 </div>
                 <div className="text-left">
                    <h3 className="font-bold text-slate-900">2. Generate</h3>
                    <p className="text-slate-500 text-sm">Instant, client-side processing.</p>
                 </div>
              </div>
              <div className="flex-1 flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group">
                 <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                   <Shield className="w-6 h-6" />
                 </div>
                 <div className="text-left">
                    <h3 className="font-bold text-slate-900">3. Private</h3>
                    <p className="text-slate-500 text-sm">Data never leaves your browser.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div id="all-tools" className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
           <h2 className="text-2xl font-bold text-slate-900 mb-2">Available Generators</h2>
           <p className="text-slate-500">Pick a tool to get started instantly</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredTools.map((tool, index) => (
            <Card 
              key={tool.id} 
              className="group relative overflow-hidden cursor-pointer border-0 bg-white shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-2xl animate-in fade-in zoom-in-50 fill-mode-forwards opacity-0 z-0"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
              onClick={() => navigate(`/tools?active=${tool.id}`)}
              role="button"
              tabIndex={0}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="p-6">
                 <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300 block">{tool.icon}</span>
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                 </div>

                 <div className="space-y-2">
                   <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-slate-200 transition-colors">
                        {tool.category}
                      </span>
                   </div>
                   <h3 className="font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition-colors">
                      {tool.name}
                   </h3>
                   <p className="text-sm text-slate-500 line-clamp-2">
                      {tool.description}
                   </p>
                 </div>
              </div>
            </Card>
          ))}
          
          {filteredTools.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-lg">No tools found matching "{searchTerm}"</p>
              <Button 
                variant="link" 
                onClick={() => setSearchTerm('')}
                className="mt-2 text-indigo-600"
              >
                Clear search
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;