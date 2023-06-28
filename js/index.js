// This code waits for the DOM content to load before executing the function
document.addEventListener('DOMContentLoaded', () =>{
    // Selects the form element with the id 'github-form'
  const form = document.querySelector("#github-form");
  // Adds an event listener to the form element that listens for a submit event
  form.addEventListener('submit', (e) => {
     // Prevents the default behavior of the form submitting to a server
      e.preventDefault()
      // Retrieves the value of the search input field
      let search = e.target.search.value

       // Calls the handleSearch function with the search value as an argument
      handleSearch(search)

// Defines the handleSearch function that takes a search argument
function handleSearch() {

     // Sends a GET request to the Github API with the search query included in the URL
  fetch('https://api.github.com/search/users?q=' + search, {
      method: 'GET',
        // Sets the headers for the request to specify the format of the response
      header:{
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github.v3+json'
      },
       // Converts the data to JSON format
      body: JSON.stringify()
  })
  // Converts the response to JSON format and logs it to the console
  .then(res => res.json())
  .then(data => {console.log(data)
     // Clears the previous user and repository cards from the HTML
      document.querySelector('#user-list').innerHTML = ''
      document.querySelector('#repos-list').innerHTML =''
// Iterates through each user in the response and creates a card for them
      data.items.forEach(user => {
          console.log(user)
           // Creates an HTML element for the user card
          let userCard = document.createElement('li')
          userCard.className = 'all-users'
          userCard.innerHTML = `
              <div class='content'>
                  <h3> User: ${user.login}</h3>
                  <p> URL: ${user.html_url}</p>
                  <div class ='repos'>
                  <button class='repo-button' style='margin-bottom: 25px'>
                  Repositories
                  </button>
                  </div>
                  <img src=${user.avatar_url} />
              </div>`
         // Appends the user card to the HTML
         document.querySelector('#user-list').appendChild(userCard)   

         // Selects the newly created button for each user
         const repoButton = document.querySelector('.repo-button')
         console.log(repoButton)
         repoButton.addEventListener('click', () => {
            // Sends a GET request to the user's repository URL
             fetch(user.repos_url, {
             method: 'GET',
             // Sets the headers for the request to specify the format of the response
             header:{
                 'Content-Type': 'application/json',
                 Accept: 'application/vnd.github.v3+json'
             },
              // Converts the data to JSON format
             body: JSON.stringify()
          })
              // Converts the response to JSON format and logs it to the console
             .then(res => res.json())
             .then(data => {
             
            // Iterates through each repository in the response and creates a card for them
             data.forEach(repo => {

                  let repoCard = document.createElement('li')
                  repoCard.innerHTML = `
                  <h4> ${repo.name} </h4>
                  <p> ${repo.html_url}</p>
                  `
                  document.querySelector('#repos-list').appendChild(repoCard)

             })
          })

         })


  })

})
}
})
})  
