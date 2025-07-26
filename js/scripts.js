document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("backgroundVideo");

  if (video) {
    // ページ読み込み時：保存された時間から再生開始
    const savedTime = localStorage.getItem("videoCurrentTime");
    if (savedTime) {
      video.currentTime = parseFloat(savedTime);
    }

    // 動画の時間を定期的に保存（1秒ごと）
    setInterval(function () {
      if (video && !video.paused) {
        localStorage.setItem("videoCurrentTime", video.currentTime);
      }
    }, 1000);

    // ページを離れる前に現在の時間を保存
    window.addEventListener("beforeunload", function () {
      if (video) {
        localStorage.setItem("videoCurrentTime", video.currentTime);
      }
    });

    // 動画が終了したらリセット
    video.addEventListener("ended", function () {
      localStorage.removeItem("videoCurrentTime");
    });
  }
});

// ナビゲーションリンクのクリック時に時間を保存
document.addEventListener("click", function (e) {
  const target = e.target;
  if (target.tagName === "A" && target.href && target.href.includes(".html")) {
    const video = document.getElementById("backgroundVideo");
    if (video) {
      localStorage.setItem("videoCurrentTime", video.currentTime);
    }
  }
});

// モーダル機能
function openModal() {
  document.getElementById("imageModal").style.display = "block";
  document.body.style.overflow = "hidden"; // スクロールを無効化
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
  document.body.style.overflow = "auto"; // スクロールを有効化
}

// ESCキーでモーダルを閉じる
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

// お問い合わせフォーム処理
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // フォームのデフォルト送信を停止

      // バリデーション
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("必須項目をすべて入力してください。");
        return;
      }

      // メールアドレスの簡単なバリデーション
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("正しいメールアドレスを入力してください。");
        return;
      }

      // フォームデータの処理（実際の送信は行わない）
      const formData = {
        name: name,
        email: email,
        subject: document.getElementById("subject").value,
        message: message,
        timestamp: new Date().toISOString(),
      };

      // ローカルストレージに保存（デモ用）
      localStorage.setItem("lastContactForm", JSON.stringify(formData));

      // 送信アニメーション
      const submitBtn = document.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "送信中...";
      submitBtn.disabled = true;

      // 2秒後に成功メッセージを表示
      setTimeout(function () {
        // フォームを非表示にして成功メッセージを表示
        contactForm.style.display = "none";
        document.getElementById("successMessage").style.display = "block";

        // 3秒後にフォームをリセットして再表示
        setTimeout(function () {
          contactForm.reset();
          contactForm.style.display = "block";
          document.getElementById("successMessage").style.display = "none";
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }, 2000);
    });

    // リアルタイムバリデーション
    const emailInput = document.getElementById("email");
    if (emailInput) {
      emailInput.addEventListener("blur", function () {
        const email = this.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email && !emailRegex.test(email)) {
          this.style.borderColor = "#ff4444";
          if (!document.querySelector(".email-error")) {
            const errorMsg = document.createElement("span");
            errorMsg.className = "email-error";
            errorMsg.style.color = "#ff4444";
            errorMsg.style.fontSize = "0.9rem";
            errorMsg.textContent = "正しいメールアドレスを入力してください";
            this.parentNode.appendChild(errorMsg);
          }
        } else {
          this.style.borderColor = "#ff6b00";
          const errorMsg = document.querySelector(".email-error");
          if (errorMsg) {
            errorMsg.remove();
          }
        }
      });
    }
  }
});

// 背景動画の制御機能
function toggleVideo() {
  const video = document.getElementById("backgroundVideo");
  const button = document.getElementById("pauseVideoBtn");

  if (video.paused) {
    video.play();
    button.textContent = "動画停止";
    button.setAttribute("aria-label", "背景動画を停止");
  } else {
    video.pause();
    button.textContent = "動画再生";
    button.setAttribute("aria-label", "背景動画を再生");
  }
}

// prefers-reduced-motionに対応
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const video = document.getElementById("backgroundVideo");
  if (video) {
    video.pause();
    const button = document.getElementById("pauseVideoBtn");
    if (button) {
      button.textContent = "動画再生";
      button.setAttribute("aria-label", "背景動画を再生");
    }
  }
}

// スムーススクロールの実装
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
