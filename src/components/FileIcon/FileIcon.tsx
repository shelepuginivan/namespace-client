import {JSX} from 'solid-js'
import currentWorkingDirectory from '../../store/currentWorkingDirectory'
import styles from './FileIcon.module.css'
import fsItemOpenedInModal from '../../store/fsItemOpenedInModal'
import FileSystemItem from '../../utils/FileSystemItem'
import {IFileSystemItem} from '../../utils/interfaces/IFileSystemItem'
import FSItemParser from "../../utils/FSItemParser";

const FileIcon = (props: IFileSystemItem): JSX.Element => {
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
			class={styles.fileIcon}
			ondblclick={doubleClickHandler}
			oncontextmenu={rightClickHandler}
		>
			<img
				src={FSItemParser.getExtensionIcon(props.extension || 'folder')}
				alt={props.extension}
			/>
			<p>{props.name}</p>
		</div>
	)
}

export default FileIcon
