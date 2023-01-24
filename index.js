"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("update-electron-app")();
// import('menubar')
var menubar = require("menubar");
var path = require("path");
var _a = require("electron"), app = _a.app, nativeImage = _a.nativeImage, Tray = _a.Tray, Menu = _a.Menu, globalShortcut = _a.globalShortcut, shell = _a.shell;
var contextMenu = require("electron-context-menu");
var image = nativeImage.createFromPath(path.join(__dirname, "images/iconTemplate.png"));
app.on("ready", function () {
    var tray = new Tray(image);
    var mb = menubar.menubar({
        browserWindow: {
            icon: image,
            transparent: path.join(__dirname, "images/iconApp.png"),
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
            app.dock.hide();
        }
        var contextMenuTemplate = [
            // add links to github repo and vince's twitter
            {
                label: "Quit",
                accelerator: "Command+Q",
                click: function () {
                    app.quit();
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
                    shell.openExternal("https://music.youtube.com/");
                },
            },
            {
                type: "separator",
            },
        ];
        tray.on("right-click", function () {
            mb.tray.popUpContextMenu(Menu.buildFromTemplate(contextMenuTemplate));
        });
        tray.on("click", function (e) {
            //check if ctrl or meta key is pressed while clicking
            e.ctrlKey || e.metaKey
                ? mb.tray.popUpContextMenu(Menu.buildFromTemplate(contextMenuTemplate))
                : null;
        });
        var menu = new Menu();
        globalShortcut.register("CommandOrControl+Shift+g", function () {
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
        Menu.setApplicationMenu(menu);
        // open devtools
        // window.webContents.openDevTools();
        console.log("Menubar app is ready.");
    });
    app.on("web-contents-created", function (e, contents) {
        if (contents.getType() == "webview") {
            // open link with external browser in webview
            contents.on("new-window", function (e, url) {
                e.preventDefault();
                shell.openExternal(url);
            });
            // set context menu in webview
            contextMenu({
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
                    app.quit();
                if (key === "r")
                    contents.reload();
            });
        }
    });
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
    app.commandLine.appendSwitch("disable-backgrounding-occluded-windows", "true");
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
