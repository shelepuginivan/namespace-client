import {JSX} from 'solid-js'

import {HeaderBarProps} from '../../utils/types/HeaderBarProps'
import styles from './HeaderBar.module.css'

const HeaderBar = (props: HeaderBarProps): JSX.Element => {
	return (
		<header class={styles.headerBar}>{props.host} in {props.cwd}</header>
	)
}

export default HeaderBar
