import apk from '../assets/fileExtensionIcons/apk.svg'
import css from '../assets/fileExtensionIcons/css.svg'
import dll from '../assets/fileExtensionIcons/dll.svg'
import dmg from '../assets/fileExtensionIcons/dmg.svg'
import html from '../assets/fileExtensionIcons/html.svg'
import iso from '../assets/fileExtensionIcons/iso.svg'
import js from '../assets/fileExtensionIcons/js.svg'
import osu from '../assets/fileExtensionIcons/osu.svg'
import pdf from '../assets/fileExtensionIcons/pdf.svg'
import py from '../assets/fileExtensionIcons/py.svg'
import rs from '../assets/fileExtensionIcons/rs.svg'
import sql from '../assets/fileExtensionIcons/sql.svg'
import txt from '../assets/fileExtensionIcons/txt.svg'
import url from '../assets/fileExtensionIcons/url.svg'
import vim from '../assets/fileExtensionIcons/vim.svg'
import xml from '../assets/fileExtensionIcons/xml.svg'
import archive from '../assets/fileTypeIcons/archive.svg'
import audio from '../assets/fileTypeIcons/audio.svg'
import defaultFile from '../assets/fileTypeIcons/defaultFile.svg'
import folder from '../assets/fileTypeIcons/folder.svg'
import image from '../assets/fileTypeIcons/image.svg'
import video from '../assets/fileTypeIcons/video.svg'
import FileSystemItem from './FileSystemItem'
import {IFileData} from './interfaces/IFileData'

export class FileData implements IFileData {
	private static _instances: FileData[] = []

	private readonly _extensionIcons = new Map([
		['apk', apk],
		['css', css],
		['dll', dll],
		['dmg', dmg],
		['html', html],
		['iso', iso],
		['js', js],
		['pdf', pdf],
		['py', py],
		['sql', sql],
		['rs', rs],
		['txt', txt],
		['url', url],
		['vim', vim],
		['xml', xml],
		['bz2', archive],
		['gz', archive],
		['raw', image],
		['rar', archive],
		['tar', archive],
		['zip', archive],
		['7z', archive],
		['osu', osu],
		['osb', osu],
		['osk', osu],
		['osr', osu],
		['osz', osu]
	])

	private readonly _fileSystemItem: FileSystemItem

	private readonly _filetype = new Map([
		['py', 'Python File'],
		['raw', 'Raw Image Format'],
		['rs', 'Rust File'],
		['osb', 'osu! storyboard'],
		['osk', 'osu! skin archive'],
		['osr', 'osu! replay'],
		['osu', 'osu! difficulty'],
		['osz', 'osu! beatmap archive']
	])

	private _compareItems(x: FileSystemItem, y: FileSystemItem) {
		return (
			x.name === y.name
			&& x.isDirectory === y.isDirectory
			&& x.path === y.path
			&& x.size === y.size
			&& x.extension === y.extension
			&& x.mimetype === y.mimetype
		)
	}

	constructor(fileSystemItem: FileSystemItem) {
		const instance = FileData._instances.find(instance =>
			this._compareItems(instance.item, fileSystemItem)
		)

		if (instance) return instance
		else {
			this._fileSystemItem = fileSystemItem
			FileData._instances.push(this)
			return this
		}
	}

	get displayable(): boolean {
		const [type, subtype] = this._fileSystemItem.mimetype.split('/')
		const displayableSubtypes = ['html', 'json', 'javascript', 'pdf', 'xml']

		return type === 'text' || displayableSubtypes.includes(subtype)
	}

	get icon(): string {
		if (this._fileSystemItem.isDirectory) return folder

		if (this._fileSystemItem.mimetype) {
			switch (this._fileSystemItem.mimetype.split('/')[0]) {
			case 'audio': return audio
			case 'image': return image
			case 'video': return video
			default:
			}
		}

		const extension = this._fileSystemItem.extension.replace('.', '')
		return this._extensionIcons.get(extension) || defaultFile
	}

	get item(): FileSystemItem {return this._fileSystemItem}

	get sizeString(): string {
		const units = ['Б', 'КБ', 'МБ', 'ГБ']

		for (let i = 0; i < units.length; i++) {
			if (this._fileSystemItem.size < 1024 ** (i + 1)) {
				const roundedSizeOfThisUnit = (this._fileSystemItem.size / (1024 ** i)).toFixed(2)
				return `${roundedSizeOfThisUnit} ${units[i]}`
			}
		}

		return `${this._fileSystemItem.size} Б`
	}

	get type(): string {
		const extension = this._fileSystemItem.extension.replace('.', '')
		return this._filetype.get(extension) || this._fileSystemItem.mimetype
	}
}
