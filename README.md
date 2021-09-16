# Simple Blog Api
A simple blog api that enables writers perform authentication and authorization actions as well as create, read, update and delete blog posts and associated comments.

---
## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/Dabby42/Blog_API.git
    $ cd Blog_API
    $ yarn install

## Configure app

Open a `.env` file and copy the environment variables in the .env.example file. You will need to populate these variables

## Running the project

    $ yarn dev

## Simple build for production

    $ yarn start

---

## Link to hosted api

Query https://enigmatic-brook-38674.herokuapp.com/ on any browser or api client to gain full access of this api.

## API Documentation

Visit https://documenter.getpostman.com/view/10399184/U16qGMeE on any browser for better understanding on how to query this api.

## Extras

Navigate to the Blog_Mobile_App folder to gain access to the simple mobile app that serves as a client to this api, further configuartions as regard OS's (beyond the scope of this assessment) will be needed to power this mobile app as it is a react-native application.
