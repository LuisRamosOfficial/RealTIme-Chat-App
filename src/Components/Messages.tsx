import React, { FC } from 'react'
import styles from '../Styles/messages.module.scss'
interface Props {
    firebase: any
}

const Messages: FC<Props> = ({firebase}) => {

  return (
    <div className={styles.Messages}>Messages</div>
  )
}

export default Messages