import {JSX} from 'solid-js'

import FileIcon from '../../components/FileIcon/FileIcon'
import FileSystemMenu from '../../components/FileSystemMenu/FileSystemMenu'
import FolderIcon from '../../components/FolderIcon/FolderIcon'
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu'
import currentWorkingDirectory from '../../store/currentWorkingDirectory'
import itemsInCurrentWorkingDirectory from '../../store/itemsInCurrentWorkingDirectory'
import FilesList from '../../ui/FilesList/FilesList'
import {backDirectory} from '../../utils/backDirectory'
import page from '../Page.module.css'

const FileSystemPage = (): JSX.Element => {
	const getItemsInCurrentWorkingDirectory = itemsInCurrentWorkingDirectory[0]
	const getCWD = currentWorkingDirectory[0]

	return (
		<main class={page.page}>
			<FileSystemMenu>
				<HeaderMenu/>
				<FilesList>
					{
						getCWD() === '/' ? <></> : <FolderIcon
							name=".."
							extension=""
							isDirectory={true}
							mimetype="folder"
							path={backDirectory(getCWD())}
							size={0}
						/>
					}
					{
						getItemsInCurrentWorkingDirectory().map(item => (
							item.isDirectory ? <FolderIcon {...item}/> : <FileIcon {...item}/>
						))
					}
				</FilesList>
			</FileSystemMenu>
		</main>
	)
}

export default FileSystemPage
