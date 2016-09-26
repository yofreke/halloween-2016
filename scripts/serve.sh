#!/bin/bash
set -e

npm run build

npm run serve:matchmaking

npm run serve:gameplay

pm2 logs
