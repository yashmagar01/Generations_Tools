import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Copy, MapPin, Mail, AtSign, Fingerprint, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard as nativeCopy, shareContent, canShare, hapticFeedback } from '@/lib/native';

interface Profile {
  name: string;
  username: string;
  email: string;
  role: string;
  bio: string;
  location: string;
  avatar: string;
}

const ProfileGenerator = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  const generateProfile = () => {
    const indianNames = ['Arjun Sharma', 'Priya Patel', 'Rahul Kumar', 'Anita Singh', 'Vikram Gupta'];
    const roles = ['Product Designer', 'Frontend Dev', 'Data Scientist', 'UX Researcher'];
    const locations = ['Mumbai', 'Bangalore', 'Delhi', 'Pune', 'Hyderabad', 'Chennai'];
    
    const randomName = indianNames[Math.floor(Math.random() * indianNames.length)];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    const randomLoc = locations[Math.floor(Math.random() * locations.length)];
    const cleanName = randomName.toLowerCase().replace(/\s/g, '');
    const username = `${cleanName}${Math.floor(Math.random() * 999)}`;
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

    setProfile({
      name: randomName,
      username: `@${username}`,
      email: `${username}@example.com`,
      role: randomRole,
      bio: "Building the future of tech. 🚀",
      location: randomLoc + ", India",
      avatar
    });
  };

  const handleCopy = async () => {
    if (!profile) return;
    const text = `Name: ${profile.name}\nRole: ${profile.role}\nEmail: ${profile.email}\nLocation: ${profile.location}`;
    const success = await nativeCopy(text);
    if (success) {
      toast.success("Profile copied!");
    }
  };

  const handleShare = async () => {
    if (!profile) return;
    await hapticFeedback('medium');
    await shareContent({
      title: 'Generated Profile',
      text: `Name: ${profile.name}\nRole: ${profile.role}\nEmail: ${profile.email}\nLocation: ${profile.location}`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
       <Card className="lg:col-span-1 glass-card p-6 flex flex-col gap-6 h-fit">
          <div className="flex items-center gap-2 mb-2">
             <div className="p-2 bg-teal-50 rounded-lg text-teal-600"><Fingerprint className="w-5 h-5"/></div>
             <h2 className="font-bold text-slate-800">Identity Gen</h2>
          </div>

          <p className="text-sm text-slate-500 leading-relaxed">
             Generate realistic temporary identities for testing, mockups, or QA purposes.
          </p>

          <Button onClick={generateProfile} className="w-full bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/20 py-6">
             <RefreshCw className="w-5 h-5 mr-2" />
             Generate New Identity
          </Button> 
       </Card>

       <div className="lg:col-span-2 flex items-center justify-center p-8 rounded-3xl bg-slate-50 border border-slate-200/60 shadow-inner min-h-[400px]">
          {profile ? (
             <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-sm w-full animate-in-up">
                 <div className="h-32 bg-gradient-to-r from-teal-400 to-emerald-400 relative">
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
                       <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                 </div>
                 <div className="pt-12 pb-8 px-8 text-center">
                    <h3 className="text-2xl font-bold text-slate-900">{profile.name}</h3>
                    <p className="text-teal-600 font-medium mb-6">{profile.role}</p>
                    
                    <div className="space-y-3 text-left">
                       <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl text-sm text-slate-600">
                          <AtSign className="w-4 h-4 text-slate-400"/> {profile.username}
                       </div>
                       <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl text-sm text-slate-600">
                          <Mail className="w-4 h-4 text-slate-400"/> {profile.email}
                       </div>
                       <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl text-sm text-slate-600">
                          <MapPin className="w-4 h-4 text-slate-400"/> {profile.location}
                       </div>
                    </div>

                    <div className="flex gap-2 mt-6">
                       <Button onClick={handleCopy} variant="outline" className="flex-1 border-slate-200 hover:bg-slate-50">
                          <Copy className="w-4 h-4 mr-2"/> Copy
                       </Button>
                       {canShare() && (
                         <Button onClick={handleShare} variant="outline" className="flex-1 border-teal-200 text-teal-600 hover:bg-teal-50">
                            <Share2 className="w-4 h-4 mr-2"/> Share
                         </Button>
                       )}
                    </div>
                 </div>
             </div>
          ) : (
             <div className="text-center text-slate-400">
                <RefreshCw className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Click Generate to create a profile</p>
             </div>
          )}
       </div>
    </div>
  );
};

export default ProfileGenerator;