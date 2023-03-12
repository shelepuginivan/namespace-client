import {JSX, onMount} from 'solid-js'

import ActionButton from '../../ui/ActionButton/ActionButton'
import Input from '../../ui/Input/Input'
import styles from './RenameMenu.module.css'

type PropsType = {
	currentName: string
	onCancel(e: Event): unknown | Promise<unknown>
	onInputName(e: Event): unknown | Promise<unknown>
	onSubmit(e?: Event): unknown | Promise<unknown>
}

const RenameMenu = (props: PropsType): JSX.Element => {
	let inputRef: HTMLInputElement

	onMount(() => inputRef.select())

	const keydownHandler = (e: KeyboardEvent) => {
		if (e.code === 'Enter') props.onSubmit()
	}

	return (
		<menu class={styles.renameMenu}>
			<Input
				ref={inputRef}
				oninput={props.onInputName} type="text"
				value={props.currentName}
				onkeydown={keydownHandler}
			/>
			<ActionButton onClick={props.onCancel}>
				<span>Отмена</span>
			</ActionButton>
			<ActionButton onClick={props.onSubmit}>
				<span>Сохранить</span>
			</ActionButton>
		</menu>
	)
}

export default RenameMenu
