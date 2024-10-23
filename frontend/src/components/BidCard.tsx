import Image from "next/image";

function BidCard() {
  return (
    <div className="relative mx-4  lg:mx-40 rounded-[10px] overflow-hidden ">
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <Image
          src="/images/bidbg.jpg"
          alt="Place Your Bid now!"
          fill
          loading="lazy"
          className=" object-cover "
        ></Image>
        <div className="image-cover "></div>
      </div>
      <div className="relative z-10 px-4 sm:px-4 py-2 md:py-4  flex  flex-col lg:flex-row gap-1 justify-between items-start">
        <div>
          <h2 className=" text-xs xs:text-base  lg:text-xl text-[#ffdfa6]  font-bold">
            Get your Stay at your Price
          </h2>
          <p className="text-[white]  roboto-regular w-full lg:w-[80%]  pt-1 text-[10px] xs:text-[12px]  ">
            Place your bid, and we will secure the best stay and hotel
            accommodations at your winning price 
          </p>
        </div>
        <button className="btn border border-[2px] mt-2 lg:mt-0  bg-[white] text-[black] lg:font-bold px-2   mb-1   lg:py-2 text-[10px] xs:text-[12px] min-h-0 h-6 lg:h-8  rounded-full">
          Place Your Bid Now
        </button>
      </div>
    </div>
  );
}

export default BidCard;
