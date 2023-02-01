import { menuArray } from '/data.js'

function renderFood () {
    let foodHolder = ``
    for (let food of menuArray){
        foodHolder += ` <div class = "flexContainerFood">
                            <div>
                                <p class="emoji">${food.emoji}</p>
                            </div>
                            <div class="foodWords">
                                <p class="titleFood">${food.name}</p>
                                <p class="ingredients">${food.ingredients}</p>
                                <p class="price">$${food.price}</p>
                            </div>
                            <button data-plus="${food.id}" class="btn" id="${food.id}">+</button>
                        </div>
                        <div class = "seperator"> </div>
                             
                        `
    }
    document.getElementById("foodItems").innerHTML = foodHolder 
    }
renderFood()



document.addEventListener('click', function(e){
    if(e.target.dataset.plus){
       handlePlusClick(e.target.dataset.plus) 
       //(if you want to limit to one item per order e.target.classList.add("disableButton");
    }
})


let selectedFoodObject
let selectedFoodArray = []
function handlePlusClick(foodId){ 
    let itemHolder = ""
    let finalPriceHolder = ""
    selectedFoodObject = menuArray.find(function(food){
        return food.id == foodId })
    selectedFoodArray.push(selectedFoodObject)
    
    //iterate over array and generate html 
    for (let item of selectedFoodArray){
        itemHolder += `<div class = "flexContainerOrder">
                            <div class = "itemName">${item.name} </div>
                            <button data-minus = ${item.id} class = "button"> remove </button>
                            <div class = "priceBottom">$${item.price} </div>
                       </div>  `
        let totalHolder = 0
        for (let x of selectedFoodArray) {totalHolder += x.price}
        finalPriceHolder = `<div class="totalPriceFlex">
                                <div class="totalPriceLeft">Total price</div>
                                <div class="totalPriceRight">$${totalHolder}</div>
                             </div>`
    }
    document.getElementById("yourOrder").innerHTML = `<div class="orderTitle"> Your Order </div>`
    document.getElementById("orderItems").innerHTML = itemHolder  
    document.getElementById("bottomBorder").innerHTML = `<div class="bottomBorder"></div>`
    document.getElementById("totalPrice").innerHTML = finalPriceHolder
    if (selectedFoodArray.length) {
    document.getElementById("completeOrder").style.display = "block"}
}



document.addEventListener('click', function(e){
    if(e.target.dataset.minus){
       handleRemoveClick(e.target.dataset.minus) 
    }
})


function handleRemoveClick (orderId){
    let index = selectedFoodArray.findIndex(x => orderId == x.id)
    selectedFoodArray.splice(index, 1)
    
    document.getElementById(`${orderId}`).classList.remove("disableButton");
    
    let itemHolder = ""
    let finalPriceHolder = ""
    //render order items with spliced array
    for (let item of selectedFoodArray){
        itemHolder += `<div class = "flexContainerOrder">
                            <div class = "itemName">${item.name} </div>
                            <button data-minus = ${item.id} class = "button" class = > remove </button>
                            <div class = "priceBottom">$${item.price} </div>
                       </div>  `
        let totalHolder = 0
        //total price of orders
        for (let x of selectedFoodArray) {totalHolder += x.price}
        finalPriceHolder = `<div class="totalPriceFlex">
                                <div class="totalPriceLeft">Total price</div>
                                <div class="totalPriceRight">$${totalHolder}</div>
                             </div>`
    }
    document.getElementById("yourOrder").innerHTML = `<div class="orderTitle"> Your Order </div>`
    document.getElementById("orderItems").innerHTML = itemHolder  
    document.getElementById("bottomBorder").innerHTML = `<div class="bottomBorder"></div>`
    document.getElementById("totalPrice").innerHTML = finalPriceHolder
    
    
    if (selectedFoodArray.length) {
    document.getElementById("completeOrder").style.display = "block"}

    
    if (selectedFoodArray.length == 0)
        {
        document.getElementById("yourOrder").innerHTML = `<div></div>`
        document.getElementById("bottomBorder").innerHTML = `<div></div>`
        document.getElementById("totalPrice").innerHTML = `<div></div>`
        document.getElementById("completeOrder").style.display = "none"}
       
}


document.getElementById("completeOrder").addEventListener("click", function() {                         document.getElementById("modal").style.display = "block"
    document.getElementById("mainStuff").style.backgroundColor = "#F5F5F5"
    })
    
    
document.getElementById("paymentForm").addEventListener("submit", function(e){
    e.preventDefault()
    const paymentInfo = new FormData(document.getElementById("paymentForm"))
    const name = paymentInfo.get('name')
    document.getElementById("modal").style.display = "none"
    document.getElementById("bottomMenu").style.display = "none"
    document.getElementById("mainStuff").style.backgroundColor = "white"
    document.getElementById("afterParty").style.display = "block"
    document.getElementById("afterParty").innerHTML =  `<div> Thanks ${name}! Your order is on its way! `
})

//question is there a way to do this without using e.preventdefault() why doesnt that work

