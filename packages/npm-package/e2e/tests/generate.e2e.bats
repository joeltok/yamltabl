#!/usr/bin/env bats

load '../../../../node_modules/bats-support/load'
load '../../../../node_modules/bats-assert/load'

@test "should error on an invalid yamltabl configuration" {
  run node dist/packages/npm-package/cli/cli.cjs generate html -i packages/npm-package/e2e/data/invalid.input.yaml -o tmp/invalid.output.html

  assert_failure
  assert_output --partial 'Validation failed'
  assert_output --partial 'column "Column 1" needs to be a key-value pair'
  assert_output --partial '"key | config | style" are protected and cannot be used as column keys'
  assert_output --partial '"key | config | style" are protected and cannot be used as column keys'
}

@test "should generate html from a valid yamltabl configuration" {
  run node dist/packages/npm-package/cli/cli.cjs generate html -i packages/npm-package/e2e/data/valid.input.yaml -o tmp/valid.output.html

  assert_success

  run diff tmp/valid.output.html packages/npm-package/e2e/data/valid.output.html

  assert_success
}

@test "should generate markdown from a valid yamltabl configuration" {
  run node dist/packages/npm-package/cli/cli.cjs generate md -i packages/npm-package/e2e/data/valid.input.yaml -o tmp/valid.output.md

  assert_success

  run diff tmp/valid.output.md packages/npm-package/e2e/data/valid.output.md

  assert_success
}

