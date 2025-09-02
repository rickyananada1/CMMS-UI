#!/bin/bash

# Generate package-lock.json
npm install --package-lock-only

# Verify the file was created
if [ -f "package-lock.json" ]; then
  echo "Successfully generated package-lock.json"
  exit 0
else
  echo "Failed to generate package-lock.json"
  exit 1
fi
