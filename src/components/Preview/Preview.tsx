import {JSX, Match, Switch} from 'solid-js'

import fsItemOpenedInModal from '../../store/fsItemOpenedInModal'
import {generatePreviewLink} from '../../utils/generatePreviewLink'
import styles from './Preview.module.css'
import FSItemParser from '../../utils/FSItemParser'

const Preview = (): JSX.Element => {
	const openedItem = fsItemOpenedInModal[0]

	return (
		<div class={styles.preview}>
			<Switch
				fallback={
					<img
						draggable={false}
						src={FSItemParser.getItemIcon(openedItem())}
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
				<Match keyed when={['plain', 'html', 'pdf', 'xml'].includes(openedItem()?.mimetype.split('/').pop())}>
					<iframe class={styles.previewContent} src={generatePreviewLink(openedItem().path)}></iframe>
				</Match>
			</Switch>
		</div>
	)
}

export default Preview
