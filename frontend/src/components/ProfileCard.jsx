import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import useSignOut from "../hooks/useSignOut";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import {
  Mail,
  MapPin,
  Calendar,
  Link as LinkIcon,
  Edit,
  ExternalLink,
} from "lucide-react";

const ProfileCard = () => {
  const { handleSignout } = useSignOut();
  const { currentUser } = useSelector((state) => state.user);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-full max-w-md transform transition-all duration-300 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden border border-green-500/20">
        {/* Animated Cover Image */}
        <div className="relative h-40 overflow-hidden">
          <div
            className={`
            absolute inset-0 bg-gradient-to-r from-green-900 via-green-700 to-green-800
            transition-transform duration-5000 ease-in-out
            ${isHovered ? "translate-x-full" : "translate-x-0"}
            animate-gradient
          `}
          />
          <div
            className={`
            absolute inset-0 bg-gradient-to-r from-green-800 via-green-700 to-green-900
            transition-transform duration-5000 ease-in-out
            ${isHovered ? "translate-x-0" : "-translate-x-full"}
            animate-gradient
          `}
          />
        </div>

        {/* Profile Content */}
        <div className="relative px-8 pb-8">
          {/* Avatar with hover effect */}
          <div className="absolute -top-16 left-8 transform transition-transform duration-300 hover:scale-110">
            <div className="relative group">
              <img
                src={
                  currentUser.profileImage ||
                  "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                }
                alt="User Profile"
                className="w-32 h-32 rounded-full border-4 border-gray-900 shadow-lg object-cover"
              />
              <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <Edit className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="pt-20">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-green-400 transition-all duration-300 hover:text-green-300">
                  {currentUser.username || "User Name"}
                </h2>
                {/* <p className="text-sm text-gray-400">
                  @{currentUser.handle || "username"}
                </p> */}
              </div>
              <button className="mx-3 my-2  px-3 py-1 bg-green-600 text-white rounded-full text-xs font-medium hover:bg-green-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/30">
                <Link
                  to="/profile"
                  className="text-white hover:text-hover_accent"
                >
                  Edit
                </Link>
              </button>
            </div>

            <p className="text-gray-300 mt-3 leading-relaxed">
              {currentUser.bio || "No bio provided"}
            </p>

            {/* User Details with hover effects */}
            <div className="mt-6 space-y-4">
              {[
                { Icon: Mail, value: currentUser.email || "user@example.com" },
                {
                  Icon: MapPin,
                  value: currentUser.location || "Location not specified",
                },
                {
                  Icon: Calendar,
                  value: `Joined ${currentUser.joinDate || "January 2024"}`,
                },
              ].map(({ Icon, value }, index) => (
                <div
                  key={index}
                  className="flex items-center text-gray-400 transition-all duration-300 hover:translate-x-2 hover:text-green-400"
                >
                  <Icon className="w-5 h-5 mr-3 text-green-500" />
                  <span className="text-sm">{value}</span>
                </div>
              ))}
              
            </div>

            <div className="flex justify-center items-center h-full">
              <button
                onClick={handleSignout}
                className="my-4 text-gray-500 hover:text-accent"
                aria-label="Sign Out"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 flex justify-center items-center" />
                
              </button>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
