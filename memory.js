let arcana = [{'src': 'images/strength.png'}, {'src': 'images/perception.png'}, {'src': 'images/endurance.png'}, {'src': 'images/charisma.png'}, {'src': 'images/intelligence.png'}, {'src': 'images/agility.png'},
    {'src': 'images/luck.png'}, {'src': 'images/sleepy.png'}]

let card = document.getElementsByClassName('flip-box-inner');
let cards = [...card];
let compare = [];
let score = 0;

function shuffle(deck) {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * (deck.length - 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]
    }
    return deck
}

function FullGame() {
    let CardDeck = []

    arcana.forEach((pair) => {
        for (let i = 1; i <= 2; i++) {

            let image = pair.src
            CardDeck.push(image)

        }
    })

    shuffle(CardDeck)

    for (let i = 0; i < cards.length; i++) {
        document.getElementsByClassName('arcana')[i].src = CardDeck[i]
        cards[i].turned = false;
        cards[i].suit = CardDeck[i]
        cards[i].addEventListener('click', function () {
            if (cards[i].turned !== true && compare.length <= 2) {
                cards[i].turned = true;
                turn(cards[i]);
                check(cards[i], i)
            }
        })
    }
    function turn(obj) {
        if (obj.style.transform === 'rotateY(180deg)') obj.style.transform = 'rotateY(0deg)';
        else obj.style.transform = 'rotateY(180deg)';
    }

    function check(obj, index) {
        if (compare.length === 2) {
            if (obj.suit === compare[1] && index !== compare[0]) {
                console.log('Match!');
                score++;
                compare = [];
            } else {
                compare.push('blocking cards')
                setTimeout(function () {
                    turn(obj);
                    turn(cards[compare[0]]);
                    cards[index].turned = false;
                    cards[compare[0]].turned = false;
                    compare = [];
                }, 1000)
            }
        } else compare.push(index, obj.suit);
        if (score === 8) {
            setTimeout(function () {
                alert('Congratulations!')
            }, 1000)
        }
    }
}

//New Game Button//
document.getElementById('game_start').addEventListener('click', function () {
    if(compare.length <= 2){
        score = 0;
        compare = [];
        document.querySelectorAll('div.flip-box-inner').forEach(
            (card) => {
                card.style.transform = 'rotateY(0deg)';
            }
        )

        document.querySelectorAll('img.arcana').forEach(
            (card) => card.src = ''
        )

        setTimeout(FullGame, 1000);
    }

})

//Starting Game on load//
FullGame();