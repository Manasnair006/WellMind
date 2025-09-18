import React from "react";
import logo from "../assets/logo.png";

interface LogoProps {
  size?: string; // tailwind size classes, default is h-10 w-10
  rounded?: boolean; // whether the logo should be circular
}

export function Logo({ size = "h-10 w-10", rounded = true }: LogoProps) {
  return (
    <img
      src={logo}
      alt="WellMind Logo"
      className={`${size} ${rounded ? "rounded-full" : ""} shadow-md`}
    />
  );
}
