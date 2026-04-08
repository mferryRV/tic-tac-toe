import React, { ReactNode } from "react";

export default ({
  className,
  onClick,
  children,
}: {
  className: string;
  onClick?: () => void;
  children: ReactNode;
}) => (
  <div className={`flex flex-row ${className}`} onClick={onClick}>
    {children}
  </div>
);
