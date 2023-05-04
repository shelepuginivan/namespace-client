import {JSX} from 'solid-js'

import currentSocketError from '../../store/currentSocketError'
import {errorType} from '../../utils/constants'
import styles from './errorMessage.module.css'

const ErrorMessage = (): JSX.Element => {
	const getSocketError = currentSocketError[0]

	return (
		<dialog
			class={styles.errorMessage}
			open={Boolean(getSocketError()?.message)}
		>
			<h4>{errorType[getSocketError()?.type]}</h4>
			<p>{getSocketError()?.message}</p>
		</dialog>
	)
}

export default ErrorMessage
