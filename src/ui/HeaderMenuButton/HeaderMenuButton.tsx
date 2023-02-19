import {JSX} from 'solid-js'

import styles from './HeaderMenuButton.module.css'

const HeaderMenuButton = (props: JSX.ButtonHTMLAttributes<any>): JSX.Element => {
	const {children, ...buttonProps} = props

	return (
		<button class={styles.button} {...buttonProps}>{children}</button>
	)
}

export default HeaderMenuButton
