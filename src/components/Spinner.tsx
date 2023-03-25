import React, { useEffect, useState } from "react";

export const Spinner: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return show ? (
    <svg
      className="inline-block animate-spin"
      width="29px"
      height="29px"
      viewBox="0 0 29 29"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient x1="61.935272%" y1="100%" x2="-45.1512887%" y2="16.3609408%" id="linearGradient-1">
          <stop stop-color="#824DF4" offset="0%"></stop>
          <stop stop-color="#824DF4" stop-opacity="0.418187281" offset="21.4818791%"></stop>
          <stop stop-color="#FFFFFF" stop-opacity="0" offset="63.9609191%"></stop>
          <stop stop-color="#FFFFFF" stop-opacity="0" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path
          d="M14,26 C20.3512746,26 25.5,20.8512746 25.5,14.5 C25.5,8.14872538 20.3512746,3 14,3 C7.64872538,3 2.5,8.14872538 2.5,14.5"
          id="icon_spinner"
          stroke="url(#linearGradient-1)"
          stroke-width="6"
        ></path>
      </g>
    </svg>
  ) : null;
};
