import {createEffect, createSignal, JSX} from 'solid-js'
import fsItemOpenedInModal from '../../store/fsItemOpenedInModal'
import FileSystemItem from '../../utils/FileSystemItem'
import styles from './FileModal.module.css'
import ModalCloseButton from '../../ui/ModalCloseButton/ModalCloseButton'
import {generateLink} from '../../utils/generateLink'
import FSItemParser from '../../utils/FSItemParser'
import Preview from '../Preview/Preview'
import ky from 'ky'

const FileModal = (): JSX.Element => {
	const [getFsItemOpenedInModal, setFsItemOpenedInModal] = fsItemOpenedInModal
	const [getItemName, setItemName] = createSignal<string>('')
	const [getItemPath, setItemPath] = createSignal<string>('')
	const [getItemMimetype, setItemMimetype] = createSignal<string>('')
	const [getItemSize, setItemSize] = createSignal<string>('')

	createEffect(() => {
		if (getFsItemOpenedInModal() instanceof FileSystemItem) {
			setItemName(getFsItemOpenedInModal().name)
			setItemPath(getFsItemOpenedInModal().path)
			setItemMimetype(getFsItemOpenedInModal().mimetype)
			setItemSize(FSItemParser.getReadableSize(getFsItemOpenedInModal().size))
		}
	})

	const closeModal = () => {
		setFsItemOpenedInModal(null)
	}

	const deleteItem = async () => {
		try {
			await ky.delete(generateLink(getItemPath()))
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
							<tr> <td>Тип:</td> <td>{getItemMimetype()}</td> </tr>
							<tr> <td>Размер</td> <td>{getItemSize()}</td> </tr>
						</tbody>
					</table>

					<div class={styles.actions}>
						<a class={styles.action} href={generateLink(getItemPath())}><span class="icon-download"></span>Скачать</a>
						<button class={styles.action} onclick={deleteItem}><span class="icon-delete"></span> Удалить</button>
					</div>
				</section>
			</main>
		</dialog>
	)
}

export default FileModal
