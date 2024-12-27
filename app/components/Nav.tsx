import Image from "next/image";
import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav className="fixed top-0 border-solid border-gray-800 w-full border-b py-3 bg-dark z-50 bg-inherit">
      <div className="container mx-auto">
        <div className="w-full flex flex-col lg:flex-row p-2">
          <div className="flex justify-between w-full lg:flex-row">
            <Link href="/" className="flex items-center text-green-600 pl-4">
              <Image
                src="/web-app-manifest-192x192.png"
                alt="brand image"
                width={60}
                height={60}
                className="w-10 h-10 text-green-600 rounded-full"
              />
            </Link>
            <div className="flex items-center gap-4">
            
            <button type='button' className='py-1.5 px-3.5 text-xs max-h-max bg-green-500 text-white rounded-full cursor-pointer font-medium leading-5 text-center shadow-xs transition-all duration-500 hover:bg-green-700'>Login</button>

            <button type='button' className='py-1.5 px-3.5 text-xs max-h-max bg-green-500 text-white rounded-full cursor-pointer font-medium leading-5 text-center shadow-xs transition-all duration-500 hover:bg-green-700'>Sign up</button>
            
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
