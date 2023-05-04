import {createEffect, createSignal, JSX, Match, Switch} from 'solid-js'

import connectionURL from '../../store/connectionURL'
import fsItemOpenedInModal from '../../store/fsItemOpenedInModal'
import {ApiService} from '../../utils/ApiService'
import {FileData} from '../../utils/FileData'
import styles from './Preview.module.css'

const Preview = (): JSX.Element => {
	const openedItem = fsItemOpenedInModal[0]
	const getConnectionURL = connectionURL[0]
	const [getPreviewLink, setPreviewLink] = createSignal<string>('')

	createEffect(() => {
		setPreviewLink(ApiService.previewLink(getConnectionURL(), openedItem()?.path))
	})

	return (
		<div class={styles.preview}>
			<Switch
				fallback={
					<img
						draggable={false}
						src={openedItem() ? new FileData(openedItem()).icon : ''}
						alt="Не удалось загрузить фотографию"
					/>
				}>
				<Match keyed when={openedItem()?.mimetype.startsWith('image')}>
					<img
						class={styles.previewContent}
						src={getPreviewLink()}
						alt={openedItem().name}
					/>
				</Match>
				<Match keyed when={openedItem()?.mimetype.startsWith('video')}>
					<video
						controls
						preload="metadata"
						class={styles.previewContent}
						src={getPreviewLink()}
					>
						Ваш браузер не поддерживает тег <kbd>&lt;video&gt;</kbd>
					</video>
				</Match>
				<Match keyed when={openedItem()?.mimetype.startsWith('audio')}>
					<audio
						controls
						preload="metadata"
						src={getPreviewLink()}
					/>
				</Match>
				<Match keyed when={openedItem() && new FileData(openedItem()).displayable}>
					<iframe
						height="100%"
						class={styles.previewContent}
						src={getPreviewLink()}
					/>
				</Match>
			</Switch>
		</div>
	)
}

export default Preview
