let form = document.getElementById("form")
let userInput = document.getElementById("text")
let btn = document.getElementById("btn")
let container = document.getElementById("container")
let image1 = document.getElementById("image1")
let image2 = document.getElementById("image2")
let display = document.getElementById("display")



let api = "XFMEjx3K2lO7gsypNGTzr4lIjx2xupK7znDlPKbXG34"

form.addEventListener("submit", (event)=>{
    event.preventDefault()

    let userData = userInput.value
    
    
    let endpoint = `https://api.unsplash.com/search/photos?query=${userData}&per_page=10&client_id=${api}`
    fetch(endpoint).then((data)=>{
        return data.json()
        
    }).then((collectedData)=>{
        // console.log(collectedData);
        container.innerHTML = ``
        let imgUrl = collectedData.results[0].urls.regular
        let imgUrl2 = collectedData.results[2].urls.regular
        let imgUrl3 = collectedData.results[3].urls.regular
        let imgUrl4 = collectedData.results[4].urls.regular
        let imgUrl5 = collectedData.results[5].urls.regular
        let imgUrl6 = collectedData.results[6].urls.regular
        let imgUrl7 = collectedData.results[7].urls.regular
        let imgUrl8 = collectedData.results[8].urls.regular
        let imgUrl9 = collectedData.results[9].urls.regular

        
        container.style.display = "flex"
        
        image1.style.backgroundImage = `url(${imgUrl})`
        image1.style.backgroundSize = 'cover';
        image1.style.backgroundPosition = 'center';
        
        

        let text = document.createElement("h1")
        text.textContent = "Your perfect image has been uploaded below"
        display.innerHTML = ``
        display.append(text)

        


        // const info = { textValue: userData, imgValue: imgUrl}
        // localStorage.setItem("info", JSON.stringify(info))
    })
    
    
    

    form.reset()
    
})

// function updateContainerVisibility() {
//     const images = container.getElementsByTagName('img');
//     if (images.length === 0) {
//       container.style.display = 'none'; // Hide if no images
//     } else {
//       container.style.display = 'block'; // Show if images exist
//     }
//   }