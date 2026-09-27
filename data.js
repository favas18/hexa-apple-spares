/* =========================================================
   HEXA MOBILE SPARE
   MASTER PRODUCT DATA
   ========================================================= */

const PHONE_COLORS = {

  "iPhone 7":[
    "Jet Black",
    "Black",
    "Silver",
    "Gold",
    "Rose Gold",
    "(PRODUCT)RED"
  ],

  "iPhone 7 Plus":[
    "Jet Black",
    "Black",
    "Silver",
    "Gold",
    "Rose Gold",
    "(PRODUCT)RED"
  ],

  "iPhone 8":[
    "Silver",
    "Space Gray",
    "Gold",
    "(PRODUCT)RED"
  ],

  "iPhone 8 Plus":[
    "Silver",
    "Space Gray",
    "Gold",
    "(PRODUCT)RED"
  ],

  "iPhone X":[
    "Silver",
    "Space Gray"
  ],

  "iPhone XR":[
    "Black",
    "White",
    "Blue",
    "Yellow",
    "Coral",
    "(PRODUCT)RED"
  ],

  "iPhone XS":[
    "Silver",
    "Space Gray",
    "Gold"
  ],

  "iPhone XS Max":[
    "Silver",
    "Space Gray",
    "Gold"
  ],

  "iPhone 11":[
    "Black",
    "Green",
    "Yellow",
    "Purple",
    "White",
    "(PRODUCT)RED"
  ],

  "iPhone 11 Pro":[
    "Midnight Green",
    "Silver",
    "Space Gray",
    "Gold"
  ],

  "iPhone 11 Pro Max":[
    "Midnight Green",
    "Silver",
    "Space Gray",
    "Gold"
  ],

  "iPhone SE (2nd gen)":[
    "Black",
    "White",
    "(PRODUCT)RED"
  ],

  "iPhone 12 mini":[
    "Black",
    "White",
    "(PRODUCT)RED",
    "Green",
    "Blue",
    "Purple"
  ],

  "iPhone 12":[
    "Black",
    "White",
    "(PRODUCT)RED",
    "Green",
    "Blue",
    "Purple"
  ],

  "iPhone 12 Pro":[
    "Pacific Blue",
    "Gold",
    "Graphite",
    "Silver"
  ],

  "iPhone 12 Pro Max":[
    "Pacific Blue",
    "Gold",
    "Graphite",
    "Silver"
  ],

  "iPhone 13 mini":[
    "Pink",
    "Blue",
    "Midnight",
    "Starlight",
    "(PRODUCT)RED",
    "Green"
  ],

  "iPhone 13":[
    "Pink",
    "Blue",
    "Midnight",
    "Starlight",
    "(PRODUCT)RED",
    "Green"
  ],

  "iPhone 13 Pro":[
    "Sierra Blue",
    "Silver",
    "Gold",
    "Graphite",
    "Alpine Green"
  ],

  "iPhone 13 Pro Max":[
    "Sierra Blue",
    "Silver",
    "Gold",
    "Graphite",
    "Alpine Green"
  ],

  "iPhone SE (3rd gen)":[
    "Midnight",
    "Starlight",
    "(PRODUCT)RED"
  ],

  "iPhone 14":[
    "Midnight",
    "Purple",
    "Starlight",
    "(PRODUCT)RED",
    "Blue",
    "Yellow"
  ],

  "iPhone 14 Plus":[
    "Midnight",
    "Purple",
    "Starlight",
    "(PRODUCT)RED",
    "Blue",
    "Yellow"
  ],

  "iPhone 14 Pro":[
    "Space Black",
    "Silver",
    "Gold",
    "Deep Purple"
  ],

  "iPhone 14 Pro Max":[
    "Space Black",
    "Silver",
    "Gold",
    "Deep Purple"
  ],

  "iPhone 15":[
    "Black",
    "Green",
    "Yellow",
    "Pink",
    "Blue"
  ],

  "iPhone 15 Plus":[
    "Black",
    "Green",
    "Yellow",
    "Pink",
    "Blue"
  ],

  "iPhone 15 Pro":[
    "Black Titanium",
    "White Titanium",
    "Blue Titanium",
    "Natural Titanium"
  ],

  "iPhone 15 Pro Max":[
    "Black Titanium",
    "White Titanium",
    "Blue Titanium",
    "Natural Titanium"
  ],

  "iPhone 16":[
    "Black",
    "White",
    "Pink",
    "Teal",
    "Ultramarine"
  ],

  "iPhone 16 Plus":[
    "Black",
    "White",
    "Pink",
    "Teal",
    "Ultramarine"
  ],

  "iPhone 16e":[
    "Black",
    "White"
  ],

  "iPhone 16 Pro":[
    "Black Titanium",
    "White Titanium",
    "Natural Titanium",
    "Desert Titanium"
  ],

  "iPhone 16 Pro Max":[
    "Black Titanium",
    "White Titanium",
    "Natural Titanium",
    "Desert Titanium"
  ],

  "iPhone 17":[
    "Black",
    "White",
    "Mist Blue",
    "Sage",
    "Lavender"
  ],

  "iPhone 17 Pro":[
    "Deep Blue",
    "Cosmic Orange",
    "Silver"
  ],

  "iPhone 17 Pro Max":[
    "Deep Blue",
    "Cosmic Orange",
    "Silver"
  ]
};


/* =========================================================
   PHONE LIST
   ========================================================= */

const IPHONES = Object.keys(PHONE_COLORS).map(
  (name,index)=>({

    id:"phone-"+(index+1),

    name:name,

    category:"iPhone",

    colors:PHONE_COLORS[name]

  })
);


/* =========================================================
   IPHONE PARTS
   Each appears ONCE in the model page
   ========================================================= */

const PARTS = [

  "Display",

  "Battery",

  "Back Glass",

  "Ringer",

  "Earpiece",

  "Charging Flex",

  "Front Camera",

  "Back Camera",

  "Battery Cells",

  "Housing"

];


/* =========================================================
   DISPLAY OPTIONS
   ========================================================= */

const DISPLAY_TYPES = [

  "DD",

  "OLED",

  "Soft OLED",

  "Hard OLED"

];


/* =========================================================
   ACCESSORIES
   ========================================================= */

const accessories = [

  [
    "Apple 20W USB-C Power Adapter",
    "Apple",
    "Adapter",
    799
  ],

  [
    "Apple 30W USB-C Power Adapter",
    "Apple",
    "Adapter",
    1799
  ],

  [
    "Apple USB-C to USB-C Cable 1m",
    "Apple",
    "Cable",
    899
  ],

  [
    "Apple USB-C to Lightning Cable 1m",
    "Apple",
    "Cable",
    899
  ],

  [
    "Apple EarPods USB-C",
    "Apple",
    "EarPods",
    1899
  ],

  [
    "Apple EarPods Lightning",
    "Apple",
    "EarPods",
    1899
  ],

  [
    "Samsung 25W Power Adapter",
    "Samsung",
    "Adapter",
    999
  ],

  [
    "Samsung 65W Power Adapter",
    "Samsung",
    "Adapter",
    2999
  ],

  [
    "Samsung 60W Power Adapter",
    "Samsung",
    "Adapter",
    2399
  ],

  [
    "Samsung USB-C Cable",
    "Samsung",
    "Cable",
    499
  ]

];


/* =========================================================
   iPAD MODELS
   ========================================================= */

const ipadModels = [

  "iPad 6",

  "iPad 7",

  "iPad 8",

  "iPad 9",

  "iPad 10",

  "iPad Air 2",

  "iPad Air 3",

  "iPad Air 4",

  "iPad Air 5",

  "iPad Air 6",

  "iPad mini 4",

  "iPad mini 5",

  "iPad mini 6",

  "iPad Pro 11 1st Gen",

  "iPad Pro 11 2nd Gen",

  "iPad Pro 11 3rd Gen",

  "iPad Pro 11 4th Gen",

  "iPad Pro 12.9 3rd Gen",

  "iPad Pro 12.9 4th Gen",

  "iPad Pro 12.9 5th Gen",

  "iPad Pro 12.9 6th Gen"

];


/* =========================================================
   APPLE WATCH MODELS
   ========================================================= */

const watchModels = [

  "Apple Watch 1st Gen",

  "Apple Watch Series 2",

  "Apple Watch Series 3",

  "Apple Watch Series 4",

  "Apple Watch Series 5",

  "Apple Watch Series 6",

  "Apple Watch Series 7",

  "Apple Watch Series 8",

  "Apple Watch Series 9",

  "Apple Watch Series 10",

  "Apple Watch Ultra",

  "Apple Watch Ultra 2"

];


/* =========================================================
   GENERATED PRODUCT GRAPHICS
   ========================================================= */

function img(label,accent="#087f55"){

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="700"
      height="520"
      viewBox="0 0 700 520">

      <defs>

        <linearGradient
          id="g"
          x1="0"
          x2="1"
          y1="0"
          y2="1">

          <stop
            stop-color="#f5fffb"/>

          <stop
            offset="1"
            stop-color="#d9f3e8"/>

        </linearGradient>

      </defs>

      <rect
        width="700"
        height="520"
        rx="32"
        fill="url(#g)"/>

      <rect
        x="250"
        y="55"
        width="200"
        height="380"
        rx="38"
        fill="#14201c"/>

      <rect
        x="263"
        y="70"
        width="174"
        height="350"
        rx="30"
        fill="#0b3227"/>

      <circle
        cx="350"
        cy="90"
        r="5"
        fill="#b7fff0"/>

      <path
        d="M286 170 Q350 125 414 170
           L414 360 Q350 400 286 360Z"
        fill="${accent}"
        opacity=".65"/>

      <text
        x="350"
        y="485"
        text-anchor="middle"
        font-family="Arial"
        font-size="28"
        font-weight="700"
        fill="#0d2f25">

        ${label}

      </text>

    </svg>

  `)}`;

}


/* =========================================================
   CREATE IPHONE PRODUCTS
   ========================================================= */

const products=[];

let pid=1;


for(const phone of IPHONES){

  for(const part of PARTS){

    let variants=1;

    if(part==="Display"){

      variants=4;

    }

    if(
      part==="Back Glass" ||
      part==="Housing"
    ){

      variants=phone.colors.length;

    }


    for(let v=0;v<variants;v++){

      const variant=

        part==="Display"

        ? DISPLAY_TYPES[v]

        :

        (
          part==="Back Glass" ||
          part==="Housing"
        )

        ? phone.colors[v]

        : "Standard";


      let mrp=

        part==="Display"

        ? [2499,3299,3999,4599][v] || 2999

        :

        part==="Battery"

        ? 1199

        :

        part==="Back Glass"

        ? 799

        :

        part==="Housing"

        ? 1599

        :

        part==="Back Camera"

        ? 2899

        :

        part==="Front Camera"

        ? 1699

        :

        899;


      products.push({

        id:"P"+pid++,

        name:
          `${phone.name} ${part}${
            variant!=="Standard"
            ? " - "+variant
            : ""
          }`,

        model:phone.name,

        category:"iPhone Parts",

        part:part,

        variant:variant,

        mrp:mrp,

        selling:Math.round(mrp*.78),

        stock:5+((pid*7)%20),

        image:img(

          part,

          part==="Back Glass" ||
          part==="Housing"

          ? "#0b7650"

          : "#19a974"

        ),

        description:
          `Quality replacement ${part.toLowerCase()}
           for ${phone.name}.`

      });

    }

  }

}


/* =========================================================
   ACCESSORY PRODUCTS
   ========================================================= */

for(
  const [name,brand,type,price]
  of accessories
){

  products.push({

    id:"A"+pid++,

    name:name,

    model:"Accessories",

    category:"Accessories",

    brand:brand,

    type:type,

    part:type,

    mrp:Math.round(price*1.25),

    selling:price,

    stock:8+(pid%20),

    image:img(

      type,

      brand==="Samsung"
      ? "#155e75"
      : "#087f55"

    ),

    description:
      `${brand} ${type}
       for repair shops and customers.`

  });

}


/* =========================================================
   iPAD PRODUCTS
   ========================================================= */

for(const model of ipadModels){

  for(
    const part of [
      "Display",
      "Battery",
      "Touch",
      "Home Button"
    ]
  ){

    products.push({

      id:"IP"+pid++,

      name:`${model} ${part}`,

      model:model,

      category:"iPad Parts",

      part:part,

      mrp:1999,

      selling:1499,

      stock:6,

      image:img(part,"#087f55"),

      description:
        `Replacement ${part.toLowerCase()}
         for ${model}.`

    });

  }

}


/* =========================================================
   APPLE WATCH PRODUCTS
   ========================================================= */

for(const model of watchModels){

  for(
    const part of [
      "Battery",
      "Touch",
      "OCA Glass"
    ]
  ){

    products.push({

      id:"W"+pid++,

      name:`${model} ${part}`,

      model:model,

      category:"Apple Watch Parts",

      part:part,

      mrp:1599,

      selling:1199,

      stock:6,

      image:img(part,"#087f55"),

      description:
        `Replacement ${part.toLowerCase()}
         for ${model}.`

    });

  }

}


/* =========================================================
   FALCON 530 TOOL
   ========================================================= */

products.push({

  id:"T"+pid++,

  name:"Falcon 530 Professional Repair Tool",

  model:"Falcon 530",

  category:"Tools",

  part:"Repair Tool",

  mrp:6999,

  selling:5499,

  stock:12,

  image:img(
    "FALCON 530",
    "#064e3b"
  ),

  description:
    "Professional repair tool for technicians."

});


/* =========================================================
   DEFAULT STORE DATABASE
   ========================================================= */

const seedData={

  brand:{

    name:"HEXA",

    tagline:"MOBILE SPARE",

    green:"#087f55"

  },

  banner:{

    title:"iPhone Spare Parts",

    subtitle:
      "Quality parts. Better prices. All India delivery.",

    image:img(
      "HEXA SPARES",
      "#087f55"
    )

  },

  products:products,

  phones:IPHONES,

  categories:[

    "iPhone Parts",

    "Accessories",

    "Tools",

    "iPad Parts",

    "Apple Watch Parts"

  ],

  customers:[],

  orders:[],

  settings:{

    shipping:"All India Delivery",

    cod:true,

    upi:true,

    freeShippingAbove:500

  }

};
