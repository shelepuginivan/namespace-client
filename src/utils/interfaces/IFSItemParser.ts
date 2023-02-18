export interface IFSItemParser {
	getExtensionIcon(path: string): string
	getReadableSize(size: number): string
}
