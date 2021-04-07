var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

const KEY = 'quest';

function createQuestsTree() {
    gQuestsTree = loadFromStorage(KEY)
    if(!gQuestsTree){
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
        saveQuestToStorage()
    }else{

    }
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
    // TODO: update the gPrevQuest, gCurrQuest global vars
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // TODO: Create and Connect the 2 Quests to the quetsions tree
    // console.log('newQuestTxt', newQuestTxt);
    // console.log('newGGGuessTxt', newGuessTxt);
    // console.log(newGuessTxt)
    var newQuest = createQuest(newQuestTxt)
    newQuest.yes = createQuest(newGuessTxt)
    newQuest.no = gCurrQuest;
    gPrevQuest[lastRes] = newQuest;
    gCurrQuest = gQuestsTree;
    saveQuestToStorage();
}

function getCurrQuest() {
    return gCurrQuest
}

function saveQuestToStorage() {
    saveToStorage(KEY, gQuestsTree);
  }