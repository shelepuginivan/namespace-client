import connectionURL from '../store/connectionURL'

export const generateLink = (pathToFile: string): string => {
	const getConnectionURL = connectionURL[0]
	return `${getConnectionURL()}/files?path=${pathToFile}`
}
