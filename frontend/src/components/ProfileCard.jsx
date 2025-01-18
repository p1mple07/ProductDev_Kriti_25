import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  EnvelopeIcon,
  CalendarIcon,
  PencilIcon
} from "@heroicons/react/24/outline";

const ProfileCard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-full max-w-md transform transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-accent/30">
        {/* Gradient Cover with Smooth Transition */}
        <div className="relative h-40 overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-r from-accent via-accent/80 to-accent/90 transition-transform duration-[4000ms] ease-in-out ${isHovered ? "translate-x-full" : "translate-x-0"} animate-gradient`}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-r from-accent/90 via-accent/80 to-accent transition-transform duration-[4000ms] ease-in-out ${isHovered ? "translate-x-0" : "-translate-x-full"} animate-gradient`}
          />
        </div>

        {/* Profile Content */}
        <div className="relative px-8 pb-8">
          {/* Avatar with Interactive Hover Effect */}
          <div className="absolute -top-16 left-8 transition-transform duration-300 hover:scale-110">
            <div className="relative group">
              <img
                src={currentUser.profilePicture || "/userphoto.jpg"}
                alt="User Profile"
                className="w-28 h-28 rounded-full border-4 border-gray-900 shadow-md object-cover"
              />
              <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <PencilIcon className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-6 h-6" />
              </div>
            </div>
          </div>

          {/* User Information */}
          <div className="pt-20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-white transition-all duration-300 hover:text-accent">
                {currentUser.username || "User Name"}
              </h2>
              <Link
                to="/profile"
                className="px-3 py-1 bg-accent text-white rounded-full text-xs font-medium hover:bg-accent/80 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-accent/30"
              >
                Edit
              </Link>
            </div>

            {/* User Details with Animated Hover */}
            <div className="mt-6 space-y-4">
              {[
                { Icon: EnvelopeIcon, value: currentUser.email || "user@example.com" },
                { Icon: CalendarIcon, value: `Joined ${currentUser.createdAt || "January 2024"}` },
              ].map(({ Icon, value }, index) => (
                <div 
                  key={index} 
                  className="flex items-center text-gray-400 transition-all duration-300 hover:translate-x-2 hover:text-accent"
                >
                  <Icon className="w-5 h-5 mr-3 text-accent" />
                  <span className="text-sm">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;