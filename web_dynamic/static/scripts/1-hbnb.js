$( document ).ready(function() {
  const checkbox = $('.amenities input[type="checkbox"]');
  checkbox.bind('click',function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');
    const obj = {};
    const arr = [];
    if (this.checked) {
      obj[id] = name;
    } else {
      delete (obj[id]);
    }
    for (const i in obj) {
      arr.push(obj[i]);
    }
    let names = arr.join(', ');
    $('.amenities h4').text(names);
    console.log(arr);
  });
});
