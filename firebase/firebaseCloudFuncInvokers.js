const setUser = async userData => {
    await fetch('https://us-central1-wewash-cb69f.cloudfunctions.net/setUser', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
}

const getUser = userId => {
    return new Promise(async (resolve, reject) => {
        await fetch("https://us-central1-wewash-cb69f.cloudfunctions.net/getUser", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "userId": userId
            })
        })
            .then(async (response)=>{
                let responseObj;
                try{
                    responseObj = await response.json();
                    resolve(responseObj)

                } catch(err){
                    resolve(false);
                }
            }).catch(err => reject(`getUser is failed: !!!  ${err}`));
    })
}

export {
    getUser,
    setUser
}