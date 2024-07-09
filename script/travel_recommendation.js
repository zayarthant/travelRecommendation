async function fetchTravelRecommendations() {
  try {
    const response = await fetch('res/travel_recommendation_api.json');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

fetchTravelRecommendations().then(r => console.log('Ended'));
