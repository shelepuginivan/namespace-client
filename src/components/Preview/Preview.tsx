import {createEffect, createSignal, JSX, Match, Switch} from 'solid-js'

import fsItemOpenedInModal from '../../store/fsItemOpenedInModal'
import FileSystemItem from '../../utils/FileSystemItem'
import {generatePreviewLink} from '../../utils/generatePreviewLink'
import styles from './Preview.module.css'
import FSItemParser from '../../utils/FSItemParser'

const Preview = (): JSX.Element => {
	const getFsItemOpenedInModal = fsItemOpenedInModal[0]
	const [getItemName, setItemName] = createSignal<string>('')
	const [getItemPreviewLink, setItemPreviewLink] = createSignal<string>('')
	const [getFileType, setFileType] = createSignal<string>('')
	const [getFileSubtype, setFileSubtype] = createSignal<string>('')

	createEffect(() => {
		if (getFsItemOpenedInModal() instanceof FileSystemItem) {
			const openedFsItem = getFsItemOpenedInModal()

			setItemName(openedFsItem.name)
			setItemPreviewLink(generatePreviewLink(openedFsItem.path))
			setFileType(openedFsItem.mimetype.split('/')[0])
			setFileSubtype(openedFsItem.mimetype.split('/')[1])
		}
	})

	return (
		<div class={styles.preview}>
			<Switch
				fallback={
					<img
						draggable={false}
						src={FSItemParser.getItemIcon(getFsItemOpenedInModal())}
						alt="Не удалось загрузить фотографию"
					/>
			}>
				<Match keyed={true} when={getFileType() === 'image'}>
					<img class={styles.previewContent} src={getItemPreviewLink()} alt={getItemName()}/>
				</Match>
				<Match keyed={true} when={getFileType() === 'video'}>
					<video class={styles.previewContent} src={getItemPreviewLink()} controls={true} preload="metadata">
						Ваш браузер не поддерживает тег <kbd>&lt;video&gt;</kbd>
					</video>
				</Match>
				<Match keyed={true} when={getFileType() === 'audio'}>
					<audio src={getItemPreviewLink()} controls={true} preload="metadata"></audio>
				</Match>
				<Match keyed={true} when={['plain', 'html', 'pdf', 'xml'].includes(getFileSubtype())}>
					<iframe class={styles.previewContent} src={getItemPreviewLink()}></iframe>
				</Match>
			</Switch>
		</div>
	)
}

export default Preview
