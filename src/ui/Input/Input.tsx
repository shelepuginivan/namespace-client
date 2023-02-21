import {JSX} from 'solid-js'
import styles from './Input.module.css'

const Input = (props: JSX.InputHTMLAttributes<any>): JSX.Element => {
	return (
		<input {...props} class={styles.input} />
	)
}

export default Input
