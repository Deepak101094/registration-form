import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { CommonInput, DisabledInputField } from "./InputFields";

const RegistrationForm = ({
	isError,
	formData,
	handleInputFields,
	isChecked,
	setIsChecked,
}) => {
	return (
		<>
			<Row className='mb-3'>
				<Col md='6'>
					<CommonInput
						label='First Name'
						type='text'
						name='first_name'
						onChange={(e) => handleInputFields(e)}
						value={formData.first_name}
						valid={isError.first_name}
					/>
				</Col>

				<Col md='6'>
					<CommonInput
						label='Last Name'
						type='text'
						name='last_name'
						onChange={(e) => handleInputFields(e)}
						value={formData.last_name}
						valid={isError.last_name}
					/>
				</Col>
			</Row>

			<Row className='mb-3'>
				<Col md='6'>
					<CommonInput
						label='Email'
						type='email'
						name='email'
						onChange={(e) => handleInputFields(e)}
						value={formData.email}
						valid={isError.email}
					/>
				</Col>

				<Col md='6'>
					<CommonInput
						label='Date Of Birth'
						type='date'
						name='dob'
						onChange={(e) => handleInputFields(e)}
						value={formData.dob}
						valid={isError.dob}
					/>
				</Col>
			</Row>

			<p>Residential Address</p>
			<Row className='mb-3'>
				<Col md='6'>
					<CommonInput
						label='Street 1'
						type='text'
						name='c_address_s1'
						onChange={(e) => handleInputFields(e)}
						value={formData.c_address_s1}
						valid={isError.c_address_s1}
					/>
				</Col>

				<Col md='6'>
					<CommonInput
						label='Street 2'
						type='text'
						name='c_address_s2'
						onChange={(e) => handleInputFields(e)}
						value={formData.c_address_s2}
						valid={isError.c_address_s2}
					/>
				</Col>
			</Row>

			<div>
				<input type='checkbox' onChange={() => setIsChecked(!isChecked)} /> same
				as residential address
			</div>

			<p>Parmanent Address</p>

			{isChecked ? (
				<Row className='mb-3'>
					<Col md='6'>
						<DisabledInputField
							label='Street 1'
							value={formData.c_address_s1}
						/>
					</Col>

					<Col md='6'>
						<DisabledInputField
							label='Street 2'
							value={formData.c_address_s2}
						/>
					</Col>
				</Row>
			) : (
				<Row className='mb-3'>
					<Col md='6'>
						<CommonInput
							label='Street 1'
							type='text'
							name='p_address_s1'
							onChange={(e) => handleInputFields(e)}
							value={formData.p_address_s1}
							valid={isError.p_address_s1}
						/>
					</Col>

					<Col md='6'>
						<CommonInput
							label='Street 2'
							type='text'
							name='p_address_s2'
							onChange={(e) => handleInputFields(e)}
							value={formData.p_address_s2}
							valid={isError.p_address_s2}
						/>
					</Col>
				</Row>
			)}
		</>
	);
};

export default RegistrationForm;
