import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dropdown } from "flowbite-react";
import useSignOut from "../hooks/useSignOut";
import { useSelector } from "react-redux";

const navigation = [
  // { name: "Dashboard", href: "/", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { handleSignout } = useSignOut();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const { currentUser } = useSelector((state) => state.user);

  const updatedNavigation = navigation.map((item) => ({
    ...item,
    current: item.href === location.pathname,
  }));
  return (
    <Disclosure as="nav" className="bg-primary top-0">
      {({ open }) => (
        <>
          <div className="mx-auto sm:px-10 py-1">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-primary_text focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={toggleMobileMenu}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <div className=" text-primary_text text-3xl">WebCraft</div>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {updatedNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-primary_text"
                            : "text-gray-300 hover:bg-gray-700 hover:text-primary_text",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">                
                {currentUser ? (
                  <Dropdown
                    arrowIcon={false}
                    inline
                    className="bg-background"
                    label={
                      <img
                        src={currentUser.profilePicture}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="h-10 rounded-full bg-background"
                      />
                    }
                  >
                    <Dropdown.Header >
                      <span className="block text-sm text-primary_text ">
                        {currentUser.username}
                      </span>
                      <span className="block text-sm font-medium truncat text-primary_text">
                        {currentUser.email}
                      </span>
                    </Dropdown.Header>
                    <Link to={"/profile"}>
                      <Dropdown.Item className=" hover:bg-gray-50  hover:text-gray-600 text-primary_text">
                        Profile
                      </Dropdown.Item>
                    </Link>
                    <Dropdown.Divider />
                    
                    <Dropdown.Item className=" hover:bg-gray-50  hover:text-gray-600 text-primary_text" onClick={handleSignout}>Sign out</Dropdown.Item>
                  </Dropdown>
                ) : (
                  <Link to="/sign-in">
                    <button
                      type="submit"
                      className="bg-transparent hover:bg-hover_accent text-accent font-semibold hover:text-primary_text py-2 px-4 border border-hover_accent hover:border-transparent rounded w-full"
                    >
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {updatedNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-primary_text"
                      : "text-gray-300 hover:bg-gray-700 hover:text-primary_text",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
