import React from 'react'

function UpdateErrorModal({updateError, setUpdateError}) {
    const handleErrorClose = (e) => {
		document.getElementById("my_modal_2").close();
		setUpdateError("");
	};
  return (
    <dialog id="my_modal_2" className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg text-center">Some Error Occured. Please try again.</h3>
					<p>{updateError}</p>
					<div className="modal-action flex justify-center">
						{/* if there is a button in form, it will close the modal */}
						<button
							className="btn"
							onClick={() => {
								handleErrorClose();
							}}>
							Close
						</button>
					</div>
				</div>
			</dialog>
  )
}

export default UpdateErrorModal