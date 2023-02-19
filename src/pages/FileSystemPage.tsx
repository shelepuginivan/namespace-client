import {JSX} from 'solid-js'
import itemsInCurrentWorkingDirectory from '../store/itemsInCurrentWorkingDirectory'
import currentWorkingDirectory from '../store/currentWorkingDirectory'
import connectionURL from '../store/connectionURL'
import SocketioClient from '../store/socketioClient'
import FileIcon from '../components/FileIcon/FileIcon'
import FilesList from '../components/FilesList/FilesList'
import styles from './Page.module.css'
import HeaderBar from '../ui/HeaderBar/HeaderBar'
import HeaderMenu from '../components/HeaderMenu/HeaderMenu'
import ky from 'ky'

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
			<HeaderBar cwd={getCWD()} host={getConnectionURL()}></HeaderBar>
			<div>
				<HeaderMenu/>
				<FilesList
					ondragenter={dragCommonHandler}
					ondragover={dragCommonHandler}
					ondragend={dragCommonHandler}
					ondragleave={dragCommonHandler}
					ondrop={dropHandler}
				>
					{getItemsInCurrentWorkingDirectory().map(item => (
						<FileIcon {...item} />
					))}
				</FilesList>
			</div>
		</div>
	)
}

export default FileSystemPage
