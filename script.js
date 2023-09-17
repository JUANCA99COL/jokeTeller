const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// enable/disable button 
function toggleButton(){
    button.disabled = !button.disabled;
}

// passing our joke to our voice rss api
function tellMe(joke) {
    VoiceRSS.speech({
        key: 'a4c7d9246a214180bb6e1d899730f187',
        src: joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke Api
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // text to speech 
        tellMe(joke);
        // disabled button 
        toggleButton();
    } catch(error) {
        // catch errors 
        console.log('whooops', error)
    }
}

//event listeners 
button.addEventListener('click', getJokes);
audio.addEventListener('ended', toggleButton);