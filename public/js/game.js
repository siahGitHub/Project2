Array.prototype.clean = function(deleteValue) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == deleteValue) {         
        this.splice(i, 1);
        i--;
        }
    }
    return this;
};
let gameHolder;
let timerInterval;
let allDataArr = [];

var fillServerData = async function(){
    var urlArry = ['chars','verbs','adjectives'];
    var dataArray = [];
    for (var i = 0; i < 3; i++) {
        await fetch('/api/'+urlArry[i])
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                dataArray.push(myJson);

            });
        }
    allDataArr = dataArray
}



var GameBoard = function() {
    this.snippetTimeLimit = 2000; //in milliseconds
    this.timeBetweenSCFlips = 300; //in milliseconds
    this.snippetSegmentFullArray = [];//[CharactersArr,VerbsArr,AdjArr] formerly "data"
    this.killTypeIt = false;
    this.shellDiv;
    this.tabInputDiv;
    this.tabInputBtnDiv;
    this.tabStoryDiv;
    this.apiCallFunctions = {
        setData: async function(snippetSegmentFullArray){
            await fillServerData()
            snippetSegmentFullArray = [];
            function getRndInteger(min, max) {
                return Math.floor(Math.random() * (max - min + 1) ) + min;
            }
            for (var i = 0; i < 3; i++) {
                var subObjectArray = allDataArr[i];      
                for (var objIndex = 0; objIndex < 3; objIndex++) {
                var listItemObject = (subObjectArray[getRndInteger(0,subObjectArray.length - 1)]);
                    snippetSegmentFullArray.push(listItemObject)
                }
            }
            return snippetSegmentFullArray
        }, 
        getStoryText: async function() {

        },
        timeExpired: async function(activeBoard){
            var toggleWait = async function(){
                if($('#coundown-div',this.shellDiv).hasClass('infinite')){
                    console.log('huh')
                }
            }
            clearInterval(activeBoard.timerInterval);
            await activeBoard.SetRoundSnippet(true);    
            await activeBoard.InitSnippet(true);    
            $('#snippetDisplay').append(activeBoard.shellDiv)
            $('#countdown').removeClass('bg-danger border border-white rounded')
            $('#coundown-div').removeClass('animated tada infinite countdown-alert');
            await toggleWait();
        },
        leaveClicked: async function(){
            var swalAlertSettings = {title:'Deleted!', text:'You have been exited from the game', type:'success'}
            this.killTypeIt = false;
            swal(swalAlertSettings);
        },
        submitSnippetClicked: function (snippetSegmentFullArray) {
            function typeIt(i) {
                switch(true){
                    case i<3:
                        return 'char';
                    case i<6:
                        return 'verb';
                    case i<9:
                        return 'adj';
                };
            }
            var isCompleteSnippet = function(snippetSegmentFullArray){
                var getMatchIdArray = function(){
                    var submissionSnippetVal = $('#snippet-text').val().trim().toLowerCase();

                    var matchIdArray = []
                    for(i = 0; i < 9; i++) {
                        var matchObj = {
                            id: -1,
                            text:'',
                            type:-1
                        }
                        var data = snippetSegmentFullArray[i]
                        var dispText = data.text;
                        var altArr = data.alt_text.split(',');
                        dispText = dispText.toLowerCase();
                        
                        if(submissionSnippetVal.indexOf(dispText) > -1) {
                            matchObj.id = data.id;
                            matchObj.text = dispText;
                            matchObj.type = typeIt(i);
                            matchIdArray.push(matchObj)
                        }else {
                            for (altInd = 0; altInd < altArr.length-1; altInd++){
                                var altText = altArr[altInd]
                                altText = altText.toLowerCase()
                                if(submissionSnippetVal.indexOf(altText) > -1) {
                                    matchObj.id = data.id;
                                    matchObj.text = altText;
                                    matchObj.type = typeIt(i);
                                    matchIdArray.push(matchObj)
                                }
                            }
                        }
                    }
                    return matchIdArray;
                }
                function setSubmissionStatus(element, isListed) {
                    if (isListed) {
                        $(element).attr('src','../images/square-outline-green-check.svg')
                    } else {
                        $(element).attr('src','../images/square-outline-red.svg')
                    }
                };
                var entryIdArr = getMatchIdArray();
                var matchGroup = [false,false,false];
                for(i = 0; i < entryIdArr.length; i++) {
                    switch(entryIdArr[i].type){
                        case 'char':
                        matchGroup[0] = true;
                        break;
                        case 'adj':
                        matchGroup[1] = true;
                        break;
                        case 'verb':
                        matchGroup[2] = true;
                        break;
                    }
                }
                setSubmissionStatus($('#sc-char-status',this.tabInputDiv),matchGroup[0]);
                setSubmissionStatus($('#sc-verb-status',this.tabInputDiv),matchGroup[1]);
                setSubmissionStatus($('#sc-adj-status',this.tabInputDiv),matchGroup[2]);

                if(matchGroup[0] && (matchGroup[1] || matchGroup[2])) {
                    clearInterval(timerInterval);
                    swal.close();
                }
            }
            isCompleteSnippet(snippetSegmentFullArray);
        },
        submitVoteClicked: async function () {
            clearInterval(timerInterval);
            swal.close()
        }
    };
    this.timeExpired = async function(){
        clearInterval(this.timerInterval);
        await this.InitSnippet(true);    
        $('#snippetDisplay').append(this.shellDiv)    
    }
    this.SetStory = async function(htVal, divHolder){
        if(typeof htVal === 'number'){
        }
        $('#storyTab').height(htVal);
        var div = $('#rollingStory')
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
            function getRndInteger(min, max) {
                return Math.floor(Math.random() * (max - min + 1) ) + min;
            }        
            var charNum = getRndInteger(0,2)
            return `When ${this.snippetSegmentFullArray[0][charNum][0]} found the butler with a knife to the chest ${getGentderTemp(this.snippetSegmentFullArray[0][charNum][1])} ${getLower(this.snippetSegmentFullArray[2][getRndInteger(0,2)][1])} ${this.snippetSegmentFullArray[1][getRndInteger(0,2)][1]} the wound and called for help.`;
        };
        if(!(await this.SetRoundSnippet(isDemo))) {

        }
        
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
    this.SetRoundSnippet = async function(isDemo){
        this.snippetSegmentFullArray = await this.apiCallFunctions.setData(this.snippetSegmentFullArray);
        await this.refreshGameBoard();

        var displayArray = [];
        for (var i = 0; i < 9; i++) {
            var data = this.snippetSegmentFullArray[i]
            var text = data.text;
            var dataId = `data-id="${data.id}"`
            var alt = `data-alt-text="${data.alt_text}"`
            if(i>2) {
                text = text.toLowerCase();
                alt = alt.toLowerCase();
            }
            displayArray.push(`<div class="sc-front-item" ${dataId} ${alt}>${text}</div>`)
        }
        $(this.tabInputDiv).html(`
            <div class="sc-row">
                <div class="sc-holder">
                    <div id="sc-Character" class="segment-card">
                        <div class="sc-setup sc-back stroke-text Characters">Characters</div>
                        <div id="sc-Characters-front" class="sc-setup sc-front">
                            <div class="sc-front-title">Characters</div>
                            ${displayArray[0]}${displayArray[1]}${displayArray[2]}
                        </div>
                    </div>
                </div>
                <div class="sc-holder">
                    <div id="sc-Verb" class="segment-card">
                        <div class="sc-setup sc-back stroke-text Verbs">Verbs</div>
                        <div id="sc-Verbs-front" class="sc-setup sc-front">
                            <div class="sc-front-title">Verbs</div>
                            ${displayArray[3]}${displayArray[4]}${displayArray[5]}
                        </div>
                    </div>
                </div>
                <div class="sc-holder">
                    <div id="sc-Adjective" class="segment-card">
                    <div class="sc-setup sc-back stroke-text Adjectives">Adjectives</div>
                        <div id="sc-Adjectives-front" class="sc-setup sc-front">
                            <div class="sc-front-title">Adjectives</div>
                            ${displayArray[6]}${displayArray[7]}${displayArray[8]}
                        </div>  
                    </div>
                </div>
            </div> <!--segment-cards-->
            <div class="d-flex flex-row justify-content-between">
                <div>What happens next is up to you...</div>
                <div id="charcters-remaining">
                   <!-- <span id="segment-char-rem" class="mr-1">250 </span>Characters Remaining -->
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
        var btnIDText;
        if(isDemo) {
            btnIDText = 'demo'
        } else {
            btnIDText = 'snippet'
        }
        await this.AppendButtons(btnIDText);
    };
    this.AppendButtons = async function(btnIDText){
        var buttonDiv = $('<div>').addClass("d-flex flex-row justify-content-around m-2 border-top border-light");
        this.submitButton = $('<button>')
            .addClass('btn btn-success px-5 mt-1')
            .text('Ready to lock it in?')
            .attr('id',`${btnIDText}-submit`)
        this.leaveButton = $('<button>')
            .addClass('btn btn-danger px-5 mt-1')
            .text('Leave Game')
            .attr('id',`${btnIDText}-exit`)
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
        </div> <!--game holder-->`);
        this.shellDiv = $('<div>');
        this.tabInputBtnDiv = $('#tab-button-input',newMainDiv);
        this.tabInputDiv = $('#tab-input',newMainDiv);
        this.tabStoryDiv = $('#tab-story',newMainDiv);
        this.shellDiv.append(newMainDiv);
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
        var activeBoard = this;
        var timesUp = this.timeExpired
        $('#snippetDisplay').html('')
        this.killTypeIt = true;
        await this.InitSnippet();
        $('#snippet-text',this.shellDiv).prop('disabled',false);
        let html = this.shellDiv.html()
        await swal({
            html: html,
            timer: this.snippetTimeLimit, //snippetTimeLimit
            width: '600px',
            heightAuto: true,
            allowOutsideClick: false,
            allowEnterKey: false,
            showConfirmButton:false,
            onOpen: () => {
                $('#snippet-submit').on('click',function(){
                    activeBoard.apiCallFunctions.submitSnippetClicked(activeBoard.snippetSegmentFullArray)
                })
                $('#snippet-exit').on('click',this.apiCallFunctions.leaveClicked);
                    timerInterval = setInterval(() => {
                    let previousSecondsRemainingInRound = 0;
                    this.updateTimeRemaining('snippet',swal.getTimerLeft(),previousSecondsRemainingInRound)
                }, 100);
            },
            onClose: () => {
                activeBoard.apiCallFunctions.timeExpired(activeBoard);
            }
        })
    };
};

var getStoryText = async function(){

};
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

    $("#signinbtn").on('click',function(){
        $( "#signinbody" ).load( "/signin", function() {
            $("#sidebar",this).remove();
            $("#topnav",this).remove();
            // alert( "Load was performed." );
        });
    });
    
    $("#RunCard").on('click',function(){
        gameHolder.promptSnippetBoard();
    });

    $("#pullChar").on('click',function(){
        fillServerData()
    });
})
    
    