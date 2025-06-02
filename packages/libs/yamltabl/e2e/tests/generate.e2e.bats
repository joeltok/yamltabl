#!/usr/bin/env bats

load '../../../../../node_modules/bats-support/load'
load '../../../../../node_modules/bats-assert/load'

@test "should generate html from a valid yaml table configuration" {
  run node dist/packages/libs/yamltabl/cli/cli.cjs generate html -i packages/libs/yamltabl/e2e/data/good.input.yaml -o tmp/good.output.html

  assert_success

  run diff packages/libs/yamltabl/e2e/data/good.output.html tmp/good.output.html

  assert_success
}

@test "should generate markdown from a valid yaml table configuration" {
  run node dist/packages/libs/yamltabl/cli/cli.cjs generate md -i packages/libs/yamltabl/e2e/data/good.input.yaml -o tmp/good.output.md

  assert_success

  run diff packages/libs/yamltabl/e2e/data/good.output.md tmp/good.output.md

  assert_success
}

