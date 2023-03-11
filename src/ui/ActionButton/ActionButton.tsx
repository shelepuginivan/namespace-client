import {JSX} from 'solid-js'

import styles from './ActionButton.module.css'

const ActionButton = (props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) =>
	<button class={styles.button} {...props}/>

export default ActionButton
