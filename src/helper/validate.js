import moment from "moment";

const validateAge = (dob, format) => {
	const today = moment();
	const birthDate = moment(dob, format);
	const age = today.diff(birthDate, "years");
	return age;
};

export const validateForm = (formData) => {
	const { first_name, last_name, email, dob, c_address_s1, c_address_s2 } =
		formData;
	let errors = {}; // Create an empty object to hold validation errors

	if (!first_name) {
		errors.first_name = "First name is required.";
	} else {
		if (first_name.split(" ").length > 2) {
			errors.first_name = "Only one space is allowed in the firstname.";
		} else if (first_name.length <= 2) {
			errors.first_name = "firstname should have minimum 3 character";
		}
	}

	if (!last_name) {
		errors.last_name = "Last name is required.";
	} else {
		if (last_name.split(" ").length > 2) {
			errors.last_name = "Only one space is allowed in the lastname.";
		} else if (last_name.length <= 2) {
			errors.last_name = "lastname should have minimum 3 character";
		}
	}

	if (!email) {
		errors.email = "Email is required.";
	} else {
		const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
		const yopmailRegex = /@yopmail.com$/i;
		if (!emailRegex.test(email)) {
			errors.email = "Please enter a valid email address.";
		} else if (yopmailRegex.test(email)) {
			errors.email = "Yopmail ids are not allowed.";
		} else if (email !== email.toLowerCase()) {
			errors.email = "Email should not contain uppercase letters.";
		}
	}
	if (!dob) {
		errors.dob = "Date of birth is required";
	} else if (validateAge(dob, "YYYY-MM-DD") < 18) {
		errors.dob = "Age must be greather than 18";
	}

	if (!c_address_s1) {
		errors.c_address_s1 = "Residetial address is required";
	} else if (c_address_s1.length <= 4) {
		errors.c_address_s1 = " first street should have minimum 5 character";
	}

	if (!c_address_s2) {
		errors.c_address_s2 = "Residetial address is required";
	} else if (c_address_s2.length <= 4) {
		errors.c_address_s2 = "second street should have minimum 5 character";
	}

	// return Object.keys(errors).length > 0; // Return true if there are errors
	return errors;
};
