import {JSX} from 'solid-js'

import currentWorkingDirectory from '../../store/currentWorkingDirectory'
import fsItemOpenedInModal from '../../store/fsItemOpenedInModal'
import FileSystemItem from '../../utils/FileSystemItem'
import FSItemParser from '../../utils/FSItemParser'
import {IFileSystemItem} from '../../utils/interfaces/IFileSystemItem'
import styles from './FileInline.module.css'

const FileInline = (props: IFileSystemItem): JSX.Element => {
	const setCWD = currentWorkingDirectory[1]
	const setFsItemOpenedInModal = fsItemOpenedInModal[1]

	const doubleClickHandler = () => {
		if (props.isDirectory) return setCWD(props.path)
		setFsItemOpenedInModal(new FileSystemItem(props))
	}

	const rightClickHandler = (e: Event) => {
		e.preventDefault()
		setFsItemOpenedInModal(new FileSystemItem(props))
	}

	return (
		<div
			class={styles.fileInline}
			ondblclick={doubleClickHandler}
			oncontextmenu={rightClickHandler}
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

export default FileInline
