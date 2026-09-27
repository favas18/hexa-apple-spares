/* =========================================================
   HEXA ADMIN PANEL
   ========================================================= */

const KEY="hexaStoreV2";


let DB=
  JSON.parse(
    localStorage.getItem(KEY)||"null"
  )
  ||
  structuredClone(seedData);


let view="dashboard";

let editId=null;


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

}


function money(n){

  return "₹"+
    Number(n||0)
    .toLocaleString("en-IN");

}


/* =========================================================
   ADMIN SHELL
   ========================================================= */

function shell(body){

return `

<div class="adminNav">

  <b>
    ⬡ HEXA ADMIN
  </b>


  <span>

    Complete store control

    • 

    <a
      href="index.html"
      style="color:#bff5df"
    >
      Open customer site →
    </a>

  </span>

</div>


<div class="adminWrap">


<aside class="side">


  ${
    [

      ["dashboard","Dashboard"],

      ["products","Products"],

      ["add","Add Product"],

      ["orders","Orders"],

      ["customers","Customers"],

      ["categories","Categories"],

      ["banner","Home Banner"],

      ["settings","Settings"]

    ]

    .map(
      x=>`

      <button
        class="${view===x[0]?"active":""}"
        onclick="
          go('${x[0]}')
        "
      >

        ${x[1]}

      </button>

      `
    )
    .join("")

  }


</aside>


<main>

  ${body}

</main>


</div>

`;

}


/* =========================================================
   RENDER
   ========================================================= */

function render(){

  let body;


  if(view==="dashboard")
    body=dashboard();

  else if(view==="products")
    body=products();

  else if(view==="add")
    body=productForm();

  else if(view==="orders")
    body=orders();

  else if(view==="customers")
    body=customers();

  else if(view==="categories")
    body=categories();

  else if(view==="banner")
    body=banner();

  else
    body=settings();


  $("#adminApp").innerHTML=
    shell(body);

}


function go(v){

  view=v;

  editId=null;

  render();

}


/* =========================================================
   DASHBOARD
   ========================================================= */

function dashboard(){

  const sales=
    DB.orders.reduce(
      (s,o)=>s+o.total,
      0
    );


  return `

<div class="adminPanel">

  <h1>
    Dashboard
  </h1>


  <div class="stats">


    <div class="stat">

      <span>
        Products
      </span>

      <b>
        ${DB.products.length}
      </b>

    </div>


    <div class="stat">

      <span>
        Orders
      </span>

      <b>
        ${DB.orders.length}
      </b>

    </div>


    <div class="stat">

      <span>
        Customers
      </span>

      <b>
        ${DB.customers.length}
      </b>

    </div>


    <div class="stat">

      <span>
        Order value
      </span>

      <b>
        ${money(sales)}
      </b>

    </div>


  </div>

</div>


<div
  class="adminPanel"
  style="margin-top:15px"
>

  <h2>
    Recent orders
  </h2>


  ${
    DB.orders
      .slice(0,8)
      .map(orderRow)
      .join("")

    ||

    '<p class="muted">No orders yet.</p>'
  }


</div>

`;

}


/* =========================================================
   PRODUCTS
   ========================================================= */

function products(){

return `

<div class="adminPanel">


<div class="row">

  <div>

    <h1>
      Products
    </h1>

    <p class="muted">

      Edit model, category,
      part, colour, MRP,
      selling price, stock,
      image and description.

    </p>

  </div>


  <button
    class="btn"
    onclick="
      go('add')
    "
  >

    + Add Product

  </button>

</div>


<input

  style="
    width:100%;
    padding:11px;
    border:1px solid var(--line);
    border-radius:10px
  "

  placeholder="Filter products..."

  oninput="
    filterProducts(this.value)
  "

>


<div class="tableWrap">


<table
  class="table"
  id="productTable"
>


<tr>

  <th>
    Product
  </th>

  <th>
    Model
  </th>

  <th>
    Category
  </th>

  <th>
    Part / Colour
  </th>

  <th>
    MRP
  </th>

  <th>
    Selling
  </th>

  <th>
    Stock
  </th>

  <th>
    Action
  </th>

</tr>


${
DB.products
.map(
p=>`

<tr
  data-search="${
    esc(
      (
        p.name+
        " "+
        p.model+
        " "+
        p.category+
        " "+
        p.part+
        " "+
        p.variant
      ).toLowerCase()
    )
  }"
>


<td>

  <div
    style="
      display:flex;
      gap:8px;
      align-items:center
    "
  >

    <img
      src="${p.image}"
      style="
        width:48px;
        height:48px;
        object-fit:cover;
        border-radius:8px
      "
    >

    <span>
      ${esc(p.name)}
    </span>

  </div>

</td>


<td>
  ${esc(p.model)}
</td>


<td>
  ${esc(p.category)}
</td>


<td>

  ${esc(p.part)}

  <br>

  <small>
    ${esc(p.variant||"")}
  </small>

</td>


<td>
  ${money(p.mrp)}
</td>


<td>
  ${money(p.selling)}
</td>


<td>
  ${p.stock}
</td>


<td>

  <button
    class="btn mini"
    onclick="
      editProduct('${p.id}')
    "
  >
    Edit
  </button>


  <button
    class="btn mini danger"
    onclick="
      deleteProduct('${p.id}')
    "
  >
    Delete
  </button>

</td>


</tr>

`
)
.join("")
}


</table>

</div>

</div>

`;

}


function filterProducts(q){

  document
    .querySelectorAll(
      "#productTable tr[data-search]"
    )
    .forEach(
      r=>{

        r.style.display=
          r.dataset.search
          .includes(
            q.toLowerCase()
          )
          ? ""
          : "none";

      }
    );

}


/* =========================================================
   PRODUCT FORM
   ========================================================= */

function productForm(){

  const p=

    editId

    ?

    DB.products.find(
      x=>x.id===editId
    )

    :

    {

      id:"P"+Date.now(),

      name:"",

      model:"",

      category:"iPhone Parts",

      part:"",

      variant:"Standard",

      mrp:0,

      selling:0,

      stock:0,

      image:img("PRODUCT"),

      description:""

    };


  return `

<div class="adminPanel">

  <h1>

    ${
      editId
      ? "Edit product"
      : "Add product"
    }

  </h1>


<div class="formGrid">


<div class="field">

  <label>
    Name
  </label>

  <input
    id="f_name"
    value="${esc(p.name)}"
  >

</div>


<div class="field">

  <label>
    Model
  </label>

  <input
    id="f_model"
    value="${esc(p.model)}"
  >

</div>


<div class="field">

  <label>
    Category
  </label>


  <select id="f_category">

    ${
      DB.categories
      .map(
        c=>`

        <option
          ${
            p.category===c
            ? "selected"
            : ""
          }
        >
          ${esc(c)}
        </option>

        `
      )
      .join("")
    }

  </select>

</div>


<div class="field">

  <label>
    Part / Section
  </label>

  <input
    id="f_part"
    value="${esc(p.part)}"
  >

</div>


<div class="field">

  <label>
    Variant / Colour
  </label>

  <input
    id="f_variant"
    value="${esc(p.variant||"")}"
    placeholder="e.g. Sierra Blue / DD"
  >

</div>


<div class="field">

  <label>
    MRP
  </label>

  <input
    id="f_mrp"
    type="number"
    value="${p.mrp}"
  >

</div>


<div class="field">

  <label>
    Selling Price
  </label>

  <input
    id="f_sell"
    type="number"
    value="${p.selling}"
  >

</div>


<div class="field">

  <label>
    Stock
  </label>

  <input
    id="f_stock"
    type="number"
    value="${p.stock}"
  >

</div>


<div class="field full">

  <label>
    Image URL
  </label>

  <input
    id="f_image"
    value="${esc(p.image)}"
    placeholder="Paste direct image URL"
  >

</div>


<div class="field full">

  <label>
    Description
  </label>

  <textarea
    id="f_desc"
  >${esc(p.description)}</textarea>

</div>


</div>


<div class="adminActions">


<button
  class="btn"
  onclick="
    saveProduct('${p.id}')
  "
>

  Save product

</button>


<button
  class="btn danger"
  onclick="
    go('products')
  "
>

  Cancel

</button>


</div>


</div>

`;

}


/* =========================================================
   SAVE PRODUCT
   ========================================================= */

function saveProduct(id){

  const old=
    DB.products.find(
      x=>x.id===id
    );


  const p={

    id:id,

    name:
      $("#f_name")
      .value
      .trim(),

    model:
      $("#f_model")
      .value
      .trim(),

    category:
      $("#f_category")
      .value,

    part:
      $("#f_part")
      .value
      .trim(),

    variant:
      $("#f_variant")
      .value
      .trim()
      ||
      "Standard",

    mrp:
      +$("#f_mrp").value,

    selling:
      +$("#f_sell").value,

    stock:
      +$("#f_stock").value,

    image:
      $("#f_image")
      .value
      .trim()
      ||
      img("PRODUCT"),

    description:
      $("#f_desc")
      .value
      .trim()

  };


  if(!p.name){

    alert(
      "Product name required"
    );

    return;

  }


  if(old){

    Object.assign(
      old,
      p
    );

  }else{

    DB.products.unshift(p);

  }


  save();

  go("products");

}


function editProduct(id){

  editId=id;

  view="add";

  render();

}


function deleteProduct(id){

  if(
    !confirm(
      "Delete this product?"
    )
  )
    return;


  DB.products=
    DB.products.filter(
      p=>p.id!==id
    );


  save();

  render();

}


/* =========================================================
   ORDER ROW
   ========================================================= */

function orderRow(o){

return `

<div
  class="panel"
  style="margin:10px 0"
>


<div class="row">


  <div>

    <b>
      ${esc(o.id)}
    </b>

    <div class="muted">

      ${esc(o.customer.name)}
      •
      ${esc(o.customer.mobile)}

    </div>

  </div>


  <b>
    ${money(o.total)}
  </b>


</div>


<div style="margin-top:10px">

  ${
    o.items
      .map(
        i=>
          `${esc(i.name)}
           × ${i.qty}`
      )
      .join("<br>")
  }

</div>


<div
  class="formGrid"
  style="margin-top:10px"
>


<div class="field">

  <label>
    Order status
  </label>


  <select
    onchange="
      setOrder(
        '${o.id}',
        'status',
        this.value
      )
    "
  >

    ${
      [
        "Order Placed",
        "Confirmed",
        "Packed",
        "Cancelled",
        "Completed"
      ]

      .map(
        s=>`

        <option
          ${
            o.status===s
            ? "selected"
            : ""
          }
        >

          ${s}

        </option>

        `
      )
      .join("")
    }

  </select>

</div>


<div class="field">

  <label>
    Shipping status
  </label>


  <select
    onchange="
      setOrder(
        '${o.id}',
        'shippingStatus',
        this.value
      )
    "
  >

    ${
      [
        "Preparing",
        "Shipped",
        "Out for Delivery",
        "Delivered",
        "Returned"
      ]

      .map(
        s=>`

        <option
          ${
            o.shippingStatus===s
            ? "selected"
            : ""
          }
        >

          ${s}

        </option>

        `
      )
      .join("")
    }

  </select>

</div>


<div class="field full">

  <label>
    Delivery address
  </label>

  <input
    value="${esc(o.customer.address)}"
    onchange="
      setOrderAddress(
        '${o.id}',
        this.value
      )
    "
  >

</div>


</div>


</div>

`;

}


/* =========================================================
   ORDERS
   ========================================================= */

function orders(){

return `

<div class="adminPanel">

  <h1>
    Orders & Shipping
  </h1>

  <p class="muted">

    Change order status,
    shipping status and
    delivery address.
    Customers see these
    updates on My Orders.

  </p>


  ${
    DB.orders
      .map(orderRow)
      .join("")

    ||

    "<p>No orders yet.</p>"
  }


</div>

`;

}


function setOrder(
  id,
  key,
  val
){

  const o=
    DB.orders.find(
      x=>x.id===id
    );


  if(o){

    o[key]=val;

    save();

    render();

  }

}


function setOrderAddress(
  id,
  val
){

  const o=
    DB.orders.find(
      x=>x.id===id
    );


  if(o){

    o.customer.address=val;

    save();

  }

}


/* =========================================================
   CUSTOMERS
   ========================================================= */

function customers(){

return `

<div class="adminPanel">

  <h1>
    Customers
  </h1>


  <div class="tableWrap">

  <table class="table">


  <tr>

    <th>
      Name
    </th>

    <th>
      Mobile
    </th>

    <th>
      Address
    </th>

    <th>
      Joined
    </th>

    <th>
      Orders
    </th>

  </tr>


  ${
    DB.customers
    .map(
      c=>`

      <tr>

        <td>
          ${esc(c.name)}
        </td>

        <td>
          ${esc(c.mobile)}
        </td>

        <td>
          ${esc(c.address)}
        </td>

        <td>
          ${esc(c.joined)}
        </td>

        <td>

          ${
            DB.orders.filter(
              o=>
                o.customer.mobile===
                c.mobile
            ).length
          }

        </td>

      </tr>

      `
    )
    .join("")
  }


  </table>

  </div>

</div>

`;

}


/* =========================================================
   CATEGORIES
   ========================================================= */

function categories(){

return `

<div class="adminPanel">

  <h1>
    Categories & Sections
  </h1>


  <p class="muted">

    Add or remove top-level
    product sections.

  </p>


  <div class="formGrid">


    <div class="field full">

      <label>
        Existing categories
      </label>


      <div class="chips">

        ${
          DB.categories
          .map(
            (c,i)=>`

            <span class="chip">

              ${esc(c)}

              <button
                style="
                  border:0;
                  background:none;
                  cursor:pointer
                "
                onclick="
                  removeCategory(${i})
                "
              >
                ×
              </button>

            </span>

            `
          )
          .join("")
        }

      </div>

    </div>


    <div class="field">

      <label>
        New category
      </label>

      <input
        id="newCat"
        placeholder="e.g. MacBook Parts"
      >

    </div>


  </div>


  <button
    class="btn"
    style="margin-top:12px"
    onclick="addCategory()"
  >

    Add category

  </button>


</div>

`;

}


function addCategory(){

  const c=
    $("#newCat")
    .value
    .trim();


  if(
    c &&
    !DB.categories.includes(c)
  ){

    DB.categories.push(c);

    save();

    render();

  }

}


function removeCategory(i){

  if(
    !confirm(
      "Remove category?"
    )
  )
    return;


  DB.categories.splice(
    i,
    1
  );


  save();

  render();

}


/* =========================================================
   HOME BANNER
   ========================================================= */

function banner(){

return `

<div class="adminPanel">

  <h1>
    Home Banner
  </h1>


  <p class="muted">

    Change the main homepage
    banner title, subtitle
    and image.

  </p>


  <div class="formGrid">


    <div class="field">

      <label>
        Banner title
      </label>

      <input
        id="bt"
        value="${esc(DB.banner.title)}"
      >

    </div>


    <div class="field">

      <label>
        Subtitle
      </label>

      <input
        id="bs"
        value="${esc(DB.banner.subtitle)}"
      >

    </div>


    <div class="field full">

      <label>
        Banner image URL
      </label>

      <input
        id="bi"
        value="${esc(DB.banner.image)}"
        placeholder="Paste image URL"
      >

    </div>


  </div>


  <div class="adminActions">

    <button
      class="btn"
      onclick="saveBanner()"
    >

      Save banner

    </button>

  </div>


  <div class="notice">

    Tip:
    use a direct image URL.
    You can later replace the
    demo image with your real
    HEXA banner.

  </div>

</div>

`;

}


function saveBanner(){

  DB.banner.title=
    $("#bt").value;

  DB.banner.subtitle=
    $("#bs").value;

  DB.banner.image=
    $("#bi").value;


  save();

  alert(
    "Banner updated"
  );

  render();

}


/* =========================================================
   STORE SETTINGS
   ========================================================= */

function settings(){

return `

<div class="adminPanel">

  <h1>
    Store Settings
  </h1>


  <div class="formGrid">


    <div class="field">

      <label>
        Store name
      </label>

      <input
        id="sn"
        value="${esc(DB.brand.name)}"
      >

    </div>


    <div class="field">

      <label>
        Tagline
      </label>

      <input
        id="st"
        value="${esc(DB.brand.tagline)}"
      >

    </div>


    <div class="field">

      <label>
        Shipping message
      </label>

      <input
        id="ship"
        value="${esc(DB.settings.shipping)}"
      >

    </div>


    <div class="field">

      <label>
        Free shipping above ₹
      </label>

      <input
        id="free"
        type="number"
        value="${DB.settings.freeShippingAbove}"
      >

    </div>


    <div class="field">

      <label>

        <input
          id="upi"
          type="checkbox"
          ${
            DB.settings.upi
            ? "checked"
            : ""
          }
        >

        Enable UPI

      </label>

    </div>


    <div class="field">

      <label>

        <input
          id="cod"
          type="checkbox"
          ${
            DB.settings.cod
            ? "checked"
            : ""
          }
        >

        Enable COD

      </label>

    </div>


  </div>


  <button
    class="btn"
    style="margin-top:15px"
    onclick="saveSettings()"
  >

    Save settings

  </button>


  <hr
    style="margin:25px 0"
  >


  <button
    class="btn danger"
    onclick="resetDemo()"
  >

    Reset demo database

  </button>


</div>

`;

}


function saveSettings(){

  DB.brand.name=
    $("#sn").value;

  DB.brand.tagline=
    $("#st").value;

  DB.settings.shipping=
    $("#ship").value;

  DB.settings.freeShippingAbove=
    +$("#free").value;

  DB.settings.upi=
    $("#upi").checked;

  DB.settings.cod=
    $("#cod").checked;


  save();

  alert(
    "Settings saved"
  );

  render();

}


/* =========================================================
   RESET
   ========================================================= */

function resetDemo(){

  if(
    !confirm(
      "This will erase local changes and restore demo products. Continue?"
    )
  )
    return;


  localStorage.removeItem(
    KEY
  );


  location.reload();

}


/* =========================================================
   START ADMIN
   ========================================================= */

render();
