const Footer = () => {
  return (
    <footer className="bg-indigo-700 text-white py-4 mt-10 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm">
        
        {/* Left */}
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} <span className="font-semibold">HostelBite</span>
        </p>

        {/* Center */}
        <p className="text-gray-200 mt-2 md:mt-0">
          Made with ❤️ for hostel life
        </p>

        {/* Right Links */}
        <div className="flex gap-4 mt-2 md:mt-0">
          <span className="hover:text-gray-300 cursor-pointer">Privacy</span>
          <span className="hover:text-gray-300 cursor-pointer">Terms</span>
          <span className="hover:text-gray-300 cursor-pointer">Contact</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;