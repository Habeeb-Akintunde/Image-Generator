let form = document.getElementById("form")
let userInput = document.getElementById("text")
let btn = document.getElementById("btn")
let container = document.getElementById("container")
let display = document.getElementById("display")
let image = document.querySelectorAll(".image")
let imageCount = image.length



let api = "XFMEjx3K2lO7gsypNGTzr4lIjx2xupK7znDlPKbXG34"

form.addEventListener("submit", (event)=>{
    event.preventDefault()

    let userData = userInput.value          
    
    let endpoint = `https://api.unsplash.com/search/photos?query=${userData}&per_page=${imageCount}&client_id=${api}`
    fetch(endpoint).then((data)=>{
        return data.json()
        
    }).then((collectedData)=>{
        console.log(collectedData);
        container.innerHTML = ``
       
        
        
        image.forEach((item, index)=>{
            if (collectedData[index]){
                item.style.backgroundImage = `url${collectedData.results[index].urls.regular}` 
                item.style.backgroundSize = "cover";
                item.style.backgroundPosition = "center";
            }
            //  console.log(`url${collectedData.results[index].urls.regular}`);
             
        })


        let text = document.createElement("h1")
        text.textContent = "Your perfect image has been uploaded below"
        display.innerHTML = ``
        display.append(text)

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