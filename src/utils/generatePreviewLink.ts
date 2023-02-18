import connectionURL from '../store/connectionURL'

export const generatePreviewLink = (pathToFile: string): string => {
	const getConnectionURL = connectionURL[0]
	return `${getConnectionURL()}/files/preview?path=${pathToFile}`
}
