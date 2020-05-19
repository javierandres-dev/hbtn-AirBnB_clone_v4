// Global variable that storage selected amenities, states and cities.
const objAmen = {};
const objState = {};
const objCity = {};
$(document).ready(function () {

    // API validation connection 
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

  // Send a POST request for Initial places without filters
  $.post({
    url: 'http://localhost:5001/api/v1/places_search/',
    data: JSON.stringify({amenities: []}),
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      allPlaces(data);
    }
  });

  // Check Amenities
  const checkAmenity = $('.amenities .popover ul li input[type="checkbox"]');
  checkAmenity.bind('click', function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');
    const listName = [];
    if (this.checked) {
      if (!(id in objAmen)) {
        objAmen[id] = name;
      }
    } else {
      delete (objAmen[id]);
    }
    for (const i in objAmen) {
      listName.push(objAmen[i]);
    }
    const names = listName.join(', ');
    $('.amenities h4').text(names);
  });

    // Check States
    const checkState = $('.locations .popover ul li h2 input[type="checkbox"]');
  checkState.bind('click', function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');
    const listName = [];
    if (this.checked) {
      if (!(id in objState)) {
        objState[id] = name;
      }
    } else {
      delete (objState[id]);
    }
    for (const i in objState) {
      listName.push(objState[i]);
    }
    const names = listName.join(', ');
    $('.locations h4').text(names);
  });

  // Check cities
    const checkCity = $('.locations .popover ul li ul li input[type="checkbox"]');
  checkCity.bind('click', function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');
    const listName = [];
    if (this.checked) {
      if (!(id in objState)) {
        objCity[id] = name;
      }
    } else {
      delete (objCity[id]);
    }
    for (const i in objCity) {
      listName.push(objCity[i]);
    }
    const names = listName.join(', ');
    $('.locations h4').text(names);
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
  if (!(jQuery.isEmptyObject(objState))) {
    objFilters['states'] = Object.keys(objState);
  }
  if (!(jQuery.isEmptyObject(objCity))) {
    objFilters['cities'] = Object.keys(objCity);
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
