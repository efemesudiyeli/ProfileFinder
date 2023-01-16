const queryInput = document.getElementById('queryInput');
const resultContainer = document.getElementById('resultContainer')
const blockQuote = document.getElementById('blockquotes')
async function getApi() {

    try {
        const api = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!api.ok) {
            throw new Error('Bir hata meydana geldi.' + api.statusText)
        } else {
            const data = await api.json();

            // query format 
            let queryString = queryInput.value.charAt(0).toUpperCase() + queryInput.value.slice(1);

            for (const user of data) {

                if (queryString == user.username) {

                    // Random foto by id
                    const photoApi = await fetch('https://jsonplaceholder.typicode.com/photos');
                    const photoData = await photoApi.json();
                    let userPhoto;
                    for (const photos of photoData) {
                        if (photos.id == user.id) {
                            console.log(photos)
                            userPhoto = photos.url;
                        }
                    }


                    let html = `                        
                        <div class="card mb-3 mt" style="max-width: 540px;">
                            <div class="row g-0">
                                <div class="col-md-4">
                                <img src="${userPhoto}" class="img-fluid rounded-start" alt="...">
                                </div>
                                <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${user.name}</h5>
                                    <p class="card-text"><small class="text-muted">${user.username}</small></p>
                                    <p class="card-text">${user.phone}</p>
                                    <p class="card-text"><small class="text-muted">${user.address.street}, ${user.address.suite}, ${user.address.city}</small></p>
                                </div>
                                </div>
                            </div>
                        </div>
                    `
                    resultContainer.innerHTML = html
                }
            }
        }
    } catch (error) {

        console.log(error)
    }
}


queryInput.addEventListener('input', getApi)



