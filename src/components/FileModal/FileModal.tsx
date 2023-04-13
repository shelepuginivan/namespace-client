import {createEffect, createSignal, JSX, Show} from 'solid-js'

import currentWorkingDirectory from '../../store/currentWorkingDirectory'
import fsItemOpenedInModal from '../../store/fsItemOpenedInModal'
import socketioClient from '../../store/socketioClient'
import {FileData} from '../../utils/FileData'
import ActionsMenu from '../ActionsMenu/ActionsMenu'
import FileStats from '../FileStats/FileStats'
import Preview from '../Preview/Preview'
import RenameMenu from '../RenameMenu/RenameMenu'
import styles from './FileModal.module.css'
import {ApiService} from '../../utils/ApiService'
import connectionURL from '../../store/connectionURL'

const FileModal = (): JSX.Element => {
	const getSocketioClient = socketioClient[0]
	const getCWD = currentWorkingDirectory[0]
	const getConnectionURL = connectionURL[0]
	const [getOpenedFile, setOpenedFile] = fsItemOpenedInModal
	const [getInRenameMode, setInRenameMode] = createSignal<boolean>(false)
	const [getNewName, setNewName] = createSignal<string>('')

	createEffect(() => setNewName(getOpenedFile()?.name))

	const closeModal = () => {
		setInRenameMode(false)
		setOpenedFile(null)
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

	return (
		<>
			<div
				class={styles.backdrop}
				data-opened={Boolean(getOpenedFile())}
				onclick={closeModal}
			></div>
			<dialog class={styles.fileModal} open={Boolean(getOpenedFile())}>
				<header>
					<h2>{getOpenedFile()?.name}</h2>
					<i class={`icon-close ${styles.closeButton}`} onclick={closeModal}></i>
				</header>
				<main>
					<Preview/>

					<section class={styles.menu}>
						<FileStats
							filename={getOpenedFile()?.name}
							type={getOpenedFile() ? new FileData(getOpenedFile()).type : ''}
							sizeString={getOpenedFile() ? new FileData(getOpenedFile()).sizeString : ''}
						/>

						<div class={styles.actions}>
							<Show keyed when={!getInRenameMode()} fallback={
								<RenameMenu
									currentName={getNewName()}
									onCancel={() => setInRenameMode(false)}
									onInputName={e => setNewName((e.target as HTMLInputElement).value)}
									onSubmit={renameItem}
								/>
							}>
								<ActionsMenu
									downloadLink={ApiService.downloadLink(getConnectionURL(), getOpenedFile()?.path)}
									onDelete={deleteItem}
									onSetRenameMode={() => setInRenameMode(true)}
								/>
							</Show>
						</div>
					</section>
				</main>
			</dialog>
		</>
	)
}

export default FileModal
