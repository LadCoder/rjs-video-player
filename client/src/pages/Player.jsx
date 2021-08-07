import React from 'react'
import { useParams } from 'react-router'
import { useFetch } from '../api/useFetch'

export default function Player() {
    const { id } = useParams()
    const {data, loading, error} = useFetch(`http://localhost:4000/video/${id}/data`)

    return (
        <div>
            {data &&
            <div>
                <video controls muted autoPlay>
                    <source src={`http://localhost:4000/video/${id}`} type="video/mp4"></source>
                </video>
                <h1>{ data.name }</h1>
            </div>}
        </div>
    )
}