function submitComment(commentControl) {
    var comments = document.getElementsByName(commentControl)[0].value;
    var subscriptionKey = "3c62f984b4224c0dbc0570e610a40cfe";
    var url = "https://eastus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment";

    var payload = '{ "documents": [ { "language": "es-ES", "id": "1", "text": "' + comments + '" }]}';

    $.ajax({
        type: "POST",
        url: url,
        data: payload,
        processData: false,
        headers: {
            "Ocp-Apim-Subscription-Key": subscriptionKey,
            "Content-Type": "application/json"
        }
    }).done(function (data) {

        var sentimentRating = Math.round((data.documents[0].score * 100) / 25) + 1;

        var currentItemId = JSON.parse(localStorage.getItem('currentItemId'));

        window.location.href = '/comments?classId=' + currentItemId + '&rating=' + sentimentRating + '&comments=' + comments;

    }).fail(function (xhr, status, err) {
        alert(err);
    });
}

function navigateToComments(classId) {
    localStorage.setItem('currentItemId', JSON.stringify(classId));
    window.location.href = 'comments?classId=' + classId;
}
