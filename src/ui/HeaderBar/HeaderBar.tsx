import {JSX} from 'solid-js'
import {HeaderBarProps} from '../../utils/types/HeaderBarProps'

const HeaderBar = (props: HeaderBarProps): JSX.Element => {
	return (
		<header>{props.host} in {props.cwd} - nameSpace</header>
	)
}

export default HeaderBar
