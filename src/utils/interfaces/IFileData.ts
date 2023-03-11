import FileSystemItem from '../FileSystemItem'

export interface IFileData {
	displayable: boolean
	icon: string
	item: FileSystemItem
	sizeString: string
	type: string
}
