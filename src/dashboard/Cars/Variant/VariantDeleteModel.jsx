
function DeleteModel({ modelOpen, setModelOpen, handleDeleteFunc }) {
  const handleDelete = (e) => {
    e.preventDefault();
    handleDeleteFunc();
    setModelOpen(false);
  };

  return (
    <div className="flex mt-6 justify-center">
      {modelOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen px-4 text-center md:items-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-gray-700 bg-opacity-60"
              aria-hidden="true"
              onClick={() => setModelOpen(false)}
            ></div>

            <div className="inline-block w-full max-w-md p-6 my-10 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl xl:max-w-xl">
              <div className="flex items-center justify-between space-x-4">
                <h1 className="text-xl font-bold text-gray-800">
                  Are you sure delete?
                </h1>
              </div>

              <p className="mt-2 text-md text-gray-800">
                If you continue, you will permanently delete this record. Are
                you sure you want to continue?
              </p>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setModelOpen(false)}
                  type="button"
                  className="mr-2 px-2 py-2 text-sm tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-500 hover:bg-gray-600 rounded-md shadow-md"
                >
                  Back
                </button>
                <button
                  onClick={handleDelete}
                  type="button"
                  className="mr-2 px-2 py-2 text-sm tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-500 hover:bg-red-600 rounded-md shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteModel;
