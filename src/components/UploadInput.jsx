import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { CommonInput, SelectInput } from "./InputFields";
const UploadInput = ({
	fileData,
	addUploadInput,
	handelFileChange,
	handelFileUpload,
	deleteUploadInput,
	isError,
}) => {
	// const iconStyle = {
	// 	fontSize: "15px",
	// 	lineHeight: "1",
	// };
	return (
		<>
			<p>Upload Documents</p>
			{fileData.map((val, i) => {
				return (
					<Row className='mb-3' key={i}>
						<Col md='3'>
							<CommonInput
								label='File Name'
								type='text'
								name='document_name'
								onChange={(e) => handelFileChange(e, i)}
								value={val.document_name}
								valid={isError.document_name}
							/>
						</Col>

						<Col md='4'>
							<SelectInput
								label='File Type'
								name='document_type'
								onChange={(e) => handelFileChange(e, i)}
								valid={isError.document_type}
								fileLabel={["image", "pdf"]}
							/>
						</Col>

						<Col md='4'>
							<CommonInput
								label='File Upload'
								type='file'
								name='document_file'
								onChange={(e) => handelFileUpload(e, i)}
								valid={isError.document_file}
							/>
						</Col>
						{i === 0 ? (
							<Col md='1'>
								<Button
									variant='primary'
									className='upload_action_btn'
									onClick={addUploadInput}
								>
									<AiOutlinePlus />
								</Button>
							</Col>
						) : (
							<Col md='1'>
								<Button
									variant='dark'
									className='upload_action_btn'
									onClick={() => deleteUploadInput(i)}
								>
									<AiFillDelete />
								</Button>
							</Col>
						)}
					</Row>
				);
			})}
		</>
	);
};

export default UploadInput;
