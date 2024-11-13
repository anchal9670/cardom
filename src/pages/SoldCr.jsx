import React, { useRef } from "react";
import CarItem from "../components/CarItem";

const SoldCar = (props) => {
    const componentOrder = ["Sold Cars", "Liked Cars", "My Searches"];
    const soldCarsRef = useRef(null);
    const likedCarRef = useRef(null);
    const mySearchesRef = useRef(null);

    // Function to scroll to a specific section
    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="bg-orange-500 p-5 mb-5 text-white">
                <div className="flex flex-col sm:flex-row items-center">
                    <div className="w-full sm:w-2/3 flex justify-center sm:justify-start sm:px-8 mb-4 sm:mb-0">
                        <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-500 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-16 w-16 text-white stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/3 sm:border-l-4 border-l-0 sm:py-4 sm:px-3 flex justify-around items-center text-center">
                        <div className="text-lg">USERNAME</div>
                        <div className="hidden sm:block text-sm">username@gmail.com</div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mb-8">
                {componentOrder.map((item, index) => (
                    <button
                        key={index}
                        className="mx-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
                        onClick={() => {
                            if (item === 'Sold Cars') scrollToSection(soldCarsRef);
                            else if (item === 'Liked Cars') scrollToSection(likedCarRef);
                            else if (item === 'My Searches') scrollToSection(mySearchesRef);
                        }}
                    >
                        {item}
                    </button>
                ))}
            </div>

        
        </div>
    );
};

export default SoldCar;
