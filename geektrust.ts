import { SoutherosManager } from "./models/southeros-manager";
import fs from 'fs';
import { EOL } from 'os';

const args = process.argv;
if (args.length < 3) {
    console.log('Syntax: npm start --silent <absolute_path_to_input_file>');
    process.exit(0);
}

const inputFile = args[2];
const fileContents = fs.readFileSync(inputFile, "utf-8");
if (!fileContents || fileContents.length === 0) {
    console.log('Input file not found or empty.');
    process.exit(0);   
}

const commands: string[] = fileContents.split(EOL);
const result: string[] = [ 'SPACE' ];

const southerosManager = new SoutherosManager();
for (let command of commands) {
    processCommand(command);
}
if (result.length >= 4) {
    const output = result.join(' ');
    console.log(output);
} else {
    console.log("NONE");
}

function processCommand(command: string) {
    const commandTokens = splitCommandTokens(command);
    const hasAlligience = southerosManager.hasAlligience(commandTokens[0], commandTokens[1]);
    if (hasAlligience && result.indexOf(commandTokens[0]) === -1) {
        result.push(commandTokens[0]);
    }
}
function splitCommandTokens(command: string)  {
    const splitIndex = command.indexOf(' ');

    return [ command.substr(0, splitIndex), command.substr(splitIndex + 1) ];
}
