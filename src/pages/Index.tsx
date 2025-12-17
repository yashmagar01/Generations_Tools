import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QrCode } from 'lucide-react';

const Index = () => {
  const [activeGenerator, setActiveGenerator] = useState('color-palette');
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

  const firstNames = ["Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Avery", "Quinn", "Dakota", "Sage"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
  const cities = ["New York", "Los Angeles", "London", "Paris", "Tokyo", "Sydney", "Berlin", "Toronto", "Singapore", "Amsterdam"];
  const countries = ["USA", "UK", "France", "Japan", "Australia", "Germany", "Canada", "Netherlands", "Switzerland", "Sweden"];

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

  const generateRandomNumber = (min: number, max: number, isInteger: boolean) => {
    const random = Math.random() * (max - min) + min;
    const result = isInteger ? Math.floor(random) : Math.round(random * 100) / 100;
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
    const css = `background: linear-gradient(${direction}, ${color1}, ${color2});`;
    setGradientCSS(css);
  };

  const generateProfile = () => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
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
    const url = `https://via.placeholder.com/${width}x${height}/${bgColor.replace('#', '')}/${textColor.replace('#', '')}`;
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
    { id: 'color-palette', name: 'Color Palette', icon: '🎨' },
    { id: 'lorem-ipsum', name: 'Lorem Ipsum', icon: '📝' },
    { id: 'random-number', name: 'Random Number', icon: '🎲' },
    { id: 'password', name: 'Password', icon: '🔒' },
    { id: 'qr-code', name: 'QR Code', icon: '📱' },
    { id: 'css-gradient', name: 'CSS Gradient', icon: '🌈' },
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'placeholder', name: 'Placeholder Image', icon: '🖼️' },
    { id: 'unique-id', name: 'Unique ID', icon: '🆔' },
    { id: 'quotes', name: 'Random Quote', icon: '💭' },
    { id: 'hashtags', name: 'Hashtag Generator', icon: '#️⃣' },
    { id: 'would-you-rather', name: 'Would You Rather', icon: '🤔' }
  ];

  const renderGenerator = () => {
    switch (activeGenerator) {
      case 'color-palette':
        return (
          <Card>
            <CardHeader>
              <CardTitle>🎨 Color Palette Generator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={generateColorPalette} className="w-full">
                Generate Color Palette
              </Button>
              {colorPalette.length > 0 && (
                <div className="grid grid-cols-5 gap-2">
                  {colorPalette.map((color, index) => (
                    <div key={index} className="text-center">
                      <button
                        type="button"
                        className="w-full h-20 rounded border-2 border-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform hover:scale-105"
                        style={{ backgroundColor: color }}
                        onClick={() => copyToClipboard(color)}
                        aria-label={`Copy color ${color} to clipboard`}
                        title="Click to copy"
                      />
                      <p className="text-sm mt-1 font-mono">{color}</p>
                      {copiedText === color && <p className="text-xs text-green-600">Copied!</p>}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'lorem-ipsum':
        return (
          <Card>
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
        );

      case 'random-number':
        return (
          <Card>
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
              <div className="flex items-center space-x-2">
                <Checkbox id="integer" defaultChecked />
                <Label htmlFor="integer">Integer only</Label>
              </div>
              <Button
                onClick={() => {
                  const min = parseFloat((document.getElementById('min') as HTMLInputElement).value) || 1;
                  const max = parseFloat((document.getElementById('max') as HTMLInputElement).value) || 100;
                  const isInteger = (document.getElementById('integer') as HTMLInputElement).checked;
                  generateRandomNumber(min, max, isInteger);
                }}
                className="w-full"
              >
                Generate Random Number
              </Button>
              {randomNumber !== null && (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold">{randomNumber}</p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'password':
        return (
          <Card>
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
                  generatePassword(length, includeUpper, includeLower, includeNumbers, includeSymbols);
                }}
                className="w-full"
              >
                Generate Password
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
        );

      case 'qr-code':
        return (
          <Card>
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
        );

      case 'css-gradient':
        return (
          <Card>
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
                <div className="space-y-2">
                  <div
                    className="w-full h-24 rounded border"
                    style={{ background: gradientCSS.replace('background: ', '') }}
                  />
                  <div className="p-3 bg-gray-50 rounded border font-mono text-sm">
                    {gradientCSS}
                  </div>
                  <Button onClick={() => copyToClipboard(gradientCSS)} variant="outline" className="w-full">
                    {copiedText === gradientCSS ? 'Copied!' : 'Copy CSS'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'profile':
        return (
          <Card>
            <CardHeader>
              <CardTitle>👤 Profile Generator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={generateProfile} className="w-full">
                Generate Random Profile
              </Button>
              {profile.firstName && (
                <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                  <h3 className="font-bold text-lg">{profile.firstName} {profile.lastName}</h3>
                  <p className="text-gray-600">{profile.bio}</p>
                  <p className="text-sm text-gray-500">📍 {profile.city}, {profile.country}</p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'placeholder':
        return (
          <Card>
            <CardHeader>
              <CardTitle>🖼️ Placeholder Image Generator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="width">Width</Label>
                  <Input id="width" type="number" defaultValue="300" />
                </div>
                <div>
                  <Label htmlFor="height">Height</Label>
                  <Input id="height" type="number" defaultValue="200" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bg-color">Background Color</Label>
                  <Input id="bg-color" defaultValue="#cccccc" />
                </div>
                <div>
                  <Label htmlFor="text-color">Text Color</Label>
                  <Input id="text-color" defaultValue="#ffffff" />
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
                Generate Placeholder URL
              </Button>
              {placeholderUrl && (
                <div className="space-y-2">
                  <img src={placeholderUrl} alt="Placeholder" className="mx-auto border rounded" />
                  <div className="p-3 bg-gray-50 rounded border font-mono text-sm break-all">
                    {placeholderUrl}
                  </div>
                  <Button onClick={() => copyToClipboard(placeholderUrl)} variant="outline" className="w-full">
                    {copiedText === placeholderUrl ? 'Copied!' : 'Copy URL'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'unique-id':
        return (
          <Card>
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
        );

      case 'quotes':
        return (
          <Card>
            <CardHeader>
              <CardTitle>💭 Random Quote Generator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={getRandomQuote} className="w-full">
                Get Random Quote
              </Button>
              {currentQuote && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-lg italic">"{currentQuote}"</p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'hashtags':
        return (
          <Card>
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
                      <button
                        key={index}
                        type="button"
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full cursor-pointer hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        onClick={() => copyToClipboard(tag)}
                        aria-label={`Copy hashtag ${tag}`}
                      >
                        {tag}
                      </button>
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
        );

      case 'would-you-rather':
        return (
          <Card>
            <CardHeader>
              <CardTitle>🤔 Would You Rather Generator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={getRandomWouldYouRather} className="w-full">
                Get New Question
              </Button>
              {wouldYouRather && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-lg font-medium">{wouldYouRather}</p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Generator Suite</h1>
            <nav className="space-y-2">
              {generators.map((generator) => (
                <button
                  key={generator.id}
                  onClick={() => setActiveGenerator(generator.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${
                    activeGenerator === generator.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg">{generator.icon}</span>
                  <span className="text-sm font-medium">{generator.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {renderGenerator()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;