export const onFileIconDragStart = <T>(props: T) => (e: DragEvent) => {
	e.dataTransfer.setData('text', JSON.stringify(props));
	(e.target as HTMLDivElement).style.opacity = '0.6'
}
