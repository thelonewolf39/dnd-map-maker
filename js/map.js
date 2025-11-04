const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
const terrainSelect = document.getElementById('terrain');
const gridInput = document.getElementById('gridSize');
const clearBtn = document.getElementById('clearMap');

let gridSize = parseInt(gridInput.value);
let mapData = [];
let terrainColors = {
  grass: '#6dbf4b',
  wall: '#7a5c46',
  water: '#4b89bf',
  lava: '#d24d26'
};

function initMap() {
  const cols = canvas.width / gridSize;
  const rows = canvas.height / gridSize;
  mapData = Array(rows).fill().map(() => Array(cols).fill('grass'));
  drawMap();
}

function drawMap() {
  const cols = mapData[0].length;
  const rows = mapData.length;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      ctx.fillStyle = terrainColors[mapData[y][x]];
      ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
      ctx.strokeStyle = '#00000022';
      ctx.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize);
    }
  }
}

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / gridSize);
  const y = Math.floor((e.clientY - rect.top) / gridSize);
  mapData[y][x] = terrainSelect.value;
  drawMap();
});

gridInput.addEventListener('change', () => {
  gridSize = parseInt(gridInput.value);
  initMap();
});

clearBtn.addEventListener('click', initMap);

initMap();
