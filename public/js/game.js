const snippetTimeLimit = 13000; //in milliseconds
const flipSegmentCardDelay = 300;
const segmentCardIdArr = ['Characters','Verbs','Adjectives']
const scShort = ['char','verb','adj']

let allStringArr = [];
let flipStatusArr = [false,false,false]
var segmentCard2FlipNum = 0;
let segmentUsedArraysAndReqMet = [[],[],[],false];//character,verb,adjective,full
let snippetLockedIn = false;
let countdownWarningInitialized = false;
let gameLaunched = false;
let charVerbAdjArray = [];
let usedSCIDs = [0,0,0];
let currentSwalObject;


//--------------Launch Functions----------------

function tempFillFromArr(array) {
    var newListArr = [];
    for (var i = 0; i < 3; i++) {
        var listItem = getRandomObjectFromArr(array);
        var listItemArr = [];
        listItemArr.push(listItem.text);
        allStringArr.push(listItem.text);
        var altText = listItem.alt_text.split(',');
        if(altText[0]!== '') {
            for(t = 0; t < altText.length; t++) {
                listItemArr.push(altText[t])
                allStringArr.push(altText[t])
            }
        }
        listItemArr.push(listItem.id)
        newListArr.push(listItemArr)
        // console.log(listItemArr)
    }
    // console.log(newListArr)
    return newListArr;
}
function tempDataCompile(){
    allStringArr = [];
    return [
        tempFillFromArr(charList),
        tempFillFromArr(verbList),
        tempFillFromArr(adjList)
    ];
}

function getRandomObjectFromArr(array) {
    var rndNum = getRndInteger(0,array.length - 1);
    return array[rndNum];
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}


function launchGame(){
    gameLaunched = true;
    flipSegmentCardFaceDown();
}

function populateAllCards(){
    charVerbAdjArray = tempDataCompile();
    console.log(charVerbAdjArray)
    for(i = 0; i < 3; i++) {
        var scDiv = $(`#sc-${segmentCardIdArr[i]}-front`)
        for (var t = 0; t < 3; t++) {
            var dataStr = charVerbAdjArray[i][t][0];
            var segmentData = $('<div>').addClass('sc-front-item').text(dataStr);
            scDiv.append(segmentData);
        }
    }
};

function demoCharacterEntry(characterArr,verbArr,adjArr,ltrNum,runCnt) {
    if(runCnt < 1 && ltrNum < 1) {
        characterArr = charVerbAdjArray[0][getRndInteger(0,2)]
        verbArr = charVerbAdjArray[1][getRndInteger(0,2)]
        adjArr = charVerbAdjArray[2][getRndInteger(0,2)]
    }
    var snipTextCntrl = $('#snippet-text');
    if(ltrNum === 0) {
        snipTextCntrl.val('')
    }
    if(runCnt < 2) {
        if (!gameLaunched) {
            var verbTxt = verbArr[1];
            var charAlt = characterArr[1]
            var genderText;
            if(charAlt ==='him') {
                genderText = 'he'
            } else {
                genderText = 'she'
            }
            var str = `When ${characterArr[0]} found the butler with a knife to the chest ${genderText} ${adjArr[1].toLowerCase()} ${verbTxt} the wound and called for help.`;
            var res = str.substring(0, ltrNum);
            $('#segment-char-rem').text(250-ltrNum)
            $('#snippet-text').val(res);
            if (ltrNum < str.length) {
                ltrNum++;
                setTimeout(function(){
                    demoCharacterEntry(characterArr,verbArr,adjArr,ltrNum,runCnt)
                },130);
            } else {
                runCnt++;
                ltrNum = 0;
                setTimeout(function(){
                    demoCharacterEntry(characterArr,verbArr,adjArr,ltrNum,runCnt)
                },1000);
            }
        } else {
            snipTextCntrl.val('')
        }
    }
}  
//--------------Launch Functions----------------

function flipSegmentCardFaceDown(){
    for (var i = 0; i < segmentCardIdArr.length; i++) {
        var card = $(`#sc-${segmentCardIdArr[i]}`);
        card.removeClass('is-flipped')
    }
}
function flipSegmentCard(){
    if (segmentCard2FlipNum < 3) {
        $(`#sc-${segmentCardIdArr[segmentCard2FlipNum]}`).toggleClass('is-flipped');
        segmentCard2FlipNum++;
        setTimeout(flipSegmentCard,flipSegmentCardDelay);
    } else {
        segmentCard2FlipNum = 0;
    }
}
function flipSegmentCards(initDelay){
    if (!initDelay) {
        setTimeout(flipSegmentCard,flipSegmentCardDelay);
    } else {
        setTimeout(function(){
            setTimeout(flipSegmentCard,flipSegmentCardDelay);
        },initDelay)
    }
}
function getTimeLengthAndSetWarning(millisecRemaining) {
    switch (true) {           
        case millisecRemaining > 10000: //changes the time display to reflect decimal
            return 2;
        case millisecRemaining > 1000: //starts warning if not locked in
            return 3;
        default:
            return 1
    }
}

function setSCStatus(scType,status) {
    var scDiv = $(`#sc-${scType}-status`)
    switch (status) {
    case 'listed':
        scDiv.attr('src','../../square-outline-green-check.svg')
        break;
    case 'missing':
        scDiv.attr('src','../../square-outline-red.svg')
        break;
    default:
        scDiv.attr('src','../../square-outline-black.svg')
        break;
    }
}

// function stringIsListed(strVal){
//     for(i = 0; i < allStringArr.length; i++) {
//         if(strVal.toLowerCase().indexOf(allStringArr[i].toLowerCase()) > -1) {
//             return true;
//         }
//     }
// }

// function snippetUpdate(){
//     var str2Test = $('#snippet-text').val().trim();
//     $('#segment-char-rem').text(250-str2Test.length);
//     if(stringIsListed(str2Test)) {
//         usedSCIDs = [0,0,0]
    
//         for (i = 0; i < 3; i++) {
//             var scTypeArr = charVerbAdjArray[i]
//             for (arr in scTypeArr) {
//                 var scStrArr = scTypeArr[arr]
//                 // console.log(scStrArr)
//                 var scID = scStrArr[scStrArr.length-1]
//                 for(str = 0; str < scStrArr.length-1; str++) {
//                     var testStr = scStrArr[str].toLowerCase();
//                     if(str2Test.indexOf(testStr) > -1) {
//                         usedSCIDs[i] = scID;
//                     }
//                 }
//             }
//         }
//         console.log(usedSCIDs)
//         setSCStatusFull();
//     }
// }

function setSCStatusFull(){
    for (i = 0; i < 3; i++) {
        if(usedSCIDs[i] > 0) {
            setSCStatus(scShort,'listed');
        }
    }
}


function convertTime2String(millisecRemaining,charLength){
    return new Intl.NumberFormat(
        'en-IN',
        {
            maximumSignificantDigits: 2
        })
    .format(millisecRemaining)
    .substring(0, charLength)
    .replace(',','.');
}


function toggleTimeWarning(){
    $('#countdown').toggleClass('bg-danger border border-white rounded')
    $('#coundown-div').toggleClass('animated tada infinite countdown-alert');
    $(".round-progress").toggleClass('bg-warning')
}
function updateTimeRemaining(millisecRemaining, prevSecRem){
    var currentSecRem = Math.round(millisecRemaining * 0.001)
    var currHundreth = Math.round(millisecRemaining * 0.01)
    var progPercent = Math.round((millisecRemaining/snippetTimeLimit) * 100)

    if(typeof currentSecRem !== 'number') {
        if (prevSecRem === 0) return;
        currentSecRem = prevSecRem;
    }
    // console.log(`millisecRemaining:${millisecRemaining}|
    //                 currentSecRem:${currentSecRem}|
    //                 prevSec:${prevSecRem}|
    //                 currHundreth:${currHundreth}`)
    if(prevSecRem !== currentSecRem) {
        switch (true) {
            case currHundreth < 10 && countdownWarningInitialized:
                $('#countdown-sec').text('Times Almost Up!');
                $('#countdown-text').text('');
                $(".round-progress")
                    .attr('aria-valuenow',progPercent)
                    .width(`${progPercent}%`)
                    .text('< ' + currentSecRem + ' sec');
                break;
            case currentSecRem < 10 && !snippetLockedIn && !countdownWarningInitialized:
                countdownWarningInitialized = true;
                toggleTimeWarning();
            default:
                $('#countdown-sec').text(currentSecRem);
                $(".round-progress")
                    .attr('aria-valuenow',progPercent)
                    .width(`${progPercent}%`)
                    .text(currentSecRem + ' seconds left');
                if(currentSecRem <= 5) {
                    $(".round-progress").removeClass('bg-warning').addClass('bg-danger')
                }
                break;
        }
    }
    prevSecRem = currentSecRem;
}

function activateWarning() {

}

function updateCharRemaining() {
    
}
    //  swal.closeModal(); return false;
function validateSnippet(){

}
function gameBoardLargePrep() {
    flipSegmentCardFaceDown();
    flipSegmentCards();
    $("#countdown-text").show();
    $('#snippet-text').prop('disabled',false).val('');
}

// var swalFetch = new Promise(function(resolve, reject) {
    

//     if (/* everything turned out fine */) {
//         resolve("Stuff worked!");
//     }
//     else {
//         reject(Error("It broke"));
//     }
// });

function promptSnippetBoard(e){
    e.preventDefault();
    gameLaunched = true;
    countdownWarningInitialized = false;
    var mainDiv = $('#game-holder');
    var newMain = mainDiv.clone();
    var htmlString = mainDiv.html()
    let timerInterval
    let prevSecRem = 0;
    
    mainDiv.remove();
    swal({
        html: htmlString,
        timer: snippetTimeLimit, //snippetTimeLimit
        width: '600px',
        heightAuto: true,
        allowOutsideClick: false,
        allowEnterKey: false,
        showConfirmButton:false,
        onOpen: () => {
            gameBoardLargePrep();
            $('#submit-snippet').on('click',function(){
                console.log('sup snippet')
            });
            $('#exit-game').on('click',function(){
                clearInterval(timerInterval);
                swal.close()
            });
            timerInterval = setInterval(() => {
                updateTimeRemaining(swal.getTimerLeft(),prevSecRem)
            }, 100);
        },
        onClose: () => {
            clearInterval(timerInterval);
    }
    }).then((result) => {
        $('#demo').append(newMain);
    })
}

function entryTimesUp(){

}

function entryFailed(){

}
function leaveGame(){
    swal(
        {
        title:'Deleted!',
        text:'You have been exited from the game',
        type:'success'
        }
    )
}



function animateElement(elemId,aniName,duration){
    var elem = $(`#${elemId}`);
    var classStr = `animated ${aniName}`;
    var setDur = 2000;
    elem.addClass(classStr)
    if (typeof duration === 'number') {setDur = duration}
    window.setTimeout( function(){elem.removeClass(classStr);}, setDur);
}

function gameCardFlyIn(){
    let characterArr,verbArr,adjArr;
    let ltrNum = 0;
    let runCnt = 0;
    setTimeout(function(){
        $('#game-holder').show();
        flipSegmentCardFaceDown();
        flipSegmentCards(500);
        animateElement('game-holder','lightSpeedIn');
        setTimeout(function(){
            demoCharacterEntry(characterArr,verbArr,adjArr,ltrNum,runCnt)
        },2000)
    },1000)
}

function snippetLockIn(){
    console.log('lockin called?')
    if(segmentUsedArraysAndReqMet[3]) {
        $('#submit-snippet').addClass('disabled');
        $('#submit-snippet').prop('disabled',true);
        $('#snippet-text').prop('disabled',true);
        if(countdownWarningInitialized) toggleTimeWarning();
    } else {
        $('#segment-req').removeClass("border-dark").addClass('border-danger');
        animateElement('segment-req','tada');
    }
}
function sideCollapse(){
    $('#sidebar').removeClass('active');
    $('.overlay').removeClass('active');
}

function sideExpand(){
    $('#sidebar').addClass('active');
    $('.overlay').addClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
}
$(document).ready(function (e) {
    populateAllCards();    
    gameCardFlyIn();
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#dismiss, .overlay').on('click', sideCollapse);
    $('#sidebarCollapse').on('click', sideExpand);
    $("#RunCard").on('click',promptSnippetBoard);
    $('#submit-snippet').on('click',snippetLockIn);

    $('#flipCards').on('click',flipSegmentCards)
    $('#faceDown').on('click',flipSegmentCardFaceDown);
    $('#flyIn').on('click',gameCardFlyIn);
    $('#gameStart').on('click',function(){
        gameLaunched = true;
    });
});