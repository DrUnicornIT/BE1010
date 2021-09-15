Open Terminal
    $ node main.js

Timestamp : http://localhost:3500/timestamp
Logs : http://localhost:3500/logs
    => Submit Data
Logs?limit=<N>  Ex : http://localhost:3500/logs?limit=3

Sometimes, express has error "throw er; // Unhandled 'error' event" 
Fix : change port(main.js:5) 
