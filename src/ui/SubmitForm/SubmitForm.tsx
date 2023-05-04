import {JSX} from 'solid-js'

import styles from './SubmitForm.module.css'

type PropsType = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'type'>

const SubmitForm = (props: PropsType) => {
	return (
		<input class={styles.submitForm} type="submit" {...props}/>
	)
}

export default SubmitForm
