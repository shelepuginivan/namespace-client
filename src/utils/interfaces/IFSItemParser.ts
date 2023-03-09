import FileSystemItem from '../FileSystemItem'

export interface IFSItemParser {
	canBeDisplayedInIframe(fileSystemItem?: FileSystemItem): boolean
	getItemType(fileSystemItem?: FileSystemItem): string
	getItemIcon(fileSystemItem?: FileSystemItem): string
	getReadableSize(fileSystemItem?: FileSystemItem): string
}
