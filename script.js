const request = new XMLHttpRequest()
const url = `https://rickandmortyapi.com/api/character/?page=`
let currentPage = 1;
let data1;
const main = document.querySelector("main")
const next = document.querySelector("button.next-page")
const prev = document.querySelector("button.prev-page")
let buttons = document.querySelectorAll("button.page-btn")
let pagArr = []
console.log(buttons)

function fetchData() {


    request.open("GET", url + currentPage)

    request.send()

    request.onload = function() {

        data1 = JSON.parse(request.responseText)
        console.log(data1)
        createCards(data1.results)
        pagination()


    }
}

function createCards(arr) {
    main.innerHTML = ""

    arr.forEach((e, i, arr) => {
        let card = document.createElement("div")
        let img = document.createElement("img")
        let name = document.createElement("h2")
        let button = document.createElement("button")


        card.classList.add("card")
        img.setAttribute("src", e.image)
        name.innerHTML = e.name
        button.innerHTML = "Like"
        button.addEventListener("click", function() {
            window.location.href = "./index2.html"
            localStorage.setItem("character", e.id)
        })


        card.append(img, name, button)
        main.append(card)



    })

}


function nextPage() {
    currentPage++;

    fetchData()
}


function prevPage() {
    currentPage--;

    fetchData()
}

function pagination() {
    if(currentPage<1){currentPage=1}
    if(currentPage>42){currentPage=42}
    if (currentPage < 3) {
        pageArr = [1, 2, 3, 4, 5]
    } else if (currentPage >= 3 && currentPage <= 40) {
        pageArr = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
    } else {
        pageArr = [38, 39, 40, 41, 42]
    }
    buttons.forEach((e, i, arr) => {
       

        // buttons.forEach((e, i, arr) => {
            selectButton(e, i)
        // })

    })
}


function selectButton(e,i){
    e.classList.remove("active")
    e.innerHTML = pageArr[i]
    if (pageArr[i] === currentPage) {
        e.classList.add("active")
    }

    e.addEventListener("click", function(){
        currentPage = e.innerHTML*1
        fetchData()

        if(e.innerHTML !== currentPage.toString()){
            e.classList.remove("active")
        }else{
            e.classList.add("active")
            // e.innerHTML=pageArr[i]

        }

        console.log(currentPage)


    })


}









window.addEventListener("load", fetchData)
next.addEventListener("click", nextPage)
prev.addEventListener("click", prevPage)

