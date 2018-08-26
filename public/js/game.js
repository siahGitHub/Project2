
// <div id="navbar-example">
// <ul class="nav nav-tabs" role="tablist">
//     <div id="list-example" class="list-group">
//       <a class="list-group-item list-group-item-action" href="#list-item-1">Item 1</a>
//       <a class="list-group-item list-group-item-action" href="#list-item-2">Item2</a>
//       <a class="list-group-item list-group-item-action" href="#list-item-3">Item 3</a>
//       <a class="list-group-item list-group-item-action" href="#list-item-4">Item 4</a>
//     </div>
//     <div data-spy="scroll" data-target="#list-example" data-offset="0" class="scrollspy-example">
//       <h4 id="list-item-1">Item 1</h4>
//       <p>...</p>
//       <h4 id="list-item-2">Item 2</h4>
//       <p>...</p>
//       <h4 id="list-item-3">Item 3</h4>
//       <p>...</p>
//       <h4 id="list-item-4">Item 4</h4>
//       <p>...</p>
//     </div>
// </ul>
// </div>

Array.prototype.clean = function(deleteValue) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == deleteValue) {         
        this.splice(i, 1);
        i--;
        }
    }
    return this;
};
var timeExpired = async function(){   
}
var GameBoard = function() {
    this.snippetTimeLimit = 13000; //in milliseconds
    this.timeBetweenSCFlips = 300; //in milliseconds
    this.snippetSegmentFullArray = [];//[CharactersArr,VerbsArr,AdjArr] formerly "data"
    this.randomSnippetEntryText;
    this.verbStatsUpdate = {};
    this.adjStatsUpdate = {};
    this.charStatsUpdate = {};
    this.killTypeIt = false;
    this.snippetTextEntryElement;
    this.submitButton;
    this.leaveButton;
    this.shellDiv;
    this.tabInputDiv;
    this.tabInputBtnDiv;
    this.tabStoryDiv;
    this.timerInterval;
    this.apiCallFunctions = {
        setData: async function(){
            var getTextArray = function (array) {
                function getRndInteger(min, max) {
                    return Math.floor(Math.random() * (max - min + 1) ) + min;
                }
                var fullArray = [];
                for (var i = 0; i < 3; i++) {
                    var listItemObject = (array[getRndInteger(0,array.length - 1)]);
                    var listItemArr = []
                    listItemArr.push(listItemObject.text)
                    var altTxt = listItemObject.alt_text.split(',')
                    listItemArr = listItemArr.concat(altTxt.clean(''))
                    listItemArr.push(listItemObject.id)
                    fullArray.push(listItemArr);
                }
                return fullArray;
            };
            // charList
            // verbList
            // adjList
            snippetSegmentFullArray = [
                getTextArray(charList),
                getTextArray(verbList),
                getTextArray(adjList)
            ];
            return snippetSegmentFullArray;
        }, 
        getStoryText: async function() {

        },
        timeExpired: async function(){
            await this.InitSnippet();    
            $('#snippetDisplay').append(this.shellDiv)    
        },
        leaveClicked: async function(){
            var swalAlertSettings = {title:'Deleted!', text:'You have been exited from the game', type:'success'}
            this.killTypeIt = false;
            swal(swalAlertSettings);
        },
        LockInClick: async function () {
            // var submittedSnipperText = $("#snippet-text").val();
            // if(isCompleteSnippet(submittedSnipperText)) {
            //     $('#submit-snippet').addClass('disabled');
            //     $('#submit-snippet').prop('disabled',true);
            //     $('#snippet-text').prop('disabled',true);
            //     gameActive = false;
            // } else {
            //     $('#segment-req').removeClass("border-dark").addClass('border-danger');
            //     animateElement('segment-req','tada');
            // }
    
            //discuss next
            // clearInterval(timerInterval);
            // swal.close()
        } 
    }
    this.SetStory = async function(htVal, divHolder){
        if(typeof htVal === 'number'){
        }
        $('#storyTab').height(htVal);
        console.log(storyList[3].text)
        var div = $('#rollingStory')
        console.log(div.html())
        div.text(storyList[3].text)
    };
    this.typeIt = function (){
        function fillCharacter() {
            if (this.killTypeIt) {
                clearTimeout(timer);
                return;
            }
            if(runCnt < maxRunCnt) {
                var res = this.randomSnippetEntryText.substring(0, ltrNum);
                $('#segment-char-rem').text(250-ltrNum)
                $('#snippet-text').val(res);
                if (ltrNum < this.randomSnippetEntryText.length) {
                    ltrNum++;
                } else {
                    ltrNum = 0; runCnt++; delayAmt = 1000;
                }
                timer = setTimeout(fillCharacter,delayAmt);
            }
        }
        const maxRunCnt = 5;
        let delayAmt = 130;
        let runCnt = 0;
        let ltrNum = 0;
        var timer;
        fillCharacter();
    };
    this.InitSnippet = async function(isDemo){
        getRandomDemoText = function () {
            function getGentderTemp(charAltStr){
                if(charAltStr ==='him') {
                    return 'he'
                } else {
                    return 'she'
                }
            }
            function getRndInteger(min, max) {
                return Math.floor(Math.random() * (max - min + 1) ) + min;
            }        
            var charNum = getRndInteger(0,2)
            return `When ${this.snippetSegmentFullArray[0][charNum][0]} found the butler with a knife to the chest ${getGentderTemp(this.snippetSegmentFullArray[0][charNum][1])} ${getLower(this.snippetSegmentFullArray[2][getRndInteger(0,2)][1])} ${this.snippetSegmentFullArray[1][getRndInteger(0,2)][1]} the wound and called for help.`;
        };
        await this.SetRoundSnippet();

        if (isDemo) {
            this.killTypeIt = false;
            await this.animateElement(this.shellDiv,'lightSpeedIn');
            // typeIt(this.getRandomDemoText());
        }
        
        var flipIt = function (card){
            if(!card.hasClass('is-flipped')) card.addClass('is-flipped')
        }
        setTimeout(function(){flipIt($('#sc-Character',this.tabInputDiv))},this.timeBetweenSCFlips);
        setTimeout(function(){flipIt($('#sc-Verb',this.tabInputDiv))},this.timeBetweenSCFlips*2);
        setTimeout(function(){flipIt($('#sc-Adjective',this.tabInputDiv))},this.timeBetweenSCFlips*3);
        // this.SetStory()
    };
    this.SetRoundSnippet = async function(){
        // var dataLoadSuccess =  this.apiCallFunctions.setData();
        var snippetSegmentFullArray = await this.apiCallFunctions.setData();
        // if(!dataLoadSuccess) {
        //     swal('There was an error retriving snippet data')
        //     return false
        // };
        await this.refreshGameBoard();
        $(this.tabInputDiv).html(`
            <div class="sc-row">
                <div class="sc-holder">
                    <div id="sc-Character" class="segment-card">
                        <div class="sc-setup sc-back stroke-text Characters">Characters</div>
                        <div id="sc-Characters-front" class="sc-setup sc-front">
                            <div class="sc-front-title">Characters</div>
                            <div class="sc-front-item">${snippetSegmentFullArray[0][0][0]}</div>
                            <div class="sc-front-item">${snippetSegmentFullArray[0][1][0]}</div>
                            <div class="sc-front-item">${snippetSegmentFullArray[0][2][0]}</div>
                        </div>
                    </div>
                </div>
                <div class="sc-holder">
                    <div id="sc-Verb" class="segment-card">
                        <div class="sc-setup sc-back stroke-text Verbs">Verbs</div>
                        <div id="sc-Verbs-front" class="sc-setup sc-front">
                            <div class="sc-front-title">Verbs</div>
                            <div class="sc-front-item">${snippetSegmentFullArray[1][0][0]}</div>
                            <div class="sc-front-item">${snippetSegmentFullArray[1][1][0]}</div>
                            <div class="sc-front-item">${snippetSegmentFullArray[1][2][0]}</div>
                        </div>
                    </div>
                </div>
                <div class="sc-holder">
                    <div id="sc-Adjective" class="segment-card">
                    <div class="sc-setup sc-back stroke-text Adjectives">Adjectives</div>
                        <div id="sc-Adjectives-front" class="sc-setup sc-front">
                            <div class="sc-front-title">Adjectives</div>
                            <div class="sc-front-item">${snippetSegmentFullArray[2][0][0]}</div>
                            <div class="sc-front-item">${snippetSegmentFullArray[2][1][0]}</div>
                            <div class="sc-front-item">${snippetSegmentFullArray[2][2][0]}</div>
                        </div>  
                    </div>
                </div>
            </div> <!--segment-cards-->
            <div class="d-flex flex-row justify-content-between">
                <div>What happens next is up to you...</div>
                <div id="charcters-remaining">
                    <span id="segment-char-rem" class="mr-1">250 </span>Characters Remaining
                </div>
            </div><!--input label and charcters remaining-->
            <textarea id="snippet-text" class="form-control board-entry-text" id="snippet-sub-text" rows="3" disabled></textarea>
            <div class="d-flex flex-row justify-content-center">
                <div id="segment-req" class="d-flex flex-row justify-content-center bg-white border border-dark rounded text-dark">
                    <div class="d-flex mx-1 flex-row segment-req-list-col text-left">
                        <img id="sc-char-status" src="../images/square-outline-black.svg">
                        <div>Character</div>
                        <img id="sc-adj-status" src="../images/square-outline-black.svg">
                        <div>Adjective</div>
                        <img id="sc-verb-status" src="../images/square-outline-black.svg">
                        <div>Verb</div>
                    </div>
                </div>
                <div id="countdown" class="text-center">
                    <div id="coundown-div" class="text-center">
                        <span id="countdown-sec"></span><span id="countdown-text"> seconds left</span>
                    </div>
                </div>
            </div><!--requirements and countdown-->
        </div>`)
        await this.AppendButtons();
        this.snippetTextEntryElement = $('#snippet-text',this.tabInputDiv);
    };
    this.AppendButtons = async function(){
        var buttonDiv = $('<div>').addClass("d-flex flex-row justify-content-around m-2 border-top border-light");
        this.submitButton = $('<button>').attr('id','#submit-snippet').addClass('btn btn-success px-5 mt-1').text('Ready to lock it in?')
        this.leaveButton = $('<button>').attr('id','#exit-game').addClass('btn btn-danger px-5 mt-1').text('Leave Game')
        buttonDiv.append(this.submitButton);
        buttonDiv.append(this.leaveButton);
        $(this.tabInputDiv).append(buttonDiv);
    };
    this.refreshGameBoard = async function (){
        var newMainDiv  = $('<div>').html(`
        <div id="game-holder">
            <div class="nav d-flex flex-row">
                <button id="tab-button-input" class="nav-link nav-tab-btn active" data-toggle="tab" href="#tab-input">Your Entry</button>
                <button class="nav-link nav-tab-btn" data-toggle="tab" href="#tab-story">Story So Far</button>
            </div>
            <div class="progress">
                <div class="progress-bar round-progress" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="tab-content">
                <div id="tab-input" class="container tab-pane game-tab-border active border board border-dark">
                </div> <!--game tab content-->
                <div id="tab-story" class="container tab-pane game-tab-border fade border border-dark">
                    <div id="rollingStory" class="story-tab">
                    </div>
                </div><!--story tab content-->
            </div><!--tabs container-->
        </div> <!--game holder-->`)
        this.shellDiv = $('<div>');
        this.tabInputBtnDiv = $('#tab-button-input',newMainDiv);
        this.tabInputDiv = $('#tab-input',newMainDiv);
        this.tabStoryDiv = $('#tab-story',newMainDiv);
        this.shellDiv.append(newMainDiv);
    };
    this.isCompleteSnippet = async function(){
        var getMatchIdArray = async function(){
            var submissionSnippetVal = $(this.snippetTextEntryElement).val().trim().toLowerCase();
            var matchIdArray = []; //Character,Verb,Adjective
            for (snippetSegmentTypeIndex = 0; snippetSegmentTypeIndex < 3; snippetSegmentTypeIndex++) {
                var snippetSegmentTypeArray = this.snippetSegmentFullArray[snippetSegmentTypeIndex];
                for(snippetSegmentValueIndex = 0; snippetSegmentValueIndex < 3; snippetSegmentValueIndex++) {
                    var snippetSegmentValueArray = snippetSegmentTypeArray[snippetSegmentValueIndex]
                    var snippetSegmentValueIdIndex = snippetSegmentValueArray.length - 1 //the last value in the entry array is the ID
                    
                    for(snippetSegmentValueEntryIndex = 0; snippetSegmentValueEntryIndex < snippetSegmentValueIdIndex; snippetSegmentValueEntryIndex++) {
                        var snippetSegmentValueEntry = snippetSegmentValueArray[snippetSegmentValueEntryIndex];
                        var snippetSegmentIdVal = snippetSegmentValueArray[snippetSegmentValueIdIndex];
                        var matchingIdNum = -1;
                        snippetSegmentValueEntry = snippetSegmentValueEntry.toLowerCase();
                        if(submissionSnippetVal.indexOf(snippetSegmentValueEntry) > -1) matchingIdNum = snippetSegmentIdVal;
                    }
                }
                matchIdArray.push(matchingIdNum);
            }
            return matchIdArray;
        }        
        function setSubmissionStatus(element, isMissing) {
            if (isMissing) {
                $(element).attr('src','../images/square-outline-red.svg')
            } else {
                $(element).attr('src','../images/square-outline-green-check.svg')
            }
        }
        
        var entryIdArr = await getMatchIdArray();
        setSubmissionStatus($('#sc-char-status',this.tabInputDiv),entryIdArr[0] < 0);
        setSubmissionStatus($('#sc-verb-status',this.tabInputDiv),entryIdArr[1] < 0);
        setSubmissionStatus($('#sc-adj-status',this.tabInputDiv),entryIdArr[2] < 0);

        if(entryIdArr[0] < 0 || (entryIdArr[1] < 0 && entryIdArr[2] < 0)){
            return false;
        } else {
            return true;
        }
    };
    this.animateElement = async function(element, aniName, duration){
        $(element).addClass(`animated ${aniName}`)
        if (typeof duration === 'number') {
            await setTimeout( function(){
                $(element).removeClass(`animated ${aniName}`);
            }, duration);
        } else {
            await setTimeout( function(){
                $(element).removeClass(`animated ${aniName}`);
            }, 2000);
        }
    };
    this.updateSnippetSubmissionCountdown = function(secondsRemainingInRound){
        var snippetSecondCounterTextSpan = $('#countdown-sec')
        snippetSecondCounterTextSpan.text(secondsRemainingInRound);
        if ($('#submit-snippet').hasClass('disabled')) {
            if ($('#coundown-div').attr('style')!=='display:none;'){
                $('#coundown-div').hide();
            } else {
                return;
            }
        } else {
            if(!$('#coundown-div').hasClass('tada')) {
                if(secondsRemainingInRound > 10) return;
                $('#countdown').toggleClass('bg-danger border border-white rounded')
                $('#coundown-div').toggleClass('animated tada infinite countdown-alert');
            }
            if(secondsRemainingInRound <= 1) {
                $('#countdown-text').text('');
                snippetSecondCounterTextSpan.text('Times Almost Up!');
            }
        }
    };
    this.setProgressBar = function (secondsRemainingInRound,progPercent){
        var progDiv = $(".round-progress");
        progDiv.attr('aria-valuenow',progPercent).width(`${progPercent}%`).text(secondsRemainingInRound + ' sec')
        if (secondsRemainingInRound > 10) return;
    
        var hasWarning = progDiv.hasClass('bg-warning');
        var hasDanger = progDiv.hasClass('bg-danger');
    
        if(secondsRemainingInRound > 5) {
           if(hasWarning) return;
           progDiv.addClass('bg-warning')
           return;
        }
        if(secondsRemainingInRound > 1) {
            if(hasDanger) return;
            if(hasWarning) $(".round-progress").removeClass('bg-warning').addClass('bg-danger')
            return;
        }
        progDiv.text('< ' + secondsRemainingInRound + ' sec');    
    };
    this.updateTimeRemaining = function (cardType,millisecRemaining, previousSecondsRemainingInRound){
        var secondsRemainingInRound = Math.round(millisecRemaining * 0.001)
        var progPercent = Math.round((millisecRemaining/this.snippetTimeLimit) * 100);
    
        if(typeof secondsRemainingInRound !== 'number') {
            if (previousSecondsRemainingInRound === 0) return;
            secondsRemainingInRound = previousSecondsRemainingInRound;
        }
        if(previousSecondsRemainingInRound !== secondsRemainingInRound) {
            switch(true) {
            case cardType ==='snippet':
                this.updateSnippetSubmissionCountdown(
                    secondsRemainingInRound,
                    $('#submit-snippet').hasClass('disabled'),
                    $('#coundown-div').hasClass('tada')
                )
                break;
            }
            this.setProgressBar(secondsRemainingInRound,progPercent);
        }
        previousSecondsRemainingInRound = secondsRemainingInRound;
    };
    this.promptSnippetBoard = async function(){
        $('#snippetDisplay').html('')
        this.killTypeIt = true;
        await this.InitSnippet();
        $('#snippet-text',this.shellDiv).prop('disabled',false);
        let html = this.shellDiv.html()
        
        // console.log(html);
        let timerInterval
        let selectionCompleted = false;
        swal({
            html: html,
            timer: this.snippetTimeLimit, //snippetTimeLimit
            width: '600px',
            heightAuto: true,
            allowOutsideClick: false,
            allowEnterKey: false,
            showConfirmButton:false,
            onOpen: () => {
                $('#submit-snippet').on('click',function(){
    
                });
                $('#exit-game').on('click',async function(){
                    leaveClicked();
                    clearInterval(timerInterval);
                    swal.close()
                });
                timerInterval = setInterval(() => {
                    let previousSecondsRemainingInRound = 0;
                    this.updateTimeRemaining('snippet',swal.getTimerLeft(),previousSecondsRemainingInRound)
                }, 100);
            },
            onClose: () => {
                clearInterval(timerInterval);
                    // if(!selectionCompleted) {
                    this.InitSnippet();    
                    $('#snippetDisplay').append(this.shellDiv) 
                    // }
                }
        })
    };
};

var getStoryText = async function(){

}

//--------------Launch Functions----------------


let gameHolder;
async function establishSplash(){
    gameHolder = await new GameBoard;
    await gameHolder.InitSnippet(true);
    $('#snippetDisplay').append(gameHolder.shellDiv);
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
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });
    $('#dismiss, .overlay').on('click', sideCollapse);
    $('#sidebarCollapse').on('click', sideExpand);

    establishSplash();
    $("#RunCard").on('click',function(){
        gameHolder.promptSnippetBoard();
    });
});