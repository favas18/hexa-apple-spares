/* =========================================================
   HEXA CUSTOMER WEBSITE
   ========================================================= */

const KEY="hexaStoreV2";


function load(){

  const saved=
    localStorage.getItem(KEY);

  if(saved){

    return JSON.parse(saved);

  }

  localStorage.setItem(
    KEY,
    JSON.stringify(seedData)
  );

  return structuredClone(seedData);

}


let DB=load();

let cart=
  JSON.parse(
    localStorage.getItem("hexaCart") || "[]"
  );


const $=s=>
  document.querySelector(s);


const esc=s=>
  String(s??"").replace(
    /[&<>"']/g,
    m=>({

      "&":"&amp;",
      "<":"&lt;",
      ">":"&gt;",
      '"':"&quot;",
      "'":"&#39;"

    }[m])
  );


function save(){

  localStorage.setItem(
    KEY,
    JSON.stringify(DB)
  );

  localStorage.setItem(
    "hexaCart",
    JSON.stringify(cart)
  );

}


function money(n){

  return "₹"+
    Number(n||0)
    .toLocaleString("en-IN");

}


/* =========================================================
   MAIN WEBSITE LAYOUT
   ========================================================= */

function layout(content){

return `

<div class="top">

  <div class="topin">

    <span>
      🇮🇳 All India Delivery
    </span>

    <span>
      🔒 Secure Checkout
      &nbsp; • &nbsp;
      UPI & COD Available
    </span>

  </div>

</div>


<nav class="nav">

  <div class="navin">


    <a
      class="logo"
      href="#/"
    >

      <span class="hex">
        H
      </span>

      <span>

        <b>HEXA</b>

        <small>
          MOBILE SPARE
        </small>

      </span>

    </a>


    <form
      class="search"
      onsubmit="
        event.preventDefault();
        search(this.q.value)
      "
    >

      <input
        name="q"
        placeholder="Search iPhone parts, batteries, displays..."
      >

      <button>
        ⌕
      </button>

    </form>


    <div class="navlinks">

      <a href="#/">
        HOME
      </a>

      <a href="#/iphones">
        iPHONE
      </a>

      <a href="#/category/Accessories">
        ACCESSORIES
      </a>

      <a href="#/category/Tools">
        TOOLS
      </a>

      <a href="#/category/iPad Parts">
        iPAD
      </a>

      <a href="#/category/Apple Watch Parts">
        APPLE WATCH
      </a>

      <a href="#/orders">
        MY ORDERS
      </a>

      <a href="admin.html">
        ⚙
      </a>

      <button
        class="btn mini"
        onclick="toggleCart()"
      >

        🛒 ${cart.length}

      </button>

    </div>

  </div>

</nav>


${content}


<div
  class="overlay"
  id="overlay"
  onclick="toggleCart()"
></div>


<aside
  class="cartDrawer"
  id="cart"
>

  <div class="row">

    <h2>
      Your Cart
    </h2>

    <button
      class="btn mini"
      onclick="toggleCart()"
    >
      ✕
    </button>

  </div>

  <div id="cartItems"></div>

  <div id="cartFoot"></div>

</aside>


<footer class="footer">

  <div class="footerGrid">

    <div>

      <h2>
        HEXA
      </h2>

      <p>
        Mobile spare parts & accessories.
      </p>

      <p>
        Displays • Batteries • Back Glass •
        Cameras • Housing • iPad • Apple Watch
      </p>

    </div>


    <div>

      <b>
        Customer Support
      </b>

      <p>
        All India Delivery
      </p>

      <p>
        UPI / COD
      </p>

      <p>
        Order tracking
      </p>

    </div>


    <div>

      <b>
        For Repair Shops
      </b>

      <p>
        Quality parts
      </p>

      <p>
        Wholesale enquiries
      </p>

      <p>
        Save our contact
      </p>

    </div>

  </div>

</footer>

`;

}


/* =========================================================
   HOME
   ========================================================= */

function home(){

  const phones=
    DB.phones;


  return layout(`

<main>

<section class="hero">

  <div class="heroBox">

    <div class="heroText">

      <div class="eyebrow">
        HEXA MOBILE SPARE
      </div>

      <h1>
        ${esc(DB.banner.title)}
      </h1>

      <p>
        ${esc(DB.banner.subtitle)}
      </p>

      <button
        class="btn light"
        onclick="
          location.hash='/iphones'
        "
      >

        Shop iPhone Parts →

      </button>

    </div>


    <div class="heroArt">

      <img
        src="${DB.banner.image}"
        alt="HEXA Spare Parts"
      >

    </div>

  </div>

</section>


<div class="container">


<section class="section">

  <div class="sectionHead">

    <div>

      <h2>
        Choose your iPhone
      </h2>

      <p class="muted">
        Select a model to see available parts.
      </p>

    </div>

    <a
      class="muted"
      href="#/iphones"
    >
      View all →
    </a>

  </div>


  <div class="grid">

    ${phones
      .slice(0,10)
      .map(phoneCard)
      .join("")}

  </div>

</section>


<section class="section">

  <div class="sectionHead">

    <h2>
      Shop by category
    </h2>

  </div>


  <div class="categoryTiles">


    ${[

      [
        "Accessories",
        "Apple & Samsung adapters, cables & EarPods"
      ],

      [
        "Tools",
        "Professional repair tools for technicians"
      ],

      [
        "iPad Parts",
        "Displays, batteries, touch & home button"
      ],

      [
        "Apple Watch Parts",
        "Battery, touch & OCA glass"
      ]

    ].map(([c,d])=>`

      <div
        class="tile"
        onclick="
          location.hash='/category/${encodeURIComponent(c)}'
        "
      >

        <strong>
          ${c}
        </strong>

        <span>
          ${d}
        </span>

      </div>

    `).join("")}

  </div>

</section>


<section class="section">

  <div class="sectionHead">

    <h2>
      Featured products
    </h2>

    <a
      class="muted"
      href="#/category/Accessories"
    >
      View all →
    </a>

  </div>


  <div class="grid">

    ${DB.products
      .filter(
        p=>[
          "Accessories",
          "Tools"
        ].includes(p.category)
      )
      .slice(0,10)
      .map(productCard)
      .join("")}

  </div>

</section>


</div>

</main>

`);

}


/* =========================================================
   IPHONE CARD
   ========================================================= */

function phoneCard(p){

return `

<a
  class="card phoneCard"
  href="#/iphone/${encodeURIComponent(p.name)}"
>

  <div class="phoneArt">

    <div class="phone"></div>

  </div>

  <div class="cardbody">

    <h3>
      ${esc(p.name)}
    </h3>

    <span class="muted">
      View spare parts →
    </span>

  </div>

</a>

`;

}


/* =========================================================
   PRODUCT CARD
   ========================================================= */

function productCard(p){

  const dis=
    Math.round(
      (1-p.selling/p.mrp)*100
    );


return `

<div class="card">

  <img
    src="${p.image}"
    alt="${esc(p.name)}"
  >


  <div class="cardbody">

    <h3>
      ${esc(p.name)}
    </h3>


    <div>

      <span class="price">
        ${money(p.selling)}
      </span>

      <span class="mrp">
        ${money(p.mrp)}
      </span>

    </div>


    <div class="discount">
      ${dis}% OFF
    </div>


    <div class="stock">

      ${
        p.stock>0

        ? `In stock • ${p.stock} available`

        : "Out of stock"

      }

    </div>


    <div
      class="row"
      style="margin-top:10px"
    >

      <button
        class="btn mini"
        ${
          p.stock<1
          ? "disabled"
          : ""
        }
        onclick="
          addToCart('${p.id}')
        "
      >
        Add to cart
      </button>


      <button
        class="chip"
        onclick="
          viewProduct('${p.id}')
        "
      >
        View
      </button>

    </div>

  </div>

</div>

`;

}


/* =========================================================
   ALL IPHONES
   ========================================================= */

function phonesPage(){

return layout(`

<main class="container">

  <div class="crumb">
    Home › iPhone
  </div>


  <section class="section">

    <div class="sectionHead">

      <div>

        <h1>
          iPhone Spare Parts
        </h1>

        <p class="muted">
          Choose your iPhone model.
        </p>

      </div>

    </div>


    <div class="grid">

      ${DB.phones
        .map(phoneCard)
        .join("")}

    </div>

  </section>

</main>

`);

}


/* =========================================================
   SINGLE IPHONE
   ========================================================= */

function phonePage(name){

  const p=
    DB.phones.find(
      x=>x.name===name
    );


  if(!p)
    return home();


  return layout(`

<main class="container">

  <div class="crumb">

    Home › iPhone ›
    ${esc(name)}

  </div>


  <section class="section">

    <div class="panel">

      <h1>
        ${esc(name)}
        Spare Parts
      </h1>

      <p class="muted">
        Choose one part.
        Each part is listed once;
        colours are model-specific.
      </p>


      <div class="partGrid">

        ${PARTS.map(x=>`

          <button
            class="partBtn"
            onclick="
              location.hash=
              '/parts/${encodeURIComponent(name)}/${encodeURIComponent(x)}'
            "
          >

            <b>
              ${x}
            </b>

            <span class="muted">
              View available
              ${x.toLowerCase()} →
            </span>

          </button>

        `).join("")}

      </div>

    </div>

  </section>

</main>

`);

}


/* =========================================================
   PART PAGE
   ========================================================= */

function partsPage(model,part){

  const items=
    DB.products.filter(
      p=>
        p.model===model &&
        p.part===part
    );


  return layout(`

<main class="container">

  <div class="crumb">

    Home ›
    ${esc(model)} ›
    ${esc(part)}

  </div>


  <section class="section">

    <div class="sectionHead">

      <div>

        <h1>
          ${esc(model)}
          ${esc(part)}
        </h1>

        <p class="muted">

          ${
            part==="Display"

            ? "Choose display type."

            :

            (
              part==="Back Glass" ||
              part==="Housing"
            )

            ? "Choose the original model colour."

            : "Available replacement options."

          }

        </p>

      </div>

    </div>


    ${
      (
        part==="Back Glass" ||
        part==="Housing"
      )

      ?

      `

      <div class="panel">

        <h3>
          Model-specific colours
        </h3>

        <div class="swatches">

          ${items.map(x=>`

            <button
              class="swatch"
              onclick="
                viewProduct('${x.id}')
              "
            >

              ● ${esc(x.variant)}

            </button>

          `).join("")}

        </div>

      </div>

      <br>

      `

      : ""

    }


    <div class="grid">

      ${items
        .map(productCard)
        .join("")}

    </div>

  </section>

</main>

`);

}


/* =========================================================
   CATEGORY PAGE
   ========================================================= */

function categoryPage(cat){

  const models=

    cat==="iPad Parts"

    ?

    DB.products
      .filter(p=>p.category===cat)
      .reduce(
        (a,p)=>{
          a.add(p.model);
          return a;
        },
        new Set()
      )

    :

    cat==="Apple Watch Parts"

    ?

    new Set(
      DB.products
        .filter(p=>p.category===cat)
        .map(p=>p.model)
    )

    :

    null;


  if(models){

    return layout(`

<main class="container">

  <div class="crumb">
    Home › ${esc(cat)}
  </div>


  <section class="section">

    <h1>
      ${esc(cat)}
    </h1>

    <p class="muted">
      Select a model.
    </p>


    <div class="grid">

      ${[...models]
        .map(m=>`

          <a
            class="card phoneCard"
            href="#/model/${encodeURIComponent(m)}"
          >

            <div class="phoneArt">

              <div class="phone"></div>

            </div>


            <div class="cardbody">

              <h3>
                ${esc(m)}
              </h3>

              <span class="muted">
                View parts →
              </span>

            </div>

          </a>

        `)
        .join("")}

    </div>

  </section>

</main>

`);

  }


  return layout(`

<main class="container">

  <div class="crumb">
    Home › ${esc(cat)}
  </div>


  <section class="section">

    <div class="sectionHead">

      <div>

        <h1>
          ${esc(cat)}
        </h1>

        <p class="muted">
          Browse products.
        </p>

      </div>

    </div>


    <div class="grid">

      ${DB.products
        .filter(p=>p.category===cat)
        .map(productCard)
        .join("")}

    </div>

  </section>

</main>

`);

}


/* =========================================================
   MODEL PAGE
   ========================================================= */

function modelPage(model){

  const items=
    DB.products.filter(
      p=>p.model===model
    );


  return layout(`

<main class="container">

  <div class="crumb">
    Home › ${esc(model)}
  </div>


  <section class="section">

    <h1>
      ${esc(model)}
    </h1>


    <div class="grid">

      ${items
        .map(productCard)
        .join("")}

    </div>

  </section>

</main>

`);

}


/* =========================================================
   PRODUCT PAGE
   ========================================================= */

function viewProduct(id){

  const p=
    DB.products.find(
      x=>x.id===id
    );


  if(!p)
    return;


  location.hash=
    "/product/"+id;

}


function productPage(id){

  const p=
    DB.products.find(
      x=>x.id===id
    );


  if(!p)
    return home();


  return layout(`

<main class="container">

  <div class="crumb">

    Home ›
    ${esc(p.category)} ›
    ${esc(p.name)}

  </div>


  <section class="section detail">


    <div class="panel">

      <img
        src="${p.image}"
        style="
          width:100%;
          border-radius:18px
        "
      >

    </div>


    <div class="panel">

      <span class="muted">
        ${esc(p.category)}
      </span>


      <h1>
        ${esc(p.name)}
      </h1>


      <p>
        ${esc(p.description)}
      </p>


      <div>

        <span class="price">
          ${money(p.selling)}
        </span>

        <span class="mrp">
          ${money(p.mrp)}
        </span>

      </div>


      <p class="discount">

        ${
          Math.round(
            (1-p.selling/p.mrp)*100
          )
        }% OFF

      </p>


      <p>

        ${
          p.stock>0
          ? "✓ In stock"
          : "✕ Out of stock"
        }

      </p>


      <button
        class="btn"
        onclick="
          addToCart('${p.id}')
        "
      >
        Add to Cart
      </button>


      <button
        class="btn light"
        style="margin-left:8px"
        onclick="
          buyNow('${p.id}')
        "
      >
        Buy Now
      </button>

    </div>

  </section>

</main>

`);

}


/* =========================================================
   CART
   ========================================================= */

function addToCart(id){

  const p=
    DB.products.find(
      x=>x.id===id
    );


  if(!p || p.stock<1){

    alert("Out of stock");

    return;

  }


  const x=
    cart.find(
      i=>i.id===id
    );


  if(x){

    if(x.qty < p.stock){

      x.qty++;

    }else{

      alert(
        "Maximum available stock reached."
      );

      return;

    }

  }else{

    cart.push({

      id:id,

      qty:1

    });

  }


  save();

  renderCart();

  toggleCart(true);

}


function removeCart(id){

  cart=
    cart.filter(
      x=>x.id!==id
    );

  save();

  renderCart();

}


function renderCart(){

  const box=
    $("#cartItems");

  const foot=
    $("#cartFoot");


  if(!box)
    return;


  if(!cart.length){

    box.innerHTML=
      '<p class="muted">Your cart is empty.</p>';

    foot.innerHTML="";

    return;

  }


  let total=0;


  box.innerHTML=
    cart.map(i=>{

      const p=
        DB.products.find(
          x=>x.id===i.id
        );


      if(!p)
        return "";


      const sub=
        p.selling*i.qty;


      total+=sub;


      return `

      <div class="cartItem">

        <img
          src="${p.image}"
        >


        <div>

          <b>
            ${esc(p.name)}
          </b>

          <div class="muted">

            ${i.qty}
            ×
            ${money(p.selling)}

          </div>

        </div>


        <button
          class="chip"
          onclick="
            removeCart('${p.id}')
          "
        >
          ✕
        </button>

      </div>

      `;

    }).join("");


  foot.innerHTML=`

    <hr>

    <div class="row">

      <b>
        Total
      </b>

      <b>
        ${money(total)}
      </b>

    </div>


    <button
      class="btn"
      style="
        width:100%;
        margin-top:14px
      "
      onclick="checkout()"
    >

      Proceed to checkout

    </button>

  `;

}


function toggleCart(force){

  const c=
    $("#cart");

  const o=
    $("#overlay");


  if(force===true){

    c.classList.add("open");

    o.classList.add("show");

  }else{

    c.classList.toggle("open");

    o.classList.toggle("show");

  }


  renderCart();

}


function buyNow(id){

  addToCart(id);

}


/* =========================================================
   CHECKOUT
   ========================================================= */

function checkout(){

  if(!cart.length)
    return;


  const mobile=
    prompt(
      "Enter your mobile number to continue:"
    );


  if(!mobile)
    return;


  const name=
    prompt(
      "Enter customer name:"
    ) || "Customer";


  const address=
    prompt(
      "Enter delivery address:"
    );


  if(!address)
    return;


  const payment=

    confirm(
      "Press OK for UPI / Online payment. Press Cancel for COD."
    )

    ? "UPI"

    : "COD";


  const items=
    cart.map(i=>{

      const p=
        DB.products.find(
          x=>x.id===i.id
        );


      return {

        id:p.id,

        name:p.name,

        qty:i.qty,

        price:p.selling

      };

    });


  const total=
    items.reduce(
      (s,i)=>
        s+i.price*i.qty,
      0
    );


  const order={

    id:
      "HX"+
      Date.now()
        .toString()
        .slice(-8),

    date:
      new Date()
      .toLocaleString("en-IN"),

    customer:{

      name:name,

      mobile:mobile,

      address:address

    },

    items:items,

    total:total,

    payment:payment,

    status:"Order Placed",

    shippingStatus:"Preparing"

  };


  DB.orders.unshift(order);


  let c=
    DB.customers.find(
      x=>x.mobile===mobile
    );


  if(!c){

    DB.customers.push({

      name:name,

      mobile:mobile,

      address:address,

      joined:
        new Date()
        .toLocaleDateString("en-IN")

    });

  }


  for(const i of cart){

    const p=
      DB.products.find(
        x=>x.id===i.id
      );


    if(p){

      p.stock=
        Math.max(
          0,
          p.stock-i.qty
        );

    }

  }


  localStorage.setItem(
    "hexaLastMobile",
    mobile
  );


  cart=[];


  save();


  alert(
    `Order ${order.id} placed successfully.`
  );


  location.hash=
    "/orders";

}


/* =========================================================
   MY ORDERS
   ========================================================= */

function ordersPage(){

  const mobile=
    localStorage.getItem(
      "hexaLastMobile"
    ) ||
    prompt(
      "Enter your mobile number to view orders:"
    );


  if(mobile){

    localStorage.setItem(
      "hexaLastMobile",
      mobile
    );

  }


  const orders=
    DB.orders.filter(
      o=>
        o.customer.mobile===mobile
    );


  return layout(`

<main class="container">

  <div class="crumb">
    Home › My Orders
  </div>


  <section class="section">

    <h1>
      Track your orders
    </h1>


    ${
      orders.length

      ?

      orders.map(o=>`

        <div
          class="panel"
          style="margin:12px 0"
        >

          <div class="row">

            <div>

              <b>
                ${esc(o.id)}
              </b>

              <div class="muted">
                ${esc(o.date)}
              </div>

            </div>

            <b>
              ${money(o.total)}
            </b>

          </div>


          <p>
            <b>Order status:</b>
            ${esc(o.status)}
          </p>


          <p>
            <b>Shipping:</b>
            ${esc(o.shippingStatus)}
          </p>


          <p>
            <b>Payment:</b>
            ${esc(o.payment)}
          </p>


          <p>
            <b>Delivery:</b>

            ${
              o.shippingStatus==="Delivered"

              ? "Delivered"

              :

              o.shippingStatus==="Shipped"

              ? "In transit"

              :

              "Expected after dispatch"

            }

          </p>


          <hr>


          <b>
            Items
          </b>


          <p class="muted">

            ${o.items
              .map(
                i=>
                  `${esc(i.name)}
                   × ${i.qty}`
              )
              .join("<br>")}

          </p>

        </div>

      `).join("")

      :

      `

      <div class="panel">

        <p>
          No orders found
          for this mobile number.
        </p>

      </div>

      `

    }

  </section>

</main>

`);

}


/* =========================================================
   SEARCH
   ========================================================= */

function search(q){

  q=
    q.trim()
    .toLowerCase();


  if(!q)
    return;


  location.hash=
    "/search/"+
    encodeURIComponent(q);

}


function searchPage(q){

  const items=
    DB.products.filter(
      p=>

        p.name
          .toLowerCase()
          .includes(q)

        ||

        p.model
          .toLowerCase()
          .includes(q)

        ||

        p.part
          .toLowerCase()
          .includes(q)

    );


  return layout(`

<main class="container">

  <div class="crumb">

    Search ›
    ${esc(q)}

  </div>


  <section class="section">

    <h1>
      Search results
    </h1>


    ${
      items.length

      ?

      `<div class="grid">

        ${items
          .map(productCard)
          .join("")}

      </div>`

      :

      `<div class="panel">

        No products found.

      </div>`

    }

  </section>

</main>

`);

}


/* =========================================================
   ROUTER
   ========================================================= */

function router(){

  const path=
    decodeURIComponent(
      location.hash.slice(1)||"/"
    );


  let html;


  if(path==="/"){

    html=home();

  }

  else if(path==="/iphones"){

    html=phonesPage();

  }

  else if(path==="/orders"){

    html=ordersPage();

  }

  else if(path.startsWith("/iphone/")){

    html=
      phonePage(
        path
          .split("/")
          .slice(2)
          .join("/")
      );

  }

  else if(path.startsWith("/parts/")){

    const a=
      path.split("/");


    html=
      partsPage(
        a[2],
        a[3]
      );

  }

  else if(path.startsWith("/category/")){

    html=
      categoryPage(
        path
          .split("/")
          .slice(2)
          .join("/")
      );

  }

  else if(path.startsWith("/model/")){

    html=
      modelPage(
        path
          .split("/")
          .slice(2)
          .join("/")
      );

  }

  else if(path.startsWith("/product/")){

    html=
      productPage(
        path.split("/")[2]
      );

  }

  else if(path.startsWith("/search/")){

    html=
      searchPage(
        path.split("/")[2]
      );

  }

  else{

    html=home();

  }


  $("#app").innerHTML=
    html;


  renderCart();

}


window.addEventListener(
  "hashchange",
  router
);


window.addEventListener(
  "storage",
  ()=>{

    DB=load();

    router();

  }
);


router();
