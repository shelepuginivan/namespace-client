import {Component, JSX} from 'solid-js'

type PropsType = {
	filename: string
	type: string
	sizeString: string
}

const FileStats: Component = (props: PropsType): JSX.Element => {
	return (
		<table>
			<caption>Информация</caption>
			<tbody>
				<tr> <td>Имя файла:</td> <td>{props.filename}</td> </tr>
				<tr> <td>Тип:</td> <td>{props.type}</td> </tr>
				<tr> <td>Размер:</td> <td>{props.sizeString}</td> </tr>
			</tbody>
		</table>
	)
}

export default FileStats
