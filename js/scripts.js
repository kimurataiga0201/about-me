// 軽量版JavaScript - 必要最小限の機能のみ
document.addEventListener("DOMContentLoaded", function () {
  console.log("軽量版サイト読み込み完了");

  // game.htmlのズーム可能画像にクリックイベントを追加
  initZoomableImages();
});

// モーダル機能
function openModal() {
  const modal = document.getElementById("imageModal");
  if (modal) {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// ESCキーでモーダルを閉じる
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
    closeDogModal();
    closeGameImageModal();
  }
});

// ゲーム画像用モーダル機能
function openGameImageModal(imageSrc, imageAlt) {
  const modal = document.getElementById("gameImageModal");
  const modalImage = document.getElementById("gameModalImage");
  const modalText = document.getElementById("gameModalText");
  if (modal && modalImage && modalText) {
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    modalText.textContent = imageAlt;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

function closeGameImageModal() {
  const modal = document.getElementById("gameImageModal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// 犬の写真用モーダル機能
function openDogModal(imageSrc) {
  const modal = document.getElementById("dogModal");
  const modalImage = document.getElementById("dogModalImage");
  if (modal && modalImage) {
    modalImage.src = imageSrc;
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }
}

function closeDogModal() {
  const modal = document.getElementById("dogModal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// お問い合わせフォーム処理（軽量版）
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // 基本バリデーション
      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const message = document.getElementById("message")?.value.trim();

      if (!name || !email || !message) {
        alert("必須項目をすべて入力してください。");
        return;
      }

      // メール形式チェック
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("正しいメールアドレスを入力してください。");
        return;
      }

      // 送信完了メッセージ
      alert(
        "お問い合わせありがとうございます！（デモ版のため実際の送信は行われません）"
      );
      contactForm.reset();
    });
  }
});

// 画像の遅延読み込み効果（軽量版）
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(function (img) {
    img.addEventListener("load", function () {
      this.style.opacity = "1";
    });
  });
});

// ズーム可能画像の初期化
function initZoomableImages() {
  // game.htmlページでのみ実行
  if (!window.location.pathname.includes("game.html")) return;

  const zoomableImages = document.querySelectorAll(".zoomable-image");
  zoomableImages.forEach((img) => {
    img.addEventListener("click", function () {
      const altText = img.alt || "ゲーム画像";
      openGameImageModal(img.src, altText);
    });
  });
}
