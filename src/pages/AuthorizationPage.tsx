import {io} from 'socket.io-client'
import {JSX} from 'solid-js'

import connectionURL from '../store/connectionURL'
import currentWorkingDirectory from '../store/currentWorkingDirectory'
import socketioClient from '../store/socketioClient'
import styles from './Page.module.css'

const AuthorizationPage = (): JSX.Element => {
	const [getConnectionURL, setConnectionURL] = connectionURL
	const setSocketioClient = socketioClient[1]
	const setCWD = currentWorkingDirectory[1]

	const connectToSocketServer = () => {
		try {
			const socket = io(getConnectionURL())
			setSocketioClient(socket)
			socket.connect()
			setCWD('/')
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div class={styles.page}>
			<input
				type="text"
				value={getConnectionURL()}
				onchange={e => setConnectionURL((e.target as HTMLInputElement).value)}
			/>
			<button onclick={connectToSocketServer}>Connect</button>
		</div>
	)
}

export default AuthorizationPage
