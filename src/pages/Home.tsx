import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Home = () => {
  const navigate = useNavigate();

  const tools = [
    { 
      id: 'qr-code', 
      name: 'QR Code', 
      icon: '📱', 
      description: 'Generate QR codes instantly',
      gradient: 'from-orange-500 to-amber-500'
    },
    { 
      id: 'color-palette', 
      name: 'Color Palette', 
      icon: '🎨', 
      description: 'Generate beautiful color schemes',
      gradient: 'from-slate-600 to-gray-700'
    },
    { 
      id: 'lorem-ipsum', 
      name: 'Lorem Ipsum', 
      icon: '📝', 
      description: 'Generate placeholder text',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'random-number', 
      name: 'Random Number', 
      icon: '🎲', 
      description: 'Generate random numbers',
      gradient: 'from-purple-500 to-indigo-500'
    },
    { 
      id: 'password', 
      name: 'Password', 
      icon: '🔒', 
      description: 'Create secure passwords',
      gradient: 'from-green-500 to-emerald-500'
    },
    { 
      id: 'css-gradient', 
      name: 'CSS Gradient', 
      icon: '🌈', 
      description: 'Create CSS gradients',
      gradient: 'from-violet-500 to-purple-500'
    },
    { 
      id: 'profile', 
      name: 'Profile', 
      icon: '👤', 
      description: 'Generate dummy profiles',
      gradient: 'from-teal-500 to-cyan-500'
    },
    { 
      id: 'placeholder', 
      name: 'Placeholder Image', 
      icon: '🖼️', 
      description: 'Generate placeholder images',
      gradient: 'from-red-500 to-pink-500'
    },
    { 
      id: 'unique-id', 
      name: 'Unique ID', 
      icon: '🆔', 
      description: 'Generate unique identifiers',
      gradient: 'from-slate-500 to-gray-500'
    },
    { 
      id: 'quotes', 
      name: 'Random Quote', 
      icon: '💭', 
      description: 'Get inspirational quotes',
      gradient: 'from-indigo-500 to-blue-500'
    },
    { 
      id: 'hashtags', 
      name: 'Hashtag Generator', 
      icon: '#️⃣', 
      description: 'Generate trending hashtags',
      gradient: 'from-emerald-500 to-teal-500'
    },
    { 
      id: 'would-you-rather', 
      name: 'Would You Rather', 
      icon: '🤔', 
      description: 'Fun question generator',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              UtilityHub
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-2">
              All in One Generator Suite
            </p>
            <p className="text-lg opacity-75 max-w-2xl mx-auto">
              Your comprehensive toolkit for generators and utilities. 
              Choose from 12 powerful tools with real-time results.
            </p>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Generator Tools</h2>
          <p className="text-gray-600">Tap any tool to get started</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {tools.map((tool, index) => (
            <Card 
              key={tool.id} 
              className="relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => navigate(`/tools?active=${tool.id}`)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-10`} />
              <div className="relative p-6 text-center">
                <div className="text-4xl mb-3 transform transition-transform duration-300 hover:scale-110">
                  {tool.icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">
                  {tool.name}
                </h3>
                <p className="text-xs text-gray-600 leading-tight">
                  {tool.description}
                </p>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tool.gradient}`} />
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
              <div className="text-3xl font-bold text-indigo-600">12</div>
              <div className="text-sm text-gray-600">Powerful Tools</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '700ms' }}>
              <div className="text-3xl font-bold text-purple-600">∞</div>
              <div className="text-sm text-gray-600">Generations</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '800ms' }}>
              <div className="text-3xl font-bold text-pink-600">⚡</div>
              <div className="text-sm text-gray-600">Lightning Fast</div>
            </div>
          </div>
        </div>

        {/* Get Started Section */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '900ms' }}>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Ready to boost your productivity?
          </h3>
          <Button 
            onClick={() => navigate('/tools')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium transform transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Start Creating →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;