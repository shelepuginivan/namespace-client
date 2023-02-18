import {createEffect, createSignal, JSX} from 'solid-js'
import fsItemOpenedInModal from '../../store/fsItemOpenedInModal'
import FileSystemItem from '../../utils/FileSystemItem'
import styles from './FileModal.module.css'
import ModalCloseButton from "../../ui/ModalCloseButton/ModalCloseButton";
import {generateDownloadLink} from "../../utils/generateDownloadLink";

const FileModal = (): JSX.Element => {
	const [getFsItemOpenedInModal, setFsItemOpenedInModal] = fsItemOpenedInModal
	const [getItemName, setItemName] = createSignal<string>('')
	const [getItemPath, setItemPath] = createSignal<string>('')

	createEffect(() => {
		if (getFsItemOpenedInModal() instanceof FileSystemItem) {
			setItemName(getFsItemOpenedInModal().name)
			setItemPath(getFsItemOpenedInModal().path)
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
					тут будет превью
					и метаданные
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
