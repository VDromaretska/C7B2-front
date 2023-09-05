export default function extractBreedName(url: string): string | undefined {
    const regex = /\/breeds\/([^/]+)\//;
    const match = url.match(regex);
    if (match) {
        const breedName = match[1];
        return breedName;
    }
}
