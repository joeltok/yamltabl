#!/usr/bin/env bash
set -e

for file in $(find . -name '*.bats' | sort); do
  echo "Running $file..."
  bats "$file"
done