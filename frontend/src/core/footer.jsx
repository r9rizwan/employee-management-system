import { Link } from "react-router-dom";
import React from "react";

function Footer() {
  return (
    <footer className="flex items-center justify-center bg-gray-700 h-24 px-8 text-white font-bold text-lg border-2 border-gray-700 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/*Column 1 */}
        <div>
          <h2>About Us</h2>
        </div>

        <div>
          <h2>Our Policies</h2>
        </div>

        <div>
          <h2>Contact Us</h2>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
