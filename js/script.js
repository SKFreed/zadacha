$(function () {

    var data = [];
    var manufacturer = [];
    var dataFilter = [];

    $.ajax({
        type: "POST",
        url: "readjson.php",
        success: function (result) {
            data = JSON.parse(result);
            data.sort(function (a,b) {
                if (a.MFR.N > b.MFR.N) return 1;
                if (a.MFR.N < b.MFR.N) return -1;
                return 0;
            });
            $(".table-section").empty().html($("#table-offers--templete").render({Response: data.slice(0,10)}));
            dataFilter = data.slice();
            var count = 0;
            data.forEach(function (item) {
                if (manufacturer.length === 0) {
                    manufacturer.push(item.MFR.N);
                }
                manufacturer.forEach(function (manuf) {
                    if (manuf === item.MFR.N) {
                        count++;
                    }
                });
                if (count === 0) {
                    manufacturer.push(item.MFR.N);
                }
                count = 0;
            });
            $(".product").html($("#manufacturer--templete").render({Response: manufacturer}));
        },
    });


// Соритировка первой таблицы
    $(document).on('click', '.table__title:not(:eq(0))', function () {
        var _sortingDirection = $(this).attr("data-sorting-direction") === "desc" ? "desc" : "asc";
        var _newSortingDirection = (_sortingDirection === "asc" ? "desc" : "asc");
        $(this).attr("data-sorting-direction", _newSortingDirection);

        var tab = $('#1'); //#1
        var _linkedTableParent = $('.table-section'); // .table-section
        var _linkedTable = tab.detach();
        var _linkedTableRows = $("tbody > .tr-one", _linkedTable);
        var cellIndex = $(this)[0].cellIndex;

        _newSortingDirection === "desc" ? $(this).find(':first-child').html("&#129137;") : $(this).find(':first-child').html("&#129139;");


        if (cellIndex === 3 || cellIndex === 4 || cellIndex === 5 || cellIndex === 6) {
            _linkedTableRows.sort(function (a, b) {
                var _val1 = 0;
                var _val2 = 0;
                _val1 = Number($(`.td-one:eq(${cellIndex})`, a).text());
                _val2 = Number($(`.td-one:eq(${cellIndex})`, b).text());
                //тут сам алгоритм сортировки
                if (_newSortingDirection === "asc") {
                    if (_val1 > _val2) return 1;
                    if (_val1 < _val2) return -1;
                    return 0;
                } else {
                    if (_val1 > _val2) return -1;
                    if (_val1 < _val2) return 1;
                    return 0;
                }
            })
        } else if (cellIndex === 1 || cellIndex === 2) {
            _linkedTableRows.sort(function (a, b) {
                var _val1 = 0;
                var _val2 = 0;
                _val1 = $(`.td-one:eq(${cellIndex})`, a).text();
                _val2 = $(`.td-one:eq(${cellIndex})`, b).text();
                //тут сам алгоритм сортировки
                if (_newSortingDirection === "asc") {
                    if (_val1 > _val2) return 1;
                    if (_val1 < _val2) return -1;
                    return 0;

                } else {
                    if (_val1 > _val2) return -1;
                    if (_val1 < _val2) return 1;
                    return 0;
                }
            })
        }


        //Собираем таблицу в памяти
        _linkedTableRows.each(function (index, row) {
            _linkedTable.prepend(row);
        });

        //Возвращаем таблицу на страницу
        _linkedTableParent.prepend(_linkedTable);
    })


// Первая таблица

    $(document).on('click', '#ten', function () {

    });

    $(document).on('click', '#unten', function () {
        $(".tr-one:visible:not(:eq(0))").slice(":last", 9).hide();
        if ($(".tr-one:eq(0)").is(":visible") === true && $(".tr-one:not(:eq(0))").is(":visible") === false) {
            $('#unten').hide(200);
        }
        $('#ten').show();

    });

// Ховер на ячейках тела таблицы
    $("body").on("click", ".table__cell", function () {
        $(this).toggleClass("table__cell--active");
    })

//  Поднятие камеры вверх на стрелку справа внизу при опускании окна на опред значение
    let buttonUp = document.querySelector(".btn-up");
    window.onscroll = function () {
        if (pageYOffset > 700) {
            buttonUp.classList.remove("hidden");
        } else {
            buttonUp.classList.add("hidden");
        }
    };

    $(document).on("click", ".btn-up", function () {
        window.scrollTo(0, 0)
    })

//Сброс фильтров , некорректный
//$( document ).ready( function() {
    $('.clear').click(function () {
        document.location.href = "/";
    });

// Фильтры
    $(document).on('click', '.production', function () {
        $(this).toggleClass('production2');
        let name = $(this).html();
        if ($(this).hasClass('production2') === true) {

            $('.table').remove();
            for (let index= dataFilter.length-1; index>=0; index--) {
                if (dataFilter[index].MFR.N === name) {
                    dataFilter.splice(index,1);
                }
            }
        } else if ($(this).hasClass('production2') === false) {
            data.forEach(function (item) {
                if (item.MFR.N === name) {
                    dataFilter.push(item);
                }
            })
        }
        //Изначальная сортировка по производителю
        dataFilter.sort(function (a,b) {
            if (a.MFR.N > b.MFR.N) return 1;
            if (a.MFR.N < b.MFR.N) return -1;
            return 0;
        });
        $(".table-section").empty().html($("#table-offers--templete").render({Response: dataFilter.slice(0,10)}));
    });
})
