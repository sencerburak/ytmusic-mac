module.exports = {
    packagerConfig: {
        name: "Youtube Music",
        executableName: "Youtube Music",
        icon: "images/Icon",
        appBundleId: "com.okumus.ytmusicmac",
        extendInfo: {
            LSUIElement: "true",
        },
        osxSign: {
            hardenedRuntime: false,
            gatekeeperAssess: false,
        },
    },
    publishers: [
        {
            name: "@electron-forge/publisher-github",
            config: {
                repository: {
                    owner: "sencerb88",
                    name: "ytmusic-mac",
                },
                prerelease: true,
            },
        },
    ],
    rebuildConfig: {},
    makers: [
        {
            name: "@electron-forge/maker-dmg",
            platforms: ["darwin"],
            config: {},
        },
    ],
};
