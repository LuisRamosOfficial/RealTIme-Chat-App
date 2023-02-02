import React, { FC, useEffect, useState } from 'react'
import styles from '../Styles/messages.module.scss'
import send_image from '../assets/send_button.png';
import { useSelector } from 'react-redux';
import {
	doc,
	onSnapshot,
	getFirestore,
	query,
	collection,
	deleteDoc,
} from 'firebase/firestore';
import delete_button from '../assets/delete_button.png'

interface Props {
    firebase: any
}

const Messages: FC<Props> = ({firebase}) => {
    const [messageslist, setMessagesList] = useState<Array<unknown>>([])
  	const db = getFirestore(firebase);
    const loginInfo = useSelector((state: any) => state.login);


  const DeletePost = (id: string) => {
    const confirmation = confirm('Do you really want to delete this message?')

    if (confirmation) {
        deleteDoc(doc(db, 'MSG', id)).then(() => {
        })
    }
  }

    useEffect(() => {

      const q = query(collection(db, "MSG"))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const MSG: Array<unknown> = [];
				querySnapshot.forEach((doc) => {
					MSG.push({...doc.data(), ID: doc.id});
				});
        MSG.sort((a: any, b: any) => a.order - b.order);
        setMessagesList(MSG)
      })
    

    }, [])
    

  return (
		<div className={styles.Messages}>
			{messageslist.map((el: any, index) => (
				<li key={index}>
					<div className={styles.TitleDate}>
						<p className={styles.Name}>{el.user}</p>
						<p className={styles.Date}>{el.date}</p>
					</div>
					<img className={styles.icon} src={el.pic} />
					{el.email == loginInfo.Email && (
						<img onClick={() => DeletePost(el.ID)} className={styles.delete} src={delete_button} />
					)}
					<p className={styles.messagebox}>{el.message}</p>
				</li>
			))}
			<li></li>
		</div>
	);
}

export default Messages