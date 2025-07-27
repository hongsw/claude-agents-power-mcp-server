#!/bin/bash

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Set the working directory to the parent directory (where sub-agents folder is)
cd "$SCRIPT_DIR/.."

# Use full path to node
/Users/hongmartin/.asdf/installs/nodejs/24.4.0/bin/node "$SCRIPT_DIR/dist/index.js"