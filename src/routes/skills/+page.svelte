<script>
  let selectedClass = "Mage"; // placeholder

const skillTree = {
  Mage: [
    [{ name: "Arcane Spark" }],
    [{ name: "Mana Surge" }, { name: "Spell Weaving" }],
    [{ name: "Arcane Shield" }, { name: "Blink" }],
    [{ name: "Time Dilation" }, { name: "Mana Vortex" }],
    [{ name: "Reality Tear" }]
  ]
};
$: lastRowIndex = skillTree[selectedClass].length - 1;
</script>

<h1 class="display-5 mb-4">🧠 Skills – {selectedClass}</h1>

<div class="skill-tree">
  {#each skillTree[selectedClass] as row, rowIndex (rowIndex)}
    <div class="skill-row">
      {#each row as skill, skillIndex (skillIndex)}
        <div class="skill-node-wrapper">
          <!-- Top connector -->
{#if !(rowIndex === 0 || (rowIndex === lastRowIndex && skillIndex === Math.floor(skillTree[selectedClass][rowIndex].length / 2)))}
  <div
    class="connector-line top-line
      {rowIndex === 1 && skillIndex === 0 ? 'angled angled-left' : ''}
      {rowIndex === 1 && skillIndex === 1 ? 'angled angled-right' : ''}"
  ></div>
{/if}

<!-- Skill card -->
<div class="skill-card">{skill.name}</div>

<!-- Bottom connector -->
{#if !(rowIndex === skillTree[selectedClass].length - 1 || (rowIndex === 0 && skillIndex === Math.floor(skillTree[selectedClass][rowIndex].length / 2)))}
  <div
    class="connector-line bottom-line
      {rowIndex === skillTree[selectedClass].length - 2 && skillIndex === 0 ? 'angled angled-left' : ''}
      {rowIndex === skillTree[selectedClass].length - 2 && skillIndex === 1 ? 'angled angled-right' : ''}"
  ></div>
{/if}
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
.skill-tree {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

.skill-row {
  display: flex;
  justify-content: center;
  gap: 4rem;
  position: relative;
}

.skill-node-wrapper {
  position: relative;
  width: 120px;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.skill-card {
  width: 100%;
  height: 80px;
  background: linear-gradient(to bottom right, #431379, #111328);
  color: #FBEDFE;
  border: 2px solid #1a133e;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Orbitron', sans-serif;
  z-index: 2;
  position: relative;
  text-align: center;
  padding: 0.5rem;
}

.connector-line {
  position: absolute;
  width: 2px;
  background: #A564F8;
  z-index: 1;
}

.top-line {
  height: 40px;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
}

.bottom-line {
  height: 40px;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
}
.connector-line {
  position: absolute;
  width: 2px;
  background: #A564F8;
  z-index: 1;
}

.top-line {
  height: 40px;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
}

.bottom-line {
  height: 40px;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
}

/* Diagonal styles */
.angled {
  width: 2px;
  height: 40px;
  background: #A564F8;
  transform-origin: top center;
}

.angled-left {
  transform: rotate(30deg);
  left: 50%;
  top: -30px;
}

.angled-right {
  transform: rotate(-30deg);
  left: 50%;
  top: -30px;
}

/* For bottom lines */
.bottom-line.angled-left {
  transform: rotate(-30deg);
  bottom: -30px;
  top: auto;
}

.bottom-line.angled-right {
  transform: rotate(30deg);
  bottom: -30px;
  top: auto;
}
</style>
