// Menü verisi
var menus = {
  icecek: {
    soguk: [
      { name: "Soğuk Meşrubatlar",    desc: "", price: "₺50",  img: "images/soguk_mesrubatlar.jpg" },
      { name: "Su",                    desc: "", price: "₺20",  img: "images/su.jpg" },
      { name: "Maden Suyu",            desc: "", price: "₺25",  img: "images/maden_suyu.jpg" },
      { name: "Meyveli Soda",          desc: "", price: "₺30",  img: "images/meyveli_soda.jpg" },
      { name: "Portakal Suyu (Taze)",  desc: "", price: "₺125", img: "images/portakal_suyu.jpg" },
      { name: "Ice Coffee", desc: "", price: "₺120", img: "images/ice_coffee.jpg" },
      { name: "Meyve Suyu 1L (Donuk)",            desc: "", price: "₺180", img: "images/meyve_suyu.jpg" }
    ],
    sicak: [
      { name: "Çay",           desc: "", price: "₺30",  img: "images/cay.jpg" },
      { name: "Türk Kahvesi",      desc: "", price: "₺75",  img: "images/turk_kahvesi.jpg" },
      { name: "Espresso",  desc: "", price: "₺90",  img: "images/espresso.jpg" },
      { name: "Double Espresso", desc: "", price: "₺125", img: "images/double_espresso.jpg" },
      { name: "Latte",         desc: "", price: "₺120", img: "images/latte.jpg" },
      { name: "Americano",     desc: "", price: "₺100", img: "images/americano.jpg" },
      
    ]
  },
  waffle: [
    { name: "Waffle Basic (Meyveli)",    desc: "Enfes Waffle üzerine seçeceğiniz mevsim meyveleri,ekstralar ile servis edilir.", price: "₺250", img: "images/waffle_basic.jpg" },
    { name: "Waffle Extra (Dondurmalı)", desc: "Enfes Waffle üzerine seçeceğiniz mevsim meyveleri,ekstralar ve 2 çeşit dondurma ile servis edilir.", price: "₺350", img: "images/waffle_extra.jpg" },
    { name: "Waffle‑Wich",               desc: "Enfes Double Waffle arasına seçeceğiniz mevsim meyveleri ve ekstralar ile servis edilir.", price: "₺400", img: "images/waffle_wich.jpg" }
  ],
  dondurma: [
    { name: "Dondurma (1kg)",             desc: "1kg alımlarda 6 adete kadar kornet ücretsizdir.", price: "₺1200", img: "images/dondurma_kg.jpg" },
    { name: "Milkshake",                 desc: "", price: "₺200",  img: "images/milkshake.jpg" },
    { name: "Kağıt Helva",               desc: "", price: "₺30",   img: "images/kagit_helva.jpg" },
    { name: "Mandalinalı Mozaik Pasta",  desc: "", price: "₺140",  img: "images/mozaik_pasta.jpg" },
	{ name: "Affogato",      desc: "Espresso üzerine vanilyalı dondurma ile servis edilir.", price: "₺150", img: "images/affogato.jpg" },
  ]
};

// Modal açma/kapatma fonksiyonları
function openModal(product) {
  document.getElementById('modalImage').src    = product.img;
  document.getElementById('modalName').textContent  = product.name;
  document.getElementById('modalDesc').textContent  = product.desc;
  document.getElementById('modalPrice').textContent = product.price;
  document.getElementById('productModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('productModal').style.display = 'none';
}

// Ürün kartlarını render eden fonksiyon
function renderProducts(list) {
  var cont    = document.getElementById("productContainer");
  var wrapper = document.createElement("div");
  wrapper.className = "products-wrapper";

  for (var i = 0; i < list.length; i++) {
    (function(p) {
      var card = document.createElement("div");
      card.className = "product";
      card.innerHTML =
        "<img src='" + p.img + "' alt='" + p.name + "' />" +
        "<div class='info'>" +
          "<h3>" + p.name + "</h3>" +
          "<span>" + p.price + "</span>" +
        "</div>";

      // Kart tıklanınca modal aç
      card.addEventListener('click', function() {
        openModal(p);
      });

      wrapper.appendChild(card);
    })(list[i]);
  }

  cont.appendChild(wrapper);
}

// Menü yükleme fonksiyonu
function loadMenu(type) {
  var cont = document.getElementById("productContainer");
  cont.innerHTML = "";

  // Ana buton aktifliği
  var mainBtns = document.querySelectorAll(".menu-item");
  mainBtns.forEach(function(btn) {
    btn.className = btn.getAttribute("data-menu") === type ? "menu-item active" : "menu-item";
  });

  // İçecek alt menüsü
  if (type === "icecek") {
    var subWrapper = document.createElement("div");
    subWrapper.className = "sub-menu";
    var subs = ["soguk","sicak"];
    var labels = { soguk:"Soğuk İçecekler", sicak:"Sıcak İçecekler" };

    subs.forEach(function(key, idx) {
      var sb = document.createElement("button");
      sb.className = "sub-menu-item" + (idx === 0 ? " active" : "");
      sb.setAttribute("data-sub", key);
      sb.textContent = labels[key];
      sb.onclick = function() {
        // Alt buton aktifliği
        subWrapper.querySelectorAll(".sub-menu-item").forEach(function(el){
          el.className = "sub-menu-item";
        });
        this.classList.add("active");
        // Ürün listele
        cont.innerHTML = "";
        cont.appendChild(subWrapper);
        renderProducts(menus.icecek[this.getAttribute("data-sub")]);
      };
      subWrapper.appendChild(sb);
    });

    cont.appendChild(subWrapper);
    renderProducts(menus.icecek.soguk);

  } else {
    // Waffle ve BD Specials
    renderProducts(menus[type] || []);
  }
}

// Sayfa yüklendiğinde
window.onload = function() {
  // Ana menü butonları tıklama
  document.querySelectorAll(".menu-item").forEach(function(btn) {
    btn.onclick = function() {
      loadMenu(this.getAttribute("data-menu"));
    };
  });

  // İlk menüyü yükle
  var first = document.querySelector(".menu-item");
  if (first) loadMenu(first.getAttribute("data-menu"));

  // Modal kapatma dinleyicileri
  document.querySelector('.modal-close').onclick = closeModal;
  document.getElementById('productModal').onclick = function(e) {
    if (e.target === this) closeModal();
  };
};
