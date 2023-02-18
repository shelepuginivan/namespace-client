import {JSX} from 'solid-js'
import itemsInCurrentWorkingDirectory from '../store/itemsInCurrentWorkingDirectory'
import currentWorkingDirectory from '../store/currentWorkingDirectory'
import connectionURL from '../store/connectionURL'
import FileIcon from '../ui/FileIcon/FileIcon'
import FilesList from '../ui/FilesList/FilesList'
import styles from './Page.module.css'
import HeaderBar from '../ui/HeaderBar/HeaderBar'

const FileSystemPage = (): JSX.Element => {
	const getItemsInCurrentWorkingDirectory = itemsInCurrentWorkingDirectory[0]
	const getCWD = currentWorkingDirectory[0]
	const getConnectionURL = connectionURL[0]

	return (
		<div class={styles.page}>
			<HeaderBar cwd={getCWD()} host={getConnectionURL()}></HeaderBar>
			<FilesList>
				{getItemsInCurrentWorkingDirectory().map(item => (
					<FileIcon
						path={item.path}
						extension={item.extension}
						isDirectory={item.isDirectory}
						name={item.name}
					/>
				))}
			</FilesList>
		</div>
	)
}

export default FileSystemPage
