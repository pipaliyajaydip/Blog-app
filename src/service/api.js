import axios from 'axios';
// for api messages
import { API_NOTOFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';

const serverURL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL : serverURL,
    timeout : 10000
    // headers : {
    //     "Content-Type" : "aplication/json"
    // }
})

// axios interceptors (take two call back functions)

// for request (client --> server)
axiosInstance.interceptors.request.use(
    // for successful case
    function (config){
        return config;
    },
    // for error case
    function (error) {
        return Promise.reject(error)
    }
)

// for response (client <-- server)
axiosInstance.interceptors.response.use(
    // for successful received response from server
    function (response){
        // for loader (loading...) we have to stop global loader here (sent request -->  start loader ---> waiting (show loader) --> received response --> stop loader)
        return processResponse(response) // calling this function
    },
    function (error){
        // stop global loader
        return Promise.reject(processError(error)) // calling this function
    }

)

// ifSuccess --> return {isSucess : true, data : response.data}
// ifFailure --> return {isFailure : true, status : string, msg : string, code : int}
const processResponse = (response) => {
    // for successfull
    if (response?.status === 200) {
        return {
            isSuccess : true,
            data : response.data
        }
    } else {
        return {
            isFailure : true,
            status : response?.status,
            msg : response?.message,
            code : response?.code
        }
    }
}

const processError = (error) => {
    if(error.response){
        // Request made and server responded with status other then 2._._ (like 500,401 etc)
        console.log('ERROR IN RESPONSE: ', error.toJSON());
        return{
            isError : true,
            msg : API_NOTOFICATION_MESSAGES.responseFailure,
            code : error.response.status
        }

    } else if (error.request){
        // Request made but no response was received from server
        console.log('ERROR IN REQUEST: ', error.toJSON());
        return{
            isError : true,
            msg : API_NOTOFICATION_MESSAGES.requestFailure,
            code : '' //request is not come to server that's we haven't received any status code
        }
    }else{
        // frontend side error
        console.log('ERROR IN NETWORK: ', error.toJSON());
        return{
            isError : true,
            msg : API_NOTOFICATION_MESSAGES.networkError,
            code : '' //request is not come to server that's we haven't received any status code
        }
    }
}

const API = {};

for(const [key,value] of Object.entries(SERVICE_URLS)){
    API[key] = (body, showUploadProgress, showDownloadProgress) => 
    axiosInstance({
        method : value.method,
        url : value.url,
        data : body,
        responseType : value.responseType,
        onUploadProgress : function (progressEvent){
            if(showUploadProgress){
                let persentageCompleted = Math.round((progressEvent*100)/progressEvent.total)
                showDownloadProgress(persentageCompleted)
            }
        },
        onDownloadProgress : function (progressEvent){
            if(showDownloadProgress){
                let persentageCompleted = Math.round((progressEvent*100)/progressEvent.total)
                showDownloadProgress(persentageCompleted)
            }
        }
    })
}

export {API} ;