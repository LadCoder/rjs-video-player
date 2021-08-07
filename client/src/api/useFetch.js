import { useState, useEffect } from "react"
import axios from 'axios'

export function useFetch(url) {
    const [data, setData] = useState()
    const [loading, setLoading] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        setLoading('Loading...')
        setData(undefined)
        setError(undefined)

        const source = axios.CancelToken.source()
        axios.get(url, { cancelToken: source.token })
            .then (res => {
                setLoading(false)
                console.log(res)
                res.data && setData(res.data)
            })
            .catch(err => {
                setLoading(false)
                setError(`An error occurred`)
            })

        return () => {
            source.cancel();
        }
    }, [url])

    return { data, loading, error }
}