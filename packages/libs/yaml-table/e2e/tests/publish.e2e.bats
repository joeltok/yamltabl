#!/usr/bin/env bats

load '../../../../../node_modules/bats-support/load'
load '../../../../../node_modules/bats-assert/load'

# Tests run in sequence

@test "should spin up verdaccio" {
  # remove the local registry to prevent conflicts
  rm -rf tmp/local-registry

  # Setup Verdaccio to publish the project locally
  echo "🔧 setting up test env" > tmp/bats.log
  pnpm exec verdaccio --config packages/oss/verdaccio/config.yml &
  echo "verdaccio started" >> tmp/bats.log

  echo "Waiting for Verdaccio to be ready..." >> tmp/bats.log
  for i in {1..20}; do
    if curl -s http://localhost:4873/-/ping > /dev/null; then
      echo "Verdaccio is up" >> tmp/bats.log
      break
    fi
    echo "Waiting... ($i)" >> tmp/bats.log
    sleep 0.5
  done
}

@test "publish yamltable" {
  # Publish to verdaccio
  pnpm exec nx run yaml-table:publish-npm

  # Wait for package to become available in Verdaccio
  echo "Waiting for yaml-table to be retrievable..." >> tmp/bats.log
  for i in {1..20}; do
    if curl -s http://localhost:4873/yamltable | grep '"name": "yamltable"' > /dev/null; then
      echo "Package is published and available" >> tmp/bats.log
      break
    fi
    echo "Waiting for package... ($i)" >> tmp/bats.log
    sleep 0.5
  done
}

@test "should validate that yamltable can be pulled from the local registry" {
  export npm_config_registry=http://localhost:4873
  run pnpm dlx yamltable --help
  assert_success
}

@test "should validate that yamltable can be used in a js project" {
  rm -rf /tmp/test-install
  mkdir /tmp/test-install
  cd /tmp/test-install
  npm init -y
  npm set registry http://localhost:4873/

  npm install yamltable
  echo "const { yamlTableToHTML } = require('yamltable')" > index.js; 
  echo "console.log(yamlTableToHTML)" >> index.js;
  run node index.js
  assert_success
  assert_output --partial '[AsyncFunction: yamlTableToHTML]'
}

@test "should kill verdaccio" {
  echo "Killing Verdaccio" >> tmp/bats.log
  lsof -ti :4873 | xargs kill -9
  echo "verdaccio killed" >> tmp/bats.log
}