import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

const puppeteer = require('puppeteer');

let windows : any[] = []; // Array to store Puppeteer browser instances
let windowNum :number = 0;

async function fetchRandomVideo(windowPosition: string = '0,0', categoryId: string): Promise<void> {
    const apiKey = 'AIzaSyCFtVDxCVG6h_w8OHJRRgqHTDwj1l47icA'; // Replace with your actual API key
    const rickRollVideoId = 'dQw4w9WgXcQ'; // The video ID for "Rick Roll"

    // Generate a random number between 0 and 100
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    // Check if the random number falls within the 10% range
    if (randomNumber <= 10) {
        // If it does, fetch and play "Rick Roll"
        const videoUrl = `https://www.youtube.com/watch?v=${rickRollVideoId}`;

        // Generate random dimensions for the window
        const windowWidth = Math.floor(Math.random() * 1080) + 1;
        const windowHeight = Math.floor(Math.random() * 1080) + 1;

        const browser = await puppeteer.launch({
            headless: false,
            // product:'firefox',
            args: [
                `--window-size=${windowWidth},${windowHeight}`,
                `--window-position=${windowPosition}`
            ]
        });

        const page = await browser.newPage();
        await page.goto(videoUrl);

        // Store the browser instance and window position in the windows array
        windows.push([ browser, windowPosition ]);
        windowNum++;
    } else {
        // Otherwise, proceed with fetching a random video from the specified category
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

            // Generate random dimensions for the window
            const windowWidth = Math.floor(Math.random() * 1080) + 1;
            const windowHeight = Math.floor(Math.random() * 1080) + 1;

            const browser = await puppeteer.launch({
                headless: false,
                args: [
                    `--window-size=${windowWidth},${windowHeight}`,
                    `--window-position=${windowPosition}`
                ]
            });

            const page = await browser.newPage();
            await page.goto(videoUrl);

            // Store the browser instance and window position in the windows array
            windows.push([ browser, windowPosition ]);

        } catch (error) {
            console.error('Error fetching random video:', error);
        }
    }
}


async function fetchMultipleRandomVideos(count: number, categoryId: string): Promise<void> {
    for (let i = 0; i < count; i++) {
        // Calculate the window position for each video with a random offset
        const randomOffsetX = Math.floor(Math.random() * 500) + 1; // Random offset for X position
        const randomOffsetY = Math.floor(Math.random() * 500) + 1; // Random offset for Y position
        const windowPosition = `${i * 1000 + randomOffsetX},${i * 1000 + randomOffsetY}`;

        await fetchRandomVideo(windowPosition, categoryId);
    }
}


// Example usage with different categories
// The category ID for music is 10, sports is 17, pets is 15, and gaming is 20.
const musicCategoryId = '10';
const sportsCategoryId = '17';
const petsCategoryId = '15';
const gamingCategoryId = '20';

// Fetch multiple random music videos
// fetchMultipleRandomVideos(1, musicCategoryId).then(() => {
//     console.log('All music videos fetched and opened in separate windows.');
// });

// Fetch multiple random sports videos
// fetchMultipleRandomVideos(1, sportsCategoryId).then(() => {
//     console.log('All sports videos fetched and opened in separate windows.');
// });

// Fetch multiple random pets videos
// fetchMultipleRandomVideos(1, petsCategoryId).then(() => {
//     console.log('All pets videos fetched and opened in separate windows.');
// });

// Fetch multiple random gaming videos
// fetchMultipleRandomVideos(1, gamingCategoryId).then(() => {
//     console.log('All gaming videos fetched and opened in separate windows.');
// });

async function closeWindow() {
    let myWindow = windows[windows.length - 1][0];
    console.log(typeof(myWindow));
    if ( myWindow != null)
    {
      await myWindow.close();
      windowNum--;
    }
}


//ARDUINO CODE HERE

const path: string = 'COM5'; // Replace with your serial port path
const baudRate: number = 9600; // Replace with your desired baud rate
// 
const port: SerialPort = new SerialPort({ path, baudRate });
const parser: ReadlineParser = new ReadlineParser();
port.pipe(parser);
// 
parser.on('data', (data: string) => {
    console.log(data);
    if(data!='1204.00'){
        let fData: number = parseFloat(data);
        let desiredWindowCount = Math.floor(fData/4 + 1);

        if(desiredWindowCount<windowNum){
            closeWindow();
            windows.pop();
        }else if(desiredWindowCount>windowNum){
            console.log('if reached');
            let fetchNum = desiredWindowCount-windowNum
            fetchMultipleRandomVideos(fetchNum, petsCategoryId)
        }
        console.log('supposed window number: ' + windowNum + " actual window number: " + windows.length);
        console.log('desired window number: ' + desiredWindowCount);
    }   
});




//IGNORE LINUX STUFF
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
