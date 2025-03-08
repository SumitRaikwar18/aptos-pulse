
import React from 'react';
import { Instagram, Twitter, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 md:px-12 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <a href="/" className="text-2xl font-semibold mb-4 inline-block">Aelix</a>
            <p className="text-muted-foreground">
              Redefining experiences with precision and elegance.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              {['About', 'Careers', 'Press', 'Blog'].map(item => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Resources</h3>
            <ul className="space-y-3">
              {['Documentation', 'Help Center', 'Guides', 'API'].map(item => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Legal</h3>
            <ul className="space-y-3">
              {['Privacy', 'Terms', 'Security', 'Cookies'].map(item => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} Aelix. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            {[
              { icon: <Instagram size={20} />, href: '#' },
              { icon: <Twitter size={20} />, href: '#' },
              { icon: <Linkedin size={20} />, href: '#' },
              { icon: <Github size={20} />, href: '#' }
            ].map((item, i) => (
              <a 
                key={i}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={`Social media link ${i + 1}`}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
