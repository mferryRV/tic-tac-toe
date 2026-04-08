import React from "react";

const Header = ({ title }: { title: string }) => (
  <div className="font-bold text-2xl p-4 w-full text-center bg-dark text-white">
    <h1>{title}</h1>
  </div>
);

export default Header;
