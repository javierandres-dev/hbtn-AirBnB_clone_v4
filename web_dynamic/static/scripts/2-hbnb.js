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
    }
    for (const i in objAmen) {
      listName.push(objAmen[i]);
    }
    const names = listName.join(', ');
    $('.amenities h4').text(names);
    $.get('http://localhost:5001/api/v1/status/', function (data) {
      console.log(data.status);
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').remove('available');
      }
    })
  });
});
