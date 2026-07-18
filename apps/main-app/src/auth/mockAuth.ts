interface AuthCredentials {
  username: string
  password: string
  role: 'admin' | 'user'
}

const credentials: AuthCredentials[] = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'user', password: 'user123', role: 'user' },
]

export interface DecodedToken {
  username: string
  role: 'admin' | 'user'
  iat: number
}

export function generateMockToken(
  username: string,
  password: string
): { token: string; decoded: DecodedToken } | null {
  const validCreds = credentials.find(
    (c) => c.username === username && c.password === password
  )
  if (!validCreds) return null

  const decoded: DecodedToken = {
    username: validCreds.username,
    role: validCreds.role,
    iat: Date.now(),
  }

  const token = btoa(JSON.stringify(decoded))
  return { token, decoded }
}

export function decodeMockToken(token: string): DecodedToken | null {
  try {
    return JSON.parse(atob(token)) as DecodedToken
  } catch {
    return null
  }
}
