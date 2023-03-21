import {JSX} from 'solid-js'

import ActionButton from '../../ui/ActionButton/ActionButton'
import styles from './ActionsMenu.module.css'

type PropsType = {
	downloadLink: string
	onDelete(e: Event): unknown | Promise<unknown>
	onSetRenameMode(e: Event): unknown | Promise<unknown>
}

const ActionsMenu = (props: PropsType): JSX.Element => {
	return (
		<menu class={styles.actionsMenu}>
			<ActionButton onclick={props.onSetRenameMode}>
				<i class="icon-rename"/>
				<span>Переименовать</span>
			</ActionButton>
			<a target="_blank" href={props.downloadLink}>
				<i class="icon-download"/>
				<span>Скачать</span>
			</a>
			<ActionButton onclick={props.onDelete}>
				<i class="icon-delete"/>
				<span>Удалить</span>
			</ActionButton>
		</menu>
	)
}

export default ActionsMenu
