import {JSX, ParentProps} from 'solid-js'

import connectionURL from '../../store/connectionURL'
import currentWorkingDirectory from '../../store/currentWorkingDirectory'
import SocketioClient from '../../store/socketioClient'
import {ApiService} from '../../utils/ApiService'
import {preventEventDefault} from '../../utils/preventEventDefault'
import styles from './FileSystemMenu.module.css'

const FileSystemMenu = (props: ParentProps): JSX.Element => {
	const getCWD = currentWorkingDirectory[0]
	const getConnectionURL = connectionURL[0]
	const getSocketioClient = SocketioClient[0]

	const dropHandler = (e: Event) => {
		e.preventDefault()
		e.stopPropagation()

		const files = (e as DragEvent).dataTransfer.files
		const urlTransferCandidate = (e as DragEvent).dataTransfer.getData('URL')

		ApiService.uploadFiles(getCWD(), getConnectionURL(), getSocketioClient(), files, urlTransferCandidate)
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
