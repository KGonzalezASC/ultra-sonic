import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

const puppeteer = require('puppeteer');


let windows = []; // Array to store Puppeteer browser instances
async function fetchRandomVideo(windowSize: string = '620,1080', windowPosition: string = '0,0', categoryId: string): Promise<void> {
    const apiKey = 'AIzaSyCFtVDxCVG6h_w8OHJRRgqHTDwj1l47icA'; // Replace with your actual API key
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=${categoryId}&maxResults=1&q=&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            console.error('No video found for the given category.');
            return;
        }

        const videoId = data.items[0].id.videoId;
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

        const browser = await puppeteer.launch({
            headless: false,
            args: [
                `--window-size=${windowSize}`,
                `--window-position=${windowPosition}`
            ]
        });

        const page = await browser.newPage();
        await page.goto(videoUrl);

        // Store the browser instance and window position in the windows array
        windows.push({ browser, windowPosition });

    } catch (error) {
        console.error('Error fetching random video:', error);
    }
}

async function fetchMultipleRandomVideos(count: number, categoryId: string): Promise<void> {
    for (let i = 0; i < count; i++) {
        // Calculate the window position for each video
        const windowPosition = `${i * 200},${i * 200}`; // Example: 0,0, 200,200, 400,400, etc.
        await fetchRandomVideo('620,1080', windowPosition, categoryId);
    }
}


// Example usage with different categories
// The category ID for music is 10, sports is 17, pets is 15, and gaming is 20.
const musicCategoryId = '10';
const sportsCategoryId = '17';
const petsCategoryId = '15';
const gamingCategoryId = '20';

// Fetch multiple random music videos
fetchMultipleRandomVideos(5, musicCategoryId).then(() => {
    console.log('All music videos fetched and opened in separate windows.');
});

// Fetch multiple random sports videos
fetchMultipleRandomVideos(5, sportsCategoryId).then(() => {
    console.log('All sports videos fetched and opened in separate windows.');
});

// Fetch multiple random pets videos
fetchMultipleRandomVideos(5, petsCategoryId).then(() => {
    console.log('All pets videos fetched and opened in separate windows.');
});

// Fetch multiple random gaming videos
fetchMultipleRandomVideos(5, gamingCategoryId).then(() => {
    console.log('All gaming videos fetched and opened in separate windows.');
});

// async function closeWindow() {
//     let myWindow = windows[windowCount - 1];
  
//     if ( myWindow != null)
//     {
//       await myWindow.close();
//       windowCount--;
//     }
// }

// Example usage with custom window size and position


// const path: string = '/dev/ttyS0'; // Replace with your serial port path
// const baudRate: number = 9600; // Replace with your desired baud rate

// const port: SerialPort = new SerialPort({ path, baudRate });
// const parser: ReadlineParser = new ReadlineParser();
// port.pipe(parser);

// parser.on('data', (data: string) => {
//     console.log(data);
// });

// port.write('ROBOT PLEASE RESPOND\n');
// console.log(port);


//wsl-archlinux variant
// async function fetchRandomVideo() {
//     const apiKey = 'AIzaSyCFtVDxCVG6h_w8OHJRRgqHTDwj1l47icA'; // Replace with your actual API key
//     const query = 'rick roll'; // Replace with your desired search query
//     const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${query}&key=${apiKey}`;

//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         const videoId = data.items[0].id.videoId;
//         const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

//         // Define window size and location
//         const width = 400; // Desired width of the new window
//         const height = 400; // Desired height of the new window
//         const x = 100; // Desired x-coordinate of the new window
//         const y = 100; // Desired y-coordinate of the new window

//         // Open videoUrl in a new Microsoft Edge window with the specified size and location
//         const { exec } = require('child_process');
//         exec(`cmd.exe /c start msedge --new-window "${videoUrl}" --window-size=${width},${height} --window-position=${x},${y}`);
//     } catch (error) {
//         console.error('Error fetching random video:', error);
//     }
// }
