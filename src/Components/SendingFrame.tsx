import React, { Dispatch, FC, useState, SetStateAction } from 'react';
import styles from '../Styles/sendingframe.module.scss';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction } from '../assets/Redux/Actions/Actions';
import send_image from '../assets/send_button.png';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

interface Props {
	firebase: any;
}

const SendingFrame: FC<Props> = ({ firebase }) => {
	const [logged, setLogged] = useState<boolean>(false);

	return (
		<div className={styles.sendingframe}>
			{logged ? (
				<SendingMessages firebase={firebase} />
			) : (
				<>
					<p>To send messages you need to login 🔰: </p>
					<Login firebase={firebase} setLogged={setLogged} />
				</>
			)}
		</div>
	);
};

interface MessageProps {
	firebase: any;
}

const SendingMessages: FC<MessageProps> = ({ firebase }) => {
	const [message, setMessage] = useState<string>('');
	const db = getFirestore(firebase);
	const loginInfo = useSelector((state: any) => state.login);

	const UploadHandler = async () => {
		setMessage('')
		const today = new Date().toLocaleDateString();
		const order = Date.now();
		try {
			const docRef = await addDoc(collection(db, 'MSG'), {
				order: order,
				user: loginInfo.Name,
				pic: loginInfo.ProfilePic,
				email: loginInfo.Email,
				message: message,
				date: today,
			});
		} catch (e) {
		}
	};

	return (
		<>
			<input
				className={styles.Input}
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<img onClick={() => UploadHandler()} src={send_image} />
		</>
	);
};

interface LoginProps {
	setLogged: Dispatch<SetStateAction<boolean>>;
	firebase: any;
}
const Login: FC<LoginProps> = ({ firebase, setLogged }) => {
	const dispatch = useDispatch();
	const auth = getAuth(firebase);
	const provider = new GoogleAuthProvider();

	const clickHandler = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				const user = result.user;

				if (user.displayName && user.photoURL && user.email) {
					dispatch(LoginAction(user.displayName, user.photoURL, user.email));
					setLogged(true);
				} else {
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

export default SendingFrame;
