$(document).ready(function () {
    $('#competition').on('input', function () {
        $('.pre__poster__competition').text($(this).val());
    });

    $('#team').on('change', function () {
        $('.pre__poster__team').text($(this).find('option:selected').text() + ' <span>vs</span> ' + $('#opposition').val());
    });

    $('#opposition').on('input', function () {
        $('.pre__poster__team').html($('#team').find('option:selected').text() + ' <span>vs</span> ' + $(this).val());
    });

    $('#date, #time').on('input change', function () {
        var date = new Date($('#date').val());
        var day = date.getDate();
        var suffix = (day % 10 === 1 && day !== 11) ? 'st' :
            (day % 10 === 2 && day !== 12) ? 'nd' :
                (day % 10 === 3 && day !== 13) ? 'rd' : 'th';
        var formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) + suffix;
        var time = $('#time').val();
        if (time) {
            formattedDate += ' - Kick off ' + time;
        }
        $('.pre__poster__date').text(formattedDate);
    });

    // Set default date to next Saturday
    var today = new Date();
    var nextSaturday = new Date();
    nextSaturday.setDate(today.getDate() + (6 - today.getDay() + 7) % 7);
    $('#date').val(nextSaturday.toISOString().split('T')[0]).trigger('input');

    $('#location').on('input', function () {
        $('.pre__poster__location').text($(this).val());
    });

    $('#player').on('change', function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('.pre__poster__player img').attr('src', e.target.result);
            }
            reader.readAsDataURL(this.files[0]);
        }
    });

    $('.pre__poster__player img').draggable({
        containment: '.pre__poster',
        scroll: false
    });

    $('#venue').on('change', function () {
        var team = $('#team').find('option:selected').text();
        var opposition = $('#opposition').val();
        if ($(this).val() === 'Away') {
            $('.pre__poster__team').html(opposition + ' <span>vs</span> ' + team);
        } else {
            $('.pre__poster__team').html(team + ' <span>vs</span> ' + opposition);
        }
    });


    $('form').on('submit', function (e) {
        e.preventDefault();
        html2canvas($('.pre__poster')[0]).then(function (canvas) {
            var link = document.createElement('a');
            link.href = canvas.toDataURL('image/jpeg');
            link.download = 'poster.jpg';
            link.click();
        });
    });

    $('#competition').trigger('input');
    $('#team').trigger('change');
    $('#opposition').trigger('input');
    $('#date').trigger('input');
    $('#time').trigger('input');
    $('#location').trigger('input');
    $('#venue').trigger('change');

});