import {JSX} from 'solid-js'

import currentWorkingDirectory from '../../store/currentWorkingDirectory'
import fsItemOpenedInModal from '../../store/fsItemOpenedInModal'
import showFileIcons from '../../store/showFileIcons'
import socketioClient from '../../store/socketioClient'
import {FileData} from '../../utils/FileData'
import FileSystemItem from '../../utils/FileSystemItem'
import {IFileSystemItem} from '../../utils/interfaces/IFileSystemItem'
import {preventEventDefault} from '../../utils/preventEventDefault'
import styles from './FolderIcon.module.css'

const FolderIcon = (props: IFileSystemItem): JSX.Element => {
	const getSocketioClient = socketioClient[0]
	const getShowFileIcons = showFileIcons[0]
	const setCWD = currentWorkingDirectory[1]
	const setFsItemOpenedInModal = fsItemOpenedInModal[1]

	const rightClickHandler = (e: Event) => {
		e.preventDefault()
		setFsItemOpenedInModal(new FileSystemItem(props))
	}

	const dragStartHandler = (e: DragEvent) => {
		e.dataTransfer.setData('text', JSON.stringify(props))
		;(e.target as HTMLDivElement).style.opacity = '0.6'
	}

	const dragEndHandler = (e: DragEvent) => {
		(e.target as HTMLDivElement).style.opacity = 'initial'
	}

	const dropHandler = (e: DragEvent) => {
		e.preventDefault()
		e.stopPropagation()

		const fileDataText = e.dataTransfer.getData('text')
		const fileData: IFileSystemItem = JSON.parse(fileDataText)
		const newPath = `${props.path}/${fileData.name}`

		getSocketioClient().emit('renameItem', fileData.path, newPath)
	}

	return (
		<div
			class={styles.folderIcon}
			data-displayicon={getShowFileIcons()}
			draggable={true}
			ondblclick={() => setCWD(props.path)}
			oncontextmenu={rightClickHandler}
			ondragenter={preventEventDefault}
			ondragstart={dragStartHandler}
			ondragover={preventEventDefault}
			ondragleave={preventEventDefault}
			ondrop={dropHandler}
			ondragend={dragEndHandler}
		>
			<img
				draggable={false}
				src={new FileData(props).icon}
				alt={props.extension}
			/>
			<p>{props.name}</p>
		</div>
	)
}

export default FolderIcon
