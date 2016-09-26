#!/usr/bin/env node
'use strict';

// Do some args parsing

import MatchmakingServer from './MatchmakingServer';

const server = new MatchmakingServer();
server.start(8081);
