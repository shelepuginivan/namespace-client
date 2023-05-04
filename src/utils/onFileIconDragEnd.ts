export const onFileIconDragEnd = (e: DragEvent) => {
	(e.target as HTMLDivElement).style.opacity = 'initial'
}
