import {createEffect, createSignal, JSX} from 'solid-js'

import fsItemOpenedInModal from '../../store/fsItemOpenedInModal'
import socketioClient from '../../store/socketioClient'
import ModalCloseButton from '../../ui/ModalCloseButton/ModalCloseButton'
import FileSystemItem from '../../utils/FileSystemItem'
import FSItemParser from '../../utils/FSItemParser'
import {generateLink} from '../../utils/generateLink'
import Preview from '../Preview/Preview'
import styles from './FileModal.module.css'

const FileModal = (): JSX.Element => {
	const getSocketioClient = socketioClient[0]
	const [getFsItemOpenedInModal, setFsItemOpenedInModal] = fsItemOpenedInModal
	const [getItemName, setItemName] = createSignal<string>('')
	const [getItemPath, setItemPath] = createSignal<string>('')
	const [getItemDescription, setItemDescription] = createSignal<string>('')
	const [getItemSize, setItemSize] = createSignal<string>('')

	createEffect(() => {
		const openedFile = getFsItemOpenedInModal()

		if (openedFile instanceof FileSystemItem) {

			setItemName(openedFile.name)
			setItemPath(openedFile.path)
			setItemDescription(FSItemParser.getItemDescription(openedFile))
			setItemSize(FSItemParser.getReadableSize(openedFile))
		}
	})

	const closeModal = () => {
		setFsItemOpenedInModal(null)
	}

	const deleteItem = () => {
		try {
			getSocketioClient().emit('deleteItem', getItemPath())
		} finally {
			closeModal()
		}
	}

	return (
		<dialog class={styles.fileModal} open={Boolean(getFsItemOpenedInModal())}>
			<header>
				<h2>{getItemName()}</h2>
				<ModalCloseButton onClick={closeModal}>X</ModalCloseButton>
			</header>
			<main>
				<Preview/>

				<section class={styles.menu}>
					<table>
						<caption>Информация</caption>
						<tbody>
							<tr> <td>Имя файла:</td> <td>{getItemName()}</td> </tr>
							<tr> <td>Тип:</td> <td>{getItemDescription()}</td> </tr>
							<tr> <td>Размер</td> <td>{getItemSize()}</td> </tr>
						</tbody>
					</table>

					<div class={styles.actions}>
						<a target="_blank" class={styles.action} href={generateLink(getItemPath())}><span class="icon-download"></span>Скачать</a>
						<button class={styles.action} onclick={deleteItem}><span class="icon-delete"></span> Удалить</button>
					</div>
				</section>
			</main>
		</dialog>
	)
}

export default FileModal
