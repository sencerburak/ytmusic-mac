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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
Object.defineProperty(exports, "__esModule", { value: true });
Promise.resolve().then(function () { return require('update-electron-app'); });
var menubar = require("menubar");
var path = require("path");
var electron_1 = require("electron");
var contextMenu = Promise.resolve().then(function () { return require("electron-context-menu"); });
var image = electron_1.nativeImage.createFromPath(path.join(__dirname, "images/iconTemplate.png"));
electron_1.app.on("ready", function () {
    var tray = new electron_1.Tray(image);
    var mb = menubar.menubar({
        browserWindow: {
            icon: image,
            transparent: true,
            webPreferences: {
                webviewTag: true,
                // nativeWindowOpen: true,
            },
            width: 450,
            height: 550,
        },
        tray: tray,
        showOnAllWorkspaces: true,
        preloadWindow: true,
        showDockIcon: false,
        icon: image,
    });
    mb.on("ready", function () {
        var window = mb.window;
        if (process.platform !== "darwin") {
            window.setSkipTaskbar(true);
        }
        else {
            electron_1.app.dock.hide();
        }
        var contextMenuTemplate = [
            // add links to github repo and vince's twitter
            {
                label: "Quit",
                accelerator: "Command+Q",
                click: function () {
                    electron_1.app.quit();
                },
            },
            {
                label: "Reload",
                accelerator: "Command+R",
                click: function () {
                    window.reload();
                },
            },
            {
                label: "Open in browser",
                click: function () {
                    electron_1.shell.openExternal("https://music.youtube.com/");
                },
            },
            {
                type: "separator",
            },
        ];
        tray.on("right-click", function () {
            mb.tray.popUpContextMenu(electron_1.Menu.buildFromTemplate(contextMenuTemplate));
        });
        tray.on("click", function (e) {
            //check if ctrl or meta key is pressed while clicking
            e.ctrlKey || e.metaKey
                ? mb.tray.popUpContextMenu(electron_1.Menu.buildFromTemplate(contextMenuTemplate))
                : null;
        });
        var menu = new electron_1.Menu();
        electron_1.globalShortcut.register("CommandOrControl+Shift+g", function () {
            if (window.isVisible()) {
                mb.hideWindow();
            }
            else {
                mb.showWindow();
                if (process.platform == "darwin") {
                    mb.app.show();
                }
                mb.app.focus();
            }
        });
        electron_1.Menu.setApplicationMenu(menu);
        // open devtools
        // window.webContents.openDevTools();
        console.log("Menubar app is ready.");
    });
    electron_1.app.on("web-contents-created", function (e, contents) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(contents.getType() == "webview")) return [3 /*break*/, 2];
                    // open link with external browser in webview
                    contents.on("new-window", function (e, url) {
                        e.preventDefault();
                        electron_1.shell.openExternal(url);
                    });
                    return [4 /*yield*/, 
                        // set context menu in webview
                        contextMenu];
                case 1:
                    // set context menu in webview
                    (_a.sent())({
                        window: contents,
                    });
                    // we can't set the native app menu with "menubar" so need to manually register these events
                    // register cmd+c/cmd+v events
                    contents.on("before-input-event", function (event, input) {
                        var control = input.control, meta = input.meta, key = input.key;
                        if (!control && !meta)
                            return;
                        if (key === "c")
                            contents.copy();
                        if (key === "v")
                            contents.paste();
                        if (key === "a")
                            contents.selectAll();
                        if (key === "z")
                            contents.undo();
                        if (key === "y")
                            contents.redo();
                        if (key === "q")
                            electron_1.app.quit();
                        if (key === "r")
                            contents.reload();
                    });
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); });
    if (process.platform == "darwin") {
        // restore focus to previous app on hiding
        mb.on("after-hide", function () {
            mb.app.hide();
        });
    }
    // open links in new window
    // app.on("web-contents-created", (event, contents) => {
    //   contents.on("will-navigate", (event, navigationUrl) => {
    //     event.preventDefault();
    //     shell.openExternal(navigationUrl);
    //   });
    // });
    // prevent background flickering
    electron_1.app.commandLine.appendSwitch("disable-backgrounding-occluded-windows", "true");
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
