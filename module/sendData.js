
export const httpRequest =(url, {
    method = 'GET',
    callback,
    body = {},
    headers,
}) =>{
    try {    
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)

    if(headers) {
        for (const [key, value] of Object.entries(headers)) {
            xhr.setRequestHeader(key, value)

        }
    }
    xhr.addEventListener('load', ()=>{
        if (xhr.status < 200 || xhr.status >= 300) {
            callback(new Error(xhr.status), xhr.response)
            return
        }

        const data = JSON.parse(xhr.response)
       if (callback) {
        callback(null, data)
       }
    })
    xhr.addEventListener('error',()=>{
        callback(new Error(xhr.status), xhr.response)
    })
    xhr.send(JSON.stringify(body))
} catch (err) {
    callback(new Error(err))
}
}

export const fetchRequest = async (url,{
    method = 'GET',
    callback,
    body,
    headers,
}) => {
    try {
        const options = {
            method,
        }
        if (body) options.body = JSON.stringify(body);
        if (headers) options.headers = headers;
        const response = await fetch(url, options)

        if (response.ok) {
            const data = await response.json()
            if (callback) callback(null, data)
            return
        } 
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`)
    } catch (error) {
        callback(error);
    }
}