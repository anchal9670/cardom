import React, { useEffect, useState } from "react";
import CarfilterItems from "../components/CarfilterItems";
import CarReviews from "../components/CarReviews";
import Faq from "../components/Faq";
import CarScroll from "../components/CarScroll";
import SellCarInfoForm from "../dashboard/components/SellCarInfoForm";
import { FaHandsHelping } from "react-icons/fa";
import { useSelector } from "react-redux";
import SignIn from "../modals/SignIn";

const SellCarPage = (props) => {
  const [isLoginModelOpen, setIsLoginModelOpen] = useState(false);
  const data1 = {
    title: "Check price",
    description:
      "Select your device & tell us about its current condition, and our advanced AI tech will tailor make the perfect price for you.",
  };

  const data2 = {
    title: "Schedule pickup",
    description:
      "Book your car’s inspection at your Home or at nearby CarDekho store & get best offer",
  };

  const data3 = {
    title: "Get paid",
    description:
      "Did we mention you get paid as soon as our executive picks up your device? It's instant payment all the way!",
  };

  let user = useSelector((state) => state.auth.users);

  useEffect(() => {
    if (Object.keys(user).length <= 0) {
      setIsLoginModelOpen(true);
    }
  }, [user]);

  return (
    <>
      <SignIn
        isLoginModelOpen={isLoginModelOpen}
        setIsLoginModelOpen={setIsLoginModelOpen}
      />

      <div
        className="w-full p-10"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1493238792000-8113da705763?ixid=MnwyMDkyMnwwfDF8c2VhcmNofDJ8fGNhcnxlbnwwfHx8fDE2MzE2NzIwOTU&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=1000&h=650&fit=crop")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "60vh",
          filter: "greyscale(30%)",
        }}
      >
        <div className="font-medium text-white">
          <h3 className="py-9 text-7xl">
            Sell Your Car
            <br />
            With Us
          </h3>
          <div className="flex">
            <input
              type="text"
              placeholder="Search your car to sell"
              className="p-2 w-64"
            />
            <button className="bg-primary-500 px-4 text-">SEARCH</button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <SellCarInfoForm />
      </div>
      <div className="font-2xl text-4xl block font-bold  py-5 ">
        <div className="flex justify-center text-primary-500">HOW IT WORKS</div>
      </div>
      <div className="flex lg:flex-nowrap flex-wrap  justify-around p-8">
        <CarfilterItems data={data1} />
        <CarfilterItems data={data2} />
        <CarfilterItems data={data3} />
      </div>
      <div className="bg-gray-800 text-white p-16">
        <div className="flex justify-between items-center lg:flex-row flex-col md:flex-row">
          <div className="text-4xl font-medium ">
            <div className="mb-4">WHY US</div>
            <div className="font-normal">
              Sell your car in one visit, <br />
              Get Instant payment <br />& Free RC Transfer
            </div>
          </div>
          <div className="flex flex-wrap w-full    font-medium   mt-5 justify-center ">
            <div className="border-2 lg:h-60 s:h-auto p-4 m-5 w-52 lg:w-60 flex flex-col justify-evenly">
              <div>
                <div>
                  <FaHandsHelping
                    color="orange"
                    style={{ height: "40", width: "50", margin: "auto" }}
                  />
                </div>
              </div>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Expedita repellat nobis
              </div>
            </div>
            <div className="border-2 lg:h-60 s:h-auto p-4 m-5 w-52  lg:w-60 flex flex-col justify-evenly">
              <div>
                <div>
                  <FaHandsHelping
                    color="orange"
                    style={{ height: "40", width: "50", margin: "auto" }}
                  />
                </div>
              </div>
              <div>
                Instant Money Transfer in your preferred mode at time of pick up
                or store drop off
              </div>
            </div>
            <div className="border-2 lg:h-60 s:h-auto p-4 m-5 w-52  lg:w-60 flex flex-col justify-evenly">
              <div>
                <FaHandsHelping
                  color="orange"
                  style={{ height: "40", width: "50", margin: "auto" }}
                />
              </div>
              <div>
                Instant Money Transfer in your preferred mode at time of pick up
                or store drop off
              </div>
            </div>
            <div className="border-2 lg:h-60 s:h-auto p-4 m-5 w-52  lg:w-60 flex flex-col justify-evenly">
              <div>
                <div>
                  <FaHandsHelping
                    color="orange"
                    style={{ height: "40", width: "50", margin: "auto" }}
                  />
                </div>
              </div>
              <div>
                Instant Money Transfer in your preferred mode at time of pick up
                or store drop off
              </div>
            </div>
            <div className="border-2 lg:h-60 s:h-auto p-4 m-5 w-52   lg:w-60 flex flex-col justify-evenly">
              <div>
                <div>
                  <FaHandsHelping
                    color="orange"
                    style={{ height: "40", width: "50", margin: "auto" }}
                  />
                </div>
              </div>
              <div>Check price, schedule pickup & get paid Lorem ipsum</div>
            </div>
            <div className="border-2 lg:h-60 s:h-auto p-4 m-5 w-52   lg:w-60 flex flex-col justify-evenly">
              <div>
                <div>
                  <FaHandsHelping
                    color="orange"
                    style={{ height: "40", width: "50", margin: "auto" }}
                  />
                </div>
              </div>
              <div>No fees for pickup across 1500 cities across India</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <CarScroll />
      </div>
      <div className="w-full bg-primary-500 p-10 ">
        <div className="flex justify-center mb-4 text-4xl text-white font-bold">
          CUSTOMER REVIEWS
        </div>
        <div className="flex flex-wrap justify-center ">
          <CarReviews />
          <CarReviews />
          <CarReviews />
        </div>
      </div>
      <div>
        <Faq />
      </div>
    </>
  );
};

export default SellCarPage;
