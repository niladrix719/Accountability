import React, { useState } from "react";
import { Link } from "react-router-dom";

const DropdownMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    props.setUser(null);
    window.location.href = "/login";
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={toggleDropdown}
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          Options
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
          <div className="py-1" role="none">
            <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">
              Account settings
            </a>
            <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">
              Support
            </a>
            <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">
              License
            </a>
            <form method="POST" action="#" role="none">
              <button
                className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-3"
                onClick={(e) => handleSignOut(e)}
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Navbar(props) {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-md">
      <div className="flex items-center justify-between">
        {/* <a href="#" className="text-white text-lg font-bold">
          Accountability
        </a> */}
        <Link to="/" className="text-white text-lg font-bold">
          Accountability
        </Link>
        <div className="flex items-center space-x-4">
          <DropdownMenu setUser={props.setUser} />
          {!props.user && <Link to='/signup' className="bg-white text-gray-800 px-4 py-2 rounded">
            Sign In
          </Link>}
          {props.user && <Link to='/profile' className="bg-white text-gray-800 px-4 py-2 rounded">
            {props.user.username}
            </Link>
          }
        </div>
      </div>
    </nav>
  );
}
