import axios from 'axios'

import { env } from '@/env'

export const viaCepApi = axios.create({
  baseURL: env.VITE_VIA_CEP_API_URL,
})

interface GetCepResponse {
  cep: string
  logradouro?: string
  complemento?: string
  unidade?: string
  bairro?: string
  localidade?: string
  uf: string
  ddd: string
  erro?: string
}

export async function getCep(cep: string) {
  const response = await viaCepApi.get<GetCepResponse>(`/ws/${cep}/json/`, {
    // timeout: 5000,
  })

  return response.data
}
