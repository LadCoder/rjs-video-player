import React from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '../api/useFetch'

export default function Home() {
    const {data, loading, error} = useFetch('http://localhost:4000/videos')

    return (
        <div className="container">
            <div className="row">
                { data && data.map(video =>
                    <div className="col-md-4" key={video.id}>
                        <Link to={`/player/${video.id}`}>
                            <div className="card border-0">
                                <img src={`http://localhost:4000${video.thumbnail}`} alt={video.name} />
                                <div className="card-body">
                                    <p>{video.name}</p>
                                    <p>{video.duration}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}