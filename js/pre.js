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

    $('.pre__poster__player').draggable({
        containment: '.pre__poster',
        scroll: false
    });

    $('.pre__poster__player').resizable({
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
        $('.pre__poster').show();
        adjustFontSize();
        $('.download').show();
        $('html, body').animate({
            scrollTop: $('.pre__poster').offset().top
        }, 1000);
    });

    $('.download').on('click', function () {
        var originalWidth = $('.pre__poster').width();
        $('.pre__poster').css('width', '1200px');
        adjustFontSize();
        html2canvas(document.querySelector('.pre__poster')).then(function (canvas) {
            var link = document.createElement('a');
            link.href = canvas.toDataURL('image/jpeg');
            link.download = 'poster.jpg';
            link.click();

            // Revert the width back to original
            $('.pre__poster').css('width', originalWidth);
            adjustFontSize();
        });
    });

    $('#competition').trigger('input');
    $('#team').trigger('change');
    $('#opposition').trigger('input');
    $('#date').trigger('input');
    $('#time').trigger('input');
    $('#location').trigger('input');
    $('#venue').trigger('change');

    function adjustFontSize() {
        var posterWidth = $('.pre__poster').width();
        var scaleFactor = posterWidth / 1200;

        $('.pre__poster__competition').css({
            'font-size': 1.222 * scaleFactor + 'rem',
            'letter-spacing': 0.375 * scaleFactor + 'rem'
        });
        $('.pre__poster__team').css({
            'font-size': 2.188 * scaleFactor + 'rem',
            'letter-spacing': -0.063 * scaleFactor + 'rem'
        });

        $('.pre__poster__player img').css({
            'width': 'auto',
            'height': 100 * scaleFactor + '%'
        });

        $('.pre__poster__e img').css({
            'width': 100 * scaleFactor + '%',
            'height': 'auto'
        });
        $('.pre__poster__player').css({
            'top': 13 * scaleFactor + '%',
            'left': 23 * scaleFactor + '%'
        });

        $('.pre__poster__date').css({
            'font-size': 3.125 * scaleFactor + 'rem',
            'letter-spacing': 0.025 * scaleFactor + 'rem'
        });
        $('.pre__poster__time').css({
            'font-size': 3.125 * scaleFactor + 'rem',
            'letter-spacing': 0.025 * scaleFactor + 'rem'
        });
        $('.pre__poster__location').css({
            'font-size': 1.75 * scaleFactor + 'rem',
            'letter-spacing': 0.019 * scaleFactor + 'rem'
        });
    }

    $(window).on('resize', adjustFontSize);
    adjustFontSize();
});