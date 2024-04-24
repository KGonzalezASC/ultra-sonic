import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import type { Puppeteer } from 'puppeteer';

const puppeteer = require('puppeteer');
let query = '';

let rand = Math.floor(Math.random() * (5));

switch(rand){
    case 0:
        query = 'rick roll'
        break;
    case 1:
        query = 'music'
        break;
    case 2:
        query = 'sports'
        break;
    case 3:
        query = 'gaming'
        break;
    case 4:
        query = 'pets'
        break;
}

let windows: Array<any> = [];
let windowCount = 0;
let videoIdList: Array<string> = [];
let results = 50;

async function fetchRandomVideo() {
    const apiKey = 'AIzaSyCFtVDxCVG6h_w8OHJRRgqHTDwj1l47icA'; // Replace with your actual API key
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${results}&q=${query}&key=${apiKey}`;

    try {
        // Fetch random video from YouTube Data API
        const response = await fetch(url);
        const data = await response.json();

        // Check if data.items exists and has at least one item
        if (!data.items || data.items.length === 0) {
            console.error('No video found for the given query.');
            return;
        }

        for (let i = 0; i < data.items.length; i++) {
            videoIdList[i] = data.items[i].id.videoId;
        }
    } catch (error) {
        console.error('Error fetching random video:', error);
    }
}

async function loadVideoWindow(windowSize = '620,1080', windowPosition = '0,0'){
    let rand = Math.floor(Math.random() * (results));

    const videoUrl = `https://www.youtube.com/watch?v=${videoIdList[rand]}`;

    // Launch Puppeteer and open a new browser window with configurable size and position
    windows[windowCount] = await puppeteer.launch({
        headless: false, // Run in non-headless mode
        args: [
            `--window-size=${windowSize}`,
            `--window-position=${windowPosition}`
        ]
    });

    const page = await windows[windowCount].newPage();
    // Go to the video URL
    await page.goto(videoUrl);

    windowCount++;
}

async function closeWindow() {
    let myWindow = windows[windowCount - 1];
  
    if ( myWindow != null)
    {
      await myWindow.close();
      windowCount--;
    }
}

// Example usage with custom window size and position
fetchRandomVideo();
loadVideoWindow('800,600', '100,100');
loadVideoWindow('800,600', '200,200');
loadVideoWindow('800,600', '300,300');
closeWindow();

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

// fetchRandomVideo();