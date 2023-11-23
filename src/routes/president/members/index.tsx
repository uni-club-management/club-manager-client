import React from 'react'
import MembersTable from './components/membersTable'
import ComitteeMembers from './components/committeeMembers'

type Props = {}

const members = (props: Props) => {
  return (
    <>  
    <ComitteeMembers />
        <MembersTable/>
    </>
    )
}

export default members