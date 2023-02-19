import {ParentProps} from 'solid-js'

export type FilesListProps = ParentProps & {
	ondragenter: (e: Event) => void
	ondragover: (e: Event) => void
	ondragleave: (e: Event) => void
	ondrop: (e: Event) => void
	ondragend: (e: Event) => void
}
