const electron = require('electron');
const app = electron.app;
app.allowRendererProcessReuse = true;
const path = require('path');
const isDev = require('electron-is-dev');
if (process.env.NODE_ENV === 'development') { require('electron-reload')(__dirname)}
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.loadURL( isDev ?
            'http://localhost:3000'
            :
            `file://${path.join(__dirname, '../build/index.html')}`,
    );

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
});
