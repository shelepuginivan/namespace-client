import ky from 'ky'
import {JSX, ParentProps} from 'solid-js'

import connectionURL from '../../store/connectionURL'
import currentWorkingDirectory from '../../store/currentWorkingDirectory'
import SocketioClient from '../../store/socketioClient'
import {preventEventDefault} from '../../utils/preventEventDefault'
import styles from './FileSystemMenu.module.css'

const FileSystemMenu = (props: ParentProps): JSX.Element => {
	const getCWD = currentWorkingDirectory[0]
	const getConnectionURL = connectionURL[0]
	const getSocketioClient = SocketioClient[0]

	const dropHandler = (e: Event) => {
		e.preventDefault()
		e.stopPropagation()

		const files: FileList = (e as DragEvent).dataTransfer.files
		const fileUploadBody = new FormData()

		const urlTransferCandidate = (e as DragEvent).dataTransfer.getData('URL')

		if (urlTransferCandidate) {
			const url = new URL(urlTransferCandidate)
			const urlFile = new Blob([`[InternetShortcut]\r\nURL=${url}`])

			fileUploadBody.append(`${getCWD()}/${url.hostname}${url.pathname.replace(/\//g, '-')}.url`, urlFile)
		}

		Array.from(files).forEach(file => fileUploadBody.append(`${getCWD()}/${file.name}`, file))

		ky.post(`${getConnectionURL()}/files`, {body: fileUploadBody})
			.then(() => getSocketioClient().emit('updateItems', getCWD()))
	}


	return (
		<div
			class={styles.fileSystemMenu}
			ondragenter={preventEventDefault}
			ondragover={preventEventDefault}
			ondragend={preventEventDefault}
			ondragleave={preventEventDefault}
			ondrop={dropHandler}
		>
			{props.children}
		</div>
	)
}

export default FileSystemMenu
