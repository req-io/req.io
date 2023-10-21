## REQ.IO

REQ.IO is a simple native desktop HTTP client created with Electron, Vite, and React for testing APIs locally and experimenting with different HTTP requests.

### Getting started with REQ.IO

To start REQ.IO locally, clone the repository:

```bash
git clone https://github.com/kannananil/req.io.git
cd req.io
```

Install dependencies:

```bash
yarn install --dev
```

Once the dependencies are installed, you can start REQ.IO by running the following command:

```bash
yarn dev
```

This will start the REQ.IO application in a new window.

### Building REQ.IO

To build REQ.IO for production, run the following command:

```bash
yarn build
```

This will create a new directory called `dist` which contains the built REQ.IO application.

### Preview built version in browser

To preview the built version of the application and debug in browser by running the following command:

```bash
yarn preview
```

Once the preview server started press `o` to open the preview

Note: This only works after the build command
