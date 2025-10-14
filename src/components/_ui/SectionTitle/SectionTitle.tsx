import { ReactNode } from "react"

interface SectionTitleProps {
  children: ReactNode
}

const SectionTitle = ({ children }: SectionTitleProps) => {
  return (
    <h2 className="font-normal text-[24px] md:font-medium md:text-[48px] leading-[140%]">
      {children}
    </h2>
  )
}

export default SectionTitle
