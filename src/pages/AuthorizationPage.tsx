import {createSignal, JSX} from 'solid-js'
import {io} from 'socket.io-client'
import socketioClient from '../store/socketioClient'
import currentWorkingDirectory from '../store/currentWorkingDirectory'

const AuthorizationPage = (): JSX.Element => {
	const [getConnectionURL, setConnectionURL] = createSignal<string>('')
	const [getSocketioClient, setSocketioClient] = socketioClient
	const [getCWD, setCWD] = currentWorkingDirectory

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
		<div>
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
