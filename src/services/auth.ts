export type Credentials = {
  username: string
  password: string
}

type User = {
  id: string
  name: string
  email: string
}

// Mocked valid credentials (kept here in the service)
const VALID_USERNAME = 'customer@bank.com'
const VALID_PASSWORD = 'SecurePass123!'

export async function login(creds: Credentials): Promise<User> {
  // Simulate network latency
  await new Promise((res) => setTimeout(res, 1100))

  // Simulate occasional network failure
  if (Math.random() < 0.06) {
    return Promise.reject(new Error('Network error — please try again'))
  }

  const { username, password } = creds

  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    return Promise.resolve({ id: 'u_1', name: 'Adwoa Doe', email: username })
  }

  return Promise.reject(new Error('Invalid username or password'))
}