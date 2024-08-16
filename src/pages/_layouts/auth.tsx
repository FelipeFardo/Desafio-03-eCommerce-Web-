import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <>
      <h1>Hello world</h1>
      <Outlet />
    </>
  )
}
