import {JSX} from 'solid-js'

import fsItemOpenedInModal from '../../store/fsItemOpenedInModal'
import showFileIcons from '../../store/showFileIcons'
import FileSystemItem from '../../utils/FileSystemItem'
import FSItemParser from '../../utils/FSItemParser'
import {IFileSystemItem} from '../../utils/interfaces/IFileSystemItem'
import styles from './FileIcon.module.css'

const FileIcon = (props: IFileSystemItem): JSX.Element => {
	const getShowFileIcons = showFileIcons[0]
	const setFsItemOpenedInModal = fsItemOpenedInModal[1]

	const dragStartHandler = (e: DragEvent) => {
		e.dataTransfer.setData('text', JSON.stringify(props))
	}

	const rightClickHandler = (e: Event) => {
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
		>
			<img
				draggable={false}
				src={FSItemParser.getItemIcon(props)}
				alt={props.extension}
			/>
			<p>{props.name}</p>
		</div>
	)
}

export default FileIcon
