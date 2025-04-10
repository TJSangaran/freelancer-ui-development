import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext'

const useEditData = (url, callback) => {
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
                callback(data);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    console.log(err.message);
                }
            });
        return () => abortCont.abort();
    }, [url]);
}

export default useEditData;