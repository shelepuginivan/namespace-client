import {JSX} from 'solid-js'

import currentWorkingDirectory from '../../store/currentWorkingDirectory'
import showFileIcons from '../../store/showFileIcons'
import socketioClient from '../../store/socketioClient'
import HeaderMenuButton from '../../ui/HeaderMenuButton/HeaderMenuButton'
import styles from './HeaderMenu.module.css'
import {backDirectory} from '../../utils/backDirectory'

const HeaderMenu = (): JSX.Element => {
	const getSocketioClient = socketioClient[0]
	const [getCWD, setCWD] = currentWorkingDirectory
	const setShowFileIcons = showFileIcons[1]

	const createDirectory = () => {
		getSocketioClient().emit('createDirectory', `${getCWD()}/Новая папка`)
	}

	return (
		<menu class={styles.menu}>
			<HeaderMenuButton onclick={() => setCWD('/')}><i class="icon-home"></i></HeaderMenuButton>
			<HeaderMenuButton onclick={() => setCWD(prev => backDirectory(prev))}><i class="icon-back"></i></HeaderMenuButton>
			<HeaderMenuButton onclick={() => setShowFileIcons(false)}><i class="icon-list"></i></HeaderMenuButton>
			<HeaderMenuButton onclick={() => setShowFileIcons(true)}><i class="icon-table"></i></HeaderMenuButton>
			<HeaderMenuButton onclick={createDirectory}>Создать папку</HeaderMenuButton>
		</menu>
	)
}

export default HeaderMenu
