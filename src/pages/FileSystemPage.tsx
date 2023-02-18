import {JSX} from 'solid-js'
import itemsInCurrentWorkingDirectory from "../store/itemsInCurrentWorkingDirectory";
import FileIcon from "../ui/FileIcon/FileIcon";
import FilesList from "../ui/FilesList/FilesList";

const FileSystemPage = (): JSX.Element => {
	const [getItemsInCurrentWorkingDirectory, setItemsInCurrentWorkingDirectory] = itemsInCurrentWorkingDirectory

	return (
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
	)
}

export default FileSystemPage
