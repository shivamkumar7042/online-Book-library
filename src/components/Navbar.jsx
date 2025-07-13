import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import FloatingParticle from './FloatingParticle';

const Navbar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  // Dynamic gradient follow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.dynamic-gradient');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-2xl border-b border-gray-800 shadow-[0_0_60px_-15px_rgba(96,165,250,0.3)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Changed fixed height to min-height and adjusted spacing */}
        <div className="flex min-h-[4rem] md:min-h-[5rem] items-center justify-between flex-wrap gap-y-3 gap-x-4 py-2">
          {/* Logo Section */}
          <div
            className="dynamic-gradient relative overflow-hidden rounded-2xl p-1 hover:scale-105 transition-transform duration-300 order-1 md:order-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              '--mouse-x': '0px',
              '--mouse-y': '0px',
              background: isHovered
                ? `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), 
                   rgba(59,130,246,0.4), transparent 40%)`
                : 'transparent'
            }}
          >
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-2">
              <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-text-shine">
                <BookOpenIcon className="h-5 w-5 md:h-6 md:w-6 inline-block animate-float text-cyan-400 mr-1 md:mr-2 stroke-[2.5]" />
                <a href='/' className="ml-1 md:ml-2 text-shadow-[0_0_10px_rgba(96,165,250,0.5)]">
                  BOOKSHOW
                </a>
              </h1>
            </div>
          </div>

          {/* Search Bar Section - Added responsive margins */}
          <div className="w-full md:flex-1 md:max-w-2xl order-3 md:order-2 px-2 lg:ml-6 md:mx-4">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500 animate-pulse-slow" />
                <div className="relative dynamic-gradient">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 md:pl-4 ">
                    <MagnifyingGlassIcon className="h-5 w-5 md:h-6 md:w-6 text-cyan-300 drop-shadow-glow z-10" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Discover your next read..."
                    className="block w-full rounded-2xl border border-gray-700/50 bg-gray-900/60 py-2 md:py-3 pl-10 md:pl-12 pr-4 md:pr-6 text-sm md:text-base text-gray-100 placeholder-gray-400 focus:outline-none focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/30 backdrop-blur-xl shadow-xl transition-all duration-300 hover:bg-gray-900/80"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Avatar Section */}
          <div className="flex items-center space-x-4 order-2 md:order-3 ml-auto md:ml-0">
            <button className="relative p-1 group hover:scale-105 transition-transform">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-900/80 border-2 border-cyan-300/20 group-hover:border-cyan-300/40 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                <span className="text-lg md:text-xl animate-holo">👽</span>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-blue-500/20" />
              </div>
              <div className="absolute -top-1 -right-1 h-2 w-2 md:h-3 md:w-3 bg-cyan-400 rounded-full shadow-glow-pulse" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <FloatingParticle />
    </nav>
  );
};

export default Navbar;