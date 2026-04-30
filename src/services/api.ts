const base_url: string = import.meta.env.VITE_BASE_URL
export const sendUserMessage = async(value: string
)=>{


    try{
        const res = await fetch(`${base_url}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: value
            })
        })
        // res = response.json()
        if(res.ok){
            const reader = res.body?.getReader()
            const decoder = new TextDecoder()

            let text = ''
            if(!reader) return ''
            while(true){
                const {done, value} =  await reader.read()
                if(done) break

                const chunk = decoder.decode(value)
                // console.log(chunk)
                text += chunk
            }
            return text

        } else{
            return  null
        }
    }
    catch(error){
        console.error(error)
        return ''
    }
}