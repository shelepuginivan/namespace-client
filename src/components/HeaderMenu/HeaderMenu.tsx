import {JSX} from 'solid-js'

import currentWorkingDirectory from '../../store/currentWorkingDirectory'
import HeaderMenuButton from '../../ui/HeaderMenuButton/HeaderMenuButton'
import styles from './HeaderMenu.module.css'

const HeaderMenu = (): JSX.Element => {
	const [getCWD, setCWD] = currentWorkingDirectory

	const back = () => {
		const backDir: string[] = getCWD().split('/')
		backDir.pop()
		setCWD(backDir.join('/') || '/')
	}

	return (
		<menu class={styles.menu}>
			<HeaderMenuButton onclick={back}>&lt;</HeaderMenuButton>
		</menu>
	)
}

export default HeaderMenu
