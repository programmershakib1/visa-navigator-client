import { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { Tooltip } from "react-tooltip";
import logo from "../../assets/logo.png";
import white_logo from "../../assets/white_logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, loading, handleSingOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="flex justify-between items-center py-8 mx-5 md:mx-0">
      <div className="hidden md:block">
        <Link to="/" className="flex items-center gap-2">
          {theme === "light" ? (
            <img className="w-16" src={logo} alt="Logo" />
          ) : (
            <img className="w-16" src={white_logo} alt="Logo" />
          )}
          <h2 className="font-black text-primary dark:text-white text-2xl font-sora">
            VISA NAVIGATOR
          </h2>
        </Link>
      </div>
      <nav className="z-10">
        <div
          className="md:hidden absolute left-5 top-10"
          onClick={() => setOpen(!open)}
        >
          {open === true ? (
            <i className="fa-regular fa-circle-xmark text-primary text-4xl dark:text-white"></i>
          ) : (
            <i className="fa-solid fa-bars text-primary text-4xl dark:text-white"></i>
          )}
        </div>
        <ul
          className={`flex flex-col md:flex-row md:gap-5 bg-white dark:bg-[rgb(14,15,17)] dark:text-white rounded-xl py-3 px-5 md:p-0 font-medium absolute md:absolute md:top-28 md:right-52 lg:static z-10 ${
            open ? "left-4 top-24" : "-top-40"
          }`}
        >
          <NavLink to="/">Home</NavLink>
          <NavLink to="/allVisas">All visas</NavLink>
          <NavLink to="/addVisa">Add Visa</NavLink>
          <NavLink to="/myAddedVisas">My added visas</NavLink>
          <NavLink to="/myVisaApplications">My Visa applications</NavLink>
          {user ? <NavLink to="/profile">Profile</NavLink> : ""}
        </ul>
      </nav>
      {loading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme}>
            {theme === "light" ? (
              <i className="fa-solid fa-moon text-black text-4xl"></i>
            ) : (
              <i className="fa-regular fa-moon text-4xl"></i>
            )}
          </button>
          {user ? (
            <div className="flex items-center gap-2 z-10">
              <div>
                <img
                  data-tooltip-id="tooltip"
                  data-tooltip-content={user?.displayName}
                  className="w-12 rounded-full"
                  src={user?.photoURL}
                  alt="User"
                />
              </div>
              <button
                onClick={handleSingOut}
                className="bg-primary text-white dark:bg-white dark:text-black font-bold py-2 px-4 rounded-sm"
              >
                Sign Out
              </button>
              <Tooltip id="tooltip" place="top" type="dark" effect="float" />
            </div>
          ) : (
            <div className="flex gap-2">
              <button className="bg-primary text-white dark:bg-white  dark:text-black font-bold py-2 px-4 rounded-sm">
                <Link to="/signIn">Sign In</Link>
              </button>
              <button className="bg-primary text-white dark:bg-white  dark:text-black font-bold py-2 px-4 rounded-sm">
                <Link to="/signUp">Sign Up</Link>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
