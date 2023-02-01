export const LoginAction = (name: string, pic: string, email: string) => {
	return {
		type: 'Login',
		payload: {
			Name: name,
			ProfilePic: pic,
			Email: email,
		},
	};
};

export const LogoffAction = (name: string, pic: string, email: string) => {
	return {
		type: 'Log-off',
		payload: {
			Name: name,
			ProfilePic: pic,
			Email: email,
		},
	};
};

