import {createEffect, createSignal, JSX, Show} from 'solid-js'

import currentWorkingDirectory from '../../store/currentWorkingDirectory'
import fsItemOpenedInModal from '../../store/fsItemOpenedInModal'
import socketioClient from '../../store/socketioClient'
import FileSystemItem from '../../utils/FileSystemItem'
import FSItemParser from '../../utils/FSItemParser'
import {generateLink} from '../../utils/generateLink'
import Preview from '../Preview/Preview'
import styles from './FileModal.module.css'
import Input from '../../ui/Input/Input'

const FileModal = (): JSX.Element => {
	const getSocketioClient = socketioClient[0]
	const getCWD = currentWorkingDirectory[0]
	const [getFsItemOpenedInModal, setFsItemOpenedInModal] = fsItemOpenedInModal
	const [getOpenedFile, setOpenedFile] = createSignal<FileSystemItem>()
	const [getInRenameMode, setInRenameMode] = createSignal<boolean>(false)
	const [getNewName, setNewName] = createSignal<string>('')

	let renameInput: HTMLInputElement

	createEffect(() => {
		const openedFile = getFsItemOpenedInModal()

		if (openedFile instanceof FileSystemItem) {
			setOpenedFile(openedFile)
			setNewName(openedFile.name)
		}
	})

	const closeModal = () => {
		setInRenameMode(false)
		setFsItemOpenedInModal(null)
	}

	const deleteItem = () => {
		try {
			getSocketioClient().emit('deleteItem', getOpenedFile()?.path)
		} finally {
			closeModal()
		}
	}

	const renameItem = () => {
		try {
			const itemToRename = `${getCWD()}/${getOpenedFile()?.name}`
			const newName = `${getCWD()}/${getNewName()}`

			getSocketioClient().emit('renameItem', itemToRename, newName)
		} finally {
			closeModal()
		}
	}

	const setRenameMode = () => {
		setInRenameMode(true)
		renameInput.select()
	}

	return (
		<dialog class={styles.fileModal} open={Boolean(getFsItemOpenedInModal())}>
			<header>
				<h2>{getOpenedFile()?.name}</h2>
				<i class={`icon-close ${styles.closeButton}`} onclick={closeModal}></i>
			</header>
			<main>
				<Preview/>

				<section class={styles.menu}>
					<table>
						<caption>Информация</caption>
						<tbody>
							<tr> <td>Имя файла:</td> <td>{getOpenedFile()?.name}</td> </tr>
							<tr> <td>Тип:</td> <td>{FSItemParser.getItemType(getOpenedFile())}</td> </tr>
							<tr> <td>Размер:</td> <td>{FSItemParser.getReadableSize(getOpenedFile())}</td> </tr>
						</tbody>
					</table>

					<div class={styles.actions}>
						<Show keyed when={!getInRenameMode()} fallback={
							<div class={styles.renameMenu}>
								<Input
									ref={renameInput}
									onchange={e => setNewName((e.target as HTMLInputElement).value)} type="text"
									value={getNewName()}
								/>
								<button class={`${styles.button} ${styles.cancel}`} onClick={() => setInRenameMode(false)}>Отмена</button>
								<button class={`${styles.button} ${styles.submit}`} onClick={renameItem}>Сохранить</button>
							</div>
						}>
							<button class={styles.action} onClick={setRenameMode}>
								<span class="icon-rename"></span> Переименовать
							</button>
							<a target="_blank" class={styles.action} href={generateLink(getOpenedFile()?.path)}><span
								class="icon-download"></span>Скачать</a>
							<button class={styles.action} onClick={deleteItem}><span
								class="icon-delete"></span> Удалить
							</button>
						</Show>
					</div>
				</section>
			</main>
		</dialog>
	)
}

export default FileModal
