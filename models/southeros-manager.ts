import { stringify } from "querystring";

export class SoutherosManager {
    kingdoms: { [key: string]: Kingdom } = {
        SPACE: new Kingdom('SPACE', 'GORILLA'),
        LAND: new Kingdom('LAND', 'PANDA'),
        WATER: new Kingdom('WATER', 'OCTOPUS'),
        ICE: new Kingdom('ICE', 'MAMMOTH'),
        AIR: new Kingdom('AIR', 'OWL'),
        FIRE: new Kingdom('FIRE', 'DRAGON')
    };

    hasAlligience(kingdom: string, secretMessage: string) {
        return this.kingdoms[kingdom.toUpperCase()].hasAlligience(secretMessage);
    }
}

export class Kingdom {
    constructor(public name: string, public emblem: string) {}

    hasAlligience(secretMessage: string): boolean {
        const decryptedMessage = this.decryptMessage(secretMessage, this.emblem.length);
        const emblemCharacters = this.emblem.split('');
        for (let c of decryptedMessage) {
            const index = emblemCharacters.indexOf(c);
            if (index > -1) {
                emblemCharacters.splice(index, 1);
            }
        }

        return emblemCharacters.length === 0;
    }
    private decryptMessage(encryptedMessage: string, key: number): string {
        const decryptedMessage = encryptedMessage.toUpperCase().split('').map(c => this.decryptCharacter(c, key)).join('');
        return decryptedMessage;
    }
    private decryptCharacter(encryptedCharacter: string, key: number): string {
        const encryptedCode = encryptedCharacter.charCodeAt(0);
        let decryptedCode = encryptedCode - key;
        const minCode = "A".charCodeAt(0);
        const maxCode = "Z".charCodeAt(0);
        if (decryptedCode < minCode) {
            decryptedCode = maxCode - minCode + decryptedCode + 1;
        }
        return Buffer.from([decryptedCode]).toString();
    }
}