import React from "react";

const Faq = (props) => {
  return (
    <div className="mx-auto w-full p-10 mt-10">
      <div className="text-2xl font-normal mb-2">FAQS</div>
      <div className="divide-y divide-orange-500">
        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between py-4 text-lg font-medium hover:bg-orange-100">
            <div>1.How do I find the right car for my needs and budget</div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="block h-5 w-5 group-open:hidden mx-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="hidden h-5 w-5 group-open:block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15"
                />
              </svg>
            </div>
          </summary>
          <div className="pb-4">
            {" "}
            Our website offers advanced search filters that allow you to specify
            your preferences such as make, model, year, price range, and
            features. You can also compare multiple cars side by side to make an
            informed decision. Additionally, our expert reviews and buying
            guides provide valuable insights to help you choose the perfect car.
          </div>
        </details>
        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between py-4 text-lg font-medium hover:bg-orange-100">
            <div>2.Can I schedule a test drive through your website?</div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="block h-5 w-5 group-open:hidden mx-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="hidden h-5 w-5 group-open:block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15"
                />
              </svg>
            </div>
          </summary>
          <div className="pb-4">
            {" "}
            Absolutely! You can easily schedule a test drive for any car listed
            on our website by filling out a simple form with your contact
            information and preferred date and time. Once submitted, our team
            will promptly confirm your appointment and provide further
            instructions.
          </div>
        </details>
        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between py-4 text-lg font-medium hover:bg-orange-100">
            <div>3.Do you offer financing options for purchasing a car?</div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="block h-5 w-5 group-open:hidden mx-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="hidden h-5 w-5 group-open:block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15"
                />
              </svg>
            </div>
          </summary>
          <div className="pb-4">
            Yes, we partner with reputable financial institutions to provide
            competitive financing options for purchasing a car. You can
            pre-qualify for financing directly through our website by completing
            a secure online application. Our finance experts will then work with
            you to find the best loan terms tailored to your budget and credit
            profile.
          </div>
        </details>
        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between py-4 text-lg font-medium hover:bg-orange-100">
            <div>
              4.What warranty and maintenance services are available for the
              cars listed on your website?
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="block h-5 w-5 group-open:hidden mx-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="hidden h-5 w-5 group-open:block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15"
                />
              </svg>
            </div>
          </summary>
          <div className="pb-4">
            Many of the cars listed on our website come with manufacturer
            warranties, and we also offer extended warranty options for added
            peace of mind. Additionally, our service center partners provide a
            range of maintenance and repair services to keep your car in top
            condition. You can schedule service appointments, view service
            history, and access helpful maintenance tips through our website's
            customer portal.
          </div>
        </details>
      </div>
    </div>
  );
};

export default Faq;
