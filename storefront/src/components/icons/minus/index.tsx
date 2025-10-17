interface MinusIconProps {
  color?: string
}

const MinusIcon = ({ color }: MinusIconProps) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.5 12.75H5.5V11.25H19.5V12.75Z"
        fill={color}
      />
    </svg>
  )
}

export default MinusIcon
