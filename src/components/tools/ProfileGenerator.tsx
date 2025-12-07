import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Copy, MapPin, Briefcase, Mail, AtSign } from 'lucide-react';
import { toast } from 'sonner';

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

  const indianNames = [
    'Arjun Sharma', 'Priya Patel', 'Rahul Kumar', 'Anita Singh', 'Vikram Gupta',
    'Sneha Reddy', 'Amit Agarwal', 'Kavya Nair', 'Rohan Joshi', 'Deepika Iyer',
    'Karan Malhotra', 'Riya Saxena', 'Siddharth Rao', 'Pooja Mehta', 'Nikhil Verma',
    'Aarti Bansal', 'Rajesh Pandey', 'Megha Sinha', 'Abhinav Mishra', 'Shreya Tiwari'
  ];

  const roles = [
    'Product Designer', 'Frontend Developer', 'Data Scientist', 'UX Researcher',
    'Digital Marketer', 'Content Creator', 'Product Manager', 'DevOps Engineer',
    'Cloud Architect', 'Mobile Developer', 'Full Stack Engineer', 'QA Engineer'
  ];

  const bios = [
    'Tech enthusiast and coffee lover ☕',
    'Digital nomad exploring the world 🌍',
    'Passionate about sustainable living 🌱',
    'Creative designer with a love for minimalism ✨',
    'Entrepreneur building the future 🚀',
    'Photography enthusiast capturing moments 📸',
    'Fitness fanatic and health advocate 💪',
    'Bookworm and lifelong learner 📚',
    'Music producer and sound engineer 🎵',
    'Chef exploring global cuisines 🍜',
    'Travel blogger documenting adventures ✈️',
    'Software developer coding solutions 💻',
    'Artist expressing through digital media 🎨',
    'Environmental activist making change 🌿',
    'Yoga instructor spreading mindfulness 🧘‍♀️'
  ];

  const locations = [
    'Mumbai, Maharashtra', 'Delhi, India', 'Bangalore, Karnataka', 'Chennai, Tamil Nadu',
    'Hyderabad, Telangana', 'Pune, Maharashtra', 'Kolkata, West Bengal', 'Ahmedabad, Gujarat',
    'Jaipur, Rajasthan', 'Surat, Gujarat', 'Lucknow, Uttar Pradesh', 'Kanpur, Uttar Pradesh',
    'Nagpur, Maharashtra', 'Indore, Madhya Pradesh', 'Thane, Maharashtra', 'Bhopal, Madhya Pradesh',
    'Visakhapatnam, Andhra Pradesh', 'Pimpri-Chinchwad, Maharashtra', 'Patna, Bihar', 'Vadodara, Gujarat'
  ];

  const generateProfile = () => {
    const randomName = indianNames[Math.floor(Math.random() * indianNames.length)];
    const randomBio = bios[Math.floor(Math.random() * bios.length)];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    
    // Generate derived fields
    const cleanName = randomName.toLowerCase().replace(/\s/g, '');
    const randomNum = Math.floor(Math.random() * 999);
    const username = `${cleanName}${randomNum}`;
    const email = `${username}@example.com`;
    
    // Use DiceBear API for consistent avatar generation
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

    setProfile({
      name: randomName,
      username: `@${username}`,
      email,
      role: randomRole,
      bio: randomBio,
      location: randomLocation,
      avatar
    });
  };

  const copyToClipboard = () => {
    if (profile) {
      const text = `Name: ${profile.name}
Role: ${profile.role}
Email: ${profile.email}
Location: ${profile.location}
Bio: ${profile.bio}`;
      navigator.clipboard.writeText(text);
      toast.success("Profile copied to clipboard");
    }
  };

  return (
    <Card className="p-6 animate-fade-in shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl bg-teal-100 p-2 rounded-lg">👤</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Profile Generator</h2>
          <p className="text-gray-600">Create realistic dummy user profiles</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <Button 
          onClick={generateProfile}
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-4 rounded-xl shadow-md transition-all duration-200 transform hover:-translate-y-1 flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Generate New Identity
        </Button>
        
        {profile && (
          <div className="mt-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="relative overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-lg">
               {/* Cover Image Simulation */}
               <div className="h-32 bg-gradient-to-r from-teal-400 to-emerald-400"></div>
               
               <div className="px-6 pb-6 mt-[-3rem] relative">
                  <div className="flex flex-col items-center">
                     <div className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-gray-50 overflow-hidden mb-4">
                        <img 
                          src={profile.avatar} 
                          alt="Avatar" 
                          className="w-full h-full object-cover"
                        />
                     </div>
                     
                     <h3 className="text-2xl font-bold text-gray-900">{profile.name}</h3>
                     <p className="text-teal-600 font-medium">{profile.role}</p>
                     
                     <div className="w-full mt-6 space-y-3">
                        <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-3 text-sm text-gray-700">
                           <AtSign className="w-4 h-4 text-gray-400" />
                           <span className="font-mono">{profile.username}</span>
                        </div>
                        
                        <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-3 text-sm text-gray-700">
                           <Mail className="w-4 h-4 text-gray-400" />
                           <span className="truncate">{profile.email}</span>
                        </div>

                        <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-3 text-sm text-gray-700">
                           <MapPin className="w-4 h-4 text-gray-400" />
                           <span>{profile.location}</span>
                        </div>
                        
                        <div className="p-4 bg-teal-50 rounded-lg border border-teal-100 mt-2">
                           <p className="text-gray-700 italic text-center">"{profile.bio}"</p>
                        </div>
                     </div>

                     <div className="mt-6 w-full">
                        <Button
                          onClick={copyToClipboard}
                          variant="outline"
                          className="w-full border-teal-200 text-teal-700 hover:bg-teal-50"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Profile Details
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
            
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex gap-3 items-start">
               <div className="mt-1">⚠️</div>
               <p className="text-xs text-amber-800 leading-relaxed">
                  <strong>Disclaimer:</strong> This is a fictional identity generated for testing/mockup purposes only. The photo is a generated avatar.
               </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProfileGenerator;