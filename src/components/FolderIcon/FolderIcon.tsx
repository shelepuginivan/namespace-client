import {JSX} from 'solid-js'
import {IFileSystemItem} from '../../utils/interfaces/IFileSystemItem'
import currentWorkingDirectory from '../../store/currentWorkingDirectory'
import fsItemOpenedInModal from '../../store/fsItemOpenedInModal'
import showFileIcons from '../../store/showFileIcons'
import FileSystemItem from '../../utils/FileSystemItem'
import styles from './FolderIcon.module.css'
import FSItemParser from '../../utils/FSItemParser'
import {preventEventDefault} from '../../utils/preventEventDefault'

const FolderIcon = (props: IFileSystemItem): JSX.Element => {
	const getShowFileIcons = showFileIcons[0]
	const setCWD = currentWorkingDirectory[1]
	const setFsItemOpenedInModal = fsItemOpenedInModal[1]

	const rightClickHandler = (e: Event) => {
		e.preventDefault()
		setFsItemOpenedInModal(new FileSystemItem(props))
	}

	const dropHandler = (e: Event) => {
		e.preventDefault()
		e.stopPropagation()
	}

	return (
		<div
			class={styles.folderIcon}
			data-displayicon={getShowFileIcons()}
			ondblclick={() => setCWD(props.path)}
			oncontextmenu={rightClickHandler}
			ondragenter={preventEventDefault}
			ondragover={preventEventDefault}
			ondragend={preventEventDefault}
			ondragleave={preventEventDefault}
			ondrop={dropHandler}
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

export default FolderIcon
