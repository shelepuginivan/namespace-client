import {JSX} from 'solid-js'
import itemsInCurrentWorkingDirectory from '../store/itemsInCurrentWorkingDirectory'
import currentWorkingDirectory from '../store/currentWorkingDirectory'
import connectionURL from '../store/connectionURL'
import FileIcon from '../components/FileIcon/FileIcon'
import FilesList from '../ui/FilesList/FilesList'
import styles from './Page.module.css'
import HeaderBar from '../ui/HeaderBar/HeaderBar'
import HeaderMenu from '../components/HeaderMenu/HeaderMenu'

const FileSystemPage = (): JSX.Element => {
	const getItemsInCurrentWorkingDirectory = itemsInCurrentWorkingDirectory[0]
	const getCWD = currentWorkingDirectory[0]
	const getConnectionURL = connectionURL[0]

	return (
		<div class={styles.page}>
			<HeaderBar cwd={getCWD()} host={getConnectionURL()}></HeaderBar>
			<div>
				<HeaderMenu/>
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
		</div>
	)
}

export default FileSystemPage
