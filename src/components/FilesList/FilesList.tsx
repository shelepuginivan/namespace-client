import {JSX} from 'solid-js'

import {FilesListProps} from '../../utils/types/FilesListProps'
import styles from './FilesList.module.css'

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
		</div>
	)
}

export default FilesList
