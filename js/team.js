$(document).ready(function () {

    $('input[id^="player"][id$="sponsor"]').change(function () {
        const playerSponsorTextId = $(this).attr('id').replace('sponsor', 'sponsortext');
        if ($(this).is(':checked')) {
            $('#' + playerSponsorTextId).removeAttr('hidden');
        } else {
            $('#' + playerSponsorTextId).attr('hidden', true);
        }
    });

    $('#team').change(function () {
        const selectedTeam = $(this).val();
        $('.team__poster__team').html(`${selectedTeam} <span>XV</span>`);
    });

    $('#opposition').change(function () {
        const opposition = $(this).val();
        $('.team__poster__opposition').html(`vs ${opposition}`);
    });

    $('input').change(function () {
        const playersContainer = $('.team__poster__players');
        playersContainer.empty();

        for (let i = 1; i <= 15; i++) {
            const firstName = $(`#player${i}first`).val();
            const lastName = $(`#player${i}last`).val();
            const isCaptain = $(`#player${i}captain`).is(':checked');
            const isYouth = $(`#player${i}youth`).is(':checked');
            const sponsorText = $(`#player${i}sponsortext`).val();

            if (firstName && lastName) {
                const playerDiv = $('<div>').addClass('team__poster__player');
                const positionSpan = $('<span>').addClass('team__poster__player__position').text(`${i}.`);
                const nameSpan = $('<span>').addClass('team__poster__player__name').html(`${firstName} <span>${lastName}</span>`);
                playerDiv.append(positionSpan, nameSpan);

                if (isCaptain) {
                    const captainDiv = $('<div>').addClass('team__poster__player__captain').text('(C)');
                    playerDiv.append(captainDiv);
                }

                if (isYouth) {
                    const youthDiv = $('<div>').addClass('team__poster__player__youth').html('<img src="img/team/youth.png" />');
                    playerDiv.append(youthDiv);
                }

                if (sponsorText) {
                    const sponsorDiv = $('<div>').addClass('team__poster__player__sponsor').text('(' + sponsorText + ')');
                    playerDiv.append(sponsorDiv);
                }

                playersContainer.append(playerDiv);
            }
        }
    });

    $('input').change(function () {
        const substitutesContainer = $('.team__poster__substitutes');
        substitutesContainer.empty();

        for (let i = 16; i <= 22; i++) {
            const firstName = $(`#player${i}first`).val();
            const lastName = $(`#player${i}last`).val();
            const isYouth = $(`#player${i}youth`).is(':checked');
            const sponsorText = $(`#player${i}sponsortext`).val();

            if (firstName && lastName) {
                const playerDiv = $('<div>').addClass('team__poster__substitute');
                const nameSpan = $('<span>').addClass('team__poster__substitute__name').html(`${firstName} <span>${lastName}</span>`);
                playerDiv.append(nameSpan);

                if (isYouth) {
                    const youthDiv = $('<div>').addClass('team__poster__substitute__youth').html('<img src="img/team/youth.png" />');
                    playerDiv.append(youthDiv);
                }

                if (sponsorText) {
                    const sponsorDiv = $('<div>').addClass('team__poster__substitute__sponsor').text('(' + sponsorText + ')');
                    playerDiv.append(sponsorDiv);
                }

                substitutesContainer.append(playerDiv);
            }
        }
    });

    function adjustFontSize() {
        var posterWidth = $('.team__poster').width();
        var scaleFactor = posterWidth / 1200;

        $('.team__poster__team').css({
            'font-size': 201 * scaleFactor + 'px',
            'letter-spacing': 5.72 * scaleFactor + 'px'
        });
        $('.team__poster__team span').css({
            'font-size': 87 * scaleFactor + 'px',
            'left': -30 * scaleFactor + 'px'
        });
        $('.team__poster__opposition').css({
            'font-size': 50 * scaleFactor + 'px',
            'letter-spacing': 1.42 * scaleFactor + 'px'
        });
        $('.team__poster__player__position').css({
            'font-size': 30 * scaleFactor + 'px'
        });
        $('.team__poster__player__name').css({
            'font-size': 30 * scaleFactor + 'px'
        });
        $('.team__poster__player__name span').css({
            'font-size': 50 * scaleFactor + 'px'
        });
        $('.team__poster__player__sponsor').css({
            'font-size': 20 * scaleFactor + 'px'
        });
        $('.team__poster__player__captain').css({
            'font-size': 50 * scaleFactor + 'px'
        });
        $('.team__poster__substitute__name').css({
            'font-size': 18 * scaleFactor + 'px'
        });
        $('.team__poster__substitute__name span').css({
            'font-size': 30 * scaleFactor + 'px'
        });
        $('.team__poster__substitute__captain').css({
            'font-size': 50 * scaleFactor + 'px'
        });
        $('.team__poster__substitute__sponsor').css({
            'font-size': 18 * scaleFactor + 'px'
        });
    }

    $(window).on('resize', adjustFontSize);
    adjustFontSize();

    $('form').on('submit', function (e) {
        e.preventDefault();
        $('.team__poster').show();
        adjustFontSize();
        $('.download').show();
        $('html, body').animate({
            scrollTop: $('.team__poster').offset().top
        }, 1000);
    });

    $('.download').on('click', function () {
        var originalWidth = $('.team__poster').width();
        $('.team__poster').css('width', '1200px');
        adjustFontSize();
        html2canvas(document.querySelector('.team__poster')).then(function (canvas) {
            var link = document.createElement('a');
            link.href = canvas.toDataURL('image/jpeg');
            link.download = 'poster.jpg';
            link.click();

            // Revert the width back to original
            $('.team__poster').css('width', originalWidth);
            adjustFontSize();
        });
    });
});