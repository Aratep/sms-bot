const ReferralIcon = ({ color = "#676767" }) => {
  return (
    <svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.31525 9.63594L2.15228 10.1086L2.31525 9.63594ZM2.31525 14.3641L2.15227 13.8914L2.31525 14.3641ZM21.6847 14.3641L21.8477 13.8914L21.6847 14.3641ZM21.6847 9.63594L21.5218 9.16325L21.6847 9.63594ZM6 3.5C3.51472 3.5 1.5 5.51472 1.5 8H2.5C2.5 6.067 4.067 4.5 6 4.5V3.5ZM18 3.5H6V4.5H18V3.5ZM22.5 8C22.5 5.51472 20.4853 3.5 18 3.5V4.5C19.933 4.5 21.5 6.067 21.5 8H22.5ZM22.5 9.22305V8H21.5V9.22305H22.5ZM20.5 12C20.5 11.1246 21.0628 10.3793 21.8477 10.1086L21.5218 9.16325C20.3459 9.56868 19.5 10.6849 19.5 12H20.5ZM21.8477 13.8914C21.0628 13.6207 20.5 12.8754 20.5 12H19.5C19.5 13.3151 20.3459 14.4313 21.5218 14.8367L21.8477 13.8914ZM22.5 16V14.777H21.5V16H22.5ZM18 20.5C20.4853 20.5 22.5 18.4853 22.5 16H21.5C21.5 17.933 19.933 19.5 18 19.5V20.5ZM6 20.5H18V19.5H6V20.5ZM1.5 16C1.5 18.4853 3.51472 20.5 6 20.5V19.5C4.067 19.5 2.5 17.933 2.5 16H1.5ZM1.5 14.777V16H2.5V14.777H1.5ZM2.47823 14.8367C3.65412 14.4313 4.5 13.3151 4.5 12H3.5C3.5 12.8754 2.93724 13.6207 2.15227 13.8914L2.47823 14.8367ZM4.5 12C4.5 10.6849 3.65412 9.56868 2.47823 9.16325L2.15228 10.1086C2.93724 10.3793 3.5 11.1246 3.5 12H4.5ZM1.5 8V9.22305H2.5V8H1.5ZM2.47823 9.16325C2.47599 9.16248 2.47823 9.16217 2.48334 9.16866C2.48969 9.17675 2.5 9.19599 2.5 9.22305H1.5C1.5 9.66351 1.80799 9.98993 2.15228 10.1086L2.47823 9.16325ZM2.5 14.777C2.5 14.804 2.48969 14.8233 2.48334 14.8313C2.47823 14.8378 2.47599 14.8375 2.47823 14.8367L2.15227 13.8914C1.80799 14.0101 1.5 14.3365 1.5 14.777H2.5ZM21.5218 14.8367C21.524 14.8375 21.5218 14.8378 21.5167 14.8313C21.5103 14.8233 21.5 14.804 21.5 14.777H22.5C22.5 14.3365 22.192 14.0101 21.8477 13.8914L21.5218 14.8367ZM21.5 9.22305C21.5 9.19599 21.5103 9.17675 21.5167 9.16866C21.5218 9.16217 21.524 9.16248 21.5218 9.16325L21.8477 10.1086C22.192 9.98993 22.5 9.66351 22.5 9.22305H21.5Z"
        fill={color}
      />
      <circle
        cx="9.7984"
        cy="9.79846"
        r="1.13981"
        transform="rotate(45 9.7984 9.79846)"
        fill={color}
      />
      <circle
        cx="14.2015"
        cy="14.2018"
        r="1.13981"
        transform="rotate(45 14.2015 14.2018)"
        fill={color}
      />
      <path
        d="M9.76119 14.2393L14.2388 9.76172"
        stroke="#676767"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ReferralIcon;