import {Socket} from 'socket.io-client'
import {createEffect, JSX, Show} from 'solid-js'

import AuthorizationPage from '../pages/AuthorizationPage'
import FileSystemPage from '../pages/FileSystemPage'
import currentWorkingDirectory from '../store/currentWorkingDirectory'
import itemsInCurrentWorkingDirectory from '../store/itemsInCurrentWorkingDirectory'
import socketioClient from '../store/socketioClient'
import {IFileSystemItem} from '../utils/interfaces/IFileSystemItem'
import FileModal from './FileModal/FileModal'

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

			getSocketioClient().on('contentChanged', directory => {
				if (directory === getCWD()) {
					getSocketioClient().emit('changeDir', getCWD())
				}
			})
		}
	})

	return (
		<Show keyed when={getSocketioClient()} fallback={AuthorizationPage}>
			<FileSystemPage/>
			<FileModal/>
		</Show>
	)
}

export default App
