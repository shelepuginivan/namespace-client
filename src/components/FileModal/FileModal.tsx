import {createEffect, createSignal, JSX} from 'solid-js'
import fsItemOpenedInModal from '../../store/fsItemOpenedInModal'
import FileSystemItem from '../../utils/FileSystemItem'
import styles from './FileModal.module.css'
import ModalCloseButton from '../../ui/ModalCloseButton/ModalCloseButton'
import {generateDownloadLink} from '../../utils/generateDownloadLink'
import FSItemParser from '../../utils/FSItemParser'
import Preview from '../Preview/Preview'

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

	return (
		<dialog class={styles.fileModal} open={Boolean(getFsItemOpenedInModal())}>
			<header>
				<h2>{getItemName()}</h2>
				<ModalCloseButton onClick={closeModal}>X</ModalCloseButton>
			</header>
			<main>
				<Preview/>

				<section class={styles.actions}>
					<table>
						<caption>Информация</caption>
						<tbody>
							<tr> <td>Имя файла:</td> <td>{getItemName()}</td> </tr>
							<tr> <td>Тип:</td> <td>{getItemMimetype()}</td> </tr>
							<tr> <td>Размер</td> <td>{getItemSize()}</td> </tr>
						</tbody>
					</table>
					<a href={generateDownloadLink(getItemPath())}>Скачать</a>
				</section>
			</main>
		</dialog>
	)
}

export default FileModal
