$(document).ready(function () {

    $('input[id^="player"][id$="sponsor"]').change(function () {
        const playerSponsorTextId = $(this).attr('id').replace('sponsor', 'sponsortext');
        if ($(this).is(':checked')) {
            $('#' + playerSponsorTextId).removeAttr('hidden');
        } else {
            $('#' + playerSponsorTextId).attr('hidden', true);
        }
    });

    function updateTeamAndOpposition() {
        const selectedTeam = $('#team').val();
        $('.team__poster__team').html(`${selectedTeam} <span>XV</span>`);

        const opposition = $('#opposition').val();
        $('.team__poster__opposition').html(`vs ${opposition}`);
    }

    $('#team').change(updateTeamAndOpposition);
    $('#opposition').change(updateTeamAndOpposition);

    function updatePlayers() {
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
    }

    function updateSubstitutes() {
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
    }

    $('input').change(updateSubstitutes, updatePlayers);

    $('form').on('submit', function (e) {
        e.preventDefault();
        updateSubstitutes();
        updatePlayers();
        updateTeamAndOpposition();
        $('.team__poster').show();
        $('.download').show();
        $('html, body').animate({
            scrollTop: $('.team__poster').offset().top
        }, 1000);
    });

    $('.download').on('click', function () {
        updateSubstitutes();
        updatePlayers();
        updateTeamAndOpposition();
        setTimeout(function () {
            html2canvas(document.querySelector('.team__poster')).then(function (canvas) {
                var link = document.createElement('a');
                link.href = canvas.toDataURL('image/jpeg', 1.0);
                link.download = 'poster.jpg';
                link.click();
            });
        }, 100); // Delay to ensure DOM updates are completed
    });
});