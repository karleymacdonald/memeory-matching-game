const memes = [{
    matchId: 1,
    img: 'img/meme1.png',
    alt: "Ross is fine meme",

  },{
    matchId: 2,
    img: 'img/meme2.png',
    alt: "Existential crisis meme"
  },{
    matchId: 3,
    img: 'img/meme3.png',
    alt: "Busy day meme"
  },{
    matchId: 4,
    img: 'img/meme4.png',
    alt: "Smart kid meme",
  },
  {
    matchId: 5,
    img: 'img/meme5.png',
    alt: "Relationship status meme",
  },
  {
    matchId: 6,
    img: 'img/meme6.png',
    alt: "Why is Drake so worried meme",
  }];

$(function() {
  let cardToMatch;
  let selectedCardCount = 0;
  let matchedCount = 0;

  const clearSelectedCards = () => {
    cardToMatch = null;
    selectedCardCount = 0;
  }

  const checkIfGameOver = () => {
    // there are only 6 pairs, once all are matched, hide the grid and show the completion message
    if (matchedCount >= 6) {
      $('.grid').addClass('hide');
      $('.completion-message').removeClass('hide');
    }
  }

  const checkForMatch = (matchId) => {
    // use setTimeout so the cards stay visible before being flipped or hidden
    setTimeout(function() {
      if (cardToMatch === matchId) {
        $('.selected').addClass('matched');
        matchedCount++
        checkIfGameOver()  
      } else {
        $('.selected').removeClass('selected');
      }
      clearSelectedCards();
    }, 2000);
  }

  const addCardClickHandler = () => {
    $('.card').on('click', function(event){
      const matchId = $(this).data('match-id');

      // don't allow clicks on already selected cards or if two cards are already selected
      if ($(event.target).parent().hasClass('selected') || selectedCardCount >= 2 ) {
        return; 
      } else {
        // keep track of number of cards selected
        selectedCardCount++;
        $(this).addClass('selected');
      }
      
      // if no card is selected yet, set the first card as the one to match
      if (!cardToMatch) {
        cardToMatch = matchId;
      } else {
        checkForMatch(matchId);
      }
    });
  }

  const resetGame = () => {
    matchedCount = 0;
    $('.grid').empty();
    buildGrid();
    $('.completion-message').addClass('hide');
    $('.grid').removeClass('hide');
  }

  const shuffle = (array) => {
    array.forEach((obj, currentIndex) => {
      let randomIndex = Math.floor(Math.random() * (currentIndex + 1));
      let temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    })
    return array;
  }

  const buildGrid = () => {
    // duplicate the array of memes to create matches for each card
    const cards = [...memes].concat(memes);

    // for each item in the cards array, build the html string 
    const cardList = shuffle(cards).map((card) => {
      const { img, alt, matchId } = card;
      return `<div class="card" data-match-id="${matchId}">
          <button class="front"'></button>
          <img class="back" src="${img}" alt="${alt}" />
        </div>`;
    });
  
    // append the html for all cards to the .grid div
    $('.grid').append(cardList.join(''));

    // set up event handlers to listen for clicks on cards
    addCardClickHandler();
  }

  // Restart button is never removed from DOM so we can set handler on load
  $('#restart').on('click', function(e){
    e.preventDefault();
    resetGame();
  })

  // Build the grid with the meme cards
  buildGrid();
});
