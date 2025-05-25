#!/usr/bin/env bats

load '../../../../../../node_modules/bats-support/load'
load '../../../../../../node_modules/bats-assert/load'

@test "should spin up verdaccio and publish @yaml-table/yaml-table" {
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
    sleep 1
  done

  # Publish to verdaccio
  pnpm exec nx run yaml-table:publish-npm

  # Wait for package to become available in Verdaccio
  echo "Waiting for @yaml-table/yaml-table to be retrievable..." >> tmp/bats.log
  for i in {1..20}; do
    if curl -s http://localhost:4873/@yaml-table%2fyaml-table | grep '"name": "@yaml-table/yaml-table"' > /dev/null; then
      echo "Package is published and available" >> tmp/bats.log
      break
    fi
    echo "Waiting for package... ($i)" >> tmp/bats.log
    sleep 1
  done

  export npm_config_registry=http://localhost:4873
  run pnpm dlx @yaml-table/yaml-table --help
  assert_success

  # kill verdaccio
  echo "Killing Verdaccio" >> tmp/bats.log
  lsof -ti :4873 | xargs kill -9
  echo "verdaccio killed" >> tmp/bats.log
}