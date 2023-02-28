import {io} from 'socket.io-client'
import {createSignal, JSX} from 'solid-js'

import connectionURL from '../../store/connectionURL'
import currentWorkingDirectory from '../../store/currentWorkingDirectory'
import socketioClient from '../../store/socketioClient'
import page from '../Page.module.css'
import styles from './AuthorizationPage.module.css'
import AuthInput from '../../ui/AuthInput/AuthInput'
import SubmitForm from '../../ui/SubmitForm/SubmitForm'

const AuthorizationPage = (): JSX.Element => {
	const [getPassword, setPassword] = createSignal<string>('')
	const [getConnectionURL, setConnectionURL] = connectionURL
	const setSocketioClient = socketioClient[1]
	const setCWD = currentWorkingDirectory[1]

	const connectToSocketServer = (e: Event) => {
		e.preventDefault()
		e.stopPropagation()

		if (!getConnectionURL()) return

		try {
			const socket = io(getConnectionURL(), {auth: {password: getPassword()}})
			setSocketioClient(socket)
			socket.connect()
			setCWD('/')
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div class={[page.page, styles.wrapper].join(' ')}>
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
		</div>
	)
}

export default AuthorizationPage
