import '../../ultra-sonic/src/style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <p class="current-title">
       Open a random youtube video 
    </p>
  </div>
`

async function fetchRandomVideo() {
    const apiKey = 'AIzaSyCFtVDxCVG6h_w8OHJRRgqHTDwj1l47icA'; // Replace with your actual API key
    const query = 'rick roll'; // Replace with your desired search query
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${query}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const videoId = data.items[0].id.videoId;
        // Specify window features to suggest opening a new window
        // Define the position and size of the new window
        const left = 900; // Distance from the left edge of the screen
        const top = 100; // Distance from the top edge of the screen
        const width = 800; // Width of the window
        const height = 600; // Height of the window
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank', `height=${height},width=${width},left=${left},top=${top}`);
    } catch (error) {
        console.error('Error fetching random video:', error);
    }
}
// Attach the fetchRandomVideo function to the window load event
window.addEventListener('load', ()=>{
    console.log("ham");
    fetchRandomVideo();
});