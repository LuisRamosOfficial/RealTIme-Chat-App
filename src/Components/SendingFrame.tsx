import React, { Dispatch, FC, useState, SetStateAction } from 'react';
import styles from '../Styles/sendingframe.module.scss'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction } from '../assets/Redux/Actions/Actions';

interface Props {
	firebase: any;
}

const SendingFrame: FC<Props> = ({firebase}) => {
    const [logged, setLogged] = useState<boolean>(false);
  
    return (
			<div className={styles.sendingframe}>
				<p>To send messages you need to login: </p>
				<Login firebase={firebase} setLogged={setLogged} />
			</div>
		);
}


interface LoginProps {
	setLogged: Dispatch<SetStateAction<boolean>>;
    firebase: any
}
const Login: FC<LoginProps> = ({firebase, setLogged }) => {
	const dispatch = useDispatch();
	const auth = getAuth(firebase);
	const provider = new GoogleAuthProvider();

	const clickHandler = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				const user = result.user;
                console.log(user)

				if (user.displayName && user.photoURL && user.email) {
					dispatch(LoginAction(user.displayName, user.photoURL, user.email));
					setLogged(true);
				} else {
					console.log('super error');
				}
			})
			.catch((error) => {});
	};

	return (
		<button className={styles.Login} onClick={() => clickHandler()}>
			Login
		</button>
	);
};


export default SendingFrame