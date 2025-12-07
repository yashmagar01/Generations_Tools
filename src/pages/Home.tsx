import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, ArrowRight, Zap, Shield, MousePointerClick } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

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
      <div className="relative overflow-hidden bg-white pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 opacity-80" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20 animate-float" />
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-4 pt-20 pb-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 hover:shadow-md transition-shadow cursor-default">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-medium text-indigo-900">The Ultimate Developer Toolkit</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-slate-900 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Create. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Generate.</span> Done.
          </h1>
          
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            A privacy-first suite of powerful tools designed for developers, designers, and creators. 
            No sign-up required. 100% Client-side.
          </p>

          <div className="max-w-md mx-auto relative animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input 
              type="text"
              placeholder="Search tools (e.g., 'QR Code', 'Password', 'Color')..."
              className="pl-11 h-14 rounded-2xl shadow-xl border-gray-100 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 text-lg transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Features / How it works */}
      <div id="how-it-works" className="py-12 bg-white/50 backdrop-blur-sm border-b border-gray-100/50">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                 <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                   <MousePointerClick className="w-6 h-6" />
                 </div>
                 <h3 className="font-semibold text-lg text-slate-900 mb-2">1. Select a Tool</h3>
                 <p className="text-slate-500 text-sm">Choose from our suite of 12+ specialized generators for code, design, and data.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                 <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                   <Zap className="w-6 h-6" />
                 </div>
                 <h3 className="font-semibold text-lg text-slate-900 mb-2">2. Generate Instantly</h3>
                 <p className="text-slate-500 text-sm">Real-time processing directly in your browser. No server latency, no waiting.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                 <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                   <Shield className="w-6 h-6" />
                 </div>
                 <h3 className="font-semibold text-lg text-slate-900 mb-2">3. 100% Private</h3>
                 <p className="text-slate-500 text-sm">Data never leaves your device. Copy your results and get back to work secure.</p>
              </div>
           </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div id="all-tools" className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredTools.map((tool, index) => (
            <Card 
              key={tool.id} 
              className="group relative overflow-hidden cursor-pointer border-0 bg-white shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-2xl animate-in fade-in zoom-in-50 fill-mode-forwards opacity-0"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
              onClick={() => navigate(`/tools?active=${tool.id}`)}
              role="button"
              tabIndex={0}
            >
              <div className={`absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="p-6">
                 <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-2xl mb-4 shadow-inner transform group-hover:scale-110 transition-transform duration-300`}>
                  {tool.icon}
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition-colors">
                      {tool.name}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 font-medium">
                    {tool.category}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed pt-2">
                    {tool.description}
                  </p>
                </div>
              </div>
              
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-50/50 rounded-2xl pointer-events-none transition-all duration-300" />
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

      {/* Footer Stats - Minimalist */}
      <div className="bg-white border-t border-gray-100 py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-center divide-x divide-gray-100">
            <div>
              <div className="text-2xl font-bold text-slate-900">12+</div>
              <div className="text-sm text-slate-500 mt-1">Free Tools</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">100%</div>
              <div className="text-sm text-slate-500 mt-1">Client-Side</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">∞</div>
              <div className="text-sm text-slate-500 mt-1">Possibilities</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;