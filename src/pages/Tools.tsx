import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
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

const Tools = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeGenerator, setActiveGenerator] = useState(searchParams.get('active') || 'qr-code');

  const generators = [
    { id: 'qr-code', name: 'QR Code', icon: '📱', gradient: 'from-orange-500 to-amber-500', component: <QRCodeGenerator /> },
    { id: 'color-palette', name: 'Color Palette', icon: '🎨', gradient: 'from-slate-600 to-gray-700', component: <ColorPalette /> },
    { id: 'lorem-ipsum', name: 'Lorem Ipsum', icon: '📝', gradient: 'from-blue-500 to-cyan-500', component: <LoremIpsum /> },
    { id: 'random-number', name: 'Random Number', icon: '🎲', gradient: 'from-purple-500 to-indigo-500', component: <RandomNumber /> },
    { id: 'password', name: 'Password', icon: '🔒', gradient: 'from-emerald-500 to-teal-500', component: <PasswordGenerator /> },
    { id: 'css-gradient', name: 'CSS Gradient', icon: '🌈', gradient: 'from-violet-500 to-purple-500', component: <CSSGradient /> },
    { id: 'profile', name: 'Profile', icon: '👤', gradient: 'from-teal-500 to-cyan-500', component: <ProfileGenerator /> },
    { id: 'placeholder', name: 'Placeholder Image', icon: '🖼️', gradient: 'from-red-500 to-pink-500', component: <PlaceholderImage /> },
    { id: 'unique-id', name: 'Unique ID', icon: '🆔', gradient: 'from-slate-500 to-gray-500', component: <UniqueID /> },
    { id: 'quotes', name: 'Random Quote', icon: '💭', gradient: 'from-indigo-500 to-blue-500', component: <RandomQuote /> },
    { id: 'hashtags', name: 'Hashtag Generator', icon: '#️⃣', gradient: 'from-emerald-500 to-teal-500', component: <HashtagGenerator /> },
    { id: 'would-you-rather', name: 'Would You Rather', icon: '🤔', gradient: 'from-yellow-500 to-orange-500', component: <WouldYouRather /> }
  ];

  const currentTool = generators.find(gen => gen.id === activeGenerator);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Sidebar Navigation (Desktop) */}
      <div className="hidden lg:flex fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-100 flex-col z-50">
        <div className="p-6 border-b border-gray-50 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            U
          </div>
          <span className="font-bold text-xl text-slate-800">UtilityHub</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-1 no-scrollbar">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">Tools</div>
          {generators.map((gen) => (
            <button
              key={gen.id}
              onClick={() => setActiveGenerator(gen.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeGenerator === gen.id
                  ? 'bg-indigo-50 text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="text-lg">{gen.icon}</span>
              {gen.name}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-gray-50">
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2 text-gray-600 hover:text-indigo-600"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className="lg:pl-64 min-h-screen">
        {/* Mobile Header (Unified) */}
        <div className="lg:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="-ml-2">
              <ArrowLeft className="w-5 h-5" />
             </Button>
             <span className="font-semibold text-lg text-slate-800">{currentTool?.name}</span>
          </div>
          
          {/* Mobile Menu Trigger could go here, for now using horizontal scroll backup */}
        </div>

        {/* Mobile Tool Navigation (Horizontal Scroll - Keeping as backup/secondary for mobile) */}
        <div className="lg:hidden bg-white border-b border-gray-100 overflow-x-auto no-scrollbar">
           <div className="flex p-2 gap-2 min-w-max">
             {generators.map((gen) => (
               <button
                 key={gen.id}
                 onClick={() => setActiveGenerator(gen.id)}
                 className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                   activeGenerator === gen.id
                     ? 'bg-indigo-600 text-white shadow-md'
                     : 'bg-gray-100 text-gray-600'
                 }`}
               >
                 <span>{gen.icon}</span>
                 {gen.name}
               </button>
             ))}
           </div>
        </div>

        {/* Tool Content Area */}
        <div className="p-4 lg:p-10 max-w-5xl mx-auto">
          <div className="mb-8 hidden lg:block animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
               <span className="text-4xl">{currentTool?.icon}</span>
               {currentTool?.name}
             </h1>
             <p className="text-slate-500 text-lg">Powerful generator tool for your workflow.</p>
          </div>
          
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
             {currentTool?.component}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
