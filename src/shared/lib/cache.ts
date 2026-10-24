// biome-ignore lint/suspicious/noExplicitAny: cache holds heterogeneous async results
const cachedData: Record<string, any> = {};

export async function cache<T>(key: string, handler: () => Promise<T>): Promise<T> {
	if (cachedData[key]) {
		return cachedData[key];
	}
	cachedData[key] = await handler();
	return cachedData[key];
}
