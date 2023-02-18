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
	const [getItemSize, setItemSize] = createSignal<number>(0)

	createEffect(() => {
		if (getFsItemOpenedInModal() instanceof FileSystemItem) {
			setItemName(getFsItemOpenedInModal().name)
			setItemPath(getFsItemOpenedInModal().path)
			setItemMimetype(getFsItemOpenedInModal().mimetype)
			setItemSize(getFsItemOpenedInModal().size)
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
				<div class={styles.preview}>
					<Preview/>
					<span>{getItemMimetype()}</span>
					<span>Размер: {FSItemParser.getReadableSize(getItemSize())}</span>
				</div>

				<section class={styles.actions}>
					<span>Name: {getItemName()}</span>
					<span>Path: {getItemPath()}</span>
					<a href={generateDownloadLink(getItemPath())}>Скачать</a>
				</section>
			</main>
		</dialog>
	)
}

export default FileModal
