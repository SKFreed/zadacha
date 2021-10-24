$.ajax({
  type: "POST",
  url: "readjson.php",
  success: function (result) {
    $(".table-section")
      .empty()
      .html(
        $("#table-offers--templete").render({ Response: JSON.parse(result) })
      );
    $("#1").find("tr:gt(9)").hide();
    $("#2").find("tr:gt(9)").hide();
    $('#unten').hide();
    $('#unten2').hide();
  },
});

let index1 = 10;
let index2 = 20;
$(document).on('click', '#ten', function () {
  $("#1").find('tr').slice(index1, index2).show(500);
  index1 += 10;
  index2 += 10;
  $('#unten').show(200);
  setTimeout(function () {
    document.querySelector("#ten").scrollIntoView({
      behavior: "smooth",
    });
  }, 100);

});

$(document).on('click', '#unten', function () {
  if (index1 > 10) {
    index1 -= 10;
    index2 -= 10;
    $("#1").find('tr').slice(index1, index2).hide(300);
    if (index1 < 11) {
      $('#unten').hide(200);
    }
  }


});

let index3 = 10;
let index4 = 20;
$(document).on('click', '#ten2', function () {
  $("#2").find('tr').slice(index3, index4).show(500);
  index3 += 10;
  index4 += 10;
  $('#unten2').show(200);
  setTimeout(function () {
    document.querySelector("#ten2").scrollIntoView({
      behavior: "smooth",
    });
  }, 100);
});

$(document).on('click', '#unten2', function () {
  if (index3 > 10) {
    index3 -= 10;
    index4 -= 10;

    $("#2").find('tr').slice(index3, index4).hide(300);
    if (index3 < 11) {
      $('#unten2').hide(200);
    }
  }
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

