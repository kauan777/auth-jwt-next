import { v4 as uuid } from 'uuid'


type signInRequestData = {
    email: string;
    password: string;
}

const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

//aqui seria o body da nossa requisição back-end
export async function signInRequest(data: signInRequestData){

        await delay()

        return{
            token: uuid(),
            user: {
                name: 'Kauan Costa',
                email: "helloworld@gmail.com",
                avatar_url: 'https://github.com/kauan777.png'
            }
        }
}

export async function recoverUserInformation(){
    await delay()

    return{
        user: {
            name: 'Kauan Costa',
            email: "helloworld@gmail.com",
            avatar_url: 'https://github.com/kauan777.png'
        }
    }
}