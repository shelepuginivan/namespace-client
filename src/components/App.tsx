import {createEffect, JSX, Show} from 'solid-js'

import AuthorizationPage from '../pages/AuthorizationPage'
import FileSystemPage from '../pages/FileSystemPage'
import connectionURL from '../store/connectionURL'
import currentWorkingDirectory from '../store/currentWorkingDirectory'
import itemsInCurrentWorkingDirectory from '../store/itemsInCurrentWorkingDirectory'
import socketioClient from '../store/socketioClient'
import {IFileSystemItem} from '../utils/interfaces/IFileSystemItem'
import FileModal from './FileModal/FileModal'

const App = (): JSX.Element => {
	const getConnectionURL = connectionURL[0]
	const getSocketioClient = socketioClient[0]
	const getCWD = currentWorkingDirectory[0]

	const setItemsInCurrentWorkingDirectory = itemsInCurrentWorkingDirectory[1]

	createEffect(() => getSocketioClient()?.emit('changeDir', getCWD()))

	createEffect(() => {
		document.querySelector('title').innerText = `nameSpace - ${getCWD()} [${getConnectionURL()}]`
	})

	createEffect(() => {
		getSocketioClient()?.on('updateDirItems', dirItemsString => {
			setItemsInCurrentWorkingDirectory(JSON.parse(dirItemsString) as IFileSystemItem[])
		})

		getSocketioClient()?.on('contentChanged', directory => {
			if (directory === getCWD()) {
				getSocketioClient().emit('changeDir', getCWD())
			}
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
