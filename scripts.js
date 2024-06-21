const selectionVoice = document.querySelector('#selection-voice')
const inputText = document.querySelector('#input-select')
const listenAudio = document.querySelector('#listen-btn')
const downloadText = document.querySelector('#download-text-btn')
const uploadFile = document.querySelector('#upload-file')

// Start engine of API to activation of voices
const voices = new SpeechSynthesisUtterance()

let availableVoices = []

// full select
const updateValues = () => {
  availableVoices = window.speechSynthesis.getVoices()

  voices.voice = availableVoices[0]

  console.log(availableVoices)

  availableVoices.forEach((voz, index) => {
    const option = document.createElement('option')
    option.value = index
    option.textContent = voz.name 
    selectionVoice.appendChild(option)
  })
}

window.speechSynthesis.onvoiceschanged = updateValues;

// Execute the text such as voice
