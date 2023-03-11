import {JSX, onMount} from 'solid-js'

import styles from './RenameMenu.module.css'
import Input from '../../ui/Input/Input'

type PropsType = {
	currentName: string
	onCancel(e: Event): unknown | Promise<unknown>
	onChangeName(e: Event): unknown | Promise<unknown>
	onSubmit(e: Event): unknown | Promise<unknown>
}

const RenameMenu = (props: PropsType): JSX.Element => {
	let inputRef: HTMLInputElement

	onMount(() => inputRef.select())

	return (
		<menu class={styles.renameMenu}>
			<Input
				ref={inputRef}
				onchange={props.onChangeName} type="text"
				value={props.currentName}
			/>
			<button
				onClick={props.onCancel}
			>
				Отмена
			</button>
			<button
				onClick={props.onSubmit}
			>
				Сохранить
			</button>
		</menu>
	)
}

export default RenameMenu
