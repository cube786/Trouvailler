import React, { useState } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import axiosInstance from "../../../utils/axiosInstance";
import { useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function BasicDeatils({ pack, reFetch, setUpdateError, setOpenBasicDetails }) {
	const location = useLocation();

	const [updateLoading, setUpdateLoading] = useState(false);

	const [info, setinfo] = useState({});

	const handleChange = (e) => {
		setinfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
		console.log(info);
	};

	const handleBasicDetailsSubmit = async (e) => {
		e.preventDefault();
		setUpdateLoading(true);
		try {
			const updatedPackage = {
				...info,
			};
			await axiosInstance.patch(`/package/${pack._id}`, updatedPackage);
			setUpdateLoading(false);
			document.getElementById("my_modal_3").close();
			document.getElementById("basicDetails").reset();
			document.getElementById("my_modal_1").showModal();
			reFetch(`/package/${location.pathname.split("/")[2]}`);
		} catch (error) {
			setUpdateError(JSON.stringify(error));
			setUpdateLoading(false);
			document.getElementById("my_modal_2").showModal();
		}
	};

	const handleBasicDetailsClose = () => {
		document.getElementById("basicDetails").reset();
		setOpenBasicDetails(false)
		setinfo({});
	};

	return (
		
		<div id="" className="fixed fadein top-0 left-0 right-0 bottom-0 bg-[#0000005e] z-[1000000000] flex justify-center items-center ">
			<div className=" relative w-[90%] md:w-[50%] bg-[white]  overflow-hidden px-0 py-0 rounded-[5px]">
				<div className="flex items-center justify-between pl-4 pr-2 py-2 ">
					<h1 className="roboto-medium ">Basic Details</h1>
					<button className="btn btn-sm btn-circle btn-ghost " onClick={() => handleBasicDetailsClose()}>
						✕
					</button>
				</div>
				<hr />
				<Scrollbar style={{ height: "700px", maxHeight: "600px", width:'99.8%', marginTop:"5px", marginBottom:"5px"  }}>
					<div>
						<div className="pl-4 pr-4 py-2 mt-6">
							<form action="" id="basicDetails" className="text-[#414141] flex flex-col gap-8">
								<div className="relative  ">
									<label htmlFor="" className="roboto-regular text-sm bg-[white] absolute top-0 left-1 translate-y-[-50%] px-2">
										Package Title
									</label>
									<input onChange={handleChange} defaultValue={pack.title} type="text" name="title" id="title" className="border border-[#d9d9d9] border-[2px] text-sm outline-none rounded-[5px] w-full px-4 py-4" />
								</div>

								<div className="relative ">
									<label htmlFor="" className=" text-sm bg-[white] absolute top-0 left-2 translate-y-[-50%] px-2">
										Short Description
									</label>
									<textarea onChange={handleChange} defaultValue={pack.shortDescription} name="shortDescription" id="shortDescription" className="overflow-auto scroll-textarea border border-[#d9d9d9] border-[2px] outline-none text-sm rounded-[5px] w-full px-4 py-4" />
								</div>

								<div className="relative  ">
									<label htmlFor="" className="roboto-regular text-sm bg-[white] absolute top-0 left-1 translate-y-[-50%] px-2">
										Description Title
									</label>
									<input onChange={handleChange} defaultValue={pack.descriptionTitle} type="text" name="descriptionTitle" id="descriptionTitle" className="border border-[#d9d9d9] border-[2px] text-sm outline-none rounded-[5px] w-full px-4 py-4" />
								</div>

								<div className="relative ">
									<label htmlFor="" className=" text-sm bg-[white] absolute top-0 left-2 translate-y-[-50%] px-2">
										Description
									</label>
									<textarea onChange={handleChange} defaultValue={pack.description} name="description" id="description" className="overflow-auto scroll-textarea border border-[#d9d9d9] border-[2px] outline-none text-sm rounded-[5px] w-full px-4 py-4" />
								</div>

								<div className="relative  ">
									<label htmlFor="" className="roboto-regular text-sm bg-[white] absolute top-0 left-1 translate-y-[-50%] px-2">
										Duration (Short Form, Eg:, 3D/4N)
									</label>
									<input onChange={handleChange} defaultValue={pack.shortDuration} type="text" name="shortDuration" id="shortDuration" className="border border-[#d9d9d9] border-[2px] text-sm outline-none rounded-[5px] w-full px-4 py-4" />
								</div>

								<div className="relative  ">
									<label htmlFor="" className="roboto-regular text-sm bg-[white] absolute top-0 left-1 translate-y-[-50%] px-2">
										Duration ( In words, Eg:, 3 Days and 4 Nights )
									</label>
									<input onChange={handleChange} defaultValue={pack.duration} type="text" name="duration" id="duration" className="border border-[#d9d9d9] border-[2px] text-sm outline-none rounded-[5px] w-full px-4 py-4" />
								</div>

								<div className="relative  ">
									<label htmlFor="" className="roboto-regular text-sm bg-[white] absolute top-0 left-1 translate-y-[-50%] px-2">
										Price ( Avoid spaces, symbols etc. )
									</label>
									<input onChange={handleChange} defaultValue={pack.price} type="number" name="price" id="price" className="border border-[#d9d9d9] border-[2px] text-sm outline-none rounded-[5px] w-full px-4 py-4" />
								</div>

								

								

								<div className="flex ">
									<button className=" btn-grad w-full flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]" onClick={handleBasicDetailsSubmit}>
										Update Package {updateLoading && <ClipLoader color="white" size={24} />}
									</button>
								</div>
							</form>
						</div>
					</div>
				</Scrollbar>
			</div>
		</div>
	);
}

export default BasicDeatils;
