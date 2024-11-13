import React, { useEffect, useState } from "react";
import { SlCalender } from "react-icons/sl";
import { TbEngine } from "react-icons/tb";
import { FaCar, FaGear } from "react-icons/fa6";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { AiFillInsurance } from "react-icons/ai";
import { FaRoad } from "react-icons/fa";
import { ImSortNumbericDesc } from "react-icons/im";
import { FaKey } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaCarRear } from "react-icons/fa6";
import { GrStatusGood } from "react-icons/gr";
import { FaTachometerAlt } from "react-icons/fa";
import { IoMdWarning } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { fetchSingleCars } from "../store/cars/carSlice";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useDispatch, useSelector } from "react-redux";
import TestDriveForm from "../modals/TestDriveForm";
import SignIn from "../modals/SignIn";

const CarDetails = () => {
  const dispatch = useDispatch();
  const { carId } = useParams();
  const { singleCar } = useSelector((state) => state.cars.cars);
  const [isLoginModelOpen, setIsLoginModelOpen] = useState(false);
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);

  useEffect(() => {
    if (carId) {
      dispatch(fetchSingleCars(carId));
    }
  }, [carId, dispatch]);

  // console.log(singleCar);

  if (!carId || !singleCar) {
    return <div>Loading...</div>;
  }

  const handlerFreeDrive = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoginModelOpen(true);
      return;
    }
    setIsTestDriveOpen(true);
  };

  return (
    <>
      <SignIn
        isLoginModelOpen={isLoginModelOpen}
        setIsLoginModelOpen={setIsLoginModelOpen}
      />
      {isTestDriveOpen && (
        <TestDriveForm
          isTestDriveOpen={isTestDriveOpen}
          setIsTestDriveOpen={setIsTestDriveOpen}
          carId={carId}
        />
      )}
      <div className="flex relative">
        <div className="md:w-3/5 w-full p-6">
          <div style={{ backgroundColor: "rgba(205, 209, 228,0.2)" }}>
            <Carousel>
              {singleCar?.images?.map((image, index) => (
                <div className="w-full h-96" key={index}>
                  <img
                    src={image?.url}
                    alt={`Car ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </Carousel>
          </div>

          <div className="md:w-2/5 w-full h-fit block md:hidden shadow p-1 border-2top-0 right-0">
            <div className="border-solid border-0 rounded-lg p-3">
              <h2 className="text-4xl font-bold mb-5 sm:text-2xl uppercase">
                {singleCar?.brand?.name} {singleCar?.model?.name}{" "}
                {singleCar?.variant?.name}
              </h2>
              <div className="flex flex-wrap gap-4 mb-5">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded">
                  {singleCar?.specifications?.kmDriven ?? "N/A"} KM
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded">
                  {singleCar?.fuelType ?? "N/A"}
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded">
                  {singleCar?.transmission ?? "N/A"}
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded">
                  {singleCar?.status ?? "N/A"}
                </button>
              </div>
              <div className="mb-5">
                <div className="flex items-center mb-5">
                  <FaHome color="orange" className="mr-2" />
                  <span>Home test drive available</span>
                </div>
                <div className="flex items-center mb-5">
                  <FaLocationDot color="blue" className="mr-2" />
                  <span>Parked at {singleCar?.location?.city ?? "N/A"}</span>
                </div>
                <div className="flex items-center mb-5">
                  <FaGear className="mr-2" />
                  <span>View inspection report</span>
                </div>
                <div className="flex items-center">
                  <FaWhatsapp color="green" className="mr-2" />
                  <span>Get Services History report</span>
                </div>
              </div>
              <hr className="mb-5" />
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold text-blue-800 mb-3">
                  Rs.{singleCar?.price ?? "N/A"}
                </div>
                <div className="mb-2 flex justify-end items-center gap-2">
                  <FaHeart color="red" />
                  <button
                    className="bg-blue-700 px-4 py-2 rounded text-white font-bold uppercase"
                    onClick={handlerFreeDrive}
                  >
                    book free test drive
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-3xl font-bold mt-6">KNOW YOUR CAR</div>
          <div className="flex flex-wrap mt-4">
            <CarInfoCard
              icon={<FaGear color="grey" />}
              title="Regularly Serviced"
              description="Serviced regularly at an authorised service center"
            />
            <CarInfoCard
              icon={<FaTachometerAlt color="green" />}
              title="Original Paint"
              description="Assurance of zero repainted parts"
            />
            <CarInfoCard
              icon={<FaCar color="red" />}
              title="100% Tyre Life Remaining"
              description="2 tyres that have 100% of their remaining life"
            />
          </div>

          <div className="border-solid border-2 rounded p-4 mt-4">
            <div className="flex flex-wrap">
              <CarDetail
                icon={<SlCalender color="blue" className="mr-2" />}
                label="Reg Date"
                value={new Date(singleCar?.createdAt).toLocaleDateString()}
              />
              <CarDetail
                icon={<TbEngine color="red" className="mr-2" />}
                label="Engine Capacity"
                value={singleCar?.specifications?.engineCapacity ?? "N/A"}
              />
              <CarDetail
                icon={<FaGear className="mr-2" />}
                label="Transmission"
                value={singleCar?.transmission ?? "N/A"}
              />
              <CarDetail
                icon={
                  <BsFillFuelPumpDieselFill color="green" className="mr-2" />
                }
                label="Fuel type"
                value={singleCar?.fuelType ?? "N/A"}
              />
            </div>
            <div className="flex flex-wrap">
              <CarDetail
                icon={<SlCalender color="blue" className="mr-2" />}
                label="Make Year"
                value={singleCar?.manufacturerYear ?? "N/A"}
              />
              <CarDetail
                icon={<AiFillInsurance color="grey" className="mr-2" />}
                label="Insurance"
                value={`Valid till: ${new Date(
                  singleCar?.specifications?.insurance?.validTill
                ).toLocaleDateString()}`}
              />
              <CarDetail
                icon={<FaRoad className="mr-2" />}
                label="km Driven"
                value={singleCar?.specifications?.kmDriven ?? "N/A"}
              />
            </div>
            <div className="flex flex-wrap">
              <CarDetail
                icon={<ImSortNumbericDesc className="mr-2" />}
                label="Reg Number"
                value={singleCar?.specifications?.regNumber ?? "N/A"}
              />
              <CarDetail
                icon={<FaKey color="orange" className="mr-2" />}
                label="Spare key"
                value={singleCar?.specifications?.spareKey ? "Yes" : "No"}
              />
              <CarDetail
                icon={<FaGear color="grey" className="mr-2" />}
                label="Ownership"
                value={singleCar?.specifications?.ownership ?? "N/A"}
              />
            </div>
          </div>

          <div className="text-3xl font-bold mt-4">Car Features</div>
          <div className="border-solid border-2 rounded p-4 mt-4">
            <div className="flex flex-wrap mt-4">
              {singleCar?.variant?.features?.length > 0 ? (
                singleCar?.variant?.features.map((feature, index) => (
                  <div className="w-full sm:w-1/2 p-3" key={index}>
                    <div className="border-solid border-2 rounded p-4 flex flex-col items-center justify-center m-2">
                      <h2 className="font-bold text-xl text-blue-800 mb-2">
                        {feature}
                      </h2>
                      {/* Add additional details if needed */}
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full p-3">
                  <div className="bg-white rounded-lg shadow-md p-4 text-center">
                    <span className="text-gray-600">No features available</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="text-4xl font-bold m-5">Inspection Report</div>
          <div className="border border-solid p-3">
            <InspectionReport singleCar={singleCar} />
          </div>
        </div>

        <div className="md:w-2/5 h-fit hidden md:block shadow p-3 m-5 border-2top-0 right-0">
          <div className="border-solid border-0 rounded-lg p-3">
            <h2 className="text-4xl font-bold mb-5 sm:text-2xl uppercase">
              {singleCar?.brand?.name} {singleCar?.model?.name}{" "}
              {singleCar?.variant?.name}
            </h2>
            <div className="flex flex-wrap gap-4 mb-5">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded">
                {singleCar?.specifications?.kmDriven ?? "N/A"} KM
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded">
                {singleCar?.fuelType ?? "N/A"}
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded">
                {singleCar?.transmission ?? "N/A"}
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded">
                {singleCar?.status ?? "N/A"}
              </button>
            </div>
            <div className="mb-5">
              <div className="flex items-center mb-5">
                <FaHome color="orange" className="mr-2" />
                <span>Home test drive available</span>
              </div>
              <div className="flex items-center mb-5">
                <FaLocationDot color="blue" className="mr-2" />
                <span>Parked at {singleCar?.location?.city ?? "N/A"}</span>
              </div>
              <div className="flex items-center mb-5">
                <FaGear className="mr-2" />
                <span>View inspection report</span>
              </div>
              <div className="flex items-center">
                <FaWhatsapp color="green" className="mr-2" />
                <span>Get Services History report</span>
              </div>
            </div>
            <hr className="mb-5" />
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-blue-800 mb-3">
                Rs.{singleCar?.price ?? "N/A"}
              </div>
              <div className="mb-2 flex justify-end items-center gap-2">
                <FaHeart color="red" />
                <button
                  className="bg-blue-700 px-4 py-2 rounded text-white font-bold uppercase"
                  onClick={handlerFreeDrive}
                >
                  book free test drive
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Separate Component for Car Info Cards
const CarInfoCard = ({ icon, title, description }) => (
  <div className="border-solid border-2 rounded p-4 flex flex-col items-center justify-center m-2">
    {icon}
    <h3 className="font-bold text-2xl">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
);

// Separate Component for Car Detail
const CarDetail = ({ icon, label, value }) => (
  <div className="border-solid border-2 rounded p-4 flex flex-col items-center justify-center m-2">
    <div className="flex items-center">
      {icon}
      <span className="font-bold">{label}</span>
    </div>
    <div>{value}</div>
  </div>
);

// Separate Component for Inspection Report
const InspectionReport = ({ singleCar }) => (
  <div>
    {singleCar?.inspectionReport?.map((report, index) => (
      <div key={index} className="flex flex-wrap">
        <div className="flex justify-around p-3 gap-3 w-full">
          <div className="flex justify-around items-center gap-2">
            <FaCarRear />
            <span>{report?.tyreCondition ?? "N/A"}</span>
          </div>
          <div className="flex justify-around items-center gap-2">
            <GrStatusGood />
            <span>{report?.engineCondition ?? "N/A"}</span>
          </div>
          <div className="flex justify-around items-center gap-2">
            <IoMdWarning />
            <span>{report?.warnings ?? "N/A"}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default CarDetails;
