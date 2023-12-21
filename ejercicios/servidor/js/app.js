const options = {method: 'GET'};

fetch('http://localhost:5000/users', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
