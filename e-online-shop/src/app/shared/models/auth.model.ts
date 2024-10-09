export interface Registration {
	firstName: string;
	surname: string;
	email: string;
	password: string;
	confirmPassword?: string;
	phoneNumber?: string;
	address: {
		houseNumber: string;
		street: string;
		street2?: string;
		postalCode: string;
	};
}
