import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, Zap, Rocket, PenTool } from 'lucide-react';

const Changelog = () => {
  const changes = [
    {
      version: 'v2.0.0',
      date: 'December 7, 2024',
      title: 'The Masterpiece Updates',
      type: 'Major',
      description: 'A complete visual overhaul to match "Silicon Valley" standards.',
      items: [
        'New "Bento Grid" Hero Section with 3D physics.',
        'Infinite Marquee of tool icons.',
        'Integrated "Changelog" page (You are here).',
        'Added "Newsletter" subscription simulation.',
        'Refined "Editorial" typography settings.',
      ]
    },
    {
      version: 'v1.5.0',
      date: 'December 6, 2024',
      title: 'The "Electric" Palette',
      type: 'Visual',
      description: 'Switched to a high-energy Violet/Cyan color system.',
      items: [
        'Updated global color variables to Electric Violet.',
        'Added Lucide icons to all tool cards.',
        'Removed emoji icons.',
        'Improved hover states on all interactive elements.',
      ]
    },
    {
      version: 'v1.0.0',
      date: 'December 5, 2024',
      title: 'Initial Release',
      type: 'Launch',
      description: 'Generations Tools public launch with 12 core modules.',
      items: [
        'QR Code, Password, and Color Palette Generators.',
        'Client-side architecture (No server required).',
        'Responsive layout for Mobile and Desktop.',
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-violet-100 selection:text-violet-900">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16 animate-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
            <Rocket className="w-4 h-4 text-violet-500" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">What's New</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 font-display">
            Changelog & <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500">Updates</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-xl mx-auto">
            We are constantly improving. Here is a timeline of feature releases, visual updates, and bug fixes.
          </p>
        </div>

        <div className="relative border-l-2 border-slate-200 ml-4 md:ml-0 md:pl-0 space-y-16">
          {changes.map((change, index) => (
            <div key={index} className="relative pl-8 md:pl-0 group animate-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${index * 150}ms` }}>
              
              {/* Timeline Dot */}
              <div className="absolute left-[-5px] top-0 w-3 h-3 rounded-full bg-violet-500 ring-4 ring-slate-50 group-hover:ring-violet-100 transition-all duration-300 md:left-1/2 md:-translate-x-1.5" />
              
              <div className={`md:flex items-start justify-between gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Date & Version (Side) */}
                <div className={`md:w-1/2 mb-4 md:mb-0 ${index % 2 === 0 ? 'md:text-left md:pl-12' : 'md:text-right md:pr-12'}`}>
                  <span className="block text-sm font-bold text-violet-600 mb-1">{change.date}</span>
                  <Badge variant="outline" className="bg-white text-slate-600 font-mono">
                    {change.version}
                  </Badge>
                </div>

                {/* Content Card (Main) */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg ${change.type === 'Major' ? 'bg-violet-100 text-violet-600' : 'bg-slate-100 text-slate-600'}`}>
                        {change.type === 'Major' && <Sparkles className="w-5 h-5" />}
                        {change.type === 'Visual' && <PenTool className="w-5 h-5" />}
                        {change.type === 'Launch' && <Zap className="w-5 h-5" />}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">{change.title}</h3>
                    </div>
                    
                    <p className="text-slate-600 font-medium mb-6 leading-relaxed">
                      {change.description}
                    </p>

                    <ul className="space-y-3">
                      {change.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-500">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Changelog;
