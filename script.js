const form = document.getElementById('checkInForm');
const nameInput = document.getElementById('attendeeName');
const teamSelect = document.getElementById('teamSelect');

//Track attendance
let count = 0;
const maxCount = 50;

//Track team attendance
const teamCounts = {
  water: 0,
  zero: 0,
  power: 0
};

const teamNames = {
  water: 'Team Water Wise',
  zero: 'Team Net Zero',
  power: 'Team Renewables'
};

//Local Storage Functions
function saveDataToStorage() {
  const eventData = {
    totalCount: count,
    teams: teamCounts,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem('sustainabilityEventData', JSON.stringify(eventData));
  console.log('💾 Data saved to local storage:', eventData);
}

function loadDataFromStorage() {
  const savedData = localStorage.getItem('sustainabilityEventData');
  if (savedData) {
    try {
      const eventData = JSON.parse(savedData);
      count = eventData.totalCount || 0;
      
      //Load team counts
      if (eventData.teams) {
        teamCounts.water = eventData.teams.water || 0;
        teamCounts.zero = eventData.teams.zero || 0;
        teamCounts.power = eventData.teams.power || 0;
      }
      
      console.log('📂 Data loaded from local storage:', eventData);
      console.log(`🔄 Restored: Total=${count}, Teams=${JSON.stringify(teamCounts)}`);
      
      //Update display with loaded data
      updateDisplayFromStorage();
      
      return true;
    } catch (error) {
      console.error('❌ Error loading saved data:', error);
      return false;
    }
  }
  console.log('🆕 No saved data found, starting fresh');
  return false;
}

function updateDisplayFromStorage() {
  //Update total attendance display
  const attendeeCountDisplay = document.getElementById('attendeeCount');
  attendeeCountDisplay.textContent = count;
  
  //Update progress bar
  const percentage = Math.round((count / maxCount) * 100);
  const progressBar = document.getElementById('progressBar');
  progressBar.style.width = percentage + '%';
  
  //Update team counters
  document.getElementById('waterCount').textContent = teamCounts.water;
  document.getElementById('zeroCount').textContent = teamCounts.zero;
  document.getElementById('powerCount').textContent = teamCounts.power;
  
  //Check if goal was already reached
  if (count >= maxCount) {
    celebrateGoalReached();
  }
  
  console.log('🔄 Display updated with stored data');
}

function clearStoredData() {
  localStorage.removeItem('sustainabilityEventData');
  count = 0;
  teamCounts.water = 0;
  teamCounts.zero = 0;
  teamCounts.power = 0;
  updateDisplayFromStorage();
  
  //Re-enable form if it was disabled
  form.style.opacity = '1';
  form.style.pointerEvents = 'auto';
  
  //Clear greeting message
  const greeting = document.getElementById('greeting');
  greeting.style.display = 'none';
  
  console.log('🗑️ All stored data cleared and display reset');
}

//Load saved data when page loads
document.addEventListener('DOMContentLoaded', function() {
  loadDataFromStorage();
});

//Handle form submission
form.addEventListener('submit', function(event) {
  event.preventDefault();


//Get form values
const name = nameInput.value.trim();
const team = teamSelect.value;
const teamName = teamSelect.selectedOptions[0].text;

//Validate that name is provided
if (!name) {
  alert('Please enter your name before checking in.');
  return;
}

//Validate that team is selected
if (!team) {
  alert('Please select your team before checking in.');
  return;
}

console.log(`Checking in: ${name} from ${teamName}`);

//Increment count 
count++;
console.log('Total check-ins', count);

//Update attendance display
const attendeeCountDisplay = document.getElementById('attendeeCount');
attendeeCountDisplay.textContent = count;

//Update progress bar
const percentage = Math.round((count / maxCount) * 100);
const progressBar = document.getElementById('progressBar');
progressBar.style.width = percentage + '%';
console.log(`Progress: ${percentage}%`);

//Update team attendance tracking
teamCounts[team]++;
console.log(`${teamNames[team]} now has ${teamCounts[team]} members`);

//Update team counter display
const teamCounter = document.getElementById(team + "Count");
teamCounter.textContent = teamCounts[team];

//Save data to local storage after each check-in
saveDataToStorage();

//Log all team counts for debugging
console.log('Current team counts:', teamCounts);
console.log(`🌊 ${teamNames.water}: ${teamCounts.water} members`);
console.log(`🌿 ${teamNames.zero}: ${teamCounts.zero} members`);
console.log(`⚡ ${teamNames.power}: ${teamCounts.power} members`);

//Check if goal is reached and celebrate
if (count >= maxCount) {
  celebrateGoalReached();
}

//Function to handle celebration when goal is reached
function celebrateGoalReached() {
  //Find the winning team (team with most members)
  let winningTeam = '';
  let highestCount = 0;
  let isTie = false;
  
  //Check each team's count
  for (const team in teamCounts) {
    if (teamCounts[team] > highestCount) {
      highestCount = teamCounts[team];
      winningTeam = team;
      isTie = false;
    } else if (teamCounts[team] === highestCount && teamCounts[team] > 0) {
      isTie = true;
    }
  }
  
  //Create celebration message
  let celebrationMessage = '';
  if (isTie) {
    celebrationMessage = `🎊 CONGRATULATIONS! 🎊<br><br>
                         🎯 We've reached our goal of ${maxCount} attendees!<br><br>
                         🤝 It's a TIE! Multiple teams share the lead with ${highestCount} members each!<br><br>
                         🌍 Amazing teamwork from everyone at the Sustainability Summit! 🌱`;
  } else {
    const winningTeamName = teamNames[winningTeam];
    const winningEmoji = winningTeam === 'water' ? '🌊' : winningTeam === 'zero' ? '🌿' : '⚡';
    celebrationMessage = `🎊 CONGRATULATIONS! 🎊<br><br>
                         🎯 We've reached our goal of ${maxCount} attendees!<br><br>
                         🏆 ${winningEmoji} ${winningTeamName} WINS with ${highestCount} members!<br><br>
                         🌍 Thank you to everyone who joined the Sustainability Summit! 🌱`;
  }
  
  //Display celebration message
  const greeting = document.getElementById('greeting');
  greeting.innerHTML = `<div style="text-align: center; font-size: 1.2em;">${celebrationMessage}</div>`;
  greeting.style.display = 'block';
  greeting.style.color = '#059669';
  greeting.style.padding = '25px';
  greeting.style.borderRadius = '12px';
  greeting.style.backgroundColor = '#ecfdf5';
  greeting.style.border = '2px solid #10b981';
  greeting.style.marginBottom = '20px';
  greeting.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  
  //Add confetti effect to progress bar
  progressBar.style.background = 'linear-gradient(45deg, #10b981, #059669, #047857)';
  progressBar.style.animation = 'pulse 2s infinite';
  
  //Disable form since goal is reached
  form.style.opacity = '0.6';
  form.style.pointerEvents = 'none';
  
  console.log('🎉 GOAL REACHED! Celebration activated!');
  console.log(`🏆 Winning team: ${teamNames[winningTeam]} with ${highestCount} members`);
}

//Show personalized welcome message (only if goal not reached)
if (count < maxCount) {
  const welcomeMessages = [
    `🎉 Welcome to the Sustainability Summit, ${name}!`,
    `🌱 Great to see you here, ${name}!`,
    `✨ Welcome aboard, ${name}!`,
    `🌍 Thanks for joining us, ${name}!`
  ];
  const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
  const fullMessage = `${randomWelcome} You're representing ${teamName} (${teamCounts[team]} members) and you're attendee #${count}.`;

  console.log(fullMessage);

  //Display personalized greeting to user
  const greeting = document.getElementById('greeting');
  greeting.innerHTML = `<strong>${fullMessage}</strong>`;
  greeting.style.display = 'block';
  greeting.style.color = '#2563eb';
  greeting.style.padding = '15px';
  greeting.style.borderRadius = '8px';
  greeting.style.backgroundColor = '#eff6ff';
  greeting.style.border = '1px solid #bfdbfe';
  greeting.style.marginBottom = '20px';
}

form.reset();

//const current = parseInt(teamCounter.textContent);
//console.log("Previous team count:", current);

//const newTotal = current + 1;
//console.log("New team count:", newTotal);

});