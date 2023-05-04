import {JSX} from 'solid-js'

import styles from './AuthInput.module.css'

type PropsType = JSX.InputHTMLAttributes<HTMLInputElement> & {
	label: string
}

const AuthInput = (props: PropsType): JSX.Element => {
	const {id, label, ...inputProps} = props

	return (
		<div class={styles.inputWrapper}>
			<label for={id}>{label}</label>
			<input id={id} {...inputProps}/>
		</div>
	)
}

export default AuthInput
