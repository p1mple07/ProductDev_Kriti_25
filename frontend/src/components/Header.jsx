import { useState } from "react";
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import useSignOut from "../hooks/useSignOut";
import ProfileCard from "./ProfileCard";
import WebCraftLogo from "./WebCraftLogo";

function Header({ chatTitle }) {
  const [isProfileCardVisible, setIsProfileCardVisible] = useState(false);
  const { handleSignout } = useSignOut();
  const { currentUser } = useSelector((state) => state.user);

  const toggleProfileCard = () => {
    setIsProfileCardVisible(!isProfileCardVisible);
  };

  return (
    <Disclosure as="nav" className="bg-secondary">
      {({ open }) => (
        <>
          <div className="container mx-auto px-2 py-1">
            <div className="flex justify-between items-center h-12">
              {/* Logo */}
              <div className="flex items-center">
                <WebCraftLogo />
              </div>

              {/* Chat Title Centered */}
              {chatTitle && (
                <div className="text-center flex-1">
                  <h3 className="text-primary_text font-semibold text-lg truncate w-[250px] mx-auto">
                    {chatTitle}
                  </h3>
                </div>
              )}

              {/* Profile or Sign-In */}
              <div className="flex items-center space-x-2">
                {currentUser ? (
                  <div className="relative flex items-center">
                    <img
                      src={currentUser.profilePicture || "/userphoto.jpg"}
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