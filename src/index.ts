const TARGET_MAP: Record<string, Record<string, string[]>> = {
  linux: {
    x86_64: ['x86_64-unknown-linux-gnu', 'x86_64-unknown-linux-musl'],
    aarch64: ['aarch64-unknown-linux-gnu', 'aarch64-unknown-linux-musl'],
    i686: ['i686-unknown-linux-gnu', 'i686-unknown-linux-musl'],
    armv7: ['armv7-unknown-linux-gnueabihf'],
    riscv64gc: ['riscv64gc-unknown-linux-gnu'],
  },
  macos: {
    x86_64: ['x86_64-apple-darwin'],
    aarch64: ['aarch64-apple-darwin'],
  },
  windows: {
    x86_64: ['x86_64-pc-windows-msvc', 'x86_64-pc-windows-gnu'],
    i686: ['i686-pc-windows-msvc', 'i686-pc-windows-gnu'],
    aarch64: ['aarch64-pc-windows-msvc'],
  },
}

function normalizeOS(os: string): string {
  const lowerOS = os.toLowerCase()
  switch (lowerOS) {
    case 'darwin':
    case 'macos':
    case 'osx':
      return 'macos'
    case 'win':
    case 'win32':
    case 'windows':
      return 'windows'
    default:
      return lowerOS
  }
}

function normalizePlatform(platform: string): string {
  const lowerPlatform = platform.toLowerCase()
  switch (lowerPlatform) {
    case 'x64':
    case 'amd64':
      return 'x86_64'
    case 'arm64':
      return 'aarch64'
    case 'ia32':
    case 'x86':
      return 'i686'
    case 'arm':
      return 'armv7'
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
