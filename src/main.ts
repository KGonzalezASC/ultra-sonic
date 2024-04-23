import '../../ultra-sonic/src/style.css'

const apiKey = 'AIzaSyCFtVDxCVG6h_w8OHJRRgqHTDwj1l47icA';
let query = 'sports';
let windows: Array<Window|null> = [];
let windowCount = 0;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <p class="current-title">
       Open a random youtube video 
    </p>
  </div>
  <div>
    <button id="music">music</button>
    <button id="sports">sports</button>
    <button id="pets">pets</button>
    <button id="gaming">gaming</button>
    <button id="trailers">trailers</button>
  </div>
`;

async function fetchRandomVideo() {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${query}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        let rand = Math.floor(Math.random() * 49);
        const videoId = data.items[rand].id.videoId;
        // Specify window features to suggest opening a new window
        // Define the position and size of the new window
        const left = 900; // Distance from the left edge of the screen
        const top = 100; // Distance from the top edge of the screen
        const width = 800; // Width of the window
        const height = 600; // Height of the window
        windows[windowCount] = window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank', `height=${height},width=${width},left=${left},top=${top}`);
        windowCount++;
    } catch (error) {
        console.error('Error fetching random video:', error);
    }
}
// Attach the fetchRandomVideo function to the window load event
window.addEventListener('load', ()=>{
    fetchRandomVideo();
});


function closeWindow() {
  let myWindow = windows[windowCount - 1];

  if ( myWindow != null)
  {
    myWindow.close();
  }
}