import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { createVariant } from "../../../store/cars/variantSlice";

const VariantNew = ({ isVariantNewModelOpen, setIsVariantNewModelOpen }) => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.cars.brand.brand);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [models, setModels] = useState([]);
  const [fuelType, setFuelType] = useState([]);
  const [transmission, setTransmission] = useState([]);
  const [newFeature, setNewFeature] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    carModel: "",
    fuelType: "",
    transmission: "",
    carBrand: "",
    features: [],
    description: "",
  });

  useEffect(() => {
    if (selectedBrand) {
      const b = brands.find((b) => b._id === selectedBrand);
      setModels(b ? b.models : []);
      setFuelType([]);
      setTransmission([]);
      setFormData((prevState) => ({
        ...prevState,
        carModel: "",
        fuelType: "",
        transmission: "",
      }));
    }
  }, [selectedBrand, brands]);

  useEffect(() => {
    if (selectedModel && models.length > 0) {
      const model = models.find((m) => m._id === selectedModel);
      setFuelType(model ? model.fuelType : []);
      setTransmission(model ? model.transmission : []);
      setFormData((prevState) => ({
        ...prevState,
        fuelType: "",
        transmission: "",
      }));
    }
  }, [selectedModel, models]);

  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prevState) => ({
        ...prevState,
        features: [...prevState.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (feature) => {
    setFormData((prevState) => ({
      ...prevState,
      features: prevState.features.filter((f) => f !== feature),
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(createVariant(formData, setIsVariantNewModelOpen));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow sm:px-7.5 xl:pb-1">
      <div className="flex justify-between mb-6">
        <div className="text-xl font-bold uppercase">Add New Variant</div>
        <IoIosCloseCircleOutline
          className="text-2xl cursor-pointer"
          onClick={() => setIsVariantNewModelOpen(!isVariantNewModelOpen)}
        />
      </div>

      <form className="max-w-md mx-auto" onSubmit={submitHandler}>
        <div className="relative z-0 w-full mb-5 group">
          <select
            name="carBrand"
            value={selectedBrand}
            onChange={(e) => {
              setSelectedBrand(e.target.value);
              handleChange(e);
            }}
            className="block py-2.5 px-4 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            required
          >
            <option value="">Choose a brand</option>
            {brands?.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <select
            name="carModel"
            value={selectedModel}
            onChange={(e) => {
              setSelectedModel(e.target.value);
              handleChange(e);
            }}
            className="block py-2.5 px-4 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            required
          >
            <option value="">Choose a model</option>
            {models?.map((m) => (
              <option key={m._id} value={m._id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            className="block py-2.5 px-4 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            required
          >
            <option value="">Choose a fualType</option>
            {fuelType?.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <select
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            className="block py-2.5 px-4 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            required
          >
            <option value="">Choose a transmission</option>
            {transmission?.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Variant Name"
            required
          />
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Description"
          />
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <label className="text-sm text-gray-500 mb-2">Features</label>
          <div className="flex mb-2">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Add a feature"
            />
            <button
              type="button"
              onClick={addFeature}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap">
            {formData.features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-200 text-gray-700 text-sm font-medium mr-2 mb-2 px-4 py-1 rounded-full flex items-center"
              >
                {feature}
                <IoIosCloseCircleOutline
                  className="text-gray-500 text-lg ml-2 cursor-pointer"
                  onClick={() => removeFeature(feature)}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default VariantNew;
