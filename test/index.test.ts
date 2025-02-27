import { expect, test } from "vitest"
import { detectTargets } from "../src"

test("windows", () => {
  expect(detectTargets("win32", "x64")).toEqual([
    "x86_64-pc-windows-msvc",
    "x86_64-pc-windows-gnu",
    "x86_64-pc-windows-gnullvm",
  ])
})

test("macos", () => {
  expect(detectTargets("darwin", "x64")).toEqual([
    "x86_64-apple-darwin",
  ])
  expect(detectTargets("darwin", "arm64")).toEqual([
    "aarch64-apple-darwin",
  ])
})

test("linux", () => {
  expect(detectTargets("linux", "x64")).toEqual([
    "x86_64-unknown-linux-gnu",
    "x86_64-unknown-linux-musl",
    "x86_64-unknown-linux-gnux32",
  ])
  expect(detectTargets("linux", "arm64")).toEqual([
    "aarch64-unknown-linux-gnu",
    "aarch64-unknown-linux-musl",
  ])
})
