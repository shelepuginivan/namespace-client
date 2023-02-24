export const preventEventDefault = (e: Event) => {
	e.preventDefault()
	e.stopPropagation()
}
