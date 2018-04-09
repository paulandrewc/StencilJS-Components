# Stencil Components

Stencil is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool.  Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all. In many cases, Stencil can be used as a drop in replacement for traditional frontend frameworks given the capabilities now available in the browser, though using it as such is certainly not required.

Stencil also enables a number of key capabilities on top of Web Components, in particular Server Side Rendering (SSR) without the need to run a headless browser, pre-rendering, and objects-as-properties (instead of just strings).

## Getting Started With A Test Site
To install this to an existing web project you can use NPM.

To install with NPM please use the following command 
```
npm install @paulandrewc/stencil-components --save
```
Then include the following files in any web output:
> node_modules/@paulandrewc/stencil-components/dist/stencil-components.js
And any files in the following folder 
> node_modules/@paulandrewc/stencil-components/dist/stencil-components/*.js 
**NOTE:- this folder must be in the same location as the js file and have the same name.**

You can now just add the stenci-component.js to your html with a script tag similar to below:
```
<script src="..\js\stencil-components.js"></script>
```

Once the Javascript is included all you need to do is add the component tag to the body and it will add the component.
```
<ternary-graph></ternary-graph>
```

You should now be able to see a triangle on the page.

## Getting Started With A Test Site
To create a very simple test website follow these steps.(you will need to have node and npm installed)
* Create a new folder to hold your project.
* Now open powershell in this folder.
* Create default package.json
```
npm init --yes
```

* Install the package. (The save parameter will add it to your dependencies.)
  * Serve and copyfiles will be used for this example but are not dependencies of the package.
```
npm install @paulandrewc/stencil-components --save
npm install serve -g --save
npm install copyfiles --save
```

* Create a simple HTML page called index.html in a www folder.
```
mkdir www
new-item www\index.html
```

* Change the package.json to make the "scripts" object the same as below.
  * This adds a copyjs command which will copy in the javascript files from the npm package.
  * This also adds a "start" command that will run the copy and serve the website on port 5001.
```
  "name": "Stencil-Components-TestPage",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start" : "npm run copyjs && serve www -p 5001",
    "copyjs" : "copyfiles -f node_modules/@paulandrewc/stencil-components/dist/stencil-components.js www/js && copyfiles -f node_modules/@paulandrewc/stencil-components/dist/stencil-components/*.js www/js/stencil-components",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@paulandrewc/stencil-components": "^1.0.0"
  }
}
```

* Change the index.html to be the following.
  * The script tag points to where the copyjs task will put the javascript file.
  * The tag "ternary-graph" will add the component to the page.
```
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <meta http-equiv="X-UA-Compatible" content="ie=edge">
 <title>Demo</title>
 <script src="..\js\stencil-components.js"></script>
</head>
<body>
 <ternary-graph></ternary-graph>
</body>
</html>
```


**Congrats!!** The website should now be running on port 5001.

Browse to localhost:5001 and you should see the ternary-graph component which is a red blue and green triangle.