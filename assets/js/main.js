(function() {
  $(function() {
    return $(document).on('click', '.btn', function(e) {
      if (canFire) {
        doStuff();
      }
      return e.preventDefault();
    });
  });

}).call(this);
