import { Sparkles, Heart, Twitter, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-white border-t border-slate-200/60 pt-16 pb-8 overflow-hidden">
       {/* Mesh Gradient Background */}
       <div className="absolute inset-x-0 bottom-0 h-full w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-white to-white opacity-50 pointer-events-none" />
       
       <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
             <div className="col-span-1 md:col-span-2 space-y-4">
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                      <Sparkles className="w-4 h-4" />
                   </div>
                   <span className="font-bold text-lg text-slate-900">UtilityHub</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                   Premium developer tools designed for speed and privacy. 
                   Open source, client-side, and free forever.
                </p>
             </div>
             
             <div>
                <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Product</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                   <li><a href="/tools" className="hover:text-violet-600 transition-colors">All Tools</a></li>
                   <li><a href="#features" className="hover:text-violet-600 transition-colors">Features</a></li>
                   <li><a href="#changelog" className="hover:text-violet-600 transition-colors">Changelog</a></li>
                </ul>
             </div>
             
             <div>
                <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Legal</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                   <li><a href="#" className="hover:text-violet-600 transition-colors">Privacy</a></li>
                   <li><a href="#" className="hover:text-violet-600 transition-colors">Terms</a></li>
                   <li><a href="#" className="hover:text-violet-600 transition-colors">License</a></li>
                </ul>
             </div>
          </div>
          
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
             <p className="text-xs text-slate-400 flex items-center gap-1">
                © 2024 UtilityHub. Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> by Developers.
             </p>
             
             <div className="flex items-center gap-4">
                <a href="#" className="p-2 rounded-full bg-slate-50 text-slate-500 hover:bg-violet-50 hover:text-violet-600 transition-all">
                   <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-full bg-slate-50 text-slate-500 hover:bg-slate-900 hover:text-white transition-all">
                   <Github className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-full bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all">
                   <Linkedin className="w-4 h-4" />
                </a>
             </div>
          </div>
       </div>
    </footer>
  );
};

export default Footer;
