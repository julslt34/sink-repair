const applicationState = {
	serviceRequests: []
    // plumbers: []
    // completions: []
}

const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/serviceRequests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.serviceRequests = serviceRequests
				// console.log(serviceRequests)
            }
        )
}

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (completions) => {
                // Store the external state in application state
                applicationState.completions = completions
				// console.log(serviceRequests)
            }
        )
}


export const getRequests = () => {
    return applicationState.serviceRequests.map(singleServiceRequest => ({...singleServiceRequest}))
}

export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({...plumber}))
}

export const saveCompletion = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
			document.dispatchEvent(new CustomEvent("stateChanged"))

        })
}



export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    return fetch(`${API}/serviceRequests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
			document.dispatchEvent(new CustomEvent("stateChanged"))

        })
}

export const deleteRequest = (id) => {
    return fetch(`${API}/serviceRequests/${id}`, { method: "DELETE" })
        .then(
            () => {
                document.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}


export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.plumbers = data
            }
        )
}

