#!/usr/bin/env node
'use strict';

// Do some args parsing

import Server from './Server';

const server = new Server();
server.start(8081);
