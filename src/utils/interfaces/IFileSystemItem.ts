export interface IFileSystemItem {
	name: string
	extension: string | null
	isDirectory: boolean
	mimetype: string
	path: string
	size: number
}
