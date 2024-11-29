$(document).ready(function () {

    $('input[id^="player"][id$="sponsor"]').change(function () {
        const playerSponsorTextId = $(this).attr('id').replace('sponsor', 'sponsortext');
        if ($(this).is(':checked')) {
            $('#' + playerSponsorTextId).removeAttr('hidden');
        } else {
            $('#' + playerSponsorTextId).attr('hidden', true);
        }
    });

});