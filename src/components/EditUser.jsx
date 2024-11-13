import React from "react"

const EditUser = (props) => {
  return (
        <>
            <form action="">
                <div className="grid">
                    <label for="" className="">Name</label>
                    <input name="name" id="name" type="text" placeholder="Your name" class="w-3/4 border-b-2 border-gray-400  py-1 placeholder-gray-400 outline-none mb-3 focus:border-orange-400">
                    </input>
                </div>
                <div className="grid">
                <label for="" className="">Email</label>
                    <input name="name" id="name" type="email" placeholder="Your email" class="w-3/4 border-b-2 mt-1 border-gray-400 flex-1 py-1 placeholder-gray-400 outline-none mb-3 focus:border-orange-400">
                    </input>
                </div>
                <div className="grid">
                <label for="" className="">Password</label>
                    <input name="password" id="name" type="text" placeholder="Your password" class="w-3/4 border-b-2 mt-1 border-gray-400 flex-1 py-1 placeholder-gray-400 outline-none mb-3 focus:border-orange-400">
                    </input>
                </div>
                <div className="grid">
                    <label for="" className="">Profile</label>
                    <input name="name" id="name" type="file" placeholder="Your name" class="w-3/4 border-b-2 mt-1 border-gray-400 flex-1 py-2 placeholder-gray-400 outline-none mb-2 focus:border-orange-400 ">
                    </input>
                </div>
                <div className="">
                    <button className="px-3 mt-2 bg-primary-500 py-1  rounded-md text-white">Submit</button>
                </div>
            </form>
        </>
       
  )
};

export default EditUser;
