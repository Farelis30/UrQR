import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="mt-auto bg-white py-2 md:px-8 md:py-6 flex flex-col md:flex-row gap-6 md:gap-0 justify-start items-center md:justify-between border shadow-md text-slate-700">
      <div>
        <p>Created by Muhammad Alfarel Yudistira</p>
      </div>
      <div className="flex gap-2 items-center">
        <p>Built With </p>
        <Link href={"https://nextjs.org/"}>
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={80}
            height={16}
            priority
          />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
