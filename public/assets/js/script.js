// ドロワー
$(function () {
  const $drawerBtn = $('.drawer__icon');
  const $drawer = $('.drawer');
  const $overlay = $('.drawer__overlay');
  const $navMenu = $('.nav__menu');

  $drawerBtn.on('click', function () {
    $drawer.toggleClass('open');
    $navMenu.toggleClass('open'); // ← もともとの処理も継続
    $overlay.toggleClass('is-active');
    $(this).toggleClass('active');
  });

  // オーバーレイをクリックして閉じる
  $overlay.on('click', function () {
    $drawer.removeClass('open');
    $navMenu.removeClass('open'); // ← 忘れず閉じる
    $overlay.removeClass('is-active');
    $drawerBtn.removeClass('active');
  });
});



// スクロールするとハンバーガーメニューがフワッと現れる
$(function () {
  const $hamburger = $('.nav__open');

  // 初期は非表示にしておく（JS制御のため）
  if (window.matchMedia('(min-width: 768px)').matches) {
    $hamburger.hide();
  }

  $(window).on('scroll', function () {
    if (window.matchMedia('(min-width: 768px)').matches) {
      const scroll = $(this).scrollTop();

      if (scroll > 600) {
        $hamburger.fadeIn(500); // フェードイン
      } else {
        $hamburger.fadeOut(500); // フェードアウト
      }
    }
  });
});



// MVのスライダー
const mvSwiper = new Swiper('.front__mv-slider', {
  loop: true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 5000,
  },
});



// ランチメニューのドットライン制御
function generateDots() {
  const $container = $(".dot-line");
  $container.empty(); // 中身をリセット
  const dotWidth = 4 + 4; // 幅 + margin
  const containerWidth = $container.outerWidth();
  const dotCount = Math.floor(containerWidth / dotWidth);
  for (let i = 0; i < dotCount; i++) {
    $("<span>")
      .addClass("dot")
      .appendTo($container);
  }
}
$(window).on("load resize", generateDots);



// news-pageのスライダー
const swiper = new Swiper('.mySwiper', {
    slidesPerView: 1,
    loop: false,
    on: {
      slideChange: function () {
        $('.pagination-bullet').removeClass('active');
        $('.pagination-bullet').eq(swiper.realIndex).addClass('active');
      }
    }
  });

  // カスタムページネーション
  $('.pagination-bullet').on('click', function () {
    const index = $(this).data('index');
    swiper.slideTo(index);
    $('.pagination-bullet').removeClass('active');
    $(this).addClass('active');
  });

  $('.swiper-pagination-button.prev').on('click', function () {
    swiper.slidePrev();
  });

  $('.swiper-pagination-button.next').on('click', function () {
    swiper.slideNext();
  });

  // // 初期状態で1番目のボタンにactiveクラス
  $('.pagination-bullet').eq(0).addClass('active');



// TOPへ戻るボタン
$(function(){
    var pageup = $('#page-top');
    pageup.hide();
    $(window).scroll(function(){
        if($(this).scrollTop() > 80){
            pageup.fadeIn(300);
        } else {
            pageup.fadeOut(300);
        }
    });
    pageup.click(function(){
        $('body,html').animate({scrollTop: 0}, 500);
        return false;
    });
});