import { useState, useEffect } from "react";

const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

const useBackendData = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${baseurl}/api/user/storeData`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
            })
            .catch((err) => {
                setError(err);
            });
    }, []);

    return { data, error, setData };
};

export default useBackendData;