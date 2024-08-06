
let openCart = document.querySelector('.shopping');
let closeCart = document.querySelector('.closeCart');
let list = document.querySelector('.list');
let listCart = document.querySelector('.listProducts');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openCart.addEventListener('click', ()=>{ //Evento de Click
    body.classList.add('active');
})
closeCart.addEventListener('click', ()=>{ //Evento de Click
    body.classList.remove('active');
})

let products = [ //Criação dos produtos 
    {
        id: 1,
        name: 'Gorgonzola',
        image: '1.PNG',
        price: 40
    },
    {
        id: 2,
        name: 'Cogumelo',
        image: '2.PNG',
        price: 42
    },
    {
        id: 3,
        name: 'Peperone',
        image: '3.PNG',
        price: 55
    },
    {
        id: 4,
        name: 'Peperone Acebolado',
        image: '4.PNG',
        price: 53
    },
    {
        id: 5,
        name: 'Mussarela',
        image: '5.PNG',
        price: 57
    },
    {
        id: 6,
        name: 'Frango',
        image: '6.PNG',
        price: 60
    }
];
let listCartProducts  = []; //O carrinho começa com um array vazio
function initApp(){ 
    products.forEach((value, key) =>{ 
        let newDiv = document.createElement('div'); 
        newDiv.classList.add('item');
        newDiv.innerHTML = // Colocar os produtos
        `
            <img src="images/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Adicionar ao Carrinho</button>
            `;
        list.appendChild(newDiv); //Adicionar no elemento pai
    })
}
initApp();

function addToCard(key){ //Adicionar o elemento no carrinho
    if( listCartProducts[key] == null){
        listCartProducts[key] = products[key];
        listCartProducts[key].quantity = 1;
    }
    reloadCart(); //Recarregar o carrinho

}
function reloadCart(){
    listCart.innerHTML = ''; //Começa com uma string vazia
    let count = 0; //Contador começa em 0
    let totalPrice = 0; //Total começa em 0

    listCartProducts.forEach((value, key)=> {
        totalPrice = totalPrice + value.price; 
        count = count + value.quantity;
        if(value != null){ //Se o valor for diferente de null
            let newDiv = document.createElement('li');
            newDiv.innerHTML = //Criação dos elementos no carrinho
            `
                <div>
                <img src="images/${value.image}"/>
                </div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `
            listCart.appendChild(newDiv); //Adicionar o elemento no elemento pai
        }
    })
    total.innerText = totalPrice.toLocaleString(); //Adicionar o total
    quantity.innerText = count;
}
function changeQuantity(key, quantity){ 
    if(quantity == 0){ //Se a quantidade for == 0 então deletar
        delete  listCartProducts[key]; 
    } else { //Se não for, aumentar a quantidade e o valor
        listCartProducts[key].quantity = quantity;
        listCartProducts[key].price = quantity * products[key].price;
    }
    reloadCart(); 
}