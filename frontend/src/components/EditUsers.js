import React, {useState, useEffect} from 'react'
import {getAll} from '../crud'
import {uriBase, apiVer} from '../Config'
import UserCard from './UserCard'

export default function EditUsers (props) {
    
    const [users, setUsers] = useState([])

    const refresh = () => {

        getAll(`${uriBase}${apiVer}users`)
        .then(allUsers => {
            setUsers(allUsers)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        refresh()
    },[])
    
    return (
        <div>
            <h2>Users</h2>
            {
                users.map(user => {
                    return (
                    <UserCard key={user._id} user={user} refresh={refresh}></UserCard>
                    )
                })
            }
        </div>
    )
}