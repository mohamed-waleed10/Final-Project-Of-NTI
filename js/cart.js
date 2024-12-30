let Products = [];

async function getProsCart() {
  let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
  });
  let result = await res.json();
    Products = result.data.products;
  console.log("Products",Products);
    disProducts();
}

getProsCart();

function disProducts() {
  let products = ``;
  for (let i = 0; i <Products.length ; i++) {
    products += `
    
        <tr>
            <td> <img src="${Products[i].product.imageCover}" alt=""> </td>
            <td>${Products[i].product.title}</td>
            <td>${Products[i].price}</td>
            <td>
                <button class="neg" onclick="updateCartItem('${Products[i].product._id }',${
                          Products[i].count},'-')">-</button>
                <input class="count" type="text" value="${Products[i].count}">
                <button class="plus" onclick="updateCartItem('${Products[i].product._id }',${
                          Products[i].count},'+')">+</button>
            </td>
            <td>${Products[i].price * Products[i].count}</td>
            <td>
                <button class="btn delete" onclick="delProduct('${Products[i].product._id }')">Delete</button>
            </td>
        </tr>
    
    `;
  }

  document.querySelector("#tbody").innerHTML = products;
}


async function delProduct(prId){
    console.log(prId);
    let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${prId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      let result = await res.json();
        Products = result.data.products;
        disProducts();
}

window.delProduct = delProduct;


async function updateCartItem(prId ,num ,op) {
  let data 
  if(op=="+"){
    data= {
      count: num + 1,
    };
  }else{
    data= {
      count: num - 1,
    };
  }
  let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${prId}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  });
  let result = await res.json();
  console.log(result);
  
  Products=result.data.products;
  disProducts();
  
}
window.updateCartItem = updateCartItem;

