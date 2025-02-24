#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var process = require("process");
var yargs_1 = require("yargs");
var prompts_1 = require("@inquirer/prompts");
function parseArgs() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, yargs_1.default)(process.argv.slice(2)).parse()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
var commandFunctionMap = {
    init: init
};
function execute() {
    return __awaiter(this, void 0, void 0, function () {
        var argv, args, command, commandArgs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, parseArgs()];
                case 1:
                    argv = _a.sent();
                    args = argv._;
                    if (args.length === 0) {
                        console.log('Please provide a command');
                        process.exit(1);
                    }
                    command = args[0];
                    commandArgs = args.slice(1);
                    if (commandFunctionMap[command]) {
                        commandFunctionMap[command](__spreadArray([], commandArgs, true));
                    }
                    else {
                        console.log("Command not found: ".concat(command));
                        process.exit(1);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var directoryFilePath, repoPath, currentFolderName, projectName, projectDescription;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    directoryFilePath = process.cwd();
                    repoPath = path.join(directoryFilePath, '.mojit');
                    currentFolderName = path.basename(directoryFilePath);
                    if (fs.existsSync(repoPath)) {
                        console.log('Mojit already initialized');
                        process.exit(1);
                    }
                    return [4 /*yield*/, (0, prompts_1.input)({ message: "Enter project name (".concat(currentFolderName, ")") })];
                case 1:
                    projectName = _a.sent();
                    return [4 /*yield*/, (0, prompts_1.input)({ message: 'Enter project description (optional)' })];
                case 2:
                    projectDescription = _a.sent();
                    fs.mkdirSync(repoPath);
                    fs.writeFileSync(path.join(repoPath, 'project.json'), JSON.stringify({ name: projectName !== null && projectName !== void 0 ? projectName : currentFolderName, description: projectDescription !== null && projectDescription !== void 0 ? projectDescription : "" }, null, 2));
                    console.log("Mojit initialized in current directory: ".concat(process.cwd()));
                    return [2 /*return*/];
            }
        });
    });
}
execute();
