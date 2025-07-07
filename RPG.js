let player = {
  hp: 100,
  baseAttack: 15,
  isBlocking: false
};
let monster = {
  hp: 100,
  attack: 10
};
function updateUI() {
  document.getElementById("player-hp").textContent = `HP: ${Math.max(player.hp, 0)}`;
  document.getElementById("monster-hp").textContent = `HP: ${Math.max(monster.hp, 0)}`;
}
function logMessage(message) {
  const logDiv = document.getElementById("log");
  logDiv.innerHTML = `<p>${message}</p>` + logDiv.innerHTML;
}
function disableActions() {
  document.getElementById("attack-btn").disabled = true;
  document.getElementById("block-btn").disabled = true;
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
  logMessage(`The monster hits you for ${damage} damage.`);
  if (player.hp <= 0) {
    logMessage("💀 You were defeated by the monster.");
    disableActions();
  }
}
function attack() {
  let damage = player.baseAttack;
  monster.hp -= damage;
  logMessage(`You attack the monster for ${damage} damage!`);
  if (monster.hp <= 0) {
    logMessage("🎉 You defeated the monster!");
    disableActions();
    updateUI();
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
document.getElementById("start-btn").addEventListener("click", function() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";
  logMessage("The battle begins!");
  updateUI();
});
document.getElementById("attack-btn").addEventListener("click", attack);
document.getElementById("block-btn").addEventListener("click", block);
