import {io} from 'socket.io-client'
import {createSignal, JSX} from 'solid-js'

import connectionURL from '../store/connectionURL'
import currentWorkingDirectory from '../store/currentWorkingDirectory'
import socketioClient from '../store/socketioClient'
import styles from './Page.module.css'

const AuthorizationPage = (): JSX.Element => {
	const [getPassword, setPassword] = createSignal<string>('')
	const [getConnectionURL, setConnectionURL] = connectionURL
	const setSocketioClient = socketioClient[1]
	const setCWD = currentWorkingDirectory[1]

	const connectToSocketServer = () => {
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
		<div class={styles.page}>
			<form>
				<input
					type="text"
					value={getConnectionURL()}
					onchange={e => setConnectionURL((e.target as HTMLInputElement).value)}
				/>
				<input
					type="password"
					value={getPassword()}
					onchange={e => setPassword((e.target as HTMLInputElement).value)}
				/>
			</form>

			<button onclick={connectToSocketServer}>Connect</button>
		</div>
	)
}

export default AuthorizationPage
