const AccountIcon = ({ isActive, colors, ...rest }) => {
  const color = isActive ? colors.active : colors.passive;

  return (
    <div {...rest}>
      <svg
        width={50}
        height={50}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx={25}
          cy="14.5833"
          r="8.33333"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
        />
        <path
          d="M12.6349 33.3745C13.6821 30.7015 16.355 29.1665 19.2259 29.1665H30.774C33.6449 29.1665 36.3178 30.7015 37.365 33.3745C38.3546 35.9004 39.3849 39.2875 39.5579 42.7501C39.5855 43.3017 39.1356 43.7498 38.5833 43.7498H11.4166C10.8643 43.7498 10.4144 43.3017 10.442 42.7501C10.615 39.2875 11.6454 35.9004 12.6349 33.3745Z"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default AccountIcon;
