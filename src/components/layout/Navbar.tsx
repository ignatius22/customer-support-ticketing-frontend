import { Link, useNavigate } from "react-router-dom";
import {
  RiCustomerService2Line,
  RiTicketLine,
  RiAddLine,
  RiDashboardLine,
  RiNotificationLine,
  RiLogoutBoxRLine,
  RiLoginBoxLine,
  RiUserAddLine,
  RiUserLine,
  RiMenuLine,
  RiCloseLine,
} from "react-icons/ri";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 transition-all duration-200 
      ${
        isScrolled
          ? "shadow-md border-b border-gray-200"
          : "border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex-shrink-0 flex items-center text-xl font-bold text-gray-800"
            >
              <div className="flex items-center gap-2">
                <RiCustomerService2Line className="text-2xl text-blue-500" />
                Support Desk
              </div>
            </Link>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl text-gray-700"
            >
              {menuOpen ? <RiCloseLine /> : <RiMenuLine />}
            </button>
          </div>

          {/* Main nav for desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/tickets" className="nav-item">
                  <div className="flex items-center gap-2">
                    <RiTicketLine className="text-lg" />
                    Tickets
                  </div>
                </Link>

                {user?.role === "customer" && (
                  <Link to="/tickets/new" className="nav-item">
                    <div className="flex items-center gap-2">
                      <RiAddLine className="text-lg" />
                      New Ticket
                    </div>
                  </Link>
                )}

                {user?.role === "agent" && (
                  <>
                    <Link to="/dashboard" className="nav-item">
                      <div className="flex items-center gap-2">
                        <RiDashboardLine className="text-lg" />
                        Dashboard
                      </div>
                    </Link>
                    <Link to="/settings/reminders" className="nav-item">
                      <div className="flex items-center gap-2">
                        <RiNotificationLine className="text-lg" />
                        Reminder Settings
                      </div>
                    </Link>
                  </>
                )}
                <div className="relative ml-3 flex items-center space-x-4">
                  <span className="text-sm text-gray-700 flex items-center gap-2">
                    <RiUserLine className="text-lg" />
                    {user?.name || user?.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium bg-gray-100 hover:bg-gray-200"
                  >
                    <div className="flex items-center gap-2">
                      <RiLogoutBoxRLine className="text-lg" />
                      Logout
                    </div>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-item">
                  <div className="flex items-center gap-2">
                    <RiLoginBoxLine className="text-lg" />
                    Login
                  </div>
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  <div className="flex items-center gap-2 text-amber-50">
                    <RiUserAddLine className="text-lg" />
                    Register
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/tickets"
                  onClick={() => setMenuOpen(false)}
                  className="block text-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <RiTicketLine className="text-lg" />
                    Tickets
                  </div>
                </Link>
                {user?.role === "customer" && (
                  <Link
                    to="/tickets/new"
                    onClick={() => setMenuOpen(false)}
                    className="block text-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <RiAddLine className="text-lg" />
                      New Ticket
                    </div>
                  </Link>
                )}
                {user?.role === "agent" && (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="block text-gray-700"
                    >
                      <div className="flex items-center gap-2">
                        <RiDashboardLine className="text-lg" />
                        Dashboard
                      </div>
                    </Link>
                    <Link
                      to="/settings/reminders"
                      onClick={() => setMenuOpen(false)}
                      className="block text-gray-700"
                    >
                      <div className="flex items-center gap-2">
                        <RiNotificationLine className="text-lg" />
                        Reminder Settings
                      </div>
                    </Link>
                  </>
                )}
                <div className="flex items-center gap-2 text-gray-700">
                  <RiUserLine className="text-lg" />
                  {user?.name || user?.email}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <RiLogoutBoxRLine className="text-lg" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block text-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <RiLoginBoxLine className="text-lg" />
                    Login
                  </div>
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  <div className="flex items-center gap-2">
                    <RiUserAddLine className="text-lg" />
                    Register
                  </div>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
