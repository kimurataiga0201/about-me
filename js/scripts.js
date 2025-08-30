// 軽量版JavaScript - 必要最小限の機能のみ
document.addEventListener("DOMContentLoaded", function () {
  console.log("軽量版サイト読み込み完了");

  // game.htmlのズーム可能画像にクリックイベントを追加
  initZoomableImages();

  // 趣味カードの初期化（hobbies.htmlの場合のみ）
  if (document.querySelector(".hobby-cards")) {
    initHobbyCards();
  }

  // 自慢カウンター機能の初期化（pride.htmlの場合のみ）
  if (document.querySelector(".pride-counter")) {
    initPrideCounters();
  }

  // Twitch配信プレイヤー機能の初期化（streamers.htmlの場合のみ）
  if (document.getElementById("twitchPlayerContainer")) {
    initTwitchPlayer();
  }

  // 花火エフェクト機能の初期化
  initFireworksEffect();
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

// 趣味カードのホバーエフェクト機能
function initHobbyCards() {
  const hobbyCards = document.querySelectorAll(".hobby-card");

  hobbyCards.forEach((card) => {
    // マウスホバー時の音効果（オプション）
    card.addEventListener("mouseenter", function () {
      // ホバー時のサウンドエフェクト（実際の音ファイルがある場合）
      // playHoverSound();

      // カードが選択されたことを示すクラスを追加
      this.classList.add("card-hovered");
    });

    card.addEventListener("mouseleave", function () {
      this.classList.remove("card-hovered");
    });

    // カードクリック時のアニメーション
    card.addEventListener("click", function (e) {
      // リンククリック以外の場合、該当ページに移動
      if (!e.target.classList.contains("card-link")) {
        const hobby = this.dataset.hobby;
        const link = this.querySelector(".card-link");
        if (link) {
          // クリックアニメーション
          this.style.transform = "scale(0.95)";
          setTimeout(() => {
            this.style.transform = "";
            window.location.href = link.href;
          }, 150);
        }
      }
    });

    // カードの初期アニメーション（ページ読み込み時）
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
  });

  // カードを順番にフェードイン
  hobbyCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.transition = "all 0.5s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 200);
  });
}

// サウンドエフェクト関数（オプション）
function playHoverSound() {
  // 実際のサウンドファイルがある場合に使用
  // const audio = new Audio('sounds/hover.mp3');
  // audio.volume = 0.2;
  // audio.play().catch(() => {});
}

// 自慢カウンター機能
function initPrideCounters() {
  const likeButtons = document.querySelectorAll(".like-button");
  const counters = {};

  // ローカルストレージからカウント数を読み込み
  function loadCounters() {
    const savedCounters = localStorage.getItem("prideCounters");
    if (savedCounters) {
      const parsed = JSON.parse(savedCounters);
      Object.keys(parsed).forEach((prideId) => {
        counters[prideId] = parsed[prideId];
        const countElement = document.getElementById(`count-${prideId}`);
        if (countElement) {
          countElement.textContent = counters[prideId] || 0;
        }
      });
    }
  }

  // ローカルストレージにカウント数を保存
  function saveCounters() {
    localStorage.setItem("prideCounters", JSON.stringify(counters));
  }

  // カウントを増やすアニメーション
  function animateCountUp(countElement, newCount) {
    countElement.classList.add("count-animate");
    setTimeout(() => {
      countElement.textContent = newCount;
    }, 100);
    setTimeout(() => {
      countElement.classList.remove("count-animate");
    }, 600);
  }

  // 花火エフェクト（オプション）
  function createConfetti(button) {
    const rect = button.getBoundingClientRect();
    const colors = ["#ff6b00", "#ff8f00", "#ffaa33", "#ff4500"];

    for (let i = 0; i < 15; i++) {
      const confetti = document.createElement("div");
      confetti.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
      `;
      document.body.appendChild(confetti);

      const angle = (Math.PI * 2 * i) / 15;
      const velocity = 150 + Math.random() * 100;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;

      confetti.animate(
        [
          {
            transform: "translate(0, 0) scale(1)",
            opacity: 1,
          },
          {
            transform: `translate(${vx}px, ${vy}px) scale(0)`,
            opacity: 0,
          },
        ],
        {
          duration: 800,
          easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }
      ).onfinish = () => confetti.remove();
    }
  }

  // 各ボタンにイベントリスナーを設定
  likeButtons.forEach((button) => {
    const prideId = button.dataset.pride;
    counters[prideId] = counters[prideId] || 0;

    button.addEventListener("click", function (e) {
      e.preventDefault();

      // カウントを増やす
      counters[prideId]++;

      // カウント表示を更新
      const countElement = document.getElementById(`count-${prideId}`);
      if (countElement) {
        animateCountUp(countElement, counters[prideId]);
      }

      // ボタンのアニメーション
      this.classList.add("liked");
      setTimeout(() => {
        this.classList.remove("liked");
      }, 800);

      // 花火エフェクト
      createConfetti(this);

      // ローカルストレージに保存
      saveCounters();

      // 特定の数字でお祝いメッセージ
      if (counters[prideId] === 10 || counters[prideId] % 25 === 0) {
        showCelebrationMessage(prideId, counters[prideId]);
      }
    });
  });

  // お祝いメッセージ表示
  function showCelebrationMessage(prideId, count) {
    const messages = {
      grandfather: "祖父も喜んでいることでしょう！",
      uncle: "叔父の美容室も大人気ですね！",
    };

    const message = messages[prideId] || "ありがとうございます！";

    // シンプルなアラート（実際にはもっと美しいモーダルにできます）
    const modal = document.createElement("div");
    modal.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(45deg, #ff6b00, #ff8f00);
      color: white;
      padding: 2rem;
      border-radius: 15px;
      font-family: "Michroma", cursive;
      text-align: center;
      z-index: 10000;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      border: 2px solid #ffaa33;
    `;
    modal.innerHTML = `
      <h3>🎉 ${count}回到達！ 🎉</h3>
      <p>${message}</p>
    `;
    document.body.appendChild(modal);

    setTimeout(() => {
      modal.style.opacity = "0";
      modal.style.transform = "translate(-50%, -50%) scale(0.8)";
      modal.style.transition = "all 0.3s ease";
      setTimeout(() => modal.remove(), 300);
    }, 3000);
  }

  // 初期化時にカウンターを読み込み
  loadCounters();
}

// Twitch配信プレイヤー機能
function initTwitchPlayer() {
  const channelName = "japanesekoreanug";
  const twitchEmbed = document.getElementById("twitchEmbed");
  const refreshBtn = document.getElementById("refreshStream");
  const toggleBtn = document.getElementById("togglePlayer");
  const playerContainer = document.querySelector(".twitch-player-container");

  if (!twitchEmbed) {
    console.log("twitchEmbed要素が見つかりません");
    return;
  }

  let isPlayerHidden = false;
  let checkInterval;

  // Twitch埋め込みプレイヤーを作成
  function createTwitchEmbed(isLive = false) {
    twitchEmbed.innerHTML = "";

    if (isLive) {
      console.log("配信中 - プレイヤーを作成します");

      const iframe = document.createElement("iframe");
      iframe.src = `https://player.twitch.tv/?channel=${channelName}&parent=localhost&autoplay=false&muted=false`;
      iframe.allowFullscreen = true;
      iframe.scrolling = "no";
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.style.border = "none";
      twitchEmbed.appendChild(iframe);
    } else {
      console.log("オフライン - オフラインメッセージを表示");
      twitchEmbed.innerHTML = `
        <div class="offline-message">
          <h3>📺 現在オフライン</h3>
          <p>japanesekoreanUGは現在配信していません。</p>
          <p>配信開始をお待ちください！</p>
        </div>
      `;
    }
  }

  // 配信状態をチェック
  function checkStreamStatus() {
    console.log("配信状態をチェック中...");
    setTimeout(() => {
      const isLive = Math.random() > 0.3; // 70%の確率で配信中
      console.log("配信状態:", isLive ? "LIVE" : "OFFLINE");
      updateStreamStatus(isLive);
    }, 1000);
  }

  // 配信状態のUI更新
  function updateStreamStatus(isLive) {
    createTwitchEmbed(isLive);

    if (isLive) {
      showNotification(
        "🔴 配信開始！",
        "japanesekoreanUGが配信を開始しました！"
      );
    }
  }

  // プレイヤー表示/非表示の切り替え
  function togglePlayer() {
    isPlayerHidden = !isPlayerHidden;

    if (isPlayerHidden) {
      playerContainer.classList.add("hidden-player");
      toggleBtn.innerHTML = "<span>📺</span> プレイヤーを表示";
    } else {
      playerContainer.classList.remove("hidden-player");
      toggleBtn.innerHTML = "<span>📺</span> プレイヤーを非表示";
    }
  }

  // 通知表示
  function showNotification(title, message) {
    const notification = document.createElement("div");
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(45deg, #9146ff, #772ce8);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 10px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      min-width: 300px;
      font-family: "Michroma", cursive;
    `;
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
        <span style="font-size: 1.2rem;">📺</span>
        <strong>${title}</strong>
      </div>
      <div style="font-size: 0.9rem;">${message}</div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }

  // 定期的な配信状態チェック
  function startPeriodicCheck() {
    checkStreamStatus();
    checkInterval = setInterval(checkStreamStatus, 180000); // 3分おき
  }

  function stopPeriodicCheck() {
    if (checkInterval) {
      clearInterval(checkInterval);
      checkInterval = null;
    }
  }

  // イベントリスナー設定
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      refreshBtn.innerHTML = "<span>🔄</span> 更新中...";
      refreshBtn.disabled = true;

      checkStreamStatus();

      setTimeout(() => {
        refreshBtn.innerHTML = "<span>🔄</span> 配信状態を更新";
        refreshBtn.disabled = false;
      }, 2000);
    });
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", togglePlayer);
  }

  // ページ表示状態の監視
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopPeriodicCheck();
    } else {
      startPeriodicCheck();
    }
  });

  // 初期化
  console.log("Twitchプレイヤーを初期化します");
  startPeriodicCheck();
}

// ===== 簡単で楽しい追加機能 =====

// 1. ダブルクリックで花火エフェクト（どのページでも使える）
document.addEventListener("dblclick", function (e) {
  createFirework(e.pageX, e.pageY);
});

function createFirework(x, y) {
  const colors = [
    "#ff6b6b",
    "#4ecdc4",
    "#45b7d1",
    "#f9ca24",
    "#f0932b",
    "#eb4d4b",
    "#6c5ce7",
  ];

  for (let i = 0; i < 12; i++) {
    const spark = document.createElement("div");
    spark.style.cssText = `
      position: fixed;
      width: 6px;
      height: 6px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      left: ${x}px;
      top: ${y}px;
    `;
    document.body.appendChild(spark);

    const angle = (Math.PI * 2 * i) / 12;
    const distance = 100 + Math.random() * 50;
    const endX = x + Math.cos(angle) * distance;
    const endY = y + Math.sin(angle) * distance;

    spark
      .animate(
        [
          { transform: "translate(0, 0) scale(1)", opacity: 1 },
          { transform: `translate(${endX - x}px, ${endY - y}px) scale(0)`, opacity: 0 },
        ],
        {
          duration: 1000,
          easing: "ease-out",
        }
      )
      .onfinish = () => spark.remove();
  }
}

// 2. ライブ時計（右上に表示）
function createLiveClock() {
  const clockDiv = document.createElement("div");
  clockDiv.id = "liveClock";
  clockDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.8);
    color: #00ff00;
    padding: 10px 15px;
    border-radius: 10px;
    font-family: 'Courier New', monospace;
    font-size: 16px;
    z-index: 1000;
    border: 1px solid #00ff00;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
  `;
  document.body.appendChild(clockDiv);

  function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    clockDiv.textContent = `⏰ ${timeString}`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// 3. ランダム励ましメッセージ（5秒おきに表示）
function showRandomMessage() {
  const messages = [
    "今日もお疲れさま！ 🌟",
    "あなたは素晴らしい！ ✨",
    "一歩一歩前進してますね 🚀",
    "今日も頑張ってる！ 💪",
    "いいペースですよ〜 👍",
    "休憩も大切です 😊",
    "あなたらしくいこう！ 🎈",
  ];

  const messageDiv = document.createElement("div");
  messageDiv.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    padding: 12px 20px;
    border-radius: 25px;
    font-size: 14px;
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.5s ease;
    max-width: 250px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  `;

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  messageDiv.textContent = randomMessage;
  document.body.appendChild(messageDiv);

  // アニメーション表示
  setTimeout(() => {
    messageDiv.style.transform = "translateX(0)";
  }, 100);

  // 3秒後に非表示
  setTimeout(() => {
    messageDiv.style.transform = "translateX(-100%)";
    setTimeout(() => messageDiv.remove(), 500);
  }, 3000);
}

// 4. 動的タイトル変更（ページがフォーカスを失ったときに変わる）
let originalTitle = document.title;
let titleInterval;

function startDynamicTitle() {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      const funTitles = [
        "戻ってきて〜！ 😢",
        "まだここにいるよ〜 👋",
        "お疲れさま！ ☕",
        "いつでも待ってます 💭",
        "また見に来てね！ 🎵",
      ];

      let titleIndex = 0;
      titleInterval = setInterval(() => {
        document.title = funTitles[titleIndex];
        titleIndex = (titleIndex + 1) % funTitles.length;
      }, 2000);
    } else {
      clearInterval(titleInterval);
      document.title = originalTitle;
    }
  });
}

// 5. スクロール進捗バー
function createScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1);
    z-index: 9999;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const scrollPercent =
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
      100;
    progressBar.style.width = scrollPercent + "%";
  });
}

// ページ読み込み時に簡単機能を初期化
document.addEventListener("DOMContentLoaded", function () {
  // ライブ時計を表示
  createLiveClock();

  // 動的タイトルを開始
  startDynamicTitle();

  // スクロール進捗バーを追加
  createScrollProgress();

  // 1秒後に最初の励ましメッセージを表示、その後1秒間隔で表示
  setTimeout(() => {
    showRandomMessage();
    setInterval(showRandomMessage, 1000);
  }, 1000);

  console.log("🎉 簡単で楽しい機能が追加されました！");
  console.log("💡 ダブルクリックで花火が出ます！");
});
