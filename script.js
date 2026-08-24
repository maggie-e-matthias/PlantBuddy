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

// Rendering

function updateUI(){
    // Updates bars
    // bar n is filled if water_level > 10

    percentage_el.textContent = `${water_level}%`;
    bars.forEach((bar, i) => {
        const threshold = i * 10; 
        const filled = water_level > threshold; 
        bar.style.background = filled ? "#8FC98A" : "#C2E0B8";
        bar.style.color = filled ? "#8FC98A" : "#C2E0B8"; 
    });


    // Update Mood
    if (water_level > 74){
        // Thriving (75% - 100%)
        plant_icon.src = "assets/cactus-plant/cactus-thriving.gif";
        mood_tag.textContent = "Thriving";
        care_reminder.textContent = "- All good here, just vibing -";
        restart_btn.style.display = "none";
        water_btn.style.display = "flex";   
    }
    else if(water_level > 39){
        // Ok (40% - 74%)
        plant_icon.src = "assets/cactus-plant/cactus-okay.gif";
        mood_tag.textContent = "Okay"; 
        care_reminder.textContent = "- Doing fine, no worries -";
        restart_btn.style.display = "none";
        water_btn.style.display = "flex";
    }
    else if(water_level > 0){
        // Thirsty (0% - 39%)
        plant_icon.src = "assets/cactus-plant/cactus-thirsty.gif";
        mood_tag.textContent = "Thirsty"; 
        care_reminder.textContent = "- Feeling a little dry over here... -";
        restart_btn.style.display = "none";
        water_btn.style.display = "flex";
    }
    else{
        plant_icon.src = "assets/cactus-plant/cactus-wilted.gif";
        mood_tag.textContent = "Wilted"; 
        care_reminder.textContent = "- Your plant has wilted -";
        restart_btn.style.display = "flex";
        water_btn.style.display = "none";
    }


    // Drain Loop
    setInterval(() =>{
        if(water_level > 0){
            water_level = Math.max(0, water_level - drain_amount);
            updateUI();
        }
    })
}

