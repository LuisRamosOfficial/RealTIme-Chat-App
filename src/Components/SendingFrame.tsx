import React, { Dispatch, FC, useState, SetStateAction } from 'react';
import styles from '../Styles/sendingframe.module.scss';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import send_image from '../assets/send_button.png';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

interface Props {
	firebase: any;
}

const SendingFrame: FC<Props> = ({ firebase }) => {
	return (
		<div className={styles.sendingframe}>
			<SendingMessages firebase={firebase} />
		</div>
	);
};

interface MessageProps {
	firebase: any;
}

const SendingMessages: FC<MessageProps> = ({ firebase }) => {
	const [message, setMessage] = useState<string>('');
	const [name, setName] = useState<string>('');
	const db = getFirestore(firebase);
	const loginInfo = useSelector((state: any) => state.login);

	const UploadHandler = async () => {
		setMessage('');
		const today = new Date().toLocaleDateString();
		const order = Date.now();
		try {
			const docRef = await addDoc(collection(db, 'MSG'), {
				order: order,
				user: name,
				pic: 'https://divedigital.id/wp-content/uploads/2022/07/2-Blank-PFP-Icon-Instagram.jpg',
				email: "Michael",
				message: message,
				date: today,
			});
		} catch (e) {}
	};

	return (
		<>
		<span>
			<h4>Digite o seu Nome:</h4>
			<input
				className={styles.Inputname}
				value={name}
				onChange={(e) => setName(e.target.value)}
				/>
				</span>
			<input
				className={styles.Input}
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<img onClick={() => UploadHandler()} src={send_image} />
		</>
	);
};

export default SendingFrame;
