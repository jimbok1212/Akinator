'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);
$('.btn-close').click(onCloseModal);

function init() {
  // console.log('Started...');
  createQuestsTree();
}

function onStartGuessing() {
  // TODO: hide the game-start section
  $('.game-start').hide();
  renderQuest();
  // TODO: show the quest section
  $('.quest').show();
}

function renderQuest() {
  // TODO: select the <h2> inside quest and update
  // its text by the currQuest text
  // console.log('gCurrQuest.txt', gCurrQuest.txt)
  var current = getCurrQuest()
$('.quest h2').text(current.txt)
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  // console.log('res', res)
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      // console.log("yes", res);
      $('.modal').show();
      $('.modal-body span').text('haha!! i Knew it!')
      onRestartGame();
      $('.quest').hide();
      // TODO: improve UX
    } else {
      // TODO: hide and show new-quest section
      $('.modal').show();
      $('.modal-body span').text('I dont know...teach me!');
      $('.quest').hide();
      $('.new-quest').show();
    }
  } else {
    // TODO: update the lastRes global var
    gLastRes = res
    moveToNextQuest(gLastRes);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  // console.log('ev', ev)
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  // console.log('newGuess', newGuess)
  // console.log('newQuest', newQuest)
  // TODO: Get the inputs' values
  // TODO: Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes)
  onRestartGame();
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.game-start').show();
  gLastRes = null;
}

function onCloseModal(){
  $('.modal').hide();
}