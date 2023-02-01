import { useState, createContext } from 'react';
import reactLogo from './assets/react.svg'
import styles from './Styles/layout.module.scss'
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './Components/FirebaseConfig';
import Messages from './Components/Messages';
import SendingFrame from './Components/SendingFrame'
function App() {

  const app = initializeApp(firebaseConfig)

  return (
		<div className={styles.App}>
			<main>
				<h2 className={styles.Title}>Chat App</h2>
				<Messages firebase={app} />
				<SendingFrame firebase={app} />
			</main>
		</div>
	);
}

export default App
