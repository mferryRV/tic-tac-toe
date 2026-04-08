import React, { ReactNode } from "react";

export default ({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) => <div className={`flex flex-row ${className}`}>{children}</div>;
