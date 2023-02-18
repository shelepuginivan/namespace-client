import {IFSItemParser} from './interfaces/IFSItemParser'
import bmp from '../assets/ext-icons/bmp.svg'
import css from '../assets/ext-icons/css.svg'
import dll from '../assets/ext-icons/dll.svg'
import dmg from '../assets/ext-icons/dmg.svg'
import folder from '../assets/ext-icons/folder.svg'
import gif from '../assets/ext-icons/gif.svg'
import html from '../assets/ext-icons/html.svg'
import iso from '../assets/ext-icons/iso.svg'
import jpg from '../assets/ext-icons/jpg.svg'
import js from '../assets/ext-icons/js.svg'
import mov from '../assets/ext-icons/mov.svg'
import mp3 from '../assets/ext-icons/mp3.svg'
import pdf from '../assets/ext-icons/pdf.svg'
import png from '../assets/ext-icons/png.svg'
import psd from '../assets/ext-icons/psd.svg'
import raw from '../assets/ext-icons/raw.svg'
import sql from '../assets/ext-icons/sql.svg'
import svg from '../assets/ext-icons/svg.svg'
import txt from '../assets/ext-icons/txt.svg'
import xml from '../assets/ext-icons/xml.svg'
import zip from '../assets/ext-icons/zip.svg'

class FSItemParser implements IFSItemParser {
	private readonly extensionIcons = {
		bmp,
		css,
		dll,
		dmg,
		folder,
		gif,
		html,
		iso,
		jpg,
		js,
		mov,
		mp3,
		pdf,
		png,
		psd,
		raw,
		sql,
		svg,
		txt,
		xml,
		zip
	}
	getExtensionIcon(extension: string): string {
		return this.extensionIcons[extension.replace('.', '')]
	}


	getReadableSize(size: number): string {
		const units = ['Б', 'КБ', 'МБ', 'ГБ']

		for (let i = 0; i < units.length; i++) {
			if (size < 1024 ** (i + 1)) {
				const roundedSizeOfThisUnit = (size / (1024 ** i)).toFixed(2)
				return `${roundedSizeOfThisUnit} ${units[i]}`
			}
		}

		return `${size} Б`
	}
}

export default new FSItemParser()
