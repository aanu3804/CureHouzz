import {useEffect, useState} from 'react'
import { token } from '../config'

const useFetchData = (url) => {
    const [data, setData] = useState([])
    const [loading,setloading] = useState(false)
    const [error, setError] = useState(null)
    useEffect (()=>{
        const fetchData = async ()=>{
            setloading(true)
            try {
                const res = await fetch(url, {
                    headers:{Authorization:`Bearer ${token}`}
                })
    
                const result = await res.json()
    
                if(!res.ok){
                    throw new Error(result.message + "🥺")
                }

                setData(result.data)
                setloading(false)
            } catch (err) {
                setloading(false)
                setError(err.message)
            }

        }
        fetchData()
    },[url])
    return {
        data,
        loading,
        error
    }
}
export default useFetchData