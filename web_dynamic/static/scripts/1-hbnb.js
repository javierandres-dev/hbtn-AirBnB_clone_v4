if (typeof jQuery === 'function') {
  $(document).ready(function () {
    let listAmenityId = [];
    function recordCheck(){
      console.log('Works!');
    }
    $('.amenities ul li input[type=checkbox]').bind('click',recordCheck);
  });
}
