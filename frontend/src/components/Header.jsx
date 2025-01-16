import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import useSignOut from "../hooks/useSignOut";
import ProfileCard from "./ProfileCard";

function Header() {
  const [isProfileCardVisible, setIsProfileCardVisible] = useState(false);
  const location = useLocation();
  const { handleSignout } = useSignOut();
  const { currentUser } = useSelector((state) => state.user);

  const toggleProfileCard = () => {
    setIsProfileCardVisible(!isProfileCardVisible);
  };

  return (
    <Disclosure as="nav" className="bg-tertiary">
      {({ open }) => (
        <>
          <div className="container mx-auto px-2 py-1">
            <div className="flex justify-between items-center h-12">
              {/* Logo */}
              <div className="flex items-center">
                <Link to="/">
                  <h2 className="text-xl font-bold text-accent">WebCraft</h2>
                </Link>
              </div>

              {/* Profile or Sign-In */}
              <div className="flex items-center space-x-2">
                {currentUser ? (
                  <div className="relative flex items-center">
                    <img
                      src={currentUser.profilePicture}
                      alt="Profile"
                      referrerPolicy="no-referrer"
                      className="h-8 w-8 rounded-full cursor-pointer"
                      onClick={toggleProfileCard}
                    />
                    <button
                      onClick={handleSignout}
                      className="p-2 text-gray-500 hover:text-accent"
                      aria-label="Sign Out"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    </button>
                    {/* Render ProfileCard */}
                    {isProfileCardVisible && (
                      <div className="absolute top-12 right-0 z-10">
                        <ProfileCard />
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to="/sign-in">
                    <button className="px-3 py-1 text-sm font-medium text-accent border border-accent rounded hover:bg-hover_accent hover:text-primary_text">
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}

export default Header;