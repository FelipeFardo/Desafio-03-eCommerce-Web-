import { api } from './api-client'

interface AuthenticateUserRequest {
  email: string
  password: string
}

interface AuthenticateUserResponse {
  accessToken: string
}

export async function authenticateUser({
  email,
  password,
}: AuthenticateUserRequest) {
  const response = await api.post<AuthenticateUserResponse>('/sessions', {
    email,
    password,
  })
  console.log(response.data)
  return response.data
}
