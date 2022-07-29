import { getRequests, getPlumbers, deleteRequest, saveCompletion } from "./dataAccess.js"


// const requestItems = fetchRequests()

// const convertRequestToListElement = (serviceRequest) => {
//     return `<li>${serviceRequest.description}</li>`}


    export const Requests = () => {
    const serviceRequests = getRequests()
    const plumbers = getPlumbers()
    let html = `
        <ul>
            
        ${
            serviceRequests.map ((serviceRequest) => {
                return `              
                 <li>                 
                     ${serviceRequest.description}
                     <select class="plumbers" id="plumbers">
                     <option value="">Choose</option>
                     ${
                         plumbers.map(
                             plumber => {
                                 return `<option value="${serviceRequest.id}--${plumber.id}">${plumber.name}</option>`
                             }
                         ).join("")
                     }
                 </select>

                    <button class="request__delete"
                            id="request--${serviceRequest.id}">Delete</button>
                </li>
            `
            }) .join("")
        }
    
        </ul>
    `
    return html

}


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})


mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. serviceRequestId
                   2. plumberId
                   3. date_created
            */
            const completion = { 
                serviceRequestId: requestId,
                plumberId: plumberId,
                date_created: Date.now()
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */

            saveCompletion(completion)
        }
    }
)
