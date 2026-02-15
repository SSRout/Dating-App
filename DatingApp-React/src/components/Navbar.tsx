import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Heart, MessageSquare, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { token, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-dark-bg bg-opacity-95 border-b border-dark-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-2xl bg-gradient-primary bg-clip-text text-transparent hover:shadow-neon-pink transition-all"
          >
            <Heart className="w-8 h-8 text-neon-pink" />
            DateMatch
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {token ? (
              <>
                <Link
                  to="/members"
                  className="text-gray-300 hover:text-neon-pink transition-colors"
                >
                  Members
                </Link>
                <Link
                  to="/messages"
                  className="text-gray-300 hover:text-neon-cyan transition-colors flex items-center gap-1"
                >
                  <MessageSquare className="w-4 h-4" />
                  Messages
                </Link>
                <Link
                  to="/likes"
                  className="text-gray-300 hover:text-neon-pink transition-colors flex items-center gap-1"
                >
                  <Heart className="w-4 h-4" />
                  Likes
                </Link>
                <div className="flex items-center gap-4 pl-4 border-l border-dark-border">
                  <span className="text-neon-cyan">{user?.knownAs}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-primary hover:shadow-neon-pink text-white rounded-lg transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="px-6 py-2 text-neon-cyan border border-neon-cyan rounded-lg hover:bg-neon-cyan hover:text-dark-bg transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-neon-pink transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-neon-pink"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-dark-border pt-4">
            {token ? (
              <>
                <Link
                  to="/members"
                  className="block text-gray-300 hover:text-neon-pink transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Members
                </Link>
                <Link
                  to="/messages"
                  className="block text-gray-300 hover:text-neon-cyan transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Messages
                </Link>
                <Link
                  to="/likes"
                  className="block text-gray-300 hover:text-neon-pink transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Likes
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 bg-gradient-primary text-white rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  className="block px-4 py-2 text-neon-cyan border border-neon-cyan rounded-lg hover:bg-neon-cyan hover:text-dark-bg transition-all text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-neon-pink transition-all text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
