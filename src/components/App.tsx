import {createEffect, JSX, Show} from 'solid-js'

import AuthorizationPage from '../pages/AuthorizationPage'
import FileSystemPage from '../pages/FileSystemPage'
import connectionURL from '../store/connectionURL'
import currentWorkingDirectory from '../store/currentWorkingDirectory'
import itemsInCurrentWorkingDirectory from '../store/itemsInCurrentWorkingDirectory'
import socketioClient from '../store/socketioClient'
import FileModal from './FileModal/FileModal'

const App = (): JSX.Element => {
	const getConnectionURL = connectionURL[0]
	const getSocketioClient = socketioClient[0]
	const getCWD = currentWorkingDirectory[0]

	const setItemsInCurrentWorkingDirectory = itemsInCurrentWorkingDirectory[1]

	createEffect(() => getSocketioClient()?.emit('changeDir', getCWD()))

	createEffect(() => {
		document.querySelector('title').innerText = (getConnectionURL() && getCWD())
			? `nameSpace - ${getCWD()} [${getConnectionURL()}]`
			: 'nameSpace - Authorization'
	})

	createEffect(() => {
		getSocketioClient()?.on('updateDirItems', directoryItemsString => {
			setItemsInCurrentWorkingDirectory(JSON.parse(directoryItemsString))
		})
	})

	return (
		<Show keyed when={getSocketioClient()} fallback={AuthorizationPage}>
			<FileSystemPage/>
			<FileModal/>
		</Show>
	)
}

export default App
