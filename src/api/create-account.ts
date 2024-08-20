import { api } from './api-client'

interface CreateAccountRequest {
  name: string
  email: string
  password: string
}

interface CreateAccountResponse {
  userId: string
}

export async function createAccount({
  email,
  password,
  name,
}: CreateAccountRequest) {
  const response = await api.post<CreateAccountResponse>('/accounts', {
    email,
    password,
    name,
  })

  return response.data
}
