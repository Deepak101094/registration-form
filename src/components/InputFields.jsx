import React from "react";
import Form from "react-bootstrap/Form";

export const CommonInput = ({ onChange, type, name, valid, label }) => {
	return (
		<>
			<Form.Label>
				{label} <span className='asterisk'> *</span>
			</Form.Label>
			<Form.Control
				type={type}
				name={name}
				onChange={onChange}
				isInvalid={!!valid}
			/>
			<Form.Control.Feedback type='invalid'>{valid}</Form.Control.Feedback>
		</>
	);
};

export const DisabledInputField = ({ label, value }) => {
	return (
		<>
			<Form.Label>{label}</Form.Label>
			<Form.Control disabled className='disable' value={value} />
		</>
	);
};

export const SelectInput = ({ onChange, fileLabel, name, valid, label }) => {
	return (
		<>
			<Form.Label>
				{label} <span className='asterisk'> *</span>
			</Form.Label>
			<Form.Select onChange={onChange} isInvalid={!!valid} name={name}>
				<option value=''>choose</option>
				{fileLabel.map((val, i) => (
					<option key={i} value={val}>
						{val}
					</option>
				))}
			</Form.Select>
			<Form.Control.Feedback type='invalid'>{valid}</Form.Control.Feedback>
		</>
	);
};
