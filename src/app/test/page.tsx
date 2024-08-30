import React from 'react'
import MessagingWrapper from '@/app/test/MessagingWrapper'

const TestPage = ({
  searchParams
}: {
  searchParams: { targetUserId: string }
}) => {
  return (
    <div>
      <MessagingWrapper targetUserId={searchParams.targetUserId} />
    </div>
  )
}

export default TestPage
