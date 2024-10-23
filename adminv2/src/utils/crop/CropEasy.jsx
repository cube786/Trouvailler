
// import {

//   Slider,
//   Typography,
// } from '@mui/material';
import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage';
import { PiCrop } from "react-icons/pi";
import { MdCancel } from "react-icons/md";

const CropEasy = ({ photoURL, setOpenCrop, setPhotoURL, setFile, imgFiles, setCropCompleted, setImgFiles, size, setSize, handleCloseCropEasyModal, id="", setMobileImg = () =>{}, setDesktopImg = () => {}  }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);

  };
  const cancel = () => {
    // document.querySelector('#img-input-create-package').value = null;
    setOpenCrop(false)
    handleCloseCropEasyModal()
    setFile("")
    setPhotoURL("")
  }
  const cropImage = async () => {
    try {
      console.log('cropped')
      const { file, url } = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation
      );
      setPhotoURL(url);
      if(id === "img-input-create-category-mobile" ){
        setMobileImg(file)
      }
      if(id === "img-input-create-category-desktop" ){
        setDesktopImg(file)
      }
      setFile(file);
      console.log(file)
      setImgFiles([...imgFiles,file ])
      console.log(imgFiles)
      setOpenCrop(false);
      handleCloseCropEasyModal()

      setCropCompleted(true)
      
    } catch (error) {
     
      console.log(error);
    }

          };
  return (
    <div id="" className="fixed fadein top-0 left-0 right-0 bottom-0 bg-[#0000005e] z-[10000000000] flex justify-center items-center ">
    <div className=" relative  bg-[white]  overflow-hidden px-0 py-0 rounded-[15px]">
    <div className='bg-[white]'>
      <div
      className='shadow-xl flex flex-col bg-[white] '
        style={{
          background: '#333',
          position: 'relative',
          height: 400,
          width: 500,
          minWidth: { sm: 500 },
        }}
      >
        <Cropper
          image={photoURL}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={size}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
        />
      </div>
      <div className='px-8 py-4'>
        <div >
          <div>
             <h1 className='mb-2'>Zoom: {zoomPercent(zoom)}</h1>
         
            <input type="range" min={1} max={3} value={zoom} className="range range-info" step="0.1" onChange={(e, zoom) => setZoom(e.target.value)}/>
          </div>
          <div>
            <h1 className='mb-2 mt-4'>Rotation: {rotation + '°'}</h1>
            <input type="range" min={0} max={360} value={rotation} className="range range-info"  onChange={(e) => setRotation(e.target.value)}/>

          </div>
        </div>
        <div
          className='flex items-center gap-4 mt-4'
        >
          <button className='border border-[#00d3ff] text-[#00d3ff]  rounded px-4 py-1 flex  items-center gap-2'
                       onClick={() => cancel()}
          >
          <MdCancel style={{color:'#00d3ff', fontSize:20}}/>  Cancel
          </button>
          <button className='bg-[#00d3ff] text-white rounded px-4 py-1 flex  items-center gap-2'
            onClick={cropImage}
          >
          <PiCrop style={{color:'white', fontSize:20}} />  Crop
          </button>
        </div>
      </div>
    </div></div></div>
  );
};

export default CropEasy;

const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`;
};