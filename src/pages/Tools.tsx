import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';

const Tools = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeGenerator, setActiveGenerator] = useState(searchParams.get('active') || 'qr-code');
  const [copiedText, setCopiedText] = useState('');

  // Generator states
  const [colorPalette, setColorPalette] = useState<string[]>([]);
  const [loremText, setLoremText] = useState('');
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [password, setPassword] = useState('');
  const [qrCodeText, setQrCodeText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [gradientCSS, setGradientCSS] = useState('');
  const [profile, setProfile] = useState<any>({});
  const [placeholderUrl, setPlaceholderUrl] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const [currentQuote, setCurrentQuote] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [wouldYouRather, setWouldYouRather] = useState('');

  // Generator data
  const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "Life is what happens to you while you're busy making other plans. - John Lennon",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "It is during our darkest moments that we must focus to see the light. - Aristotle",
    "The way to get started is to quit talking and begin doing. - Walt Disney",
    "Don't let yesterday take up too much of today. - Will Rogers",
    "You learn more from failure than from success. - Unknown",
    "If you are working on something exciting that you really care about, you don't have to be pushed. - Steve Jobs",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The only impossible journey is the one you never begin. - Tony Robbins",
    "In the midst of winter, I found there was, within me, an invincible summer. - Albert Camus",
    "Be yourself; everyone else is already taken. - Oscar Wilde",
    "Two things are infinite: the universe and human stupidity. - Albert Einstein",
    "So many books, so little time. - Frank Zappa"
  ];

  const wouldYouRatherQuestions = [
    "Would you rather have the ability to fly or be invisible?",
    "Would you rather always be 10 minutes late or always be 20 minutes early?",
    "Would you rather lose all of your money or all of your pictures?",
    "Would you rather be able to speak all languages or speak to animals?",
    "Would you rather have unlimited battery life on all your devices or have free WiFi wherever you go?",
    "Would you rather be famous or the best friend of someone famous?",
    "Would you rather live without music or without movies?",
    "Would you rather always have to say everything on your mind or never speak again?",
    "Would you rather be stuck on a broken ski lift or in a broken elevator?",
    "Would you rather have the power to read minds or the power to see the future?",
    "Would you rather always be overdressed or always be underdressed?",
    "Would you rather live in the woods or on a beach?",
    "Would you rather have super strength or super speed?",
    "Would you rather never be able to use a touchscreen or never be able to use a keyboard and mouse?",
    "Would you rather be able to control fire or water?"
  ];

  const indianFirstNames = ["Aarav", "Vivaan", "Aditi", "Saanvi", "Vihaan", "Aditya", "Ananya", "Ishaan", "Diya", "Arjun", "Kavya", "Rudra", "Kiara", "Shaurya", "Aadhya", "Karan", "Myra", "Dev", "Riya", "Aryan"];
  const indianLastNames = ["Sharma", "Verma", "Singh", "Kumar", "Gupta", "Agarwal", "Patel", "Jain", "Reddy", "Rao", "Nair", "Iyer", "Shah", "Malhotra", "Chopra", "Bansal", "Mittal", "Kapoor", "Saxena", "Tiwari"];
  const indianCities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Vadodara", "Firozabad"];
  const countries = ["India"];

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Generator functions
  const generateColorPalette = () => {
    const colors = [];
    const baseHue = Math.floor(Math.random() * 360);
    
    for (let i = 0; i < 5; i++) {
      const hue = (baseHue + i * 72) % 360;
      const saturation = 70 + Math.random() * 20;
      const lightness = 45 + Math.random() * 20;
      const hex = hslToHex(hue, saturation, lightness);
      colors.push(hex);
    }
    setColorPalette(colors);
  };

  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const generateLorem = (paragraphs: number = 3) => {
    const loremWords = [
      "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
      "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
      "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
      "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
      "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
      "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
      "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
      "deserunt", "mollit", "anim", "id", "est", "laborum"
    ];

    let result = "";
    for (let p = 0; p < paragraphs; p++) {
      let paragraph = "";
      const sentenceCount = 4 + Math.floor(Math.random() * 4);
      
      for (let s = 0; s < sentenceCount; s++) {
        const wordCount = 8 + Math.floor(Math.random() * 8);
        let sentence = "";
        
        for (let w = 0; w < wordCount; w++) {
          const word = loremWords[Math.floor(Math.random() * loremWords.length)];
          sentence += (w === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word) + " ";
        }
        
        paragraph += sentence.trim() + ". ";
      }
      
      result += paragraph.trim() + "\n\n";
    }
    
    setLoremText(result.trim());
  };

  const generateRandomNumber = (min: number, max: number, isInteger: boolean, includeNegative: boolean, isFraction: boolean) => {
    let random;
    
    if (isFraction) {
      // Generate fraction between min and max
      const numerator = Math.floor(Math.random() * 20) + 1; // 1-20
      const denominator = Math.floor(Math.random() * 10) + 2; // 2-11
      random = (numerator / denominator) * (max - min) + min;
    } else {
      random = Math.random() * (max - min) + min;
    }
    
    if (includeNegative && Math.random() > 0.5) {
      random = -random;
    }
    
    let result;
    if (isInteger && !isFraction) {
      result = Math.floor(random);
    } else if (isFraction) {
      result = Math.round(random * 1000) / 1000; // 3 decimal places for fractions
    } else {
      result = Math.round(random * 100) / 100;
    }
    
    setRandomNumber(result);
  };

  const generatePassword = (length: number, includeUpper: boolean, includeLower: boolean, includeNumbers: boolean, includeSymbols: boolean) => {
    let charset = "";
    if (includeUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (charset === "") return;

    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
  };

  const generateQRCode = (text: string) => {
    if (!text) return;
    // Using QR Server API for simplicity
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
    setQrCodeUrl(url);
  };

  const generateGradient = (color1: string, color2: string, direction: string) => {
    const css = `linear-gradient(${direction}, ${color1}, ${color2})`;
    setGradientCSS(css);
  };

  const generateProfile = () => {
    const firstName = indianFirstNames[Math.floor(Math.random() * indianFirstNames.length)];
    const lastName = indianLastNames[Math.floor(Math.random() * indianLastNames.length)];
    const city = indianCities[Math.floor(Math.random() * indianCities.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    
    const bios = [
      "Passionate about technology and innovation.",
      "Creative professional with a love for design.",
      "Entrepreneur building the future.",
      "Digital nomad exploring the world.",
      "Problem solver and critical thinker."
    ];
    
    const bio = bios[Math.floor(Math.random() * bios.length)];
    
    setProfile({ firstName, lastName, bio, city, country });
  };

  const generatePlaceholderUrl = (width: number, height: number, bgColor: string = "cccccc", textColor: string = "ffffff") => {
    // Using picsum.photos for working placeholder images
    const url = `https://picsum.photos/${width}/${height}?random=${Math.floor(Math.random() * 1000)}`;
    setPlaceholderUrl(url);
  };

  const generateUniqueId = (type: string, length: number = 8) => {
    if (type === 'uuid') {
      const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
      setUniqueId(id);
    } else {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setUniqueId(result);
    }
  };

  const getRandomQuote = () => {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(quote);
  };

  const generateHashtags = (keyword: string) => {
    if (!keyword) return;
    
    const suggestions = [
      `#${keyword.replace(/\s+/g, '').toLowerCase()}`,
      `#${keyword.replace(/\s+/g, '').toLowerCase()}life`,
      `#${keyword.replace(/\s+/g, '').toLowerCase()}vibes`,
      `#love${keyword.replace(/\s+/g, '').toLowerCase()}`,
      `#${keyword.replace(/\s+/g, '').toLowerCase()}daily`
    ];
    
    setHashtags(suggestions);
  };

  const getRandomWouldYouRather = () => {
    const question = wouldYouRatherQuestions[Math.floor(Math.random() * wouldYouRatherQuestions.length)];
    setWouldYouRather(question);
  };

  const generators = [
    { id: 'qr-code', name: 'QR Code', icon: '📱', gradient: 'from-orange-500 to-amber-500' },
    { id: 'color-palette', name: 'Color Palette', icon: '🎨', gradient: 'from-slate-600 to-gray-700' },
    { id: 'lorem-ipsum', name: 'Lorem Ipsum', icon: '📝', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'random-number', name: 'Random Number', icon: '🎲', gradient: 'from-purple-500 to-indigo-500' },
    { id: 'password', name: 'Password', icon: '🔒', gradient: 'from-green-500 to-emerald-500' },
    { id: 'css-gradient', name: 'CSS Gradient', icon: '🌈', gradient: 'from-violet-500 to-purple-500' },
    { id: 'profile', name: 'Profile', icon: '👤', gradient: 'from-teal-500 to-cyan-500' },
    { id: 'placeholder', name: 'Placeholder Image', icon: '🖼️', gradient: 'from-red-500 to-pink-500' },
    { id: 'unique-id', name: 'Unique ID', icon: '🆔', gradient: 'from-slate-500 to-gray-500' },
    { id: 'quotes', name: 'Random Quote', icon: '💭', gradient: 'from-indigo-500 to-blue-500' },
    { id: 'hashtags', name: 'Hashtag Generator', icon: '#️⃣', gradient: 'from-emerald-500 to-teal-500' },
    { id: 'would-you-rather', name: 'Would You Rather', icon: '🤔', gradient: 'from-yellow-500 to-orange-500' }
  ];

  const currentTool = generators.find(gen => gen.id === activeGenerator);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Mobile Header */}
      <div className={`bg-gradient-to-r ${currentTool?.gradient || 'from-indigo-600 to-purple-600'} text-white sticky top-0 z-50`}>
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
            <span className="text-2xl">{currentTool?.icon}</span>
            <div>
              <h1 className="text-lg font-semibold">{currentTool?.name}</h1>
              <p className="text-sm opacity-75">UtilityHub</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Navigation */}
      <div className="bg-white shadow-sm border-b sticky top-16 z-40">
        <div className="overflow-x-auto">
          <div className="flex space-x-2 p-4 min-w-max">
            {generators.map((generator) => (
              <button
                key={generator.id}
                onClick={() => setActiveGenerator(generator.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${
                  activeGenerator === generator.id
                    ? `bg-gradient-to-r ${generator.gradient} text-white shadow-lg transform scale-105`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
      <div className="p-4 pb-8">
        <div className="max-w-2xl mx-auto">
          {/* Render generator content here - keeping the same implementation as before but with mobile-first styling */}
          {/* For brevity, I'll implement just one generator as an example */}
          {activeGenerator === 'color-palette' && (
            <Card className="animate-fade-in border-0 shadow-xl bg-gradient-to-br from-white to-slate-50">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-gray-800 bg-clip-text text-transparent flex items-center justify-center gap-2">
                  <span className="text-2xl">🎨</span>
                  Color Palette Generator
                </CardTitle>
                <p className="text-gray-600 text-sm">Professional color schemes for your designs</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button 
                  onClick={generateColorPalette} 
                  className={`w-full bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-700 hover:to-gray-800 hover:shadow-lg transform transition-all duration-300 hover:scale-105 py-4 text-lg font-semibold rounded-xl flex items-center justify-center gap-2`}
                >
                  <span>🎯</span> Generate Professional Palette
                </Button>
                {colorPalette.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="text-lg">📊</span>
                      <h3 className="text-lg font-semibold text-gray-800">Professional Color Palette</h3>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                      {colorPalette.map((color, index) => (
                        <div key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                          <div
                            className="w-full h-24 rounded-lg cursor-pointer border-2 border-gray-300 shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-gray-500"
                            style={{ backgroundColor: color }}
                            onClick={() => copyToClipboard(color)}
                            title="Click to copy color"
                          />
                          <p className="text-xs mt-2 font-mono font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">{color}</p>
                          {copiedText === color && (
                            <p className="text-xs text-green-600 font-semibold animate-fade-in flex items-center justify-center gap-1">
                              <span>✅</span> Copied!
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-blue-600">💼</span>
                        <p className="text-sm text-slate-700 font-medium">
                          Professional Tip: Click any color to copy its HEX code
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Implement other generators similarly with mobile-first styling */}

          {activeGenerator === 'lorem-ipsum' && (
            <Card className="animate-fade-in border-0 shadow-xl">
              <CardHeader>
                <CardTitle>📝 Lorem Ipsum Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="paragraphs">Paragraphs</Label>
                    <Input
                      id="paragraphs"
                      type="number"
                      min="1"
                      max="10"
                      defaultValue="3"
                      onChange={(e) => generateLorem(parseInt(e.target.value) || 3)}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={() => generateLorem(3)} className="w-full">
                      Generate Lorem Ipsum
                    </Button>
                  </div>
                </div>
                {loremText && (
                  <div className="space-y-2">
                    <Textarea
                      value={loremText}
                      readOnly
                      className="min-h-[200px]"
                    />
                    <Button onClick={() => copyToClipboard(loremText)} variant="outline">
                      {copiedText === loremText ? 'Copied!' : 'Copy to Clipboard'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeGenerator === 'random-number' && (
            <Card className="animate-fade-in border-0 shadow-xl">
              <CardHeader>
                <CardTitle>🎲 Random Number Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="min">Minimum</Label>
                    <Input id="min" type="number" defaultValue="1" />
                  </div>
                  <div>
                    <Label htmlFor="max">Maximum</Label>
                    <Input id="max" type="number" defaultValue="100" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="integer" defaultChecked />
                    <Label htmlFor="integer">Integer only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="decimal" />
                    <Label htmlFor="decimal">Decimal numbers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="negative" />
                    <Label htmlFor="negative">Include negative numbers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="fraction" />
                    <Label htmlFor="fraction">Generate fraction</Label>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    const min = parseFloat((document.getElementById('min') as HTMLInputElement).value) || 1;
                    const max = parseFloat((document.getElementById('max') as HTMLInputElement).value) || 100;
                    const isInteger = (document.getElementById('integer') as HTMLInputElement).checked;
                    const includeNegative = (document.getElementById('negative') as HTMLInputElement).checked;
                    const isFraction = (document.getElementById('fraction') as HTMLInputElement).checked;
                    generateRandomNumber(min, max, isInteger, includeNegative, isFraction);
                  }}
                  className="w-full"
                >
                  Generate Random Number
                </Button>
                {randomNumber !== null && (
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border-2 border-purple-200">
                    <p className="text-3xl font-bold text-purple-800">{randomNumber}</p>
                    <p className="text-sm text-purple-600 mt-2">Your random number</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeGenerator === 'password' && (
            <Card className="animate-fade-in border-0 shadow-xl">
              <CardHeader>
                <CardTitle>🔒 Password Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="length">Password Length</Label>
                  <Input id="length" type="number" min="4" max="64" defaultValue="12" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="uppercase" defaultChecked />
                    <Label htmlFor="uppercase">Uppercase Letters (A-Z)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="lowercase" defaultChecked />
                    <Label htmlFor="lowercase">Lowercase Letters (a-z)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="numbers" defaultChecked />
                    <Label htmlFor="numbers">Numbers (0-9)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="symbols" />
                    <Label htmlFor="symbols">Symbols (!@#$%^&*)</Label>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    const length = parseInt((document.getElementById('length') as HTMLInputElement).value) || 12;
                    const includeUpper = (document.getElementById('uppercase') as HTMLInputElement).checked;
                    const includeLower = (document.getElementById('lowercase') as HTMLInputElement).checked;
                    const includeNumbers = (document.getElementById('numbers') as HTMLInputElement).checked;
                    const includeSymbols = (document.getElementById('symbols') as HTMLInputElement).checked;
                    
                    if (!includeUpper && !includeLower && !includeNumbers && !includeSymbols) {
                      alert('Please select at least one character type!');
                      return;
                    }
                    
                    generatePassword(length, includeUpper, includeLower, includeNumbers, includeSymbols);
                  }}
                  className="w-full"
                >
                  Generate Secure Password
                </Button>
                {password && (
                  <div className="space-y-2">
                    <div className="p-3 bg-gray-50 rounded border font-mono text-sm break-all">
                      {password}
                    </div>
                    <Button onClick={() => copyToClipboard(password)} variant="outline" className="w-full">
                      {copiedText === password ? 'Copied!' : 'Copy Password'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeGenerator === 'qr-code' && (
            <Card className="animate-fade-in border-0 shadow-xl">
              <CardHeader>
                <CardTitle>📱 QR Code Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="qr-text">Text or URL</Label>
                  <Input
                    id="qr-text"
                    placeholder="Enter text or URL to generate QR code"
                    value={qrCodeText}
                    onChange={(e) => setQrCodeText(e.target.value)}
                  />
                </div>
                <Button
                  onClick={() => generateQRCode(qrCodeText)}
                  className="w-full"
                  disabled={!qrCodeText}
                >
                  Generate QR Code
                </Button>
                {qrCodeUrl && (
                  <div className="text-center space-y-2">
                    <img src={qrCodeUrl} alt="Generated QR Code" className="mx-auto border rounded" />
                    <Button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = qrCodeUrl;
                        link.download = 'qrcode.png';
                        link.click();
                      }}
                      variant="outline"
                    >
                      Download QR Code
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeGenerator === 'css-gradient' && (
            <Card className="animate-fade-in border-0 shadow-xl">
              <CardHeader>
                <CardTitle>🌈 CSS Gradient Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="color1">Color 1</Label>
                    <Input id="color1" type="color" defaultValue="#ff0000" />
                  </div>
                  <div>
                    <Label htmlFor="color2">Color 2</Label>
                    <Input id="color2" type="color" defaultValue="#0000ff" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="direction">Direction</Label>
                  <Select defaultValue="to right">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="to right">To Right</SelectItem>
                      <SelectItem value="to left">To Left</SelectItem>
                      <SelectItem value="to bottom">To Bottom</SelectItem>
                      <SelectItem value="to top">To Top</SelectItem>
                      <SelectItem value="45deg">45 Degrees</SelectItem>
                      <SelectItem value="90deg">90 Degrees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={() => {
                    const color1 = (document.getElementById('color1') as HTMLInputElement).value;
                    const color2 = (document.getElementById('color2') as HTMLInputElement).value;
                    const direction = (document.querySelector('[role="combobox"]') as HTMLElement)?.textContent || 'to right';
                    generateGradient(color1, color2, direction);
                  }}
                  className="w-full"
                >
                  Generate Gradient
                </Button>
                 {gradientCSS && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Generated Gradient</h3>
                      <div
                        className="w-full h-32 rounded-xl border-2 border-gray-200 shadow-lg"
                        style={{ background: gradientCSS }}
                      />
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                      <h4 className="font-semibold text-gray-700 mb-2">CSS Code:</h4>
                      <div className="p-3 bg-gray-50 rounded-lg border font-mono text-sm break-all">
                        background: {gradientCSS};
                      </div>
                    </div>
                    <Button onClick={() => copyToClipboard(`background: ${gradientCSS};`)} variant="outline" className="w-full">
                      {copiedText === `background: ${gradientCSS};` ? 'Copied!' : 'Copy CSS Code'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeGenerator === 'profile' && (
            <Card className="animate-fade-in border-0 shadow-xl">
              <CardHeader>
                <CardTitle>👤 Profile Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={generateProfile} className="w-full">
                  Generate Random Profile
                </Button>
                {profile.firstName && (
                  <div className="space-y-4">
                    <div className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border-2 border-teal-200">
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold text-teal-700">👤 Name:</h4>
                          <h3 className="text-xl font-bold text-gray-800">{profile.firstName} {profile.lastName}</h3>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-teal-700">📝 Bio:</h4>
                          <p className="text-gray-700">{profile.bio}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-teal-700">📍 Location:</h4>
                          <p className="text-gray-700">{profile.city}, {profile.country}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <span className="text-yellow-600 text-lg">⚠️</span>
                        <div>
                          <h4 className="font-semibold text-yellow-800">Testing Purpose Only</h4>
                          <p className="text-sm text-yellow-700">
                            This generated profile is for testing and development purposes only. 
                            Do not use this information for any real-world applications or misrepresent it as actual personal data.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeGenerator === 'placeholder' && (
            <Card className="animate-fade-in border-0 shadow-xl">
              <CardHeader>
                <CardTitle>🖼️ Placeholder Image Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="width">Width (px)</Label>
                    <Input id="width" type="number" defaultValue="300" />
                  </div>
                  <div>
                    <Label htmlFor="height">Height (px)</Label>
                    <Input id="height" type="number" defaultValue="200" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bg-color">Background Color</Label>
                    <Input id="bg-color" type="color" defaultValue="#cccccc" />
                  </div>
                  <div>
                    <Label htmlFor="text-color">Text Color</Label>
                    <Input id="text-color" type="color" defaultValue="#ffffff" />
                  </div>
                </div>
                <Button
                  onClick={() => {
                    const width = parseInt((document.getElementById('width') as HTMLInputElement).value) || 300;
                    const height = parseInt((document.getElementById('height') as HTMLInputElement).value) || 200;
                    const bgColor = (document.getElementById('bg-color') as HTMLInputElement).value;
                    const textColor = (document.getElementById('text-color') as HTMLInputElement).value;
                    generatePlaceholderUrl(width, height, bgColor, textColor);
                  }}
                  className="w-full"
                >
                  Generate Placeholder Image
                </Button>
                {placeholderUrl && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Generated Placeholder</h3>
                      <img src={placeholderUrl} alt="Generated Placeholder" className="mx-auto border-2 border-gray-200 rounded-lg shadow-lg" />
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                      <h4 className="font-semibold text-gray-700 mb-2">Image URL:</h4>
                      <div className="p-3 bg-gray-50 rounded-lg border font-mono text-sm break-all">
                        {placeholderUrl}
                      </div>
                    </div>
                    <Button onClick={() => copyToClipboard(placeholderUrl)} variant="outline" className="w-full">
                      {copiedText === placeholderUrl ? 'Copied!' : 'Copy Image URL'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeGenerator === 'unique-id' && (
            <Card className="animate-fade-in border-0 shadow-xl">
              <CardHeader>
                <CardTitle>🆔 Unique ID Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="id-type">ID Type</Label>
                  <Select defaultValue="alphanumeric">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uuid">UUID</SelectItem>
                      <SelectItem value="alphanumeric">Alphanumeric</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="id-length">Length (for Alphanumeric)</Label>
                  <Input id="id-length" type="number" min="4" max="32" defaultValue="8" />
                </div>
                <Button
                  onClick={() => {
                    const type = 'alphanumeric'; // Default for now
                    const length = parseInt((document.getElementById('id-length') as HTMLInputElement).value) || 8;
                    generateUniqueId(type, length);
                  }}
                  className="w-full"
                >
                  Generate Unique ID
                </Button>
                {uniqueId && (
                  <div className="space-y-2">
                    <div className="p-3 bg-gray-50 rounded border font-mono text-sm break-all">
                      {uniqueId}
                    </div>
                    <Button onClick={() => copyToClipboard(uniqueId)} variant="outline" className="w-full">
                      {copiedText === uniqueId ? 'Copied!' : 'Copy ID'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeGenerator === 'quotes' && (
            <Card className="animate-fade-in border-0 shadow-xl bg-gradient-to-br from-white to-indigo-50">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  💭 Random Quote Generator
                </CardTitle>
                <p className="text-gray-600 text-sm">Get inspired with wisdom and motivation</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button 
                  onClick={getRandomQuote} 
                  className={`w-full bg-gradient-to-r ${currentTool?.gradient} hover:shadow-lg transform transition-all duration-300 hover:scale-105 py-4 text-lg font-semibold rounded-xl`}
                >
                  ✨ Get Inspirational Quote
                </Button>
                {currentQuote && (
                  <div className="animate-fade-in">
                    <div className="relative bg-gradient-to-br from-indigo-100 to-blue-100 p-6 rounded-2xl border-2 border-indigo-200 shadow-lg">
                      <div className="absolute top-4 left-4 text-4xl text-indigo-300">"</div>
                      <div className="absolute bottom-4 right-4 text-4xl text-indigo-300 rotate-180">"</div>
                      <div className="px-6 py-2">
                        <p className="text-lg font-medium text-gray-800 leading-relaxed text-center italic">
                          {currentQuote}
                        </p>
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <Button 
                        onClick={() => copyToClipboard(currentQuote)} 
                        variant="outline" 
                        className="px-6 py-2 rounded-xl"
                      >
                        {copiedText === currentQuote ? 'Copied!' : 'Copy Quote'}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeGenerator === 'hashtags' && (
            <Card className="animate-fade-in border-0 shadow-xl">
              <CardHeader>
                <CardTitle>#️⃣ Hashtag Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="keyword">Keyword</Label>
                  <Input
                    id="keyword"
                    placeholder="Enter a keyword or phrase"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        generateHashtags((e.target as HTMLInputElement).value);
                      }
                    }}
                  />
                </div>
                <Button
                  onClick={() => {
                    const keyword = (document.getElementById('keyword') as HTMLInputElement).value;
                    generateHashtags(keyword);
                  }}
                  className="w-full"
                >
                  Generate Hashtags
                </Button>
                {hashtags.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {hashtags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full cursor-pointer hover:bg-blue-200"
                          onClick={() => copyToClipboard(tag)}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button
                      onClick={() => copyToClipboard(hashtags.join(' '))}
                      variant="outline"
                      className="w-full"
                    >
                      {copiedText === hashtags.join(' ') ? 'Copied!' : 'Copy All Hashtags'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeGenerator === 'would-you-rather' && (
            <Card className="animate-fade-in border-0 shadow-xl bg-gradient-to-br from-white to-yellow-50">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  🤔 Would You Rather Generator
                </CardTitle>
                <p className="text-gray-600 text-sm">Fun questions to spark conversations</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button 
                  onClick={getRandomWouldYouRather} 
                  className={`w-full bg-gradient-to-r ${currentTool?.gradient} hover:shadow-lg transform transition-all duration-300 hover:scale-105 py-4 text-lg font-semibold rounded-xl`}
                >
                  🎲 Get New Question
                </Button>
                {wouldYouRather && (
                  <div className="animate-fade-in">
                    <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-6 rounded-2xl border-2 border-yellow-200 shadow-lg">
                      <div className="text-center">
                        <div className="text-4xl mb-3">🤔</div>
                        <p className="text-lg font-semibold text-gray-800 leading-relaxed">
                          {wouldYouRather}
                        </p>
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <Button 
                        onClick={() => copyToClipboard(wouldYouRather)} 
                        variant="outline" 
                        className="px-6 py-2 rounded-xl"
                      >
                        {copiedText === wouldYouRather ? 'Copied!' : 'Copy Question'}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tools;
