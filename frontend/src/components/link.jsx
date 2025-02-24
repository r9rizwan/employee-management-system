import React from "react";
import { Link } from "react-router-dom";

export const FooterLink = ({ to, children }) => {
  return (
    <li className="mb-2">
      <Link to={to} className="hover:underline text-background">
        {children}
      </Link>
    </li>
  );
};
