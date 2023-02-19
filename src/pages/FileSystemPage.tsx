import ky from 'ky'
import {JSX} from 'solid-js'

import FileIcon from '../components/FileIcon/FileIcon'
import FilesList from '../ui/FilesList/FilesList'
import HeaderMenu from '../components/HeaderMenu/HeaderMenu'
import connectionURL from '../store/connectionURL'
import currentWorkingDirectory from '../store/currentWorkingDirectory'
import itemsInCurrentWorkingDirectory from '../store/itemsInCurrentWorkingDirectory'
import SocketioClient from '../store/socketioClient'
import styles from './Page.module.css'

const FileSystemPage = (): JSX.Element => {
	const getSocketioClient = SocketioClient[0]
	const getItemsInCurrentWorkingDirectory = itemsInCurrentWorkingDirectory[0]
	const getCWD = currentWorkingDirectory[0]
	const getConnectionURL = connectionURL[0]

	const dragCommonHandler = (e: Event) => {
		e.preventDefault()
		e.stopPropagation()
	}

	const dropHandler = (e: Event) => {
		e.preventDefault()
		e.stopPropagation()

		const files: FileList = (e as DragEvent).dataTransfer.files
		const fileUploadBody = new FormData()

		for (let i = 0; i < files.length; i++) {
			fileUploadBody.append(`${getCWD()}/${files[i].name}`, files[i])
		}

		ky.post(`${getConnectionURL()}/files`, {body: fileUploadBody})
			.then(() => getSocketioClient().emit('updateItems', getCWD()))
	}

	return (
		<div class={styles.page}>
			<div
				ondragenter={dragCommonHandler}
				ondragover={dragCommonHandler}
				ondragend={dragCommonHandler}
				ondragleave={dragCommonHandler}
				ondrop={dropHandler}
			>
				<HeaderMenu/>
				<FilesList>
					{getItemsInCurrentWorkingDirectory().map(item => (
						<FileIcon {...item} />
					))}
				</FilesList>
			</div>
		</div>
	)
}

export default FileSystemPage
