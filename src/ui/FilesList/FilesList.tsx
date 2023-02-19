import {JSX, ParentProps} from 'solid-js'

import styles from './FilesList.module.css'

const FilesList = (props: ParentProps): JSX.Element => {
	return (
		<div class={styles.filesList}>{props.children}</div>
	)
}

export default FilesList
