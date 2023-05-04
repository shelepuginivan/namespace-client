import {JSX} from 'solid-js'

import fsItemOpenedInModal from '../../store/fsItemOpenedInModal'
import showFileIcons from '../../store/showFileIcons'
import {FileData} from '../../utils/FileData'
import FileSystemItem from '../../utils/FileSystemItem'
import {IFileSystemItem} from '../../utils/interfaces/IFileSystemItem'
import styles from './FileIcon.module.css'

const FileIcon = (props: IFileSystemItem): JSX.Element => {
	const getShowFileIcons = showFileIcons[0]
	const setFsItemOpenedInModal = fsItemOpenedInModal[1]

	const dragStartHandler = (e: DragEvent) => {
		e.dataTransfer.setData('text', JSON.stringify(props))
		;(e.target as HTMLDivElement).style.opacity = '0.6'
	}

	const dragEndHandler = (e: DragEvent) => {
		(e.target as HTMLDivElement).style.opacity = 'initial'
	}

	const rightClickHandler = (e: MouseEvent) => {
		e.preventDefault()
		setFsItemOpenedInModal(new FileSystemItem(props))
	}

	return (
		<div
			data-displayicon={getShowFileIcons()}
			class={styles.fileIcon}
			ondblclick={() => setFsItemOpenedInModal(new FileSystemItem(props))}
			oncontextmenu={rightClickHandler}
			draggable={true}
			ondragstart={dragStartHandler}
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

export default FileIcon
