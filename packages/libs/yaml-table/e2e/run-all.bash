#!/usr/bin/env bash
set -e

mkdir -p tmp

for file in $(find . -name '*.bats' | sort); do
  echo "Running $file..."
  bats "$file"
done