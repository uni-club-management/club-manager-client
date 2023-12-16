import axios from 'axios'
import {Club, Student} from '../../../../types'
import {useQuery} from '@tanstack/react-query'
import StudentCard from '../../components/studentCard'
import {Card, Flex} from 'antd'

//TODO: Get club id dynamicly

type Props = {
    idClub: number
}
const CommitteeMembers = (props: Props) => {
    let committeeMembers: Student[] = []

    const getClub = async (): Promise<Club> => {
        return await axios.get(`http://localhost:8080/api/v1/clubs/${props.idClub}`).then(
            (res => {
                return res.data
            })
        ).catch(err => {
            console.error('error fetching club data', err)
        })
    }

    const club = useQuery<Club, Error>({
        queryKey: ['club'],
        queryFn: getClub
    })

    if (!club.data) {
        return <StudentCard student={{}} loading={true}/>
    } else {
        committeeMembers = club.data.committeeMembers as Student[]
    }


    return (
        <Card
            style={{background: 'transparent'}}
        >
            <h3>Committee Members</h3>
            <Flex wrap='wrap' gap='middle'>
                {committeeMembers.map((member) => (
                    <StudentCard student={member} loading={!club.data}/>
                ))}
            </Flex>
        </Card>
    )
}

export default CommitteeMembers
