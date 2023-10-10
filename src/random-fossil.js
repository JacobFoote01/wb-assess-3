import axios from 'axios'

const randomFossilBtn = document.getElementById("get-random-fossil")
const randomFossilImg = document.getElementById("random-fossil-image")
const randomFossilText = document.getElementById("random-fossil-name")

randomFossilBtn.addEventListener("click", async () => {
    const response = await axios.get('/random-fossil.json')

   randomFossilImg.setAttribute('src', response.data.img)
   randomFossilText.innerText = response.data.name
})
