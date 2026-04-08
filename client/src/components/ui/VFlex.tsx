import React, { ReactNode } from "react";

const VFlex = ({
  className,
  onClick,
  children,
}: {
  className: string;
  onClick?: () => void;
  children: ReactNode;
}) => (
  <div className={`flex flex-col ${className}`} onClick={onClick}>
    {children}
  </div>
);

export default VFlex;
