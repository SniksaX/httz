export function formEncoderHelper(rawBodyString: string) {
    const pairs = rawBodyString.split('&');
    const result = new Map<string, string>();

    pairs.forEach(pair => {
        const [encodedKey, encodedValue] = pair.split("=");
        const key = decodeURIComponent(encodedKey);
        const value = decodeURIComponent(encodedValue || '');
        result.set(key, value);
    });
    return result
}