import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const socialLinks = [
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: 'https://www.bing.com/ck/a?!&&p=f7d4505eab487bcf20ddb74fbc19a010292913d148137f01d4a3fa7a04028f9bJmltdHM9MTc0OTI1NDQwMA&ptn=3&ver=2&hsh=4&fclid=09f1fc4d-1497-6d8d-0718-eed4153a6cb4&psq=vivarancreations+linkedin&u=a1aHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2NvbXBhbnkvdml2YXJhbi1jcmVhdGlvbnMv&ntb=1',
      name: 'LinkedIn',
    },
  ];

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About', path: '/about' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Company Assets', path: '/assets' },
        { name: 'Contact', path: '/contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Web Development', path: '/services' },
        { name: 'Incubator', path: '/services' },
        { name: 'Start-Up Development', path: '/services' },
        { name: 'Digital Marketing', path: '/services' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Privacy Policy', path: '/privacy' },
      ],
    },
  ];

  return (
    <footer className="bg-dark-400 relative">
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img
                src="/images/VCccccccccccccc-removebg-preview.png"
                alt="Vivaran Creations Logo"
                className="h-12 w-12 mr-2"
              />
              <span className="text-xl font-bold text-gradient">Vivaran Creations</span>
            </div>
            <p className="text-gray-400 mb-6">
              We create digital solutions that transform businesses and deliver exceptional user experiences.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-300 flex items-center justify-center hover:bg-primary-500 transition-all duration-300 transform hover:scale-110 hover:rotate-6"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerLinks.map((column, index) => (
              <div key={index}>
                <h4 className="text-white font-semibold mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        to={link.path}
                        className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Vivaran Creations. All rights reserved.
          </p>

          <div className="flex items-center">
            <button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-dark-300 text-gray-400 hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-110"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-dark-300 to-transparent"></div>
    </footer>
  );
};

export default Footer;