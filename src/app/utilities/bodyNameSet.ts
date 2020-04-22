export function bodyNameSet(organo: string) {
    const organoString = organo.replace(/\s+/g, '');
    const modifiedString = organoString[0].toLowerCase() + organoString.slice(1);
    return modifiedString;
}