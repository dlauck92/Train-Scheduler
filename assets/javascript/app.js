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

    // clear forms after submition - *work in progress*
        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#trainTimeInput").val("");
        $("#frequencyInput").val("");
    })


});
