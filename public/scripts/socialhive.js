/**
 * Created by Tomer on 8/30/2016.
 */
$(document).ready(function(){
    $("#createEvent").hide();
    $("#userProfile").hide();
    $("#eventManagerYourEvents").hide();
    $("#addParticipants").hide();
    $("#eventManagerInvitedEvents").hide();
    $("#eventInfo").hide();
    $("#addItemsToEvent").hide();
    $("#addParticipantsToEvent").hide();
    $("#sideTile").hide();
    $("#successContainer").hide();



});

var eventID;



$("#createEventButton").click(function() {
    $("#overviewContent").hide();
    $("#userProfile").hide();
    $("#eventManagerYourEvents").hide();
    $("#eventManagerInvitedEvents").hide();
    $("#eventInfo").hide();
    $("#createEvent").fadeIn(600);
    $("#addParticipants").fadeIn(600);
});
$("#overviewContentButton").click(function() {
    $("#createEvent").hide();
    $("#addParticipants").hide();
    $("#eventManager").hide();
    $("#userProfile").hide();
    $("#eventManagerYourEvents").hide();
    $("#eventManagerInvitedEvents").hide();
    $("#eventInfo").hide();
    $("#overviewContent").fadeIn(600);


});

$("#eventManagerButton").click(function() {
    $("#overviewContent").hide();
    $("#addParticipants").hide();
    $("#createEvent").hide();
    $("#userProfile").hide();
    $("#eventManagerYourEvents").fadeIn(600);
    $("#eventManagerInvitedEvents").fadeIn(600);
    $("#eventInfo").fadeIn(600);



    $.ajax({
        url: '/api/events',
        method: 'get',
        success: function(obj) {
            obj.success = true;
            if (obj.success) {
                for (var i = 0; i < obj.length; ++i) {
                    showSingleEvent(obj[i])
                }

            } else {
                $('#msgFromServer').text(obj.msg);
            }
        },
        error: function(obj) {
            $('#msgFromServer').text(obj.msg);
        }
    });





});

$("#userProfileButton").click(function() {
    $("#overviewContent").hide();
    $("#addParticipants").hide();
    $("#createEvent").hide();
    $("#eventManagerYourEvents").hide();
    $("#eventManagerInvitedEvents").hide();
    $("#eventInfo").hide();
    $("#eventManager").hide();
    $("#userProfile").fadeIn(600);

});

$("#createEventButtonNext").click(function(e) {
    var eventToCreate = {
        name: $('#eventName').val(),
        startDate: $('#eventStartDate').val(),
        numberOfParticipants: 10 // TODO: ADD PARCITIPANTS NUMBERS (?)
    };

    $.ajax({
        url: '/api/events/create',
        method: 'post',
        data: eventToCreate,
        success: function(obj) {
            if (obj.success) {
                eventID = obj.msg;
                $("#createEvent").hide();
                $("#addItemsToEvent").fadeIn(1500);
               // moveToItemsDialog(eventID); // TODO: Open up a function with ajax call to create items (for loop that do ajax call for each item). after it do the same for partic.
            } else {
                $('#msgFromServer').text(obj.msg);
            }
        },
        error: function(obj) {
            $('#msgFromServer').text(obj.msg);
        }
    });

});


$("#createEventButtonNextToParticipants").click(function() {
   // var listOfItems = $('#itemsContainer');
   // var numOfItem = list.find('li').length;
    var eventFullAds = "/api/events/" + eventID + "/addItem";

    var ul = document.getElementById("listItems");
    var items = ul.getElementsByTagName("li");
    for (var i = 0; i < items.length; ++i) {
            var itemName = items[i]; //TODO: FIX THE NAME - WITHOUT SPAN
                $.ajax({
                    url: eventFullAds,
                    method: 'post',
                    data: { name: itemName.innerHTML },
                    success: function(obj) {
                        if (obj.success) {
                            eventID = obj.msg;

                            // moveToItemsDialog(eventID); // TODO: Open up a function with ajax call to create items (for loop that do ajax call for each item). after it do the same for partic.
                        } else {
                            $('#msgFromServer').text(obj.msg);
                        }
                    },
                    error: function(obj) {
                        $('#msgFromServer').text(obj.msg);
                    }
                });

    };
    $("#addItemsToEvent").hide();
    $("#addParticipantsToEvent").fadeIn(1500);


});


$("#createEventButtonNextToFinish").click(function() {

    var eventFullAds = "/api/events/" + eventID + "/addUser";

    var listParticipants = $('#listParticipants').find('li');

    for (var i = 0; i < listParticipants.length; ++i) {
        var pEmail = $(listParticipants[i]).find('span')[0].innerHTML; //TODO: FIX THE NAME - WITHOUT SPAN
        console.log(pEmail);
        $.ajax({
            url: eventFullAds,
            method: 'post',
            data: { email: pEmail },
            success: function(obj) {
                if (obj.success) {
                    eventID = obj.msg;

                    // moveToItemsDialog(eventID); // TODO: Open up a function with ajax call to create items (for loop that do ajax call for each item). after it do the same for partic.
                } else {
                    $('#msgFromServer').text(obj.msg);
                }
            },
            error: function(obj) {
                $('#msgFromServer').text(obj.msg);
            }
        });

    };
    $("#addParticipantsToEvent").hide();
    $("#successContainer").fadeIn(1500);


});


function moveToItemsDialog(eventID){
    //Open up a function with ajax call to create items (for loop that do ajax call for each item)

    var ul = document.getElementById("listItems");
    var items = ul.getElementsByTagName("li");
    for (var i = 0; i < items.length; ++i) {
        // do something with items[i], which is a <li> element



    }
}





function onButtonClick_GetItemInfo()
{
    var nameOfItem = document.getElementById("itemInfo").value;

    saveItem(nameOfItem);
}


function saveItem(nameOfItem){
    var closeSpan = $('<span />');
    closeSpan.text('x').addClass('w3-closebtn w3-margin-right w3-large').on('click', function(){
        this.parentElement.style.display='none';
    });
    var listItem = $('<li />').text(nameOfItem).append(closeSpan);
    $('#listItems').append(listItem);
}

function onButtonClick_GetParticipantInfo()
{
    var participantEmail = document.getElementById("participantEmail").value;

    saveParticipant(participantEmail);
}


function saveParticipant(participantEmail){
    var closeSpan = $('<span />');
    closeSpan.text('x').addClass('w3-closebtn w3-margin-right w3-large').on('click', function(){
        this.parentElement.style.display='none';
    });

    var emailSpan =  $('<span>').text(participantEmail);

    var listPartici = $('<li />').append(emailSpan, closeSpan);
    $('#listParticipants').append(listPartici);
}

function showSingleEvent(event) {

    var listItem = $('<li />').text(event.name).data(event).click(showEventInfo);
    $('#eventsListManager').append(listItem);
}

function showEventInfo(oEvent){
    var elem = $(oEvent.target);
    debugger;
    elem.data();
    $("#sideTile").fadeIn(500);
    $("#sideName").text(elem.data().name);
    $("#sideDate").text(elem.data().startDate);
    $("#sideDateEnd").text(elem.data().endDate);


    var participantsToEvent = elem.data().participants;

    for (var i=0; i<participantsToEvent.length; ++i)
    {
        $("#sideParticipants").append(participantsToEvent[i]);
    }

    var itemsToEvent = elem.data().items;
debugger;
    for (var i=0; i<itemsToEvent .length; ++i)
    {
        $("#sideParticipants").append(itemsToEvent [i].name);
    }
}