https://crates.io/crates/detect-targets

Detect the targets supported at runtime, which might be different from TARGET
which is detected at compile-time.

Return targets supported in the order of preference. If target_os is linux and
it support gnu, then it is preferred to musl.

If target_os is mac and it is aarch64, then aarch64 is preferred to x86_64.

Check [this issue](https://github.com/cargo-bins/cargo-binstall/issues/155) for
more information.
