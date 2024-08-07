"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Button from "./Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-white py-4 px-8 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/image.png" width={30} height={30} alt="Logo QR" />
            <span className="text-lg font-bold text-slate-800 ml-3">UrQR</span>
          </div>
          <div className="hidden md:flex gap-5 items-center">
            <Link
              href="/"
              className="text-slate-600 hover:text-slate-900 font-medium text-sm"
            >
              Home
            </Link>
            <Button href="/generate" text="Generate QR Code" />
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col items-start justify-start gap-4 px-8">
          <Link
            href="/"
            className="text-slate-600 hover:text-slate-900 font-medium text-lg mt-10"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Button
            href="/generate"
            text="Generate QR Code"
            onClick={() => setIsOpen(false)}
          />
          <button
            onClick={toggleMenu}
            className="absolute top-5 right-6 text-slate-600 hover:text-slate-900 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
