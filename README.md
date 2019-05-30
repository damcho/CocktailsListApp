# CocktailsAppReactNavite

## Description
### Obtain cocktail recipes and create your own cocktail

## App Arquitecture
### The app is structured in modules. Each module has compnents (statefull and presentational), actions, and reducers to keep global state of the app.
### Each component has a "smart" container component for handling state and a "dumb" presentational component with a styles file for UI styling.
### Navigation is handlled by react-navigation dependency
### User log in is handled by Firebase authentication


## Dependencies used

### - Axios ( for API connection)
### - redux (for keeping global state of the app)
### - redux-thunk (for async action triggering )
### - react-navigation

### - react-native-vector-icons
### - react-native-form-builder
### - react-native-elements
### - react-native-image-picker
### - react-native-action-button

### - react-native-firebase (for login auth)

## Installation iOS

### 1. Install Node, watchman and react native command line interface

### 2. from terminal go to the cloned project folder and type
```
npm install
```
### (it will install all node-modules from the project dependencies file)

### 3. acces the ios folder and type
```
pod install
```
### (This will download and install Firebase in the ios project and create a workspace file)

### 4.Link node modules with native code
```
react-native link
```
### 5. open workspace file and run app from xcode

