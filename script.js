let currentLevel = 0;
const monsters = [
  { name: "Goblin", hp: 100, attack: 10 },
  { name: "Ogre", hp: 110, attack: 11 },
  { name: "Dark Lord", hp: 200, attack: 5 }
];
let monster = { ...monsters[currentLevel] };
let player = {
  hp: 100,
  baseAttack: 15,
  isBlocking: false
};
document.getElementById("start-btn").addEventListener("click", function() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";
  logMessage("The battle begins!");
  updateUI();
});
document.getElementById("attack-btn").addEventListener("click", attack);
document.getElementById("block-btn").addEventListener("click", block);
function attack() {
  let damage = player.baseAttack;
  monster.hp -= damage;
  logMessage(`You attack ${monster.name} for ${damage} damage!`);
  if (monster.hp <= 0) {
    logMessage(`🎉 You defeated ${monster.name}!`);
    currentLevel++;
    if (currentLevel >= monsters.length) {
      showWinScreen();
      disableActions();
      return;
    }
    logMessage("Healing... and preparing next battle.");
    disableActions();
    setTimeout(nextLevel, 2000);
    return;
  }
  enemyTurn();
  updateUI();
}
function block() {
  player.isBlocking = true;
  logMessage("You brace for the next attack (Blocking).");
  enemyTurn();
  updateUI();
}
function enemyTurn() {
  if (monster.hp <= 0) return;
  let damage = monster.attack;
  if (player.isBlocking) {
    damage = Math.floor(damage / 2);
    logMessage("You blocked some of the damage!");
  }
  player.hp -= damage;
  player.isBlocking = false;
  logMessage(`${monster.name} hits you for ${damage} damage.`);
  if (player.hp <= 0) {
    logMessage("💀 You were defeated.");
    showLoseScreen();
    disableActions();
  }
  updateUI();
}
function nextLevel() {
  monster = { ...monsters[currentLevel] };
  player.hp = 100;
  player.isBlocking = false;
  logMessage(`🔥 New Boss: ${monster.name} appears!`);
  updateUI();
  enableActions();
}
function updateUI() {
  document.getElementById("player-hp").textContent = `HP: ${Math.max(player.hp, 0)}`;
  document.getElementById("monster-hp").textContent = `HP: ${Math.max(monster.hp, 0)}`;
  document.getElementById("monster-name").textContent = monster.name;
}
function logMessage(message) {
  const logDiv = document.getElementById("log");
  logDiv.innerHTML = `<p>${message}</p>` + logDiv.innerHTML;
}
function disableActions() {
  document.getElementById("attack-btn").disabled = true;
  document.getElementById("block-btn").disabled = true;
}
function enableActions() {
  document.getElementById("attack-btn").disabled = false;
  document.getElementById("block-btn").disabled = false;
}
function showWinScreen() {
  document.getElementById("game-screen").style.display = "none";
  document.getElementById("win-screen").style.display = "block";
}
function showLoseScreen() {
  document.getElementById("game-screen").style.display = "none";
  document.getElementById("lose-screen").style.display = "block";
}
