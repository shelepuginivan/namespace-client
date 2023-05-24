import {JSX} from 'solid-js'

import connectionURL from '../../store/connectionURL'
import currentWorkingDirectory from '../../store/currentWorkingDirectory'
import showFileIcons from '../../store/showFileIcons'
import socketioClient from '../../store/socketioClient'
import FileUploadInput from '../../ui/FileUploadInput/FileUploadInput'
import HeaderMenuButton from '../../ui/HeaderMenuButton/HeaderMenuButton'
import {ApiService} from '../../utils/ApiService'
import {backDirectory} from '../../utils/backDirectory'
import styles from './HeaderMenu.module.css'

const HeaderMenu = (): JSX.Element => {
	const getSocketioClient = socketioClient[0]
	const getConnectionURL = connectionURL[0]
	const [getShowFileIcons, setShowFileIcons] = showFileIcons
	const [getCWD, setCWD] = currentWorkingDirectory

	const createDirectory = () => {
		getSocketioClient().emit('createDirectory', `${getCWD()}/Новая папка`)
	}

	const uploadFiles = (e: Event) =>
		ApiService.uploadFiles(
			getCWD(),
			getConnectionURL(),
			getSocketioClient(),
			(e.target as HTMLInputElement).files
		)

	return (
		<menu class={styles.menu}>
			<HeaderMenuButton onclick={() => setCWD('/')}><i class="icon-home"></i></HeaderMenuButton>
			<HeaderMenuButton onclick={() => setCWD(prev => backDirectory(prev))}><i class="icon-back"></i></HeaderMenuButton>
			<HeaderMenuButton disabled={!getShowFileIcons()} onclick={() => setShowFileIcons(false)}><i class="icon-list"></i></HeaderMenuButton>
			<HeaderMenuButton disabled={getShowFileIcons()} onclick={() => setShowFileIcons(true)}><i class="icon-table"></i></HeaderMenuButton>
			<HeaderMenuButton onclick={createDirectory}>Создать папку</HeaderMenuButton>
			<FileUploadInput onchange={uploadFiles}>Загрузить файлы</FileUploadInput>
		</menu>
	)
}

export default HeaderMenu
