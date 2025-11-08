#!/bin/bash

# This script replaces all solid black backgrounds with gradient styles
# Run this from the frontend directory

echo "Updating all solid backgrounds to gradient style..."

# Define the gradient replacement patterns
PRIMARY_CARD="background: linear-gradient(135deg, rgba(26, 26, 46, 0.6), rgba(15, 52, 96, 0.4)), rgba(26, 26, 46, 0.4); backdrop-filter: blur(12px); border: 1px solid rgba(0, 212, 255, 0.2);"

NESTED_ELEMENT="background: rgba(10, 14, 39, 0.3); backdrop-filter: blur(8px);"

# Replace in CSS files
find src -name "*.css" -type f -exec sed -i '' \
  -e 's/background-color: #1a1a1a;/background: linear-gradient(135deg, rgba(26, 26, 46, 0.6), rgba(15, 52, 96, 0.4)), rgba(26, 26, 46, 0.4); backdrop-filter: blur(12px);/g' \
  -e 's/background-color: #0a0a0a;/background: rgba(10, 14, 39, 0.3); backdrop-filter: blur(8px);/g' \
  -e 's/background-color: #141414;/background: linear-gradient(90deg, rgba(0, 212, 255, 0.1), transparent), rgba(15, 52, 96, 0.4);/g' \
  -e 's/background-color: #000000;/background: linear-gradient(135deg, rgba(10, 14, 39, 0.9), rgba(16, 33, 62, 0.9));/g' \
  -e 's/background-color: #2a2a2a;/background: rgba(15, 52, 96, 0.4); backdrop-filter: blur(8px);/g' \
  {} \;

echo "✅ All solid backgrounds updated to gradient style!"
echo "Note: Review the changes and adjust individual components as needed."

