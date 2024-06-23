import Link from 'next/link';
import React from 'react'

function Footer() {
  return (
    <footer className="flex justify-between items-center px-4 py-2 mt-2 mb-6">
      <span className="text-gray-500 text-sm">@ 2024 WTG by Picoplay.</span>
      <Link className="text-gray-500 text-xl" href="https://x.com/picoplayfun">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M16.641 5H19.095L13.735 10.93L20.041 19H15.103L11.236 14.106L6.81102 19H4.35602L10.09 12.657L4.04102 5H9.10302L12.599 9.474L16.641 5Z"
            fill="#989898"
          />
        </svg>
      </Link>
    </footer>
  );
}

export default Footer