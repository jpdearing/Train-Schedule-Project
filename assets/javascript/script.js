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

        var firebaseName = mostRecentAdd.name;
        var firebaseDestination = mostRecentAdd.destination;
        var firebaseFirstTrain = mostRecentAdd.firstTrain;
        var firebaseFrequency = mostRecentAdd.frequency;
        var firebaseMinutesAway = 0
        var nextArrivalTime = null

        var firstTime = moment(firebaseFirstTrain, "HH:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(firstTime), "minutes");
        var tRemainder = diffTime % firebaseFrequency;
        firebaseMinutesAway = firebaseFrequency - tRemainder;
        nextArrivalTime = moment().add(firebaseMinutesAway, "minutes").calendar();



        //append data table row
        $("#trainBody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + "</td><td>" + nextArrivalTime + "</td><td>" + firebaseMinutesAway + "</td></tr>");
    });
});