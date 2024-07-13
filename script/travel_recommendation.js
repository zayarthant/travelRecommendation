async function fetchTravelRecommendations(keyword) {
  try {
    const response = await fetch('res/travel_recommendation_api.json');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const travelData = await response.json();
    const countries = travelData.countries;
    const temples = travelData.temples;
    const beaches = travelData.beaches;

    console.log(keyword);

    for (const beach of beaches) {
      if (beach.name.toLowerCase().includes(keyword)
          || beach.description.toLowerCase().includes(keyword)) {
        addRec(beach.imageUrl, beach.name, beach.description);
      }
    }

    for (const temple of temples) {
      if (temple.name.toLowerCase().includes(keyword)
          || temple.description.toLowerCase().includes(keyword)) {
        addRec(temple.imageUrl, temple.name, temple.description);
      }
    }

    for (const country of countries) {
      for (const city of country.cities) {
        if (city.name.toLowerCase().includes(keyword)
            || city.description.toLowerCase().includes(keyword)) {
          addRec(city.imageUrl, city.name, city.description);
        }
      }
    }

  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

function searchRec() {
  const inputElement = document.getElementById('searchInput');
  const inputValue = inputElement.value;
  const keyword = inputValue.toLowerCase();
  inputElement.value = keyword;

  document.getElementById('recCC').innerHTML = '';

  fetchTravelRecommendations(keyword).then();

}

function clearSearch() {
  const inputElement = document.getElementById('searchInput');
  inputElement.value = '';
}

function addRec(image, title, context) {
  var outerDiv = document.createElement('div');
  outerDiv.className = 'w3-white w3-card-2 w3-round-large w3-padding-small w3-margin-top';
  var img = document.createElement('img');
  img.className = 'w3-image';
  img.style.width = '100%';
  img.src = image;
  outerDiv.appendChild(img);
  var innerDiv = document.createElement('div');
  var h3 = document.createElement('h3');
  h3.textContent = title;
  innerDiv.appendChild(h3);
  var p = document.createElement('p');
  p.className = 'w3-justify';
  p.textContent = context;
  innerDiv.appendChild(p);
  outerDiv.appendChild(innerDiv);
  document.getElementById('recCC').appendChild(outerDiv);
}

