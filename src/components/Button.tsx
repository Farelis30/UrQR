import Link from "next/link";
import React from "react";

interface ButtonProps {
  href?: string;
  text: string;
  themes?: "default" | "secondary";
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  href,
  text,
  themes,
  className,
  onClick,
}) => {
  const buttonClass = `${
    !themes || themes === "default"
      ? "text-white bg-slate-800 hover:bg-slate-700"
      : "text-slate-800 bg-white hover:bg-slate-50 border"
  } px-4 py-2 rounded text-center ${className}`;

  return href ? (
    <Link href={href} passHref className={buttonClass} onClick={onClick}>
      {text}
    </Link>
  ) : (
    <button className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
