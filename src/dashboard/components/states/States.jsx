import React, { useEffect, useState } from "react";
import { getState } from "../../../store/stateSlice";
import { useDispatch, useSelector } from "react-redux";

const States = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.state.states);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      dispatch(getState());
      setLoaded(true);
    }
  }, [dispatch, loaded]);
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        States
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-2 rounded-sm bg-gray-200 sm:grid-cols-3">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">No.</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              States
            </h5>
          </div>
        </div>

        {state.map((s, index) => (
          <div className={`grid grid-cols-2 sm:grid-cols-3`} key={index}>
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0"></div>
              <p className="hidden text-black dark:text-white sm:block">
                {index + 1}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black">{s.state}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default States;
