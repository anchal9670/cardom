import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../components/Loading";

const CarImages = ({ setFiles, handleCarSubmitted }) => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const fileURLs = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...fileURLs]);
    setFiles((prv) => [...prv, files]);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-80">
          <label className="block mb-2 text-xl font-medium text-gray-900">
            Upload multiple file
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            multiple
            accept="image/*"
            type="file"
            onChange={handleImageUpload}
          />

          <div className="flex flex-wrap gap-2 mt-5">
            {images.length > 0 ? (
              images.map((image, index) => (
                <div key={index} className="w-14 h-14 border">
                  <img
                    src={image}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            ) : (
              <p>No images uploaded yet</p>
            )}
          </div>
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
              onClick={handleCarSubmitted}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CarImages;
