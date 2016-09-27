// Do some args parsing
import Server from './Server';
import config, { parseCLI } from 'config';

parseCLI();

const server = new Server();
server.start(config.port);
