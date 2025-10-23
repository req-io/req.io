import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import { ApiResponse } from '../src/api/types'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  const win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'reqio.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    },

    width: 1450,
    height: 900,
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});

ipcMain.handle("rest", async (_event: any, url: string, options?: RequestInit): Promise<ApiResponse> => {
  try {
    const response = await fetch(url, options);
    
    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });
    
    const contentType = response.headers.get('content-type') || '';
    let data: any;

    if (contentType.includes('application/json')) {
      data = await response.json();
    } else if (contentType.includes('application/xml') || contentType.includes('text/xml')) {
      data = await response.text();
    } else if (contentType.includes('text/html')) {
      data = await response.text();
    } else if (contentType.includes('text/')) {
      data = await response.text();
    } else if (contentType.includes('application/octet-stream') || 
               contentType.includes('image/') || 
               contentType.includes('application/pdf')) {
      const buffer = await response.arrayBuffer();
      data = Buffer.from(buffer).toString('base64');
    } else {
      data = await response.text();
    }
    
    return { 
      ok: response.ok,
      data,
      status: response.status,
      statusText: response.statusText,
      headers
    };
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    console.error('IPC Handler - Error:', error);
    return { ok: false, error };
  }
});

app.whenReady().then(createWindow)
