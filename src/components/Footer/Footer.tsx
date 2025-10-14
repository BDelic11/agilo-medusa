import FooterLinks from "./FooterLinks"
import NewsletterForm from "./NewsletterForm"

const Footer = () => {
  return (
    <footer className="bg-Grays-Gray-50 flex flex-col md:flex-row md:justify-between w-full px-8 py-8 md:px-24 md:py-20">
      {/* left */}
      <div className="order-2 md:order-1 flex flex-col gap-2 md:gap-6 justify-start items-start mt-[64px] md:mt-0">
        <h1 className="max-w-min font-medium text-[32px] md:text-[40px] leading-[1em] text-B&W-Black">
          Sofa Society Co.
        </h1>
        <p>© 2024, Sofa Society</p>
      </div>

      {/* middle */}
      <div className="order-3 md:order-2 mt-[32px] md:mt-0">
        <FooterLinks />
      </div>

      {/* right */}
      <div className="order-1 md:order-3">
        <NewsletterForm />
      </div>
    </footer>
  )
}

export default Footer
