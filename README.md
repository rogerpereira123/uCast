# uCast 
A node based app for Google Chromecast to stream local computer videos / audio files to Chromecast connected TV.
<hr>
## Author
Roger Pereira 
## Stack
- Node.JS
- Express
- Chromecast API
- RequireJS
- Jade
- Stylus

## Mechanics
This is how it works:
1. User selects type of media to play (video / audio) and specifies the location
2. A Node.JS - Express web server provides playable list of files from the specified location
3. User initiates a Chromecast Session using Cast Icon
4. User clicks the media file to cast (stream).
5. Server starts streaming the file to Chromecast
6. User can pause / stop the playback using a tacky player :p

## To Run
1. Start the server
   <code>node uCast</code>
2. On Google Chrome, browse to
   http://[your computer ip]:3000

## Gotchas
* This is a Chromecast Sender app for Google Chrome Browser and hence can only work on Google Chrome with Cast Extension installed. 
* It uses default receiver app provided by Chromecast (Yup! You can develop your own receiver app like Netflix or Youtube etc.) 
* After starting the server, browsing with localhost wont work because Chromecast needs the media file url hosted on local network. So browse using your computer's local ip address.
* Oh and you have to register your Chromecast and receive an app id to run this app. <a href="https://developers.google.com/cast/docs/chrome_sender">More info</a>
* uCast works with mp4s & mp3s perfectly fine. Here is a link to all supported media : <a href="https://developers.google.com/cast/docs/media">Chromecast Supported Media</a> 

## To Do
- Playing multiple files based on user choice. 
- Adding support for images

## Final Word
uCast is developed as a side project for fun & learning Chromecast API with other open source technologies and is no way intented to be used for any business / commercial use. Please read Google's terms and conditions for commercial development.


