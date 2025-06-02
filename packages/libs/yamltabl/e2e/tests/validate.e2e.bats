#!/usr/bin/env bats

load '../../../../../node_modules/bats-support/load'
load '../../../../../node_modules/bats-assert/load'

@test "should validate a valid yaml table configuration" {
  run node dist/packages/libs/yamltabl/cli/cli.cjs validate -i packages/libs/yamltabl/e2e/data/good.input.yaml

  assert_success
  assert_output --partial 'ok.'
  refute_output --partial 'Error'
}

@test "should invalidate an invalid yaml table configuration" {
  run node dist/packages/libs/yamltabl/cli/cli.cjs validate -i packages/libs/yamltabl/e2e/data/bad.input.yaml

  assert_failure
  assert_output --partial 'Validation failed'
  assert_output --partial 'column "Column 1" needs to be a key-value pair'
  assert_output --partial '"key | config | style" are protected and cannot be used as column keys'
  assert_output --partial '"key | config | style" are protected and cannot be used as column keys'
}
