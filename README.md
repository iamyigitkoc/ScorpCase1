# Scorp Sample Project

## Implementation details:

This project implements every features given in the project specifications. On top the specification, I tried to add my own flavor into both frontend code and design.

The components designed for reusability. Because of this reason, 'SOLID' principles and other software engineering techniques and patterns (e.g. 'Observer') applied whiled developing.

The design is mobile-first oriented for better experience on mobile.

The source code can be found in './src' directory. 

./src/lang includes all localization files and language configuration.

./src/style includes all global styles and variables to change design configuration. (e.g. color theme)

./src/components includes all Vue components. 
- 'sub-components' are part of layout but not directly used in global Vue app rather used inside components. 
- 'form-components' includes all form field designs and bundled inside FormCompoments.js for easier import.
- 'pages' includes all page designs.

## Running for testing: 

Project already includes a testing server, thus running 'npm i' would be enough to configure a testing environment.

The command for starting the test server is 'npm run serve'. It serves the ./public directory.

Only file handwritten in public directory is index.html.

Public directory already includes production ready assets. But you can also run 'npx mix build --production' to build project again.

## Opening website:

Without rebuilding:

```shell
1. npm install --only=production
2. npm run serve
```

With rebuilding:

```shell
1. npm install
2. npx mix build --production
3. npm run serve
```

### Further details:

For detailed explanation about the setup, used packages and requirements please check [OTHERDETAILS.md](./OTHERDETAILS.md)