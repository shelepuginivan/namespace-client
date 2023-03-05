import ky from 'ky'
import {JSX} from 'solid-js'

import FileIcon from '../../components/FileIcon/FileIcon'
import FilesList from '../../ui/FilesList/FilesList'
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu'
import connectionURL from '../../store/connectionURL'
import currentWorkingDirectory from '../../store/currentWorkingDirectory'
import itemsInCurrentWorkingDirectory from '../../store/itemsInCurrentWorkingDirectory'
import SocketioClient from '../../store/socketioClient'
import page from '../Page.module.css'
import styles from './FileSystemPage.module.css'
import FolderIcon from '../../components/FolderIcon/FolderIcon'
import {preventEventDefault} from '../../utils/preventEventDefault'
import {backDirectory} from '../../utils/backDirectory'

const FileSystemPage = (): JSX.Element => {
	const getSocketioClient = SocketioClient[0]
	const getItemsInCurrentWorkingDirectory = itemsInCurrentWorkingDirectory[0]
	const getCWD = currentWorkingDirectory[0]
	const getConnectionURL = connectionURL[0]

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
		<main class={page.page}>
			<div
				class={styles.fileMenu}
				ondragenter={preventEventDefault}
				ondragover={preventEventDefault}
				ondragend={preventEventDefault}
				ondragleave={preventEventDefault}
				ondrop={dropHandler}
			>
				<HeaderMenu/>
				<FilesList>
					{
						getCWD() === '/' ? <></> : <FolderIcon
							name=".."
							extension=""
							isDirectory={true}
							mimetype="folder"
							path={backDirectory(getCWD())}
							size={0}
						/>
					}
					{
						getItemsInCurrentWorkingDirectory().map(item => (
							item.isDirectory ? <FolderIcon {...item}/> : <FileIcon {...item}/>
						))
					}
				</FilesList>
			</div>
		</div>
	)
}

export default FileSystemPage
