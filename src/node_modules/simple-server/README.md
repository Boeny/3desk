# simple-server
Simple nodeJS server allows you to run a multiple sites on a different ports.

Just add your port and a related path of your site to the "config/hosts.js" and run the "node start".

The entry point of the site must be a module, that exports a routing function: (path, response) => {}
