import {JSX} from 'solid-js'

import currentWorkingDirectory from '../../store/currentWorkingDirectory'
import showFileIcons from '../../store/showFileIcons'
import HeaderMenuButton from '../../ui/HeaderMenuButton/HeaderMenuButton'
import styles from './HeaderMenu.module.css'
import {backDirectory} from '../../utils/backDirectory'

const HeaderMenu = (): JSX.Element => {
	const setCWD = currentWorkingDirectory[1]
	const setShowFileIcons = showFileIcons[1]

	return (
		<menu class={styles.menu}>
			<HeaderMenuButton onclick={() => setCWD('/')}><i class="icon-home"></i></HeaderMenuButton>
			<HeaderMenuButton onclick={() => setCWD(prev => backDirectory(prev))}><i class="icon-back"></i></HeaderMenuButton>
			<HeaderMenuButton onclick={() => setShowFileIcons(false)}><i class="icon-list"></i></HeaderMenuButton>
			<HeaderMenuButton onclick={() => setShowFileIcons(true)}><i class="icon-table"></i></HeaderMenuButton>
		</menu>
	)
}

export default HeaderMenu
