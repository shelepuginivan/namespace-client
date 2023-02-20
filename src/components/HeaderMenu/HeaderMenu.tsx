import {JSX} from 'solid-js'

import currentWorkingDirectory from '../../store/currentWorkingDirectory'
import showFileIcons from '../../store/showFileIcons'
import HeaderMenuButton from '../../ui/HeaderMenuButton/HeaderMenuButton'
import styles from './HeaderMenu.module.css'

const HeaderMenu = (): JSX.Element => {
	const [getCWD, setCWD] = currentWorkingDirectory
	const setShowFileIcons = showFileIcons[1]

	const back = () => {
		const backDir: string[] = getCWD().split('/')
		backDir.pop()
		setCWD(backDir.join('/') || '/')
	}

	return (
		<menu class={styles.menu}>
			<HeaderMenuButton onclick={() => setCWD('/')}><i class="icon-home"></i></HeaderMenuButton>
			<HeaderMenuButton onclick={back}><i class="icon-back"></i></HeaderMenuButton>
			<HeaderMenuButton onclick={() => setShowFileIcons(false)}><i class="icon-list"></i></HeaderMenuButton>
			<HeaderMenuButton onclick={() => setShowFileIcons(true)}><i class="icon-table"></i></HeaderMenuButton>
		</menu>
	)
}

export default HeaderMenu
