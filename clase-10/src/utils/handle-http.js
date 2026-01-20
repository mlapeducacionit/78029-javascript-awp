
const handleHttp = async (url, options = {}) => {

    try {
        const res = await fetch(url, options)  // Petición con verbo GET HTTP

        if ( !res.ok ) {
            throw new Error('No se pudo hacer la petición')
        }
        console.log(res)
        const data = await res.json()
        console.log(data)
        return data

    } catch (error) {
        throw error        
    }
}

export default handleHttp
