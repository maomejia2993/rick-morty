import axios from "axios"
import { useState } from "react"

const useFetch = (url) => {

    const [infoApi, setInfoApi] = useState ()
    const [hasError, serHasError] = useState(false)

        const getApi = () => {
            axios.get(url)
            .then(res => {
                setInfoApi(res.data)
                serHasError(false)
            })
            .catch(err => {
                console.log(err)
                serHasError(true)
            })
            
        }

      return [infoApi, getApi, hasError ]
}
  
export default useFetch