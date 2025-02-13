document.addEventListener('DOMContentLoaded', function() {
    const namespace = 'tbvl22';
    const key = 'homepage';
  
    // Use CountAPI to increment and retrieve the hit count
    fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
      .then(response => response.json())
      .then(data => {
        const counterElement = document.getElementById('impression-counter');
        if (counterElement) {
          counterElement.innerText = data.value;
        }
      })
      .catch(error => {
        console.error('Error fetching impression count:', error);
        const counterElement = document.getElementById('impression-counter');
        if (counterElement) {
          counterElement.innerText = 'Unavailable';
        }
      });
  });
  