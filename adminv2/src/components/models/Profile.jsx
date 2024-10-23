import React from 'react'

function Profile({profile, setProfile}) {

    const handleClose = () => {
        setProfile(false)
    }
  return (
    <div id="" className="fixed fadein top-0 left-0 right-0 bottom-0 bg-[#0000005e] z-[1000000000] flex justify-center items-center ">
            




                <div className=" relative w-[50%] bg-[white]  overflow-hidden px-0 py-0 rounded-[5px]">
                    <div className="flex items-center justify-between pl-4 pr-2 py-2 ">
					    <h1 className="roboto-medium ">Profile</h1>
					<button className="btn btn-sm btn-circle btn-ghost " onClick={() => handleClose()}>
						✕
					</button>
				</div>
				<hr />
				
          
        </div>
        </div>
  )
}

export default Profile