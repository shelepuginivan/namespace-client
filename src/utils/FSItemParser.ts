import css from '../assets/fileExtensionIcons/css.svg'
import dll from '../assets/fileExtensionIcons/dll.svg'
import dmg from '../assets/fileExtensionIcons/dmg.svg'
import html from '../assets/fileExtensionIcons/html.svg'
import iso from '../assets/fileExtensionIcons/iso.svg'
import js from '../assets/fileExtensionIcons/js.svg'
import pdf from '../assets/fileExtensionIcons/pdf.svg'
import sql from '../assets/fileExtensionIcons/sql.svg'
import txt from '../assets/fileExtensionIcons/txt.svg'
import url from '../assets/fileExtensionIcons/url.svg'
import xml from '../assets/fileExtensionIcons/xml.svg'

import archive from '../assets/fileTypeIcons/archive.svg'
import audio from '../assets/fileTypeIcons/audio.svg'
import defaultFile from '../assets/fileTypeIcons/defaultFile.svg'
import folder from '../assets/fileTypeIcons/folder.svg'
import image from '../assets/fileTypeIcons/image.svg'
import video from '../assets/fileTypeIcons/video.svg'

import {IFSItemParser} from './interfaces/IFSItemParser'
import FileSystemItem from './FileSystemItem'

class FSItemParser implements IFSItemParser {
	private readonly extensionIcons = {
		css,
		dll,
		dmg,
		html,
		iso,
		js,
		pdf,
		sql,
		txt,
		url,
		xml,
		bz2: archive,
		gz: archive,
		raw: image,
		rar: archive,
		tar: archive,
		zip: archive,
		'7z': archive
	}
	private readonly fileTypeDescription = {
		py: 'Python File',
		raw: 'Raw Image Format',
		osb: 'osu! storyboard',
		osk: 'osu! skin archive',
		osr: 'osu! replay',
		osu: 'osu! difficulty',
		osz: 'osu! beatmap archive'
	}

	getItemDescription(fileSystemItem: FileSystemItem) {
		return fileSystemItem.mimetype || this.fileTypeDescription[fileSystemItem.extension.replace('.', '')]
	}

	getItemIcon(fileSystemItem: FileSystemItem): string {
		if (fileSystemItem.isDirectory) return folder

		if (fileSystemItem.mimetype) {
			switch (fileSystemItem.mimetype.split('/')[0]) {
				case 'audio': return audio
				case 'image': return image
				case 'video': return video
				default:
			}
		}

		return this.extensionIcons[fileSystemItem.extension.replace('.', '')] || defaultFile
	}


	getReadableSize(fileSystemItem: FileSystemItem): string {
		const units = ['Б', 'КБ', 'МБ', 'ГБ']

		for (let i = 0; i < units.length; i++) {
			if (fileSystemItem.size < 1024 ** (i + 1)) {
				const roundedSizeOfThisUnit = (fileSystemItem.size / (1024 ** i)).toFixed(2)
				return `${roundedSizeOfThisUnit} ${units[i]}`
			}
		}

		return `${fileSystemItem.size} Б`
	}
}

export default new FSItemParser()
