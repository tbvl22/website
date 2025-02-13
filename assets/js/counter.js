
const namespace = 'trustworthylab';
const key = 'homepage';

fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
  .then(response => response.json())
  .then(data => {
    // Update the counter display with the current value.
    document.getElementById('impression-counter').innerText = data.value;
  })
  .catch(error => {
    console.error('Error fetching impression count:', error);
    document.getElementById('impression-counter').innerText = 'Unavailable';
  });
