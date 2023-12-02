
//API_NOTOFICATION_MESSAGES
export const API_NOTOFICATION_MESSAGES = {
    // for loader loading and success
    loadig : {
        title : 'Loading...',
        message : 'Data is being loaded, please wait...'
    },
    success : {
        title : 'Success',
        message : 'Data successfully loaded'
    },
    // for response and request failure
    responseFailure : {
        title : 'Error',
        message : 'An error accured while fetching response from the server. Please try again '
    },
    requestFailure : {
        title : 'Error',
        message : 'An error accured while parsing request data'
    },
    // for network error
    networkError : {
        title : 'Error',
        message : 'Unable to connect with the server'
    }
}

// API_SERVICE_CALL
// Sample Request
// Need service call {url : '/endpoint', method : 'GET/POST/PUT/DELETE', params : true/false, query : true/false}

export const SERVICE_URLS = {
    userSignup : { url : '/signup', method : 'POST'}
}