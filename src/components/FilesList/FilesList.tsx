import {JSX} from 'solid-js'
import styles from './FilesList.module.css'
import FileModal from '../FileModal/FileModal'
import {FilesListProps} from "../../utils/types/FilesListProps";

const FilesList = (props: FilesListProps): JSX.Element => {
	return (
		<div
			class={styles.filesList}
			ondragenter={props.ondragenter}
			ondragover={props.ondragover}
			ondragleave={props.ondragleave}
			ondrop={props.ondrop}
			ondragend={props.ondragend}
		>
			{props.children}

			<FileModal/>
		</div>
	)
}

export default FilesList
