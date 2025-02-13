let xp = 0;
let health = 100;
let gold = 50;
let inventory = ["stick"];
let currentWeaponIndex = 0;
let fighting;

const xpText = document.getElementById("xpText");
const healthText = document.getElementById("healthText");
const goldText = document.getElementById("goldText");

const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const monsterStatsText = document.getElementById("monsterStats");
const monsterNameText = document.getElementById("monsterName");
const monsterHealthText = document.getElementById("monsterHealth");
const text = document.getElementById("text");

const locations = [
  {
    name: "go town",
    buttonText: ["Go to store", "Go to cave", "fightDragon"],
    buttonFunction: [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says 'Store'.",
  },
  {
    name: "go store",
    buttonText: [
      "Buy 10 health(10 gold)",
      "Buy weapon (30 gold)",
      "Go to town square",
    ],
    buttonFunction: [buyHealth, buyWeapon, goTown],
    text: "You enter the store.",
  },

  {
    name: "go cave",
    buttonText: ["Fight slime ", "Fight fanged beast", "Go to town square"],
    buttonFunction: [fightSlime, fightBeast, goTown],
    text: "You enter the store.",
  },
  {
    name: "fight dragon",
    buttonText: ["attack", "dodge", "Run"],
    buttonFunction: [attack, dodge, goTown],
    text: "You are fighting a monster.",
  },
];
/* vũ khí */
const weapons = [
  { name: "stick", power: 5 },
  { name: "dagger", power: 30 },
  { name: "claw hammer", power: 50 },
  { name: "sword", power: 100 },
];
/* Quái vật */
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15,
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60,
  },
  {
    name: "dragon",
    level: 20,
    health: 300,
  },
];
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  button1.innerText = location.buttonText[0];
  button2.innerText = location.buttonText[1];
  button3.innerText = location.buttonText[2];
  button1.onclick = location.buttonFunction[0];
  button2.onclick = location.buttonFunction[1];
  button3.onclick = location.buttonFunction[2];
  text.innerText = location.text;
  monsterStatsText.style.display = "none";
}

function goTown() {
  update(locations[0]);
}
function goStore() {
  update(locations[1]);
}
function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}
function buyWeapon() {
  if (currentWeaponIndex < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeaponIndex++;
      const currentWeapon = weapons[currentWeaponIndex].name;

      health += 30;
      goldText.innerText = gold;

      healthText.innerText = health;

      inventory.push(currentWeapon);

      text.innerText =
        `You now have a ${currentWeapon} In your inventory you have: ` +
        inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}
function fightBeast() {
  fighting = 1;
  goFight();
}
function fightDragon() {
  fighting = 2;
  goFight();
}
function goFight() {
  update(locations[3]);
  monsterStatsText.style.display = "block";
  monsterHealthText.innerText = monsters[fighting].health;
  monsterNameText.innerText = monsters[fighting].name;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";

  text.innerText +=
    " You attack it with your " + weapons[currentWeaponIndex].name + ".";

  health -= getMonsterAttackValue(monsters[fighting].level);

  monsterHealth -=
    weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;

  healthText.innerText = health;

  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    defeatMonster();
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    /*chungs toi khong mun vu khi ng choi bi hong thêm &&  */
    text.innerText += " Your " + inventory.pop() + " breaks.";
  }
}
function dodge() {
  text.innerText = `You dodge the attack from the ` + monsters[fighting].name;
}

function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  return hit > 0 ? hit : 0;
}
