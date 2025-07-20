import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- DUMMY DATA (INDIAN LOCALIZATION) ---
const dummyData = {
  venues: [
    { id: 1, name: 'Gurgaon Greens Arena', sport: 'Cricket', location: 'Sector 29, Gurgaon', price: 2500, rating: 4.8, image: 'https://placehold.co/600x400/22c55e/ffffff?text=Lush+Cricket+Turf', status: 'Available Today' },
    { id: 2, name: 'Noida Indoor Hoops', sport: 'Basketball', location: 'Sector 18, Noida', price: 1800, rating: 4.9, image: 'https://placehold.co/600x400/3b82f6/ffffff?text=Indoor+Court', status: 'Booked till 5 PM' },
    { id: 3, name: 'Saket Sports Complex', sport: 'Football', location: 'Saket, New Delhi', price: 3000, rating: 4.7, image: 'https://placehold.co/600x400/22c55e/ffffff?text=Football+Ground', status: 'Available Today' },
    { id: 4, name: 'Delhi Badminton Hub', sport: 'Badminton', location: 'Hauz Khas, New Delhi', price: 1200, rating: 4.6, image: 'https://placehold.co/600x400/3b82f6/ffffff?text=Badminton+Courts', status: 'Peak Hours' },
    { id: 5, 'name': 'Vasant Kunj Tennis Club', sport: 'Tennis', location: 'Vasant Kunj, New Delhi', price: 2200, rating: 4.8, image: 'https://placehold.co/600x400/f97316/ffffff?text=Clay+Tennis+Court', status: 'Available Today' },
    { id: 6, name: 'Faridabad Futsal Zone', sport: 'Football', location: 'Sector 15, Faridabad', price: 2000, rating: 4.5, image: 'https://placehold.co/600x400/22c55e/ffffff?text=Futsal+Zone', status: 'Booked till 3 PM' },
  ],
  coaches: [
    { id: 1, name: 'Rohan Sharma', specialty: 'Cricket Batting', rate: 1500, rating: 4.9, image: 'https://placehold.co/400x400/4f46e5/ffffff?text=RS', badge: 'Top Coach', bio: 'Former state-level player with 10+ years of coaching experience.' },
    { id: 2, name: 'Priya Singh', specialty: 'Basketball Dribbling', rate: 1200, rating: 4.8, image: 'https://placehold.co/400x400/c026d3/ffffff?text=PS', badge: 'Available Now', bio: 'Certified coach focusing on fundamental skills for all age groups.' },
    { id: 3, name: 'Vikram Rathore', specialty: 'Football Tactics', rate: 1800, rating: 4.9, image: 'https://placehold.co/400x400/4f46e5/ffffff?text=VR', badge: 'Top Coach', bio: 'AIFF D-License coach specializing in youth team strategy.' },
    { id: 4, name: 'Anjali Mehta', specialty: 'Tennis Serves', rate: 1600, rating: 4.7, image: 'https://placehold.co/400x400/c026d3/ffffff?text=AM', badge: null, bio: 'AITA certified coach with a focus on competitive player development.' },
  ],
  mentors: [
    { id: 1, name: 'Arjun Khanna', role: 'Ex-Ranji Trophy Player', bio: '20 years of professional cricket, specializing in career guidance for young athletes.', image: 'https://placehold.co/400x400/0d9488/ffffff?text=AK', quote: "Discipline on the field starts with discipline off the field." },
    { id: 2, name: 'Dr. Meera Desai', role: 'Sports Psychologist', bio: 'Helping athletes in India build mental resilience and overcome performance anxiety.', image: 'https://placehold.co/400x400/9d174d/ffffff?text=MD', quote: "The toughest opponent is the one in your head. Conquer it." },
    { id: 3, name: 'Kabir Sheikh', role: 'Founder, Sports Media Startup', bio: 'Guidance on navigating the business side of sports, from branding to investment in the Indian market.', image: 'https://placehold.co/400x400/0d9488/ffffff?text=KS', quote: "Your talent is your brand. Build it with passion and strategy." },
  ],
  testimonials: [
    { quote: "Turf made finding a quality pitch in Gurgaon so simple. The booking process is a breeze!", name: 'Aarav Gupta', detail: 'Weekend Cricketer', image: 'https://placehold.co/100x100/4f46e5/ffffff?text=AG' },
    { quote: "I connected with an amazing coach who transformed my game. It's more than just a booking app.", name: 'Saanvi Patel', detail: 'Aspiring Basketball Pro', image: 'https://placehold.co/100x100/c026d3/ffffff?text=SP' },
    { quote: "The variety of venues in Delhi NCR is incredible. We found the perfect spot for our corporate league.", name: 'Mohammed Ali', detail: 'HR Manager, Tech Corp', image: 'https://placehold.co/100x100/059669/ffffff?text=MA' },
  ],
  blogPosts: [
    { id: 1, title: '5 Drills to Improve Your Cover Drive', author: 'Coach Rohan Sharma', date: 'July 15, 2025', excerpt: 'Mastering the cover drive is key. Here are five fundamental drills you can practice in the nets...', image: 'https://placehold.co/600x400/16a34a/ffffff?text=Blog+Post+1' },
    { id: 2, title: 'Choosing the Right Gear for Indian Conditions', author: 'Turf Team', date: 'July 10, 2025', excerpt: 'From shoes to protective wear, the right gear can make all the difference on Indian turfs...', image: 'https://placehold.co/600x400/16a34a/ffffff?text=Blog+Post+2' },
    { id: 3, title: 'The Importance of Mental Toughness in Sports', author: 'Dr. Meera Desai', date: 'July 5, 2025', excerpt: 'Talent can only take you so far. We explore why mental resilience is the true marker of a champion...', image: 'https://placehold.co/600x400/16a34a/ffffff?text=Blog+Post+3' },
  ],
  stats: [
    { value: 500, label: 'Venue Bookings' },
    { value: 100, label: 'Coaches Onboarded' },
    { value: 10, label: 'Cities Live' },
  ],
  sports: [
      { name: 'Cricket', icon: '🏏' },
      { name: 'Football', icon: '⚽' },
      { name: 'Basketball', icon: '🏀' },
      { name: 'Tennis', icon: '🎾' },
      { name: 'Badminton', icon: '🏸' },
  ]
};

// --- HOOKS ---
const useInView = (options) => {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.unobserve(entry.target);
            }
        }, options);
        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, [ref, options]);
    return [ref, isInView];
};

const useCountUp = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    const [ref, isInView] = useInView({ threshold: 0.5, triggerOnce: true });
    useEffect(() => {
        if (isInView) {
            let start = 0;
            const range = end - start;
            let current = start;
            const increment = Math.ceil(range / (duration / 15));
            const timer = setInterval(() => {
                current += increment;
                if (current >= end) {
                    current = end;
                    clearInterval(timer);
                }
                setCount(current);
            }, 15);
            return () => clearInterval(timer);
        }
    }, [end, duration, isInView]);
    return [ref, Math.floor(count)];
};

// --- SVG ICONS ---
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">{path}</svg>
);
const MapPinIcon = () => <Icon path={<path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 21l-4.95-6.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />} className="w-5 h-5 mr-2 text-gray-400" />;
const StarIcon = () => <Icon path={<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />} className="w-5 h-5 text-yellow-400" />;
const SearchIcon = () => <Icon path={<path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />} className="w-5 h-5" />;
const ArrowLeftIcon = () => <Icon path={<path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />} />;
const ArrowRightIcon = () => <Icon path={<path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />} />;
const SocialIcon = ({ path }) => <svg className="w-6 h-6 text-gray-400 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">{path}</svg>;
const TwitterIcon = () => <SocialIcon path={<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />} />;
const LinkedInIcon = () => <SocialIcon path={<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />} />;
const InstagramIcon = () => <SocialIcon path={<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" />} />;

// --- REUSABLE COMPONENTS ---
const AnimateOnScroll = ({ children, className = '', delay = 0 }) => {
    const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
    return (
        <div ref={ref} className={`${className} transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
};

const Header = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = ['Venues', 'Coaches', 'Mentorship', 'About', 'Blog', 'Contact'];
  const handleNavClick = (page) => {
    setCurrentPage(page.toLowerCase());
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };
  return (
    <header className="bg-white/90 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" onClick={() => handleNavClick('home')} className="text-2xl font-bold text-green-600">Turf</a>
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(link => {
            const pageName = link.toLowerCase();
            const isActive = currentPage === pageName;
            return (
              <a key={link} href={`#${pageName}`} onClick={() => handleNavClick(link)} 
                 className={`relative text-gray-600 hover:text-green-600 transition-colors py-1 ${isActive ? 'text-green-600 font-semibold' : ''}`}>
                {link}
                {isActive && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 rounded-full"></span>}
              </a>
            );
          })}
        </nav>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-700">
          <Icon path={<path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />} />
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-2">
          {navLinks.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => handleNavClick(link)} className="block text-gray-600 hover:text-green-600 transition-colors py-2">{link}</a>
          ))}
        </div>
      )}
    </header>
  );
};

const Footer = ({ setCurrentPage }) => (
  <footer className="bg-gray-900 text-white">
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <div className="col-span-2 lg:col-span-2">
            <h3 className="text-2xl font-bold text-green-500">Turf</h3>
            <p className="text-gray-400 mt-2 max-w-xs">The easiest way to book venues, find coaches, and grow your skills in India.</p>
            <div className="mt-6">
                <h4 className="font-semibold mb-2 text-gray-200">Join our Newsletter</h4>
                <form className="flex">
                    <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 text-gray-900 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                    <button type="submit" onClick={e => e.preventDefault()} className="bg-green-600 px-4 py-2 rounded-r-md hover:bg-green-700 transition-colors">Go</button>
                </form>
            </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-gray-200">Quick Links</h4>
          <ul>
            {['Home', 'Venues', 'Coaches', 'Mentorship', 'About'].map(link => (
              <li key={link} className="mt-2"><a href="#" onClick={() => setCurrentPage(link.toLowerCase())} className="text-gray-400 hover:text-white transition-colors">{link}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-gray-200">Company</h4>
          <ul>
            <li className="mt-2"><a href="#" onClick={() => setCurrentPage('blog')} className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            <li className="mt-2"><a href="#" onClick={() => setCurrentPage('contact')} className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1">
          <h4 className="font-semibold mb-4 text-gray-200">Follow Us</h4>
          <div className="flex space-x-4">
              <a href="#" aria-label="Twitter"><TwitterIcon /></a>
              <a href="#" aria-label="LinkedIn"><LinkedInIcon /></a>
              <a href="#" aria-label="Instagram"><InstagramIcon /></a>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500">
        <p>&copy; 2025 Turf India. All rights reserved. A premium frontend demo.</p>
      </div>
    </div>
  </footer>
);

const VenueCard = ({ venue, onClick }) => (
  <div onClick={onClick} className="bg-white rounded-xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl cursor-pointer">
    <div className="relative">
      <img className="w-full h-48 object-cover" src={venue.image} alt={venue.name} />
      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">{venue.sport}</div>
      {venue.status && <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white text-xs px-3 py-1">{venue.status}</div>}
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-1">{venue.name}</h3>
      <p className="text-gray-600 flex items-center mb-4"><MapPinIcon />{venue.location}</p>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-bold text-green-600">₹{venue.price.toLocaleString('en-IN')}<span className="text-sm font-normal text-gray-500">/hour</span></p>
          <div className="flex items-center mt-1"><StarIcon /><span className="text-gray-600 font-semibold ml-1">{venue.rating}</span></div>
        </div>
        <button className="bg-gray-800 text-white font-semibold px-5 py-2 rounded-lg group-hover:bg-green-600 group-hover:scale-105 transition-all duration-300">Book Now</button>
      </div>
    </div>
  </div>
);

const CoachCard = ({ coach }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="bg-white rounded-xl shadow-lg p-6 text-center group transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20 relative overflow-hidden">
            {coach.badge && <div className="absolute top-3 right-[-30px] bg-orange-500 text-white text-xs font-bold px-8 py-1 transform rotate-45 z-10">{coach.badge}</div>}
            <div className="relative">
                <img src={coach.image} alt={coach.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-200 group-hover:border-green-400 transition-colors duration-300" />
                <h3 className="text-xl font-bold text-gray-900">{coach.name}</h3>
                <p className="text-green-600 font-semibold mb-2">{coach.specialty}</p>
                <div className="flex justify-center items-center my-2"><StarIcon /><span className="ml-1 font-bold text-gray-700">{coach.rating}</span></div>
                <p className="text-lg font-bold text-gray-800 mb-4">₹{coach.rate.toLocaleString('en-IN')}<span className="text-sm font-normal text-gray-500">/hour</span></p>
            </div>
            <div className={`absolute bottom-0 left-0 right-0 bg-gray-800 text-white p-4 rounded-b-xl transition-all duration-300 ease-in-out ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                <p className="text-sm italic mb-2">"{coach.bio}"</p>
                <button className="w-full bg-green-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-green-600 transition-all duration-300">Connect</button>
            </div>
        </div>
    );
};

const MentorCard = ({ mentor }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    return (
        <div className="perspective-1000" onMouseEnter={() => setIsFlipped(true)} onMouseLeave={() => setIsFlipped(false)}>
            <div className={`relative w-full h-80 transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front */}
                <div className="absolute w-full h-full backface-hidden bg-gray-800 rounded-xl border border-gray-700 p-6 flex flex-col items-center justify-center text-center">
                    <img src={mentor.image} alt={mentor.name} className="w-24 h-24 rounded-full mb-4 border-4 border-green-500" />
                    <h3 className="text-xl font-bold text-white">{mentor.name}</h3>
                    <p className="text-green-400 font-semibold">{mentor.role}</p>
                </div>
                {/* Back */}
                <div className="absolute w-full h-full backface-hidden bg-green-600 rounded-xl p-6 flex flex-col items-center justify-center text-center rotate-y-180">
                    <p className="text-lg italic text-white">"{mentor.quote}"</p>
                </div>
            </div>
        </div>
    );
};

const TestimonialCarousel = ({ testimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const nextSlide = useCallback(() => { setCurrentIndex(prev => (prev + 1) % testimonials.length); }, [testimonials.length]);
    const prevSlide = () => { setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length); };
    useEffect(() => { const timer = setInterval(nextSlide, 5000); return () => clearInterval(timer); }, [nextSlide]);
    return (
        <div className="relative max-w-3xl mx-auto bg-green-600 text-white rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="overflow-hidden"><div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {testimonials.map((t, i) => (
                    <div key={i} className="w-full flex-shrink-0 text-center">
                        <img src={t.image} alt={t.name} className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-green-400" />
                        <p className="text-xl md:text-2xl italic mb-6">"{t.quote}"</p>
                        <p className="font-bold text-green-200 text-lg">{t.name}</p>
                        <p className="text-green-300">{t.detail}</p>
                    </div>
                ))}
            </div></div>
            <button onClick={prevSlide} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors"><ArrowLeftIcon /></button>
            <button onClick={nextSlide} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors"><ArrowRightIcon /></button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">{testimonials.map((_, i) => ( <button key={i} onClick={() => setCurrentIndex(i)} className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-white' : 'bg-white/50'} transition-all`}></button> ))}</div>
        </div>
    );
};

// --- PAGE COMPONENTS ---

const HomePage = ({ setCurrentPage }) => {
    const heroWords = "Book. Train. Grow.".split(" ");
    const [countRef, count] = useCountUp(dummyData.stats[0].value);
    const [countRef2, count2] = useCountUp(dummyData.stats[1].value);
    const [countRef3, count3] = useCountUp(dummyData.stats[2].value);
    const animatedStats = [count, count2, count3];

    return (
      <div>
        {/* Hero Section */}
        <section className="relative bg-gray-900 text-white overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-60 z-0">
                <img src="https://placehold.co/1920x1080/020617/020617?text=." className="w-full h-full object-cover" alt="background"/>
            </div>
            <div className="relative container mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24 text-center z-10">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
                    Find Your Turf. <br className="md:hidden"/>
                    <span className="text-green-400">
                        {heroWords.map((word, i) => (
                            <span key={i} className="inline-block transition-all duration-500 opacity-0 translate-y-8" style={{ animation: `fadeInUp 0.5s ease-out ${i * 0.2}s forwards` }}>{word}&nbsp;</span>
                        ))}
                    </span>
                </h1>
                <style>{`@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }`}</style>
                <AnimateOnScroll delay={600}><p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">The ultimate platform to book sports venues, connect with professional coaches, and get mentored by the best in the game.</p></AnimateOnScroll>
                <div className="mt-10 flex justify-center items-center space-x-4">
                    <AnimateOnScroll delay={800}>
                        <button onClick={() => setCurrentPage('venues')} className="bg-green-500 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 animate-pulse-once" style={{animationDelay: '1s'}}>Find Your Turf</button>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={900}>
                        <button onClick={() => setCurrentPage('coaches')} className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105">Meet Coaches</button>
                    </AnimateOnScroll>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                    <svg className="w-6 h-6 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-24">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {dummyData.stats.map((stat, i) => (
                        <AnimateOnScroll key={i} delay={i * 100}>
                            <div ref={i === 0 ? countRef : i === 1 ? countRef2 : countRef3}>
                                <p className="text-5xl md:text-6xl font-bold text-green-600">{animatedStats[i].toLocaleString('en-IN')}+</p>
                                <p className="text-gray-500 text-lg mt-2">{stat.label}</p>
                            </div>
                        </AnimateOnScroll>
                    ))}
                </div>
            </div>
        </section>
        
        {/* Find by Sport Section */}
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <AnimateOnScroll><h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Find Your Game</h2></AnimateOnScroll>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
                    {dummyData.sports.map((sport, i) => (
                        <AnimateOnScroll key={sport.name} delay={i * 100}>
                            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center cursor-pointer">
                                <span className="text-5xl mb-4">{sport.icon}</span>
                                <span className="font-semibold text-lg text-gray-800">{sport.name}</span>
                            </div>
                        </AnimateOnScroll>
                    ))}
                </div>
            </div>
        </section>

        {/* Featured Mentor Section */}
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <AnimateOnScroll>
                    <div className="bg-gray-900 rounded-2xl md:flex items-center p-8 md:p-12">
                        <div className="md:w-1/2 text-white text-center md:text-left">
                            <p className="text-orange-400 font-semibold">Featured Mentor</p>
                            <h3 className="text-3xl md:text-4xl font-bold mt-2">{dummyData.mentors[0].name}</h3>
                            <p className="text-lg text-gray-300 mt-2">{dummyData.mentors[0].role}</p>
                            <p className="text-xl italic mt-6">"{dummyData.mentors[0].quote}"</p>
                            <button className="mt-8 bg-orange-500 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">Hear My Journey</button>
                        </div>
                        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
                            <img src={dummyData.mentors[0].image} alt={dummyData.mentors[0].name} className="w-64 h-64 rounded-full border-8 border-green-500 object-cover"/>
                        </div>
                    </div>
                </AnimateOnScroll>
            </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <AnimateOnScroll><h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Community Says</h2></AnimateOnScroll>
                <AnimateOnScroll delay={200}><TestimonialCarousel testimonials={dummyData.testimonials} /></AnimateOnScroll>
            </div>
        </section>
      </div>
    );
};

const VenuePage = () => {
    const [venues, setVenues] = useState(dummyData.venues);
    const [sportFilter, setSportFilter] = useState('All');
    const [locationFilter, setLocationFilter] = useState('');
    useEffect(() => {
        let filtered = dummyData.venues;
        if (sportFilter !== 'All') filtered = filtered.filter(v => v.sport === sportFilter);
        if (locationFilter) filtered = filtered.filter(v => v.location.toLowerCase().includes(locationFilter.toLowerCase()));
        setVenues(filtered);
    }, [sportFilter, locationFilter]);
    const sports = ['All', ...new Set(dummyData.venues.map(v => v.sport))];
    return (
        <div className="container mx-auto px-6 py-16">
            <AnimateOnScroll><h1 className="text-4xl font-bold mb-4">Discover Venues</h1><p className="text-lg text-gray-600 mb-8">Find the perfect spot for your next game in Delhi NCR.</p></AnimateOnScroll>
            <AnimateOnScroll delay={200}><div className="bg-white p-4 rounded-lg shadow-md mb-8 flex flex-col md:flex-row gap-4 items-center">
                <div className="w-full md:w-1/3"><label className="block text-sm font-medium text-gray-700">Location</label><input type="text" placeholder="e.g., Gurgaon" value={locationFilter} onChange={e => setLocationFilter(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"/></div>
                <div className="w-full md:w-1/3"><label className="block text-sm font-medium text-gray-700">Sport</label><select value={sportFilter} onChange={e => setSportFilter(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">{sports.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
            </div></AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{venues.length > 0 ? ( venues.map((venue, i) => (<AnimateOnScroll key={venue.id} delay={i * 100}><VenueCard venue={venue} /></AnimateOnScroll>)) ) : (<p className="text-gray-500 col-span-full text-center">No venues match your criteria.</p>)}</div>
        </div>
    );
};

const CoachesPage = () => (
    <div className="container mx-auto px-6 py-16">
        <AnimateOnScroll><h1 className="text-4xl font-bold mb-4">Find a Coach</h1><p className="text-lg text-gray-600 mb-12">Connect with top-rated coaches to improve your game.</p></AnimateOnScroll>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">{dummyData.coaches.map((coach, i) => (<AnimateOnScroll key={coach.id} delay={i * 100}><CoachCard coach={coach} /></AnimateOnScroll>))}</div>
    </div>
);

const MentorshipPage = () => (
    <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-20 text-center">
            <AnimateOnScroll><h1 className="text-4xl font-bold mb-4">Professional Mentorship</h1><p className="text-lg text-green-300 max-w-3xl mx-auto mb-12">Learn from the best. Get career guidance, mental coaching, and strategic insights from seasoned sports professionals.</p></AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{dummyData.mentors.map((mentor, i) => (<AnimateOnScroll key={mentor.id} delay={i * 150}><MentorCard mentor={mentor} /></AnimateOnScroll>))}</div>
            <AnimateOnScroll className="mt-16" delay={300}><button className="bg-green-500 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105">Join the Waitlist</button></AnimateOnScroll>
        </div>
    </div>
);

const AboutPage = () => (
    <div className="bg-white py-20">
        <div className="container mx-auto px-6 max-w-4xl">
            <AnimateOnScroll><h1 className="text-4xl font-bold text-center mb-12">About Turf</h1></AnimateOnScroll>
            <div className="space-y-10 text-lg text-gray-700">
                <AnimateOnScroll delay={100}><div><h2 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h2><p>To make sports accessible to everyone, everywhere. We believe in the power of sport to build communities, foster health, and inspire greatness. Turf is our way of removing the barriers between you and your next game, your next lesson, your next breakthrough.</p></div></AnimateOnScroll>
                <AnimateOnScroll delay={200}><div><h2 className="text-2xl font-bold text-gray-900 mb-3">Our Story</h2><p>Founded in 2024 by a group of passionate athletes and tech enthusiasts in Delhi, Turf was born from a simple frustration: finding a good place to play shouldn't be harder than the game itself. We started with a small list of local fields and a big vision. Today, we're building a comprehensive ecosystem for athletes at every level.</p></div></AnimateOnScroll>
                <AnimateOnScroll delay={300}><div><h2 className="text-2xl font-bold text-gray-900 mb-3">Our Values</h2><ul className="list-disc list-inside space-y-2"><li><span className="font-semibold">Community First:</span> We build for and with our users.</li><li><span className="font-semibold">Passion for Sport:</span> It's in our DNA. We love the game.</li><li><span className="font-semibold">Uncompromising Quality:</span> From our platform to our partners, we demand the best.</li></ul></div></AnimateOnScroll>
            </div>
        </div>
    </div>
);

const ContactPage = () => (
    <div className="container mx-auto px-6 py-20">
        <AnimateOnScroll className="text-center"><h1 className="text-4xl font-bold">Get In Touch</h1><p className="text-lg text-gray-600 mt-4">We'd love to hear from you. Send us a message!</p></AnimateOnScroll>
        <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimateOnScroll delay={200}><div className="bg-white p-8 rounded-lg shadow-md"><h2 className="text-2xl font-bold mb-6">Contact Form (Static Demo)</h2><form action="#" method="POST" className="space-y-6"><div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label><input type="text" id="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" /></div><div><label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label><input type="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" /></div><div><label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label><textarea id="message" rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"></textarea></div><div><button type="submit" onClick={e => e.preventDefault()} className="w-full bg-green-600 text-white py-3 px-4 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Send Message</button></div></form></div></AnimateOnScroll>
            <div className="space-y-6"><AnimateOnScroll delay={300}><div className="bg-white p-8 rounded-lg shadow-md"><h3 className="text-xl font-semibold mb-2">Email Us</h3><p className="text-gray-600 hover:text-green-600">hello@turf-india.com</p></div></AnimateOnScroll><AnimateOnScroll delay={400}><div className="bg-white p-8 rounded-lg shadow-md"><h3 className="text-xl font-semibold mb-2">Call Us</h3><p className="text-gray-600">+91 8506926705</p></div></AnimateOnScroll><AnimateOnScroll delay={500}><div className="bg-white rounded-lg shadow-md overflow-hidden h-64"><img src="https://placehold.co/800x600/e2e8f0/334155?text=Delhi+NCR+Map" alt="Map" className="w-full h-full object-cover" /></div></AnimateOnScroll></div>
        </div>
    </div>
);

const BlogPage = () => (
    <div className="container mx-auto px-6 py-16">
        <AnimateOnScroll><h1 className="text-4xl font-bold mb-4 text-center">Turf Blog</h1><p className="text-lg text-gray-600 mb-12 text-center">Tips, stories, and insights from the world of sports.</p></AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{dummyData.blogPosts.map((post, i) => (<AnimateOnScroll key={post.id} delay={i * 100}><div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"><img className="w-full h-56 object-cover" src={post.image} alt={post.title} /><div className="p-6 flex flex-col flex-grow"><p className="text-sm text-gray-500 mb-2">{post.date} &bull; {post.author}</p><h3 className="text-xl font-bold text-gray-900 mb-2 flex-grow">{post.title}</h3><p className="text-gray-600 mb-4">{post.excerpt}</p><a href="#" onClick={e => e.preventDefault()} className="font-semibold text-green-600 hover:text-green-700 mt-auto">Read More &rarr;</a></div></div></AnimateOnScroll>))}</div>
    </div>
);

// --- MAIN APP COMPONENT ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage setCurrentPage={setCurrentPage} />;
      case 'venues': return <VenuePage />;
      case 'coaches': return <CoachesPage />;
      case 'mentorship': return <MentorshipPage />;
      case 'about': return <AboutPage />;
      case 'contact': return <ContactPage />;
      case 'blog': return <BlogPage />;
      default: return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };
  return (
    <div className="bg-gray-50 font-sans antialiased">
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        @keyframes pulse-once { 0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); } 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); } }
        .animate-pulse-once { animation: pulse-once 1.5s ease-out; }
      `}</style>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>{renderPage()}</main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
