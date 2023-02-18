import connectionURL from '../store/connectionURL'

export const generateDownloadLink = (pathToFile: string): string => {
	const getConnectionURL = connectionURL[0]
	return `${getConnectionURL()}/files?path=${pathToFile}`
}
