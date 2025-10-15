interface QuantityButtonProps {
  children: React.ReactNode
  setQuantity: React.Dispatch<React.SetStateAction<unknown>>
  className?: string
}

const QuantityButton = ({
  setQuantity,
  children,
  className,
}: QuantityButtonProps) => {
  return (
    <button onClick={setQuantity} className={`${className} py-3 `}>
      {children}
    </button>
  )
}

export default QuantityButton
