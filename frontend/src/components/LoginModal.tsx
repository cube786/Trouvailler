"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState, useTransition } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

import { myContext, MyContext } from "@/context/Context";
import { FcGoogle } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup, updateEmail, updateProfile, verifyBeforeUpdateEmail } from "firebase/auth";
import { auth, provider } from "../../firebase";
import ClipLoader from "react-spinners/ClipLoader";
import { FaArrowLeft } from "react-icons/fa";
import axiosInstance from "@/utils/axiosInstance";
import { AuthContext } from "@/context/AuthContext";

function LoginModal() {
	const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);
	const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>();
	const [isPending, startTransaction] = useTransition();
	const [otp, setOtp] = useState("");
	const otpChange = (e: any) => {
		setOtp(e.target.value);
	};
	const [goBackTracker, setGoBack] = useState(false);
	const [error, setError] = useState<any>(null);
	const [resendCountdown, setResendCountdown] = useState(0);
	const [phone, setPhone] = useState("");
	const router = useRouter();
	const { loginOpen, setLoginOpen } = useContext(MyContext) as myContext;
	const {user} = useContext(AuthContext)

	const signInWithGoogle = async () => {
		try {
		  const result = await signInWithPopup(auth, provider);
		  console.log("User:", result.user);
		  try {
			await axiosInstance.post("/user/create?phone=true", {
				phone,
				username: "",
				email: "",
				authMethod: "phone",
				image: "",
			});
		} catch (error) {
			result.user.delete();
			throw error;
		}
		handleClose();

		  router.push("/"); // Redirect user to dashboard or another page
		} catch (error) {
		  console.error("Error signing in with Google:", error);
		}}
	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (resendCountdown > 0) {
			timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
		}
		return () => clearTimeout(timer);
	}, [resendCountdown]);

	useEffect(() => {
		const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
			size: "invisible",
		});
		setRecaptchaVerifier(recaptchaVerifier);
		return () => {
			recaptchaVerifier.clear();
		};
	}, [auth]);

	const getOtp = async (e: any) => {
		e.preventDefault();
		startTransaction(async () => {
			setError(null);
			if (!recaptchaVerifier) {
				return setError("Recaptcha didnt load correctly. Please try again!");
			}
			try {
				const confirmationResult = await signInWithPhoneNumber(auth, "+" + phone, recaptchaVerifier);
				setConfirmationResult(confirmationResult);
				setResendCountdown(60);
			} catch (error) {
				console.log(error);
				setResendCountdown(0);
			}
		});
	};
	const verify = (e: any) => {
		e.preventDefault();
		startTransaction(async () => {
			setError(null);
			if (!confirmationResult) {
				setError("Please request an OTP first!");
				return;
			}
			try {
				const result = await confirmationResult?.confirm(otp);
				try {
					await axiosInstance.post("/user/create?phone=true", {
						phone,
						username: "",
						email: "",
						authMethod: "phone",
						image: "",
					});
				} catch (error) {
					result.user.delete();
					throw error;
				}
				handleClose();
				setOtp("");
			} catch (error) {
				console.log(error);
			}
		});
	};
	const goBack = (e: any) => {
		e.preventDefault();
		setError(null);
		setConfirmationResult(null);
		setResendCountdown(0);
		setGoBack(true);
	};

	const handleClose = () => {
		setPhone("+91");
		setConfirmationResult(null);
		setError(null);
		setResendCountdown(0);
		setLoginOpen(false);
	};

	useEffect(() => {
		const popup = sessionStorage.getItem("popupshown");

		if (popup !== "true") {
			setTimeout(() => {
				setLoginOpen(true);
				sessionStorage.setItem("popupshown", String(true));
			}, 3000);
		}
	}, []);
	return (
		<div className={` ${(loginOpen && !user) ? "flex" : " hidden "}   z-[1000001] w-full h-full fixed top-0 left-0 right-0   transition-all duration-300 bottom-0 bg-[#00000096]  justify-center items-center`}>
			<div id="recaptcha-container" />
			<div className={`bg-[white] flex w-[90%] xs:w-[70%] h-[70%]  items-stretch rounded-[10px] overflow-hidden ${loginOpen && "fadein"}`}>
				<div className="hidden xs:block w-[40%]">
					<div className="relative w-full h-full ">
						<Image src="/images/loginbid.png" fill alt="" className="object-cover"></Image>
						<div className="absolute top-[45%] px-6 w-full ">
							<div className="">
								<div>
									<h2 className=" text-xl text-[#ffdfa6]  font-bold">Get your Stay at your Price</h2>
									<p className="text-[white]    pt-4 text-base  ">Place your bid, and we’ll secure the best stay and hotel accommodations at your winning price</p>
								</div>
								<button className="btn border border-[2px] mt-8  bg-[white] text-[#4a4a4a] font-bold px-4        min-h-0 h-12  rounded-full">Place Your Bid Now</button>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full xs:w-[60%]  flex flex-col items-stretch pt-4 xs:pt-8 justify-center relative">
					<div className="flex items-center justify-between px-4 xs:px-12">
						<div className=" flex   items-center  gap-4 transition-all duration-300">
							{confirmationResult && (
							<FaArrowLeft
								color="#fff"
								
								onClick={(e) => {
									goBack(e);
								}}
								className="  bg-[#ff6100] p-1 rounded cursor-pointer text-[24px] glass xs:text-[32px] transition-all duration-300"
							/>
							 )}
							<div className="transition-all duration-300">
								<div className="w-[62px] relative h-[18px]  xs:w-[96px] xs:h-[26px]  transition-all duration-300">
									<Image src="/images/logos/logodark.png" fill className="" alt="" />
								</div>
							</div>
						</div>

						<button onClick={() => handleClose()} className=" min-h-0 xs:min-h-auto h-8 xs:h-[44px] btn rounded-full aspect-square  p-0 ">
							<IoClose color="#ff6100" className="text-[16px] xs:text-[26px]" />
						</button>
					</div>

					<div className="w-full xs:w-[70%] h-full oveflow-hidden px-4 xs:px-16 pt-0 xs:pt-4 text-center mx-auto">
						<div className="grow overflow-hidden">
							<h2 className="font-bold text-[#4a4a4a] xs:font-semibold mt-8 xs:mt-4 mb-4 xs:mb-8 text-left xs:text-center text-lg xs:text-xl">Login or Sign-Up </h2>

							{!confirmationResult && (
								<div className={`${goBackTracker ? "slideright" : ""}`}>
									<form action="">
										<div className="flex flex-col gap-3 text-xs xs:text-sm text-start phone-input">
											<label htmlFor="">Phone Number</label>
											<PhoneInput country={"in"} value={phone} onChange={(phone) => setPhone(phone)} inputStyle={{ width: "100%" }} />
										</div>

										<button disabled={resendCountdown > 0 || isPending ? true : false} className="bg-[#ff6100] text-xs xs:text-base flex justify-center gap-2 items-center text-[white] font-semibold mt-6 rounded-[5px] glass w-full py-3 xs:py-2" onClick={(e) => getOtp(e)}>
											Get OTP {isPending && <ClipLoader color="white" size={16} />}
										</button>
										{error && <p className="text-[red]">{error}</p>}
									</form>
									<div className="mb-6 mt-6 flex gap-4 items-center">
										<div className="grow">
											<hr className="" />
										</div>
										<p className="text-xs xs:text-sm">Or continue with</p>
										<div className="grow">
											<hr className="" />
										</div>
									</div>
									<button onClick={signInWithGoogle} className="border border-[#d8d8d8] rounded w-[300px] w-full  text-sm flex gap-4 items-center justify-center py-2">
										<FcGoogle size={22} />
										<span className="font-semibold">Google</span>
									</button>
								</div>
							)}

							{confirmationResult && (
								<div id="otpsection" className="flex flex-col transition-all duration-300 ease-in-out slideleft pt-8">
									<div className="flex flex-col gap-3 text-sm text-start">
										<label htmlFor="">Enter OTP</label>
										<input
											type="text"
											className="outline-none border py-3 px-2 text-base font-semibold focus:border-[#ff6100] border-[#cacaca]  rounded-[5px]"
											onChange={(e) => {
												otpChange(e);
											}}
										/>
									</div>
									<button
										disabled={isPending ? true : false}
										className={`bg-[#ff6100] glass text-[white] rounded-[5px] font-semibold text-base py-2 mt-6`}
										onClick={(e) => {
											verify(e);
										}}>
										Verify {isPending && <ClipLoader color="white" size={16} />}
									</button>

									{resendCountdown > 0 && <p className="text-[#4a4a4a] text-xs text-start mt-6">You can request a new OTP in {resendCountdown} seconds</p>}
									{resendCountdown <= 0 && (
										<p className="text-[#0c3466] font-semibold text-xs text-start mt-6 cursor-pointer" onClick={(e) => getOtp(e)}>
											Resend OTP
										</p>
									)}
								</div>
							)}
						</div>
					</div>
					<div className="text-[10px] py-4 flex gap-4 items-center justify-center">
						<span>Terms & Conditions</span>
						<span>Privacy Policy</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginModal;
