import {JSX} from 'solid-js'
import styles from './ModalCloseButton.module.css'

const ModalCloseButton = (props: JSX.ButtonHTMLAttributes<any>): JSX.Element => {
	const {children, ...buttonProps} = props

	return (
		<button class={styles.modalCloseButton} {...buttonProps}>{children}</button>
	)
}

export default ModalCloseButton
