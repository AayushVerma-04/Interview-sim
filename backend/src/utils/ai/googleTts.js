import textToSpeech from '@google-cloud/text-to-speech';
import fs from 'fs';
import path from 'path';

const ttsClient = new textToSpeech.TextToSpeechClient();

async function generateAudioFile(text, fileName) {

  const filePath = path.join('./temp', `${fileName}.mp3`);

  if (process.env.NODE_ENV === 'test') {
    const sampleAudio = path.join('./src/test_data', 'sample.mp3'); // put one sample audio in /static
    console.log(sampleAudio)
    fs.copyFileSync(sampleAudio, filePath);
    console.log(`[MOCK] Copied static audio for: ${fileName}`);
    return filePath;
  }

  const [response] = await ttsClient.synthesizeSpeech({
    input: { text },
    voice: { 
      languageCode: 'en-US', 
      name: 'en-US-Neural2-D' // or 'en-US-Wavenet-D'
    },
    audioConfig: { audioEncoding: 'MP3' },
  });

  fs.writeFileSync(filePath, response.audioContent);
  return filePath;
}

export { generateAudioFile }