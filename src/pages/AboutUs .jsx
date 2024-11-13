import React from "react";

const AboutUs = () => {
  return (
    <>
      <section className="bg-secondary-500 poster relative text-gray-300">
        <div className="container mx-auto pb-48 pt-48 px-4">
          <h2 className="text-6xl text-primary-500 font-extrabold text-center mb-12">
            About Us
          </h2>
        </div>
      </section>
      <div className="font-[sans-serif] max-w-6xl mx-auto">
        <div className="bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] my-6 p-8">
          <div className="grid lg:grid-cols-2 items-start gap-16">
            <div>
              <h3 className="text-4xl text-gray-800 font-bold mb-6">Our Story</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Welcome to Our Company! We are dedicated to providing the best services and products to our customers. Our team of professionals is committed to ensuring your satisfaction with our offerings. We believe in quality, integrity, and innovation, and we strive to exceed your expectations in everything we do.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Our journey began in [Year], and since then, we have grown to become a trusted name in the industry. Our mission is to deliver excellence through our expertise and passion. We continuously seek to improve and adapt to the changing needs of our clients and the market.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Thank you for choosing us. We look forward to serving you and building a long-lasting relationship.
              </p>
            </div>
            <div>
              <h3 className="text-4xl text-gray-800 font-bold mb-6">Our Values</h3>
              <ul className="space-y-4">
                <li className="text-gray-700 text-lg leading-relaxed">
                  <span className="font-semibold text-primary-500">Quality:</span> We prioritize quality in all our products and services to ensure customer satisfaction.
                </li>
                <li className="text-gray-700 text-lg leading-relaxed">
                  <span className="font-semibold text-primary-500">Integrity:</span> We uphold the highest standards of integrity in all our actions.
                </li>
                <li className="text-gray-700 text-lg leading-relaxed">
                  <span className="font-semibold text-primary-500">Innovation:</span> We foster innovation to meet the evolving needs of our customers.
                </li>
                <li className="text-gray-700 text-lg leading-relaxed">
                  <span className="font-semibold text-primary-500">Customer Focus:</span> We are committed to meeting and exceeding customer expectations.
                </li>
                <li className="text-gray-700 text-lg leading-relaxed">
                  <span className="font-semibold text-primary-500">Teamwork:</span> We work together to achieve our goals and support each other.
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <button className="text-white bg-primary-500 hover:bg-primary-600 font-semibold rounded text-sm px-6 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                fill="currentColor"
                className="mr-2 inline"
                viewBox="0 0 24 24"
              >
                <path d="M5 12l5 5 9-9" />
              </svg>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
