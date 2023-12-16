import MembersTable from './components/membersTable'
import ComitteeMembers from './components/committeeMembers'
import {useParams} from "react-router-dom";
import {useContext} from "react";
import {ClubContext} from "../../../context";


const ClubMembers = () => {

    const {clubId} = useParams();
    const club = useContext(ClubContext)
    const idClub = (clubId && +clubId) ?? club.clubId ?? 0
    return (
        <>
            <ComitteeMembers idClub={+idClub}/>
            <MembersTable idClub={+idClub}/>
        </>
    )
}

export default ClubMembers