import {JSX, Match, Switch} from 'solid-js'

import fsItemOpenedInModal from '../../store/fsItemOpenedInModal'
import {FileData} from '../../utils/FileData'
import {generatePreviewLink} from '../../utils/generatePreviewLink'
import styles from './Preview.module.css'

const Preview = (): JSX.Element => {
	const openedItem = fsItemOpenedInModal[0]

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
					<img class={styles.previewContent} src={generatePreviewLink(openedItem().path)} alt={openedItem().name}/>
				</Match>
				<Match keyed when={openedItem()?.mimetype.startsWith('video')}>
					<video controls preload="metadata" class={styles.previewContent} src={generatePreviewLink(openedItem().path)}>
						Ваш браузер не поддерживает тег <kbd>&lt;video&gt;</kbd>
					</video>
				</Match>
				<Match keyed when={openedItem()?.mimetype.startsWith('audio')}>
					<audio controls preload="metadata" src={generatePreviewLink(openedItem().path)}></audio>
				</Match>
				<Match keyed when={openedItem() && new FileData(openedItem()).displayable}>
					<iframe height="100%" class={styles.previewContent} src={generatePreviewLink(openedItem().path)}></iframe>
				</Match>
			</Switch>
		</div>
	)
}

export default Preview
