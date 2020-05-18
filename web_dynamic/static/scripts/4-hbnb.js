// Global variable that storage selected amenities
const objAmen = {};
$(document).ready(function () {
  const checkbox = $('.amenities .popover ul li input[type="checkbox"]');
  // Event click for amenities checks
  checkbox.bind('click', function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');
    const listName = [];
    if (this.checked) {
      if (!(id in objAmen)) {
        objAmen[id] = name;
      }
    } else {
      delete (objAmen[id]);
	console.log('Entra delete');
    }
    for (const i in objAmen) {
      listName.push(objAmen[i]);
    }
    const names = listName.join(', ');
    $('.amenities h4').text(names);
  });
  // Get is used to verify if API 
  $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/status/',
    type: 'GET',
    success: function (data) {
      if (data.status == 'OK'){
        $('#api_status').addClass('available');
      }   
    },
    error: function () {
      console.log('error API connection');
    }
  });

  // Send a POST request
  $.post({
    url: 'http://localhost:5001/api/v1/places_search/',
    data: JSON.stringify({amenities: []}),
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      allPlaces(data);
    }
  });

});

// Function whit a loop to create and paint the articles that contain places
const allPlaces = function (data) {
  $('section.places').children().remove();
  const arrPlaces = [];
  for (const place of data) {
    arrPlaces.push(place.name.toLowerCase());
  }
  // Sort names list in alphabetical order
  arrPlaces.sort();
  const objPlaces = data.sort((x, y) => arrPlaces.indexOf(x.name.toLowerCase()) - arrPlaces.indexOf(y.name.toLowerCase()));

  for (const place of objPlaces) {
    $(  `
      <article>
      <div class="title_box">
      <h2>${ place.name }</h2>
      <div class="price_by_night">${ place.price_by_night }</div>
      </div>
      <div class="information">
      <div class="max_guest">${ place.max_guest }</div>
      <div class="number_rooms">${ place.number_rooms }</div>
      <div class="number_bathrooms">${ place.number_bathrooms }</div>
      </div>
      <div class="user">
      </div>
      <div class="description">
      ${ place.description }
      </div>
      </article>
      `).appendTo('section.places');
  }
};

// Button search click event
$('.filters button').click( function() {
  const objFilters = {};
  // Only the key is added if objAmen is not empty
  if (!(jQuery.isEmptyObject(objAmen))) {
    objFilters['amenities'] = Object.keys(objAmen);
  }
  search_places(objFilters);
});


function search_places(objFilters) {
  // Send a POST request
  $.post({
    url: 'http://localhost:5001/api/v1/places_search/',
    data: JSON.stringify(objFilters),
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      if (data.length == 0) {
        alert('No places for this filters')
      } else {
        allPlaces(data);
      }
    }
  });
}
