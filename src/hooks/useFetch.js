import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const { customFetch } = useAuth()

    useEffect(() => {
        if (!url) return
        const abortCont = new AbortController();
        customFetch(url, { signal: abortCont.signal })
            .then(res => {
                if (res.status !== 200 && res.status !== 304) {
                    throw Error('could not fetch data')
                }
                return res.json()
            })
            .then(data => {
                setData(data);
                setIsLoading(false);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    setIsLoading(false);
                    setError(err.message);
                }
            });
        return () => abortCont.abort();
    }, [url]);

    return [data, isLoading, error]
}

export default useFetch;