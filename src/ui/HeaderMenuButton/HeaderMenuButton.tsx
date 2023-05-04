import {JSX} from 'solid-js'

import styles from './HeaderMenuButton.module.css'

const HeaderMenuButton = (props: JSX.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element =>
	<button class={styles.button} {...props}/>

export default HeaderMenuButton
