"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var southeros_manager_1 = require("./models/southeros-manager");
var fs_1 = __importDefault(require("fs"));
var os_1 = require("os");
var args = process.argv;
if (args.length < 3) {
    console.log('Syntax: npm start --silent <absolute_path_to_input_file>');
    process.exit(0);
}
var inputFile = args[2];
var fileContents = fs_1.default.readFileSync(inputFile, "utf-8");
if (!fileContents || fileContents.length === 0) {
    console.log('Input file not found or empty.');
    process.exit(0);
}
var commands = fileContents.split(os_1.EOL);
var result = ['SPACE'];
var southerosManager = new southeros_manager_1.SoutherosManager();
for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
    var command = commands_1[_i];
    processCommand(command);
}
if (result.length >= 4) {
    var output = result.join(' ');
    console.log(output);
}
else {
    console.log("NONE");
}
function processCommand(command) {
    var commandTokens = splitCommandTokens(command);
    var hasAlligience = southerosManager.hasAlligience(commandTokens[0], commandTokens[1]);
    if (hasAlligience && result.indexOf(commandTokens[0]) === -1) {
        result.push(commandTokens[0]);
    }
}
function splitCommandTokens(command) {
    var splitIndex = command.indexOf(' ');
    return [command.substr(0, splitIndex), command.substr(splitIndex + 1)];
}
