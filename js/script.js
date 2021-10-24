$.ajax({
  type: "POST",
  url: "readjson.php",
  success: function (result) {
    $(".table-section")
      .empty()
      .html(
        $("#table-offers--templete").render({ Response: JSON.parse(result) })
      );
    $("#1").find("tr:gt(11)").hide();
    $("#2").find("tr:gt(121)").hide();
  },
});

$("body").on("click", ".table__cell", function() {
    $(this).toggleClass("table__cell--active");
})

let buttonUp = document.querySelector(".btn-up");

window.onscroll = function () {
  if (pageYOffset > 700) {
    buttonUp.classList.remove("hidden");
  } else {
    buttonUp.classList.add("hidden");
  }
};

$("body").on("click", ".btn-up", function() {
  window.scrollTo(0, 0)
})

$("body").on("mousedown", ".btn-up", function (evt) {
  evt.preventDefault();
});

