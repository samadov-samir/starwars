let characters_section = document.querySelector('#characters-section');

let selected_character_section = document.querySelector('#selected-character-section');
let available_to_attack_section = document.querySelector('#available-to-attack-section');
let defender = document.querySelector('#defenderrr');
let attack_button = document.querySelector('#attack-button');
let game_message = document.querySelector('#game-message');
var attack_character;

const createStar =function createStar(name, img, health){
    var character = document.createElement('div');
    character.classList.add('character')
    var character_name = document.createElement('h2');
    character_name.innerHTML = name;
    character_name.classList.add('character-name')
    var character_image = document.createElement('img');
    character_image.src = img;
    character_image.classList.add('character-image')
    var character_health = document.createElement('p');
    character_health.innerHTML = health;
    character_health.classList.add("character-health");
    character.append(character_name, character_image, character_health);
    characters_section.append(character);
}

const randomFunk = function randomFunk() {
    let random = [100, 110, 120, 130, 150];
    let index = Math.floor(Math.random() * 5);
    return random[index];
}

createStar('Obi-Wan Kenobi', './assets/images/obi-wan.jpg', randomFunk())
createStar('Luke SkyWalker', './assets/images/luke-skywalker.jpg', randomFunk())
createStar('Darth Sidious', './assets/images/darth-sidious.png', randomFunk())
createStar('Darth Maul', './assets/images/darth-maul.jpg', randomFunk())
let character = document.querySelectorAll('#characters-section .character');

for (let i = 0; i < character.length; i++) {
    character[i].addEventListener('click', () => {
        for (let j = 0; j < character.length; j++) {
            if (character[i] === character[j]) {
                character[j].id = 'selected-character';
                selected_character_section.append(character[j])
            }
            else {
                available_to_attack_section.append(character[j])

            }
        }
        character = [];
        characters_section.remove()

        attack_character = document.querySelectorAll('#available-to-attack-section .character');
        for (const ach of attack_character) {
            ach.addEventListener('click', () => {
                if (defender.children.length === 0) {
                    ach.id = 'defender';
                    game_message.innerHTML = ''
                    defender.append(ach)
                }
            })
        }
    })
}

const MyrandomAttack = function MyrandomAttack() {
    var attack_random = Math.ceil(Math.random() * (45 - 5) + 5);
    return attack_random;
}

const EnemyrandomAttack = function EnemyrandomAttack() {
    var attack_random = Math.ceil(Math.random() * (10 - 5) + 5);
    return attack_random;
}

const restartBtn = function restartBtn(){
    const btn=document.createElement('button');
    btn.innerHTML='Restart'
    game_message.append(btn)
    btn.addEventListener('click',()=>{
        window.location.reload(true);
    })
}

attack_button.addEventListener('click', () => {
    let myAttack = document.querySelector('#selected-character p');
    let enemyAttack = document.querySelector('#defender p');
    let availableAttackSection = document.querySelectorAll('#available-to-attack-section .character')
    if (myAttack && enemyAttack) {
        let enemyName = document.querySelector('#defender h2').innerHTML;
        let selected_character = parseInt(myAttack.innerHTML);
        let enemy = parseInt(enemyAttack.innerHTML);
        let myrandomAttack = MyrandomAttack();
        let enemyrandomAttack = EnemyrandomAttack();
        myAttack.innerHTML = selected_character - enemyrandomAttack;
        enemyAttack.innerHTML = enemy - myrandomAttack;
        game_message.innerHTML = `<p>You attacked ${enemyName} for ${myrandomAttack} damage</p>
       <p>${enemyName} attacked you for ${enemyrandomAttack} damage</p>`
        if (parseInt(enemyAttack.innerHTML) <= 0) {
            document.querySelector('#defender').remove()
            game_message.innerHTML = `<p>You have defeated ${enemyName},you can choose to fight another enemy</p>`
        }
        if (parseInt(enemyAttack.innerHTML) <= 0 && availableAttackSection.length === 0) {
            game_message.innerHTML = `<p>You Won!!!</p>`
            restartBtn()
        }
        else if (parseInt(myAttack.innerHTML) <= 0) {
            document.querySelector('#selected-character').remove()
            game_message.innerHTML = `<p>Game Over!!!</p>`
            restartBtn()
        }
    }
})