import {JSX} from 'solid-js'
import styles from './FileIcon.module.css'
import {IFileSystemItem} from '../../utils/interfaces/IFileSystemItem'
import fileTypesIcons from '../../utils/fileTypesIcons'

const FileIcon = (props: IFileSystemItem): JSX.Element => {
	return (
		<div class={styles.fileIcon}>
			<img
				src={fileTypesIcons[props.isDirectory ? 'folder' : props.extension.replace('.', '')]}
				alt={props.extension}
			/>
			<p>{props.name}</p>
		</div>
	)
}

export default FileIcon
