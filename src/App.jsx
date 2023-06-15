import React, { useState } from "react";
import axios from "axios";
import RegistrationForm from "./components/RegistrationForm";
import UploadInput from "./components/UploadInput";
import { validateForm } from "./helper/validate";
import "./App.css";

// Initial values for the form fields and file data
const formInitialValue = {
	first_name: "",
	last_name: "",
	email: "",
	dob: "",
	c_address_s1: "",
	c_address_s2: "",
	p_address_s1: "",
	p_address_s2: "",
	is_parmanent_current_address: 0,
};
const initialState = {
	document_name: "",
	document_type: "",
	document_file: "",
};

const baseurl = "https://reactjsmachinetestapi.xicom.us/v1";

export default function App() {
	const [formData, setFormData] = useState(formInitialValue);
	const [isError, setIsError] = useState({});
	const [isChecked, setIsChecked] = useState(false);
	const [fileData, setFileData] = useState([initialState]);

	// Handler for file input change
	const handelFileChange = (e, index) => {
		const { name, value } = e.target;
		const updatedFileData = [...fileData];
		updatedFileData[index] = { ...updatedFileData[index], [name]: value };
		setFileData(updatedFileData);
	};

	// Handler for file upload
	const handelFileUpload = (e, index) => {
		const { name, files } = e.target;
		const file = files[0];
		const updatedFileData = [...fileData];
		updatedFileData[index] = { ...updatedFileData[index], [name]: file };
		setFileData(updatedFileData);
	};

	// Handler for adding upload input
	const addUploadInputHandler = () => {
		setFileData([...fileData, initialState]);
	};

	// Handler for deleting upload input
	const deleteUploadInputHandler = (index) => {
		const updatedFileData = [...fileData];
		updatedFileData.splice(index, 1);
		setFileData(updatedFileData);
	};

	// Handler for input fields
	const handleInputFields = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
		// Clear the error for the current field
		if (!!isError[name])
			setIsError({
				...isError,
				[name]: null,
			});
	};

	// Handler for form submission
	const handelSubmit = async (e) => {
		console.log(formData, "formData");
		e.preventDefault();
		const hasErrors = validateForm(formData);

		if (Object.keys(hasErrors).length > 0) {
			setIsError(hasErrors);
		} else {
			const requestData = new FormData();
			// Append form data to FormData object
			requestData.append("first_name", formData.first_name);
			requestData.append("last_name", formData.last_name);
			requestData.append("email", formData.email);
			requestData.append("dob", formData.dob);
			requestData.append("c_address_s1", formData.c_address_s1);
			requestData.append("c_address_s2", formData.c_address_s2);
			requestData.append(
				"p_address_s1",
				isChecked ? formData.c_address_s1 : formData.p_address_s1
			);
			requestData.append(
				"p_address_s2",
				isChecked ? formData.c_address_s2 : formData.p_address_s2
			);
			requestData.append("is_parmanent_current_address", isChecked ? 0 : 1);
			fileData.forEach((file, index) => {
				requestData.append(
					`document[${index}][document_name]`,
					file.document_name
				);
				requestData.append(
					`document[${index}][document_type]`,
					file.document_type
				);
				requestData.append(
					`document[${index}][document_file]`,
					file.document_file
				);
			});

			try {
				const { data } = await axios.post(
					`${baseurl}/user/document-submit`,
					requestData,
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
					}
				);
				console.log(data);
			} catch (err) {
				console.log(err);
			}
		}
		// setFormData(formInitialValue);
	};

	return (
		<>
			<form onSubmit={handelSubmit}>
				{/* <div className='form_title'> Registration Form</div> */}
				<RegistrationForm
					formData={formData}
					isChecked={isChecked}
					setIsChecked={setIsChecked}
					handleInputFields={handleInputFields}
					isError={isError}
				/>
				<UploadInput
					fileData={fileData}
					addUploadInput={addUploadInputHandler}
					handelFileChange={handelFileChange}
					deleteUploadInput={deleteUploadInputHandler}
					handelFileUpload={handelFileUpload}
					isError={isError}
				/>
				<div className='btn_container'>
					<button className='submit_btn' type='submit'>
						Submit
					</button>
				</div>
			</form>
		</>
	);
}
