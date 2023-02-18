import {JSX} from 'solid-js'
import currentWorkingDirectory from '../../store/currentWorkingDirectory'
import styles from './FileIcon.module.css'
import {IFileSystemItem} from '../../utils/interfaces/IFileSystemItem'
import fileTypesIcons from '../../utils/fileTypesIcons'

const FileIcon = (props: IFileSystemItem): JSX.Element => {
	const setCWD = currentWorkingDirectory[1]

	const doubleClickHandler = () => {
		if (props.isDirectory) return setCWD(props.path)
	}


	return (
		<div
			class={styles.fileIcon}
			ondblclick={doubleClickHandler}
		>
			<img
				src={fileTypesIcons[props.isDirectory ? 'folder' : props.extension.replace('.', '')]}
				alt={props.extension}
			/>
			<p>{props.name}</p>
		</div>
	)
}

export default FileIcon
