import ky from 'ky'
import {Socket} from 'socket.io-client'

export class ApiService {
	static downloadLink(connectionURL: string, filePath: string): string {
		return `${connectionURL}/files?path=${filePath}`
	}

	static fileFromURL(url: URL): {filename: string, urlFile: Blob} {
		return {
			filename: `${url.hostname}${url.pathname.replace(/\//g, '-')}.url`,
			urlFile: new Blob([`[InternetShortcut]\r\nURL=${url}`])
		}
	}

	static previewLink(connectionURL: string, filePath: string): string {
		return `${connectionURL}/files/preview?path=${filePath}`
	}

	static uploadFiles(
		cwd: string,
		connectionURL: string,
		socket: Socket,
		files: File[] | FileList,
		url?: string
	): void {
		if (!url && files.length === 0) return

		const body = new FormData()

		if (url) {
			const {filename, urlFile} = ApiService.fileFromURL(new URL(url))
			body.append(`${cwd}/${filename}`, urlFile)
		}

		if (files instanceof FileList) files = Array.from(files)

		files.forEach(file => body.append(`${cwd}/${file.name}`, file))

		ky.post(`${connectionURL}/files`, {body})
			.then(() => socket.emit('updateItems', cwd))
	}
}
