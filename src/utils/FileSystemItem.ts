import {IFileSystemItem} from './interfaces/IFileSystemItem'

class FileSystemItem implements IFileSystemItem {
	extension: string | null
	isDirectory: boolean
	name: string
	path: string
	mimetype: string
	size: number

	constructor (props: IFileSystemItem) {
		this.extension = props.extension
		this.isDirectory = props.isDirectory
		this.name = props.name
		this.path = props.path
		this.mimetype = props.mimetype
		this.size = props.size
	}
}

export default FileSystemItem
