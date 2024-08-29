import React, { ComponentType, FC, ReactNode } from 'react'
import { redirect } from 'next/navigation'

const withAuthentication = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = localStorage.getItem('token')
  if (!isAuthenticated && !isAuthenticated.length) {
    redirect('/login')
  }
  return children
}

export default withAuthentication
