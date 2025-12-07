import { Github, Twitter, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                  <span className="font-bold">U</span>
                </div>
                <span className="text-xl font-bold text-white">UtilityHub</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
              A privacy-first suite of developer tools designed for speed and security. 
              100% Client-side. No data ever leaves your browser.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/yashmagar01" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-blue-400 hover:bg-slate-700 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Tools</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="/tools?active=qr-code" className="hover:text-indigo-400 transition-colors">QR Code Generator</a></li>
              <li><a href="/tools?active=password" className="hover:text-indigo-400 transition-colors">Password Generator</a></li>
              <li><a href="/tools?active=color-palette" className="hover:text-indigo-400 transition-colors">Color Palette</a></li>
              <li><a href="/tools" className="hover:text-indigo-400 transition-colors">View All Tools</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Project</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="https://github.com/yashmagar01/Generations_Tools" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">GitHub Repository</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Report Issue</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} UtilityHub. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> by <a href="https://github.com/yashmagar01" className="text-slate-300 hover:text-indigo-400 font-medium transition-colors">Yash Magar</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
