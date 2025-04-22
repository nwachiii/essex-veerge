export const CheckIcon = ({isChecked}) => {
  return (
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_23893_73783)">
        <circle
          cx="8.26359"
          cy="7.99992"
          r="7.54874"
          fill="#F5F5F5"
          stroke={isChecked ? '#4545FE' : '#CBCBCB'}
          stroke-width="0.902354"
        />
        {isChecked ? (
          <g clip-path="url(#clip1_23893_73783)">
            <path
              d="M8.26186 13.4485C5.24935 13.4485 2.80737 11.0066 2.80737 7.99404C2.80737 4.98153 5.24935 2.53955 8.26186 2.53955C11.2744 2.53955 13.7164 4.98153 13.7164 7.99404C13.7164 11.0066 11.2744 13.4485 8.26186 13.4485ZM7.71805 10.1758L11.5744 6.31897L10.8031 5.5477L7.71805 8.63331L6.17498 7.09023L5.40371 7.8615L7.71805 10.1758Z"
              fill="#4545FE"
            />
          </g>
        ) : null}
      </g>
      <defs>
        <clipPath id="clip0_23893_73783">
          <rect width="16" height="15.9998" fill="white" transform="translate(0.263672)" />
        </clipPath>
        {isChecked ? (
          <clipPath id="clip1_23893_73783">
            <rect
              width="13.3332"
              height="13.3332"
              fill="white"
              transform="translate(1.59717 1.3335)"
            />
          </clipPath>
        ) : null}
      </defs>
    </svg>
  );
};
