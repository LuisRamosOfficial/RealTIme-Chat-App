interface action {
	type: string;
	payload: {
		Name: string;
		ProfilePic: string;
		Email: string;
	};
}

interface Profile {
	Name: string;
	ProfilePic: string;
	Email: string;
}

const Profile = (name: string, pic: string, email: string): object => {
	return {
		Name: name,
		ProfilePic: pic,
		Email: email,
	};
};

const LoginReducer = (state = {}, action: action) => {
	switch (action.type) {
		case 'Login':
			return Profile(action.payload.Name, action.payload.ProfilePic, action.payload.Email);
		case 'Log-off':
			return {};
		default:
			return state;
	}
};

export default LoginReducer