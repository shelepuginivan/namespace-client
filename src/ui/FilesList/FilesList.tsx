import {JSX, ParentProps} from 'solid-js'
import styles from './FilesList.module.css'
import FileModal from "../../components/FileModal/FileModal";

const FilesList = (props: ParentProps): JSX.Element => {
	return (
		<div class={styles.filesList}>
			{props.children}

			<FileModal/>
		</div>
	)
}

export default FilesList
