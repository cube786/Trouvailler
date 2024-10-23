import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Scrollbar } from "react-scrollbars-custom";
import ClipLoader from "react-spinners/ClipLoader";
import axiosInstance from "../../../utils/axiosInstance";
import { BiSolidCloudUpload } from "react-icons/bi";
import CropEasy from "../../../utils/crop/CropEasy";

function TitleImageUploadMobile({ pack, reFetch, setUpdateError, setOpenTitleImageMobile }) {
	const location = useLocation();

	const [file, setFile] = useState("");
	const [photoURL, setPhotoURL] = useState("");
	const [openCrop, setOpenCrop] = useState(false);
	const [imgFiles, setImgFiles] = useState([]);
	const [cropCompleted, setCropCompleted] = useState(false);
	const [updateTitleImageLoading, setUpdateTitleImageLoading] = useState(false);
    
	const handleTitleImageClose = () => {
		setFile("");
		setPhotoURL("");
        setOpenTitleImageMobile(false)	
    };

	const handleTitleImageChange = (e) => {
		const file = e.target.files[0];
		console.log("hello");
		if (file) {
			setFile(file);
			setPhotoURL(URL.createObjectURL(file));
            setOpenCrop(true)
		}
	};

	const handleCloseCropEasyModal = () => {
		document.getElementById("title-img-upload").value = "";
		
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setUpdateTitleImageLoading(true);
		try {
			let url = "";
			if (file != "") {
				const data = new FormData();
				data.append("file", file);
				data.append("upload_preset", "upload");

				const uploadRes = await axiosInstance.post("https://api.cloudinary.com/v1_1/difxlqrlc/image/upload", data);

				url = uploadRes.data.url;
			}

			const data = {
				titleImage: url,
			};
			await axiosInstance.patch(`/package/${pack._id}`, data);
			setUpdateTitleImageLoading(false);
			document.getElementById("my_modal_4").close();
			document.getElementById("my_modal_1").showModal();

			reFetch(`/package/${location.pathname.split("/")[2]}`);
		} catch (error) {
			setUpdateError(JSON.stringify(error.message));

			setUpdateTitleImageLoading(false);
			document.getElementById("my_modal_2").showModal();
		}
	};
	return (
		<>
			{openCrop && <CropEasy
				{...{
					photoURL,
					setOpenCrop,
					handleCloseCropEasyModal,
					setPhotoURL,
					setFile,
					imgFiles,
					setImgFiles,
					size: 16 / 9,
					setCropCompleted,
				}}
			/>}
			<div id="" className="fixed fadein top-0 left-0 right-0 bottom-0 bg-[#0000005e] z-[1000000000] flex justify-center items-center ">
				<div className="  relative w-[90%] md:w-[50%] bg-[white]  overflow-hidden px-0 py-0 rounded-[5px]">
					<div className="flex items-center justify-between pl-4 pr-2 py-2 ">
						<h1 className="roboto-medium ">Title Image</h1>
						<button className="btn btn-sm btn-circle btn-ghost " onClick={() => handleTitleImageClose()}>
							✕
						</button>
					</div>
					<hr />
					<Scrollbar style={{ height: "500px", maxHeight: "400px", width:'99.8%', marginTop:"5px", marginBottom:"5px"  }}>
						<div>
							<div className="pl-4 pr-4 py-2">
								<div className=" px-4">
									<div className="w-[40%] mx-auto">
										<img className="my-8 w-full" src={!cropCompleted ? pack.titleImage : file ? URL.createObjectURL(file) : pack.titleImage} alt="" />{" "}
									</div>
								</div>
							</div>
							<div className="px-4 py-2">
								<form action="">
									<div className="flex justify-start">
										<label className="flex items-center bg-[#3e3762]  text-sm  px-4 py-1 rounded  gap-2 cursor-pointer text-white" htmlFor="title-img-upload">
											<BiSolidCloudUpload style={{ fontSize: 20 }} />
											Choose new Image{" "}
										</label>
										<input type="file" className="hidden" id="title-img-upload" onChange={handleTitleImageChange} />
									</div>

									<div className="flex mt-12">
										<button className="btn-grad w-full flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]" onClick={handleSubmit}>
											Update Title Image {updateTitleImageLoading && <ClipLoader color="white" size={24} />}
										</button>
									</div>
								</form>
							</div>
						</div>
					</Scrollbar>
				</div>
			</div>
		</>
	);
}

export default TitleImageUploadMobile;
