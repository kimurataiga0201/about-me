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
