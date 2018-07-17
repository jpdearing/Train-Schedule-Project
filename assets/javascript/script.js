//Firebase Initialization (update with Train Schedule Project info)

$(document).ready(function () {

    var trainSchedule = firebase.database();

    $("#submit").on("click", function () {
        event.preventDefault();
        var trainName = $("#trainNameInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").format("HH:mm");
        var frequency = $("#frequencyInput").val().trim();

        var newTrain = {
            name: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
        };

        trainSchedule.ref().push(newTrain);

        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.firstTrain);
        console.log(newTrain.frequency);

        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#firstTrainInput").val("");
        $("#frequencyInput").val("");

        return false;

    });
    trainSchedule.ref().on("child_added", function (snapshot) {
        console.log(snapshot.val());

        var mostRecentAdd = snapshot.val();

        var firebaseName =  `<th scope="col">${mostRecentAdd.name}</th>`;
        console.log(mostRecentAdd.name)
        var firebaseDestination =  `<th scope="col">${mostRecentAdd.destination}</th>`;
        var firebaseFirstTrain =  `<th scope="col">${mostRecentAdd.firstTrain}</th>`;
        var firebaseFrequency = `<th scope="col">${mostRecentAdd.frequency}</th>`;
        var firebaseMinutesAway = `<th scope="col">${mostRecentAdd.name}</th>`;

        //fix the damn time!
        var timeRemaining = moment().diff(moment.unix(firebaseFirstTrain), "timeUntilArrival") % firebaseFrequency;
        var timeUntilArrival = firebaseFrequency - timeRemaining;
        var nextArrivalTime = moment().add(timeUntilArrival, "m").format("HH:mm");

        $("#trainTable > tbody").append("<tr><th>" + firebaseName + "</th><th>" + firebaseDestination + "</td><th>" + firebaseFrequency + "</th><th>" + nextArrivalTime + "</th><th>" + firebaseMinutesAway + "</th></tr>");
    });
});