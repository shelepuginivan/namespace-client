import {createEffect, JSX, Show} from 'solid-js'
import socketioClient from '../store/socketioClient'
import currentWorkingDirectory from '../store/currentWorkingDirectory'
import itemsInCurrentWorkingDirectory from '../store/itemsInCurrentWorkingDirectory'
import AuthorizationPage from '../pages/AuthorizationPage'
import FileSystemPage from '../pages/FileSystemPage'
import {IFileSystemItem} from '../utils/interfaces/IFileSystemItem'
import {Socket} from 'socket.io-client'

const App = (): JSX.Element => {
	const [getSocketioClient, setSocketioClient] = socketioClient
	const [getCWD, setCWD] = currentWorkingDirectory
	const [getItemsInCurrentWorkingDirectory, setItemsInCurrentWorkingDirectory] = itemsInCurrentWorkingDirectory
	createEffect(() => getSocketioClient()?.emit('changeDir', getCWD()))

	createEffect(() => {
		if (getSocketioClient() instanceof Socket) {
			getSocketioClient().on('updateDirItems', dirItemsString => {
				setItemsInCurrentWorkingDirectory(JSON.parse(dirItemsString) as IFileSystemItem[])
			})
		}
	})

	return (
		<Show keyed when={getSocketioClient()} fallback={AuthorizationPage}>
			<FileSystemPage/>
		</Show>
	)
}

export default App
