import FileSystemItem from '../FileSystemItem'

export interface IFSItemParser {
	getItemDescription(fileSystemItem: FileSystemItem): string
	getItemIcon(fileSystemItem: FileSystemItem): string
	getReadableSize(fileSystemItem: FileSystemItem): string
}
