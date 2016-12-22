# keystone-test-project

A KeystoneJS Project with various configurations for development and testing purposes

**Note: This project requires Node.js v4.x or newer**

By following the setup instructions, you will have a cloned instance of the keystone repository in a root level folder named `keystone`. This folder is gitignored, so changes to it will not be tracked in this project.

This setup will allow you to use the "test-project" as a test-bed for changes to keystone. You can edit the keystone project, commit to it as normal and verify the changes in the test-project during development.

# Setup Instructions

## Pre-Requisites

* git
* node
* npm

## MacOS / Linux / Any system with BASH

* `npm run setup`

## Windows / Other

* git clone git@github.com:keystonejs/keystone.git
* rm -rf node_modules/keystone
* npm link ./keystone
