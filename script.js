// Your team is working on an app that will help recruiters review all of a candidates information. You've been assigned to work on one feature for the app - to display a list of repos belonging to a particular GitHub handle.

function watchForm() {
    $('.request_repos').submit(event => {
      event.preventDefault();
      const developerName = $('.developer_name').val();
      urlGenerator(developerName);
    });
  }

// takes user input and creates URL string

function urlGenerator(devName) {
    // headers not really required by assignment?
    // const headers = {
        // q: devName,
        // language: "en",
        // accept: application/vnd.github.v3+json,
    // }

    const baseUrl = `https://api.github.com/users/${devName}/repos`;
    getList(baseUrl);
}

// gets JSON object of all repos belonging to queried developer
function getList(url) {
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }       
            throw new Error(response.statusText);
        }) 
        .then(responseJson => repoDisplayer(responseJson))
        .catch(err => {
            $('.repo_list').text(`Something went wrong: ${err.message}`);
        })
    }
    
// iterates through each finding: for each, appends 'name' and 'archive_url' to .repo_list
function repoDisplayer(repoData) {
    $('.repo_list').empty()
    for (let i = 0; i < repoData.length; i++) {
        let name = repoData[i].name;
        let archiveURL = repoData[i].archive_url;
        $('.repo_list').append(
            `<p>${name}:  <a href="${archiveURL}">${archiveURL}</a></p>
            `
        )
    }
        
        
}

$(watchForm);