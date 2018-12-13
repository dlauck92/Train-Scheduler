$(document).ready(function(){

    var config = {
        apiKey: "AIzaSyB72ewykSv_BDHYaA2nSD2ZaAGD1QfnDJk",
        authDomain: "train-scheduler-5d0fd.firebaseapp.com",
        databaseURL: "https://train-scheduler-5d0fd.firebaseio.com",
        projectId: "train-scheduler-5d0fd",
        storageBucket: "train-scheduler-5d0fd.appspot.com",
        messagingSenderId: "740311317516"
      };
    
      firebase.initializeApp(config);
    
      var database = firebase.database();
    
      // add train button
      $("#addTrainButton").on("click", function(event){
        event.preventDefault();
    
        // record user input
        var newTrain = $("#trainNameInput").val().trim();
        var newDestination = $("#destinationInput").val().trim();
        var newTime = $("#trainTimeInput").val().trim();
        var newFrequency = $("#frequencyInput").val().trim();

    // monitoring for response    
        console.log(newTrain);
        console.log(newDestination);
        console.log(newTime);
        console.log(newFrequency);

    // push data to firebase
        database.ref().push({
            trainName: newTrain,
            trainDestination: newDestination,
            trainTime: newTime,
            trainFrequency: newFrequency,
        })

    // clear forms after submition
        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#trainTimeInput").val("");
        $("#frequencyInput").val("");

        return false;
    });

    database.ref().on("child_added", function(snapshot){
        newRow = $("<tr>");
        newRow.append("<td>" + snapshot.val().trainName + "</th>");
        newRow.append("<td>" + snapshot.val().trainDestination + "</th>");
        newRow.append("<td>" + snapshot.val().trainFrequency + "</th>");

// calculations
        var start = snapshot.val().trainTime;
        var frequency = snapshot.val().trainFrequency;
        var now = moment().format("HH:mm")
        var next = "";

        var timeDifference = moment().diff(moment(start, "HH:mm"), "minutes")

        if  (timeDifference > 0){
            next = moment(start, "HH:mm").format("hh:mm a")
            minutesUntil = moment(start, "HH:mm").diff(moment(), "minutes")
        }

        else {
            minutesSince = timeDifference % frequency;
            minutesUntil = frequency - minutesSince
            next = moment().add(minutesUntil, "m").format("h:mm a")
        }

        if (minutesUntil >= 60) {
            a = minutesUntil
            var hours = Math.trunc(a/60);
            var minutes = a % 60;
            console.log(hours + ":" + minutes)
            minutesUntil = hours + " hr " + minutes + " min"
        }

        else {
            minutesUntil = minutesUntil + " min"
        }

        newRow.append("<td>" + next + "</td>");
        newRow.append("<td>" + minutesUntil + "</td>")

        $("#trainTable").append(newRow)

    })


});