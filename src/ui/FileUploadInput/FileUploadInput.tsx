import {JSX, ParentProps} from 'solid-js'

import styles from './FileUploadInput.module.css'

type PropsType = ParentProps & Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'type' | 'multiple'>

const FileUploadInput = (props: PropsType): JSX.Element => {
	const elementId = Date.now().toString(32)
	const {children, ...inputProps} = props

	return (
		<div class={styles.button}>
			<label for={elementId}>{children}</label>
			<input id={elementId} {...inputProps} type="file" multiple/>
		</div>
	)
}

export default FileUploadInput
