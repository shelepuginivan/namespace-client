import {io} from 'socket.io-client'
import {createSignal, JSX} from 'solid-js'

import connectionURL from '../../store/connectionURL'
import currentWorkingDirectory from '../../store/currentWorkingDirectory'
import socketioClient from '../../store/socketioClient'
import AuthInput from '../../ui/AuthInput/AuthInput'
import SubmitForm from '../../ui/SubmitForm/SubmitForm'
import page from '../Page.module.css'
import styles from './AuthorizationPage.module.css'
import messageDialogCurrent from '../../store/currentSocketError'
import {SocketError} from '../../utils/types/SocketError'

const AuthorizationPage = (): JSX.Element => {
	const [getPassword, setPassword] = createSignal<string>('')
	const [getConnectionURL, setConnectionURL] = connectionURL
	const setMessageDialogCurrent = messageDialogCurrent[1]
	const setSocketioClient = socketioClient[1]
	const setCWD = currentWorkingDirectory[1]

	const connectToSocketServer = (e: Event) => {
		e.preventDefault()
		e.stopPropagation()

		if (!getConnectionURL()) return

		try {
			setConnectionURL(url => {
				if (!url.startsWith('http')) url = `http://${url}`
				if (url.endsWith('/')) url = url.slice(0, url.length - 1)

				return url
			})

			const socket = io(
				getConnectionURL(),
				{auth: {password: getPassword()}}
			)

			socket.on('error', (msg: string) => {
				const socketError: SocketError = JSON.parse(msg)
				setMessageDialogCurrent(socketError)

				setTimeout(() => {
					setMessageDialogCurrent(null)
				}, 5000)
			})

			setSocketioClient(socket.connect())
			setCWD('/')
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<main class={`${page.page} ${styles.wrapper}`}>
			<form class={styles.form} onsubmit={connectToSocketServer}>
				<h1>nameSpace</h1>
				<div class={styles.inputs}>
					<AuthInput
						label="URL Сервера"
						id="url-input"
						type="text"
						placeholder="http://"
						value={getConnectionURL()}
						onchange={e => setConnectionURL((e.target as HTMLInputElement).value)}
					/>
					<AuthInput
						label="Пароль"
						type="password"
						value={getPassword()}
						onchange={e => setPassword((e.target as HTMLInputElement).value)}
					/>
				</div>
				<SubmitForm value="Войти" />
			</form>
		</main>
	)
}

export default AuthorizationPage
