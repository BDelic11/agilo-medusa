import Button from "components/_ui/Button"
import React from "react"

const newsletterFormText = {
  title: "Join our Newsletter",
  description: "We will also send you out discount coupons!",
  cta: "Subscribe",
}

const NewsletterForm = () => {
  return (
    <div className="w-full md:max-w-min flex flex-col">
      <h4 className=" font-normal md:font-medium text-2xl md:text-3xl leading-[140%] whitespace-nowrap">
        {newsletterFormText.title}
      </h4>
      <p className="font-normal text-xs md:text-base leading-[140%]">
        {newsletterFormText.description}
      </p>
      <form className="flex flex-row gap-2 w-full md:w-[384px] mt-4">
        <input
          type="email"
          placeholder="Your email"
          className="text-xs text-normal rounded-[4px] py-[10px] px-[16px] bg-B&W-White text-Grays-Gray-500 focus:outline-black w-full  "
        />
        <Button>{newsletterFormText.cta}</Button>
      </form>
      <p className="text-Grays-Gray-500 text-xs font-normal leading-[140%] w-full md:w-auto mt-4">
        By subscribing you agree to our {""}
        <span className=" solid underline">Privacy Policy</span> and provide
        consent to receive updates from our company.
      </p>
    </div>
  )
}

export default NewsletterForm
