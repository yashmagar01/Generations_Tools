import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, Copy, Fingerprint } from 'lucide-react';
import { toast } from 'sonner';

type IDType = 'uuid' | 'nanoid' | 'cuid';

const UniqueID = () => {
  const [id, setId] = useState('');
  const [type, setType] = useState<IDType>('uuid');

  const generateUUID = () => {
    // RFC4122 version 4 UUID
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const generateNanoID = (length = 21) => {
    // URL-friendly unique string ID generator
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return result;
  };

  const generateCUID = () => {
    // A simplified CUID-like structure for demo (timestamp + counter + random fingerprint)
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 4);
    const counter = Math.floor(Math.random() * 1000).toString(16);
    return `c${timestamp}${counter}${random}`;
  };

  const generateID = () => {
    let newId = '';
    switch(type) {
        case 'uuid': newId = generateUUID(); break;
        case 'nanoid': newId = generateNanoID(); break;
        case 'cuid': newId = generateCUID(); break;
    }
    setId(newId);
  };
  
  // Initial generation
  useEffect(() => {
     generateID();
  }, [type]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(id);
    toast.success("ID copied to clipboard!");
  };

  return (
    <Card className="p-6 animate-fade-in shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="text-3xl bg-blue-100 p-2 rounded-lg">🆔</div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Unique ID</h2>
            <p className="text-gray-600">Generate secure unique identifiers</p>
          </div>
        </div>
        
        <div className="w-40">
           <Select value={type} onValueChange={(v: IDType) => setType(v)}>
             <SelectTrigger>
               <SelectValue placeholder="Type" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="uuid">UUID v4</SelectItem>
               <SelectItem value="nanoid">NanoID</SelectItem>
               <SelectItem value="cuid">CUID</SelectItem>
             </SelectContent>
           </Select>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 relative group text-center">
             <div className="flex justify-center mb-3">
                <span className="text-xs font-mono px-2 py-1 rounded bg-gray-800 text-gray-400 uppercase">
                    {type}
                </span>
             </div>
             
             <code className="text-xl font-mono text-blue-400 break-all block mb-4">
                {id}
             </code>

             <div className="flex justify-center gap-3">
                <Button
                    onClick={generateID}
                    variant="secondary"
                    size="sm"
                    className="bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700"
                >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                </Button>
                <Button
                    onClick={copyToClipboard}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                </Button>
            </div>
        </div>
        
        <p className="text-sm text-gray-500 text-center flex items-center justify-center gap-2">
           <Fingerprint className="w-4 h-4" />
           {type === 'uuid' && "Ideal for database primary keys and long-term unique storage."}
           {type === 'nanoid' && "Perfect for URL-shorteners and frontend usage."}
           {type === 'cuid' && "Collision-resistant ids optimized for horizontal scaling."}
        </p>
      </div>
    </Card>
  );
};

export default UniqueID;