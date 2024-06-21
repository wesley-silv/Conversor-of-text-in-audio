const selectionVoice = document.querySelector('#selection-voice')
const inputText = document.querySelector('#input-text')
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

window.speechSynthesis.onvoiceschanged = updateValues

// Execute the text such as voice
selectionVoice.addEventListener('change', () => {
  voices.voice = availableVoices[selectionVoice.value]
})

listenAudio.addEventListener('click', () => {
  voices.text = inputText.value

  window.speechSynthesis.speak(voices)
})

// Download of text
downloadText.addEventListener('click', () => {
  const text = inputText.value
  const blob = new Blob([text], { type: 'text/plain' })

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'text.txt'
  a.click()

  URL.revokeObjectURL(url)
})

// Send content file
uploadFile.addEventListener('change', event => {
  const file = event.target.files[0]

  if (file) {
    const reader = new FileReader()

    reader.onload = e => {
      inputText.value = e.target.result
    }
    reader.readAsText(file)
  }
})
