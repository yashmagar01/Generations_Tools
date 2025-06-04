import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Profile {
  name: string;
  bio: string;
  location: string;
}

const ProfileGenerator = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  const indianNames = [
    'Arjun Sharma', 'Priya Patel', 'Rahul Kumar', 'Anita Singh', 'Vikram Gupta',
    'Sneha Reddy', 'Amit Agarwal', 'Kavya Nair', 'Rohan Joshi', 'Deepika Iyer',
    'Karan Malhotra', 'Riya Saxena', 'Siddharth Rao', 'Pooja Mehta', 'Nikhil Verma',
    'Aarti Bansal', 'Rajesh Pandey', 'Megha Sinha', 'Abhinav Mishra', 'Shreya Tiwari'
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

    setProfile({
      name: randomName,
      bio: randomBio,
      location: randomLocation
    });
  };

  const copyToClipboard = () => {
    if (profile) {
      const text = `Name: ${profile.name}\nBio: ${profile.bio}\nLocation: ${profile.location}`;
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <Card className="p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">👤</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Profile Generator</h2>
          <p className="text-gray-600">Generate dummy profiles for testing</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <Button 
          onClick={generateProfile}
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          🎭 Generate Random Profile
        </Button>
        
        {profile && (
          <div className="mt-6 animate-scale-in">
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg border border-teal-200">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">👤 Name:</h3>
                  <p className="text-lg font-semibold text-gray-800">{profile.name}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">📝 Bio/Description:</h3>
                  <p className="text-gray-800">{profile.bio}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">📍 Location:</h3>
                  <p className="text-gray-800">{profile.location}</p>
                </div>
              </div>
              
              <div className="flex justify-center mt-4">
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  className="border-teal-300 text-teal-700 hover:bg-teal-100"
                >
                  📋 Copy Profile
                </Button>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ <strong>Caution:</strong> This information is generated for testing purposes only. 
                Do not use this data in inappropriate situations or for malicious activities.
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProfileGenerator;