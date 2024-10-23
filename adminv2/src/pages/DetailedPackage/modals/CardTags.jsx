import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import axiosInstance from "../../../utils/axiosInstance";

export const CardText = ({
    setCardTextOpen,
  cardTextOpen,
  pack,
  reFetch,
}) => {
	const location = useLocation();


  const [info, setinfo] = useState({cardTag1:"",cardTag2:""});
  useEffect(()=>{
    setinfo(pack.cardTags)
    console.log(info)
  }, [pack, cardTextOpen])
  const [cardTagLoading, setCardTagLoading] = useState(false);
    
  const handleChange = (e) => {
    setinfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(info);
  };


  const handleClose = () => {
    document.getElementById("cardTags").reset();
    setCardTextOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCardTagLoading(true);
    try {
        const {_id, ...rest} = info
      const cardTags = {
        ...rest
      };
      console.log(cardTags)
      const res = await axiosInstance.patch(
        `/package/${pack._id}`,{cardTags: cardTags}
        
      );
      setCardTagLoading(false);
      setCardTextOpen(false);
      document.getElementById("cardTags").reset();

      reFetch(`/package/${location.pathname.split("/")[2]}`);
    } catch (error) {
      alert(
        "Something happened. Please try again or contact service provider."
      );
      setCardTagLoading(false);
    }
  };
  return (
    <div className="fixed fadein top-0 left-0 right-0 bottom-0 bg-[#0000005e] z-[1000000000] flex justify-center items-center">
     
     <div className="relative w-[90%] md:w-[40%] bg-[white] max-h-[500px]  overflow-hidden px-0 py-0 rounded-[5px]">
     <div className="flex items-center justify-between pl-4 pr-2 py-2 ">
					<h1 className="roboto-medium ">Card Tags</h1>
					<button className="btn btn-sm btn-circle btn-ghost " onClick={() => handleClose()}>
						✕
					</button>
				</div>
        <hr />
          <div className="py-8 px-4">
            <form
              action=""
              id="cardTags"
              className="text-[#414141] flex flex-col gap-8"
            >
              <div className="relative  ">
									<label htmlFor="" className="roboto-regular text-sm bg-[white] absolute top-0 left-1 translate-y-[-50%] px-2">
                  Card Tag 1
									</label>
									<input onChange={handleChange}  defaultValue={info && info.cardTag1} type="text" name="cardTag1" id="cardTag1" className="border border-[#d9d9d9] border-[2px] text-sm outline-none rounded-[5px] w-full px-4 py-4" />
								</div>

                <div className="relative  ">
									<label htmlFor="" className="roboto-regular text-sm bg-[white] absolute top-0 left-1 translate-y-[-50%] px-2">
                  Card Tag 2
									</label>
									<input onChange={handleChange}  defaultValue={info && info.cardTag2} type="text" name="cardTag1" id="cardTag2" className="border border-[#d9d9d9] border-[2px] text-sm outline-none rounded-[5px] w-full px-4 py-4" />
								</div>
             
             
              


             
             
             
             
             
              <div className="flex ">
                <button
                  className="btn-grad w-full flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]"
                  onClick={handleSubmit}
                >
                  Update Card Tags{" "}
                  {cardTagLoading && <ClipLoader color="white" size={24} />}
                </button>
              </div>
            </form>
          </div>
        </div>
    </div>
  );
};
