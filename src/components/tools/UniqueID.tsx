import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const UniqueID = () => {
  const [id, setId] = useState('');

  const generateUUID = () => {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    setId(uuid);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(id);
  };

  return (
    <Card className="p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">🆔</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Unique ID Generator</h2>
          <p className="text-gray-600">Generate unique identifiers (UUID)</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <Button 
          onClick={generateUUID}
          className="w-full bg-gradient-to-r from-slate-500 to-gray-500 hover:from-slate-600 hover:to-gray-600 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          🔄 Generate Unique ID
        </Button>
        
        {id && (
          <div className="mt-6 animate-scale-in">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <code className="text-lg font-mono text-gray-800 break-all">{id}</code>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  className="ml-2 flex-shrink-0"
                >
                  📋 Copy
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">
              🔑 Perfect for database keys, session IDs, and unique references
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default UniqueID;