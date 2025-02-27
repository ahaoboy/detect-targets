const TARGET_MAP: Record<string, Record<string, string[]>> = {
  linux: {
    x86_64: [
      "x86_64-unknown-linux-gnu",
      "x86_64-unknown-linux-musl",
      "x86_64-unknown-linux-gnux32",
    ],
    aarch64: ["aarch64-unknown-linux-gnu", "aarch64-unknown-linux-musl"],
    i686: ["i686-unknown-linux-gnu", "i686-unknown-linux-musl"],
    i586: ["i586-unknown-linux-gnu", "i586-unknown-linux-musl"],
    armv7: [
      "armv7-unknown-linux-gnueabihf",
      "arm-unknown-linux-gnueabihf",
      "arm-unknown-linux-gnueabi",
      "armv7-unknown-linux-musleabi",
      "armv7-unknown-linux-musleabihf",
      "thumbv7neon-unknown-linux-gnueabihf",
    ],
    armv5te: [
      "armv5te-unknown-linux-gnueabi",
      "armv5te-unknown-linux-musleabi",
    ],
    riscv64gc: ["riscv64gc-unknown-linux-gnu", "riscv64gc-unknown-linux-musl"],
    powerpc: ["powerpc-unknown-linux-gnu"],
    powerpc64: ["powerpc64-unknown-linux-gnu"],
    powerpc64le: [
      "powerpc64le-unknown-linux-gnu",
      "powerpc64le-unknown-linux-musl",
    ],
    s390x: ["s390x-unknown-linux-gnu"],
    loongarch64: [
      "loongarch64-unknown-linux-gnu",
      "loongarch64-unknown-linux-musl",
    ],
    sparc64: ["sparc64-unknown-linux-gnu"],
  },
  macos: {
    x86_64: ["x86_64-apple-darwin"],
    aarch64: ["aarch64-apple-darwin"],
  },
  windows: {
    x86_64: [
      "x86_64-pc-windows-msvc",
      "x86_64-pc-windows-gnu",
      "x86_64-pc-windows-gnullvm",
    ],
    i686: [
      "i686-pc-windows-msvc",
      "i686-pc-windows-gnu",
      "i686-pc-windows-gnullvm",
    ],
    i586: ["i586-pc-windows-msvc"],
    aarch64: ["aarch64-pc-windows-msvc", "aarch64-pc-windows-gnullvm"],
    arm64ec: ["arm64ec-pc-windows-msvc"],
  },
  android: {
    aarch64: ["aarch64-linux-android"],
    arm: [
      "arm-linux-androideabi",
      "armv7-linux-androideabi",
      "thumbv7neon-linux-androideabi",
    ],
    i686: ["i686-linux-android"],
    x86_64: ["x86_64-linux-android"],
  },
  ios: {
    aarch64: [
      "aarch64-apple-ios",
      "aarch64-apple-ios-sim",
      "aarch64-apple-ios-macabi",
    ],
    x86_64: ["x86_64-apple-ios", "x86_64-apple-ios-macabi"],
  },
  freebsd: {
    x86_64: ["x86_64-unknown-freebsd"],
    i686: ["i686-unknown-freebsd"],
  },
  netbsd: {
    x86_64: ["x86_64-unknown-netbsd"],
  },
  solaris: {
    x86_64: ["x86_64-pc-solaris"],
    sparcv9: ["sparcv9-sun-solaris"],
  },
  // 其他操作系统可以根据需要添加
}

function normalizeOS(os: string): string {
  const lowerOS = os.toLowerCase()
  switch (lowerOS) {
    case "darwin":
    case "macos":
    case "osx":
      return "macos"
    case "win":
    case "win32":
    case "windows":
      return "windows"
    case "linux":
      return "linux"
    case "android":
      return "android"
    case "ios":
      return "ios"
    case "freebsd":
      return "freebsd"
    case "netbsd":
      return "netbsd"
    case "solaris":
    case "illumos":
      return "solaris"
    default:
      return lowerOS
  }
}

function normalizePlatform(platform: string): string {
  const lowerPlatform = platform.toLowerCase()
  switch (lowerPlatform) {
    case "x64":
    case "amd64":
      return "x86_64"
    case "arm64":
      return "aarch64"
    case "ia32":
    case "x86":
      return "i686"
    case "i586":
      return "i586"
    case "arm":
      return "armv7"
    case "armv5te":
      return "armv5te"
    case "ppc":
      return "powerpc"
    case "ppc64":
      return "powerpc64"
    case "s390x":
      return "s390x"
    case "riscv64":
      return "riscv64gc"
    case "loong64":
    case "loongarch64":
      return "loongarch64"
    case "sparc64":
      return "sparc64"
    case "sparcv9":
      return "sparcv9"
    case "arm64ec":
      return "arm64ec"
    default:
      return lowerPlatform
  }
}

export function detectTargets(
  os = process.platform,
  platform = process.arch,
): string[] {
  const normalizedOS = normalizeOS(os)
  const normalizedPlatform = normalizePlatform(platform)

  return TARGET_MAP[normalizedOS]?.[normalizedPlatform]?.slice() || []
}
