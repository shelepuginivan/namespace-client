import {JSX} from 'solid-js'

import fsItemOpenedInModal from '../../store/fsItemOpenedInModal'
import showFileIcons from '../../store/showFileIcons'
import {FileData} from '../../utils/FileData'
import FileSystemItem from '../../utils/FileSystemItem'
import {IFileSystemItem} from '../../utils/interfaces/IFileSystemItem'
import {onFileIconDragEnd} from '../../utils/onFileIconDragEnd'
import {onFileIconDragStart} from '../../utils/onFileIconDragStart'
import styles from './FileIcon.module.css'

const FileIcon = (props: IFileSystemItem): JSX.Element => {
	const getShowFileIcons = showFileIcons[0]
	const setFsItemOpenedInModal = fsItemOpenedInModal[1]

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
			ondragstart={onFileIconDragStart(props)}
			ondragend={onFileIconDragEnd}
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
