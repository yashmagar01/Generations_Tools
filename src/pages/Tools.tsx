import React, { useState } from 'react';
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
      {/* Mobile Header */}
      <div className={`bg-gradient-to-r ${currentTool?.gradient || 'from-indigo-600 to-purple-600'} text-white sticky top-0 z-50 shadow-md transition-colors duration-500`}>
        <div className="flex items-center p-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/20 p-2 mr-3"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-3 flex-1">
            <span className="text-2xl animate-in zoom-in spin-in-12 duration-300">{currentTool?.icon}</span>
            <div>
              <h1 className="text-lg font-semibold">{currentTool?.name}</h1>
              <p className="text-sm opacity-75">UtilityHub</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Navigation */}
      <div className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-[72px] z-40">
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex space-x-2 p-4 min-w-max">
            {generators.map((generator) => (
              <button
                key={generator.id}
                onClick={() => setActiveGenerator(generator.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap border ${
                  activeGenerator === generator.id
                    ? `bg-gradient-to-r ${generator.gradient} text-white shadow-lg transform scale-105 border-transparent`
                    : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'
                }`}
              >
                <span className="text-lg">{generator.icon}</span>
                <span className="text-sm font-medium">{generator.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 pb-12 max-w-3xl mx-auto">
         <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {currentTool?.component}
         </div>
      </div>
    </div>
  );
};

export default Tools;
