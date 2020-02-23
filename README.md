# Fixtour &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/enmanuelduran/mediaquerysensor/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/fixtour.svg?style=flat)](https://www.npmjs.com/package/fixtour) [![Coverage Status](https://coveralls.io/repos/github/enmanuelduran/fixtour/badge.svg?branch=master)](https://coveralls.io/github/enmanuelduran/fixtour?branch=master) [![CircleCI](https://circleci.com/gh/enmanuelduran/mediaquerysensor.svg?style=svg)](https://circleci.com/gh/enmanuelduran/mediaquerysensor)

A fast, lightweight library that helps you load external fixtures into your unit test's environment, especially oriented (but not limited) to [Jest](https://github.com/facebook/jest).

## The why?
Usually, jest is a library that is used alongside react, and in react it is very easy to mock your components because of
[enzyme](https://github.com/airbnb/enzyme/), but what happens to the other big group of projects that do not use a virtual-dom 
and keep mocking components with HTML? well, that's why this library exists.

**In a nutshell**, fixtour is a module that helps you keep your HTML, JSON... fixtures isolated and allows you to inject these into your tests
while it is also caching them in the process.

## Installation
Install Fixtour using [`yarn`](https://yarnpkg.com/en/package/jest):

```bash
yarn add --dev fixtour
```

Or [`npm`](https://www.npmjs.com/):

```bash
npm install --save-dev fixtour
```

## Usage
Fixtour exposes its API through the `Fixtour` object, so you just have to import it:

```javascript
import Fixtour from 'fixtour';
```

then you should be able to access its whole API.

## API

### `html(string)`
Receives the route to the file from your project's root, reads the file and injects it into the `document.body`.
It caches the content of the files so if you pass the same route twice the second time it will be fetched from the cache.

```javascript
Fixtour.html('tests/fixtures/test.html')
```

### `json(string)`
Receives the route to the file from your project's root, reads the file and returns the content after validating it and parsing it.
It caches the return value in the same way as `html()`.

```javascript
Fixtour.json('tests/fixtures/test.json')
```

### `clear()`
Clears up the document body through `document.body.innerHTML = ''`. It is recommended that you run this function in the `afterEach` of your test cases.

```javascript
Fixtour.clear();
```

### `clearCache()`
Clears up the cache. Especially helpful in cases where you may be storing very large results, however,
keep in mind that your unit tests should test small chunks of information so having large files might be a code smell for modules that could be improved.

```javascript
Fixtour.clearCache();
```

### `getCachedFixtures()`
Helpful for debugging, returns a object representing all the cached elements.

```javascript
Fixtour.getCachedFixtures();
```



