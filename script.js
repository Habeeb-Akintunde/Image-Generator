let form = document.getElementById("form")
let userInput = document.getElementById("text")
let container = document.getElementById("container")
let display = document.getElementById("display")
let image = document.querySelectorAll(".image")
let imageCount = image.length
let save = document.querySelectorAll(".save")
let saved = document.querySelectorAll(".saved")
let button = document.getElementById("btn")


let api = "XFMEjx3K2lO7gsypNGTzr4lIjx2xupK7znDlPKbXG34"

form.addEventListener("submit", (event)=>{
    event.preventDefault()

    
    let userData = userInput.value          
    // form validation
    // userInput.addEventListener("keyup", ()=>{
    //     let userData = userInput.value
    //     if (userData.length == 0 ) {
    //         userInput.placeholder = "Please enter a valid search"
    //         form.style.border = "2px solid red"
    //         form.style.padding = "1.5rem"
    //         button.style.display = "none"
    //     }else{
    //         userInput.innerText = ` `
    //         form.style.border = "2px solid green"
    //     }
    // })

    let endpoint = `https://api.unsplash.com/search/photos?query=${userData}&per_page=${imageCount}&client_id=${api}`
    fetch(endpoint).then((data)=>{
        return data.json()
        
    }).then((collectedData)=>{
        // console.log(collectedData);
       
        // hide the container when empty
        if (collectedData.results.length > 0) {
            container.style.display = "flex";
        }
        
        // Reset all save/saved buttons before loading new images
        save.forEach((param, index) => {
            param.style.display = "flex";  // Make save button visible
        });
        saved.forEach((item, index) => {
            item.style.display = "none";  // Hide saved button
        });
                
        image.forEach((item, index)=>{
            if (index < collectedData.results.length) { // Prevent errors if results are fewer than images

                let imageUrl = `url('${collectedData.results[index].urls.regular}')`
                    item.style.backgroundImage = imageUrl;  
                    item.style.display = "flex"
                    item.style.backgroundSize = "cover";
                    item.style.backgroundPosition = "center";
            }          
             
        })

        // download function
        let downloadBtn = document.querySelectorAll(".download")
        downloadBtn.forEach((item, index)=>{
           if (item) {
            item.onclick = function () {
                let imageUrl = collectedData.results[index].urls.regular
                fetch(imageUrl)
                        .then((response) => response.blob()) // Convert image to Blob
                        .then((blob) => {
                            let a = document.createElement("a");
                            a.href = URL.createObjectURL(blob); // Create an object URL from the Blob
                            a.download = `image${index + 1}.jpg`; // File name for the download
                            a.click(); // Trigger the download
                        })
                        .catch((err) => console.error("Error downloading image:", err));
            }
           }
        })

        let text = document.createElement("h1")
        text.textContent = "Your perfect image has been uploaded below"
        display.innerHTML = ``
        display.append(text)


        // save function

        save.forEach((param, index)=>{
            param.addEventListener("click", (event)=>{
                event.preventDefault()

                param.style.display = "none"
                saved[index].style.display = "flex"
                
                let imageUrl = `url('${collectedData.results[index].urls.regular}')`
                let link = document.createElement("a")
                link.href = imageUrl
                let hrefValue = link.href
                param.append(link)

                // local storage function
                // Retrieve existing selections from localStorage or start with an empty array // assigning an empty array to the localstorage
                let selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];

                // check for existing value to avoid duplicate
                if(!selectedItems.includes(hrefValue)){
                    selectedItems.push(hrefValue)
                    
                }
                else {
                    // Remove if already present (toggle effect)
                    selectedItems = selectedItems.filter(item => item !== hrefValue);
                }
                // update localstorage
                localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
                
                
            })
        })

        saved.forEach((item, index)=>{
            item.addEventListener("click", (event)=>{
                event.preventDefault()

                item.style.display = "none"
                save[index].style.display = "flex"

                let imageUrl = `url('${collectedData.results[index].urls.regular}')`;
                let link = document.createElement("a");
                link.href = imageUrl;
                let hrefValue = link.href;
        
                // Retrieve stored items
                let selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
        
                // Remove the clicked item from storage
                selectedItems = selectedItems.filter(item => item !== hrefValue);
                localStorage.setItem("selectedItems", JSON.stringify(selectedItems));

                // console.log(item);
                
            })
        })

    })
    
    form.reset()
    
})