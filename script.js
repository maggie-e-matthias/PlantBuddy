// Title Bar Buttons

const {ipcRenderer} = require("electron"); 
const minimizeBtn = document.getElementById("minimize-btn");
const closeBtn = document.getElementById("close-btn");

minimizeBtn.addEventListener("click", () =>
    ipcRenderer.send("window:minimize"),
);

closeBtn.addEventListener("click", () =>
    ipcRenderer.send("window:close"),
);

// Water Meter Mechanics


// Configuration

const drain_amount = 1; // % to drain per tick
const drain_interval = 900; // 1% per 0.9s = completely drained in 90s
const water_cooldown = 10000; // 10s cooldown after watering

// Default State
let water_level = 100; 
let water_on_cooldown = false; 
let cooldown_timer = null; 

// Elements 

const bars = Array.from({length: 10}, (_, i) =>
    document.getElementById(`bar-${i + 1}`),
);

const percentage_el = document.getElementById("percentage");
const mood_tag = document.getElementById("mood");
const plant_icon = document.getElementById("plant");
const care_reminder = document.getElementById("message");
const water_btn = document.getElementById("water-btn");
const water_timer_el = water_btn.querySelector(".timer");
const restart_btn = document.getElementById("restart-btn");



