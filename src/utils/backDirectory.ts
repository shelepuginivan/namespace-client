export const backDirectory = (currentDirectory: string): string => {
	const backDir = currentDirectory.split('/')
	backDir.pop()
	return backDir.join('/') || '/'
}
