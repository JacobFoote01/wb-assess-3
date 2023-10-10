import axios from axios

const randomFossilBtn = document.getElementById("get-random-fossil")

randomFossilBtn.addEventListener("click", async () => {
   const response = await axios.get('/random.fossil.json')

   document.querySelector("#img-div")
    imgDiv.setAttribute(src, response.data.img)
})
