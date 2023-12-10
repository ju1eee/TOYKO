// UI 모듈을 생성하는 즉시 실행 함수.
// window, document, $를 인자로 받아 내부에서 사용.
const UI = function (window, document, $) {

    // ScrollTrigger 플러그인을 gsap에 등록함.
  gsap.registerPlugin(ScrollTrigger);

    // introMotion 함수.
  const introMotion = () => {
    
    // 스크롤 위치에 따라 애니메이션을 실행하는 ScrollTrigger 객체를 생성함.
    ScrollTrigger.create({
      start: 'top top',
      end: 99999,
      onUpdate: (self) => {
        self.direction === -1 ? headerAction.play() : headerAction.reverse();
      }
    });

    // .header 요소에 애니메이션을 적용하는 gsap 애니메이션 객체를 생성함.
    const headerAction = gsap.from('.header', { 
      yPercent: -130,
      paused: true,
      duration: 0.3
    }).progress(1);

    // .intro-path 요소의 높이(height)를 100%로 설정함.
    gsap.set('.intro-path', { height: '100%' });
    

    const tl = gsap.timeline();
    tl
      .fromTo('.header-path', { width: 0 }, { width: '100%', duration: 1, ease: 'circ.out', delay: .5 })
      .fromTo('.intro-path svg', { height: 0 }, { height: '100%', duration: 1, ease: 'circ.out' })
      .fromTo('.food-path1', { width: 0 }, { width: '100%', duration: .5, ease: 'none' })
    

    const txtMove = gsap.timeline();
    
    txtMove
      .fromTo('.intro-section .copy .txt', { y: 150 }, { y: 0, duration: 1, ease: 'circ.out', delay: 1 })
      
      // 아코디언 관련 코드
      const $accordionHead = document.querySelectorAll('.intro-visual-accordion .head');
      const $accordionBtns = document.querySelectorAll('.intro-visual-accordion .btn-group .btn-arrow');
      let activeIdx = 0;
      
      // 아코디언 요소의 너비(width)를 100%로 설정함.
      gsap.set(`.intro-visual-accordion`, { width: '100%' })

      // 현재 활성화된 아코디언 패널의 너비를 100%로 설정함.
      gsap.set(`.intro-visual-accordion .panel${activeIdx}`, { width: '100%' })

      // 활성화된 패널의 .cont 요소의 크기(scale)를 1로 설정함.
      gsap.to(`.intro-visual-accordion .panel${activeIdx} .cont`, { scale: 1, duration: 1, ease: 'power4.out' })

      // 모든 .head 요소의 투명도(autoAlpha)를 0으로 설정함.
      gsap.set(`.intro-visual-accordion .head`, { autoAlpha: 0 })  

      // .intro-section 요소의 높이를 가져옴.
      const introHeight = document.querySelector('.intro-section').clientHeight;

      // 스크롤에 따른 .intro-visual-accordion 요소의 크기 변경 애니메이션을 정의함.
      const visualScale = gsap.timeline({
        scrollTrigger: {
          trigger: ".intro-section",
          start: "+=200 top",
          end: `+=${introHeight / 4}`,
          scrub: 2.5, 
        }
      })

      // visualScale 타임라인 애니메이션
      visualScale
        .addLabel('a')
        .to('.intro-visual-accordion', { scale: 1, marginLeft: 0, duration: .5,  width: 'calc(100% - 90px)', transformOrigin: '50% 50%', ease: 'power0.easeNone', }, 'a')
        .to(`.intro-visual-accordion .panel${activeIdx}`, { width: 'calc(100% - 180px)' }, 'a')
        .to(`.intro-visual-accordion .panel${activeIdx} .txt-wrap .txt-line .txt`, { y: 0, duration: 1, ease: 'circ.out' }, '-=.5')
        .to(`.intro-visual-accordion .head1`, { autoAlpha: 1, }, 'a-=.5')
        .to(`.intro-visual-accordion .head2`, { autoAlpha: 1, }, 'a-=.5')
      

        // 아코디언 패널을 변경하는 함수.
        const accordionAction = (value) => {
          let oldIdx = activeIdx;
            activeIdx = value;
  
            const newItemTl = gsap.timeline({ paused: true });
            const oldItemTl = gsap.timeline({ paused: true });
  
            oldItemTl
              .to(`.intro-visual-accordion .panel${oldIdx}`, { width: 90, duration: .5, ease: 'power1.inOut' })
              .to(`.intro-visual-accordion .head${oldIdx}`, { autoAlpha: 1, duration: .1, ease: 'power4.out' }, '-=.5')
              .to(`.intro-visual-accordion .panel${oldIdx} .cont`, { scale: 1.5, duration: 1, ease: 'power4.out' }, '-=.25')
              .to(`.intro-visual-accordion .panel${oldIdx} .txt-wrap .txt-line .txt`, { y: 150, duration: 1, ease: 'circ.out' }, '-=.5')
  
            newItemTl
              .to(`.intro-visual-accordion .panel${value}`, { width: 'calc(100% - 180px)', duration: .5, ease: 'power1.inOut' })
              .to(`.intro-visual-accordion .head${value}`, { autoAlpha: 0, duration: .1, ease: 'power4.out' }, '-=.5')
              .to(`.intro-visual-accordion .panel${value} .cont`, { scale: 1, duration: 1, ease: 'power4.out' }, '-=.25')
              .to(`.intro-visual-accordion .panel${value} .txt-wrap .txt-line .txt`, { y: 0, duration: 1, ease: 'circ.out' }, '-=.5')
          
            // 패널을 변경함.
            switch(value) {
              case value:
                oldItemTl.play();
                newItemTl.play();
                break;  
            }
        }



      // 각 아코디언 헤더 요소에 클릭 이벤트 리스너를 추가함.
        $accordionHead.forEach((item) => {
        item.addEventListener('click', (e) => {

          // 클릭된 아코디언 헤더의 index를 가져옴.
          const idx = e.currentTarget.dataset.index;

          // 해당 index의 아코디언 액션을 실행함.
          accordionAction(idx);

        })
      });

      
      // 각 아코디언 버튼 요소에 클릭 이벤트 리스너를 추가함.
      $accordionBtns.forEach((item) => {
        item.addEventListener('click', (e) => {

          // 클릭된 아코디언 버튼의 index를 가져옴.
          const idx = e.currentTarget.dataset.index;
          // 해당 index의 아코디언 액션을 실행함
          accordionAction(idx);
        })
      });

      
      // .intro-section 요소에 스크롤 트리거를 적용한 gsap 타임라인을 생성함.
      const searchBoxMove = gsap.timeline({
        scrollTrigger: {
          trigger: ".intro-section",
          start: "+=90px top",
          toggleActions: "restart none none reverse",
        }
      })

      // searchBoxMove 타임라인.
      searchBoxMove
      // .intro-search-box 요소를 서서히 사라지게 함.
        .to('.intro-search-box', { autoAlpha: 0, duration: .25, ease: 'power4.out' })
        // .header-search-box 요소를 서서히 나타나게 함.
        .to('.header-search-box', { autoAlpha: 1, duration: .25, ease: 'power4.out' }, '+=.01')


      // .intro-section .visual-wrap 요소에 스크롤 트리거를 적용한 gsap 타임라인을 생성하고 실행함.
      gsap.timeline({
        scrollTrigger: {
          trigger: ".intro-section .visual-wrap",
          start: "top top",
          pin: true,
          toggleClass: {
            targets: 'body',
            className: 'sticky-section'
          }
        }
      });

      // .food-section 요소에 스크롤 트리거를 적용한 gsap 타임라인을 생성하고 실행함.
      gsap.timeline({
        scrollTrigger: {
          trigger: ".food-section",
          start: "top top",
          pin: true,
          toggleClass: {
            targets: 'body',
            className: 'sticky-section'
          }
        }
      })

      // .accommodation-section 요소에 스크롤 트리거를 적용한 gsap 타임라인을 생성하고 실행함.
      gsap.timeline({
        scrollTrigger: {
          trigger: ".accommodation-section",
          start: "+=300px top",
          pin: true,
          toggleClass: {
            targets: 'body',
            className: 'sticky-section'
          }
        }
      })
  
  }

/**********************************************************************/


 // foodMotion 함수를 선언. 이 함수는 food 섹션의 애니메이션을 처리함.
  const foodMotion = () => {

    // 스크롤 위치에 따라 애니메이션을 실행하는 gsap 타임라인 객체를 생성함.
    const pathDraw2 = gsap.timeline({
      scrollTrigger: {
        // 스크롤 트리거가 작동하는 요소를 지정함.
        trigger: ".food-section",
        // 스크롤 트리거가 작동하는 시작 지점을 지정함.
        start: "-=100px top",
        // 스크롤 위치에 따라 타임라인의 동작을 지정함.
        toggleActions: "restart none none reverse",
      }
    });

    // pathDraw2 타임라인에 애니메이션을 추가함.
    pathDraw2   
      // .rect1 요소의 높이를 0에서 396으로 변경하는 애니메이션을 추가함.
      .fromTo('.food-path2 .rect1', { height: 0 }, { height: 396, duration: .5, ease: 'none'})
      // path 요소의 strokeDasharray를 변경하는 애니메이션을 추가함.
      .fromTo('.food-path2 path', { strokeDashoffset: 0,  strokeDasharray: "0, 9999px"}, { strokeDashoffset: 0,  strokeDasharray: "1060px, 9999px", duration: .5, ease: 'none' })
      // .rect2 요소의 너비를 0에서 2000으로 변경하는 애니메이션을 추가함.
      .fromTo('.food-path2 .rect2', { width: 0 }, { width: 2000, ease: 'none', duration: 1 })
      
  }


/**********************************************************************/

// accommodationMotion 함수를 선언. 이 함수는 accommodation 섹션의 애니메이션을 처리함.
  const accommodationMotion = () => {

    // 스크롤 위치에 따라 애니메이션을 실행하는 gsap 타임라인 객체를 생성함.
    const pathDraw1 = gsap.timeline({
      scrollTrigger: {
        // 스크롤 트리거가 작동하는 요소를 지정함.
        trigger: ".accommodation-section",
        // 스크롤 트리거가 작동하는 시작 지점을 지정함.
        start: "-=200px top",
        // 스크롤 위치에 따라 타임라인의 동작을 지정함.
        toggleActions: "restart none none reverse",
      }
    });

    // 스크롤 위치에 따라 텍스트 이동 애니메이션을 실행하는 gsap 타임라인 객체를 생성함.
    const txtMove = gsap.timeline({
      scrollTrigger: {
        trigger: ".accommodation-section",
        start: "top top",
        end: '+=100px',
        scrub: 1.5, 
      }
    });

    // 스크롤 위치에 따라 시각적 스케일 애니메이션을 실행하는 gsap 타임라인 객체를 생성함.
    const visualScale = gsap.timeline({
      scrollTrigger: {
        trigger: ".accommodation-section .visual-wrap",
        start: "-=100px top",
        toggleActions: "restart none none reverse",
      }
    });

    // txtMove 타임라인에 텍스트 이동 애니메이션을 추가함.
    txtMove
      .fromTo('.accommodation-section .title-wrap .txt', { y: 150 }, { y: 0, duration: 1, ease: 'circ.out', delay: 1 })

    // pathDraw1 타임라인에 애니메이션을 추가함.
    pathDraw1   
    // .rect1 요소의 높이를 0에서 501로 변경하는 애니메이션을 추가함.
      .fromTo('.accommodation-path1 .rect1', { height: 0 }, { height: 501, duration: .5, ease: 'none' })
      // path 요소의 strokeDasharray를 변경하는 애니메이션을 추가함.
      .fromTo('.accommodation-path1 path', { strokeDashoffset: 0,  strokeDasharray: "0, 9999px"}, { strokeDashoffset: 0,  strokeDasharray: "1060px, 9999px", duration: .5, ease: 'none' })
      // .rect2 요소의 너비를 0에서 2000으로 변경하는 애니메이션을 추가함.
      .fromTo('.accommodation-path1 .rect2', { width: 0 }, { width: 2000, duration: .5, ease: 'none'  })
      // .accommodation-path2 요소의 높이를 0에서 1500으로 변경하는 애니메이션을 추가함.
      .fromTo('.accommodation-path2', { height: 0 }, { height: 1500, duration: 1, ease: 'none' })

    // visualScale 타임라인에 애니메이션을 추가함.
    visualScale
    // .visual-wrap 요소의 너비를 50%에서 100%로 변경하는 애니메이션을 추가함.
      .fromTo('.accommodation-section .visual-wrap', { width: '50%'}, { width: '100%', ease: 'circ.inOut', duration: .5, transformOrigin: '50% 50%' })
      // .visual 요소의 크기(scale)를 1.2에서 1로 변경하는 애니메이션을 추가함.
      .fromTo('.accommodation-section .visual-wrap .visual', { scale: 1.2}, { scale: 1, duration: 1, ease: 'expo.out', transformOrigin: '50% 50%' })
        

      // 스크롤 위치에 따라 콘텐츠 텍스트 이동 애니메이션을 실행하는 gsap 타임라인 객체를 생성함.
      const contentTxtMove = gsap.timeline({
        scrollTrigger: {
          trigger: ".accommodation-section",
          start: "+=500px top",
          toggleActions: "restart none none reverse",
        }
      });

      // 스크롤 위치에 따라 콘텐츠 이동 애니메이션을 실행하는 gsap 타임라인 객체를 생성함.
      const contentMove = gsap.timeline({
        scrollTrigger: {
          trigger: ".accommodation-section",
          start: "+=500px top",
          toggleActions: "restart none none reverse",
        }
      });

      // contentTxtMove 타임라인에 콘텐츠 텍스트 이동 애니메이션을 추가함.
      contentTxtMove
        .fromTo('.accommodation-section .cont-wrap .txt-line .txt', { y: 150 }, { y: 0, duration: .5, ease: 'circ.out' })
      
      // contentMove 타임라인에 콘텐츠 이동 애니메이션을 추가함.  
      contentMove
        .fromTo('.accommodation-section .cont-wrap .body .item', { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: .005, ease: 'none' })  


  }

/**********************************************************************/

  // hotelMotion 함수를 선언. 이 함수는 hotel 섹션의 애니메이션을 처리함.
  const hotelMotion = () => {
    // 스크롤 위치에 따라 애니메이션을 실행하는 gsap 타임라인 객체를 생성함.
    const pathDraw1 = gsap.timeline({
      scrollTrigger: {
        // 스크롤 트리거가 작동하는 요소를 지정함.
        trigger: ".hotel-section",
        // 스크롤 트리거가 작동하는 시작 지점을 지정함.
        start: "-=1000px top",
        // 스크롤 위치에 따라 타임라인의 동작을 지정함.
        toggleActions: "restart none none reverse",
      }
    });

    // 스크롤 위치에 따라 다른 애니메이션을 실행하는 또 다른 gsap 타임라인 객체를 생성함.
    const pathDraw2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".hotel-section",
        start: "-=300px top",
        toggleActions: "restart none none reverse",
      }
    });

    // pathDraw1 타임라인에 애니메이션을 추가함.
    pathDraw1
      .fromTo('.hotel-path1', { width: 0 }, { width: '100%', duration: .8, ease: 'none' })

    // pathDraw2 타임라인에 애니메이션을 추가함.
    pathDraw2
      .fromTo('.hotel-path2', { width: 0 }, { width: '100%', duration: .8, ease: 'none' })

  }

/**********************************************************************/

// tourMotion 함수를 선언. 이 함수는 tour 섹션의 애니메이션을 처리함.
  const tourMotion = () => {
    // 스크롤 위치에 따라 애니메이션을 실행하는 gsap 타임라인 객체를 생성함.
    const pathDraw1 = gsap.timeline({
      scrollTrigger: {
        // 스크롤 트리거가 작동하는 요소를 지정함.
        trigger: ".tour-section",
        // 스크롤 트리거가 작동하는 시작 지점을 지정함.
        start: "-=600px top",
        // 스크롤 위치에 따라 타임라인의 동작을 지정함.
        toggleActions: "restart none none reverse",
      }
    });

    // 스크롤 위치에 따라 다른 애니메이션을 실행하는 또 다른 gsap 타임라인 객체를 생성함.
    const pathDraw2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".tour-section",
        start: "-=600px top",
        toggleActions: "restart none none reverse", 
      }
    });

    // 스크롤 위치에 따라 또 다른 애니메이션을 실행하는 gsap 타임라인 객체를 생성함.
    const pathDraw3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".tour-section",
        start: "+=400px top",
        toggleActions: "restart none none reverse",
      }
    });

    // pathDraw1 타임라인에 애니메이션을 추가함.
    pathDraw1
      .fromTo('.tour-path1', { height: 0 }, { height: 201, duration: .5, ease: 'none' })
      .fromTo('.tour-path3', { width: 0 }, { width: '100%', duration: .7, ease: 'none' })
    
    // pathDraw2 타임라인에 애니메이션을 추가함.
    pathDraw2
      .fromTo('.tour-path2', { height: 0 }, { height: 1850, duration: 1, ease: 'none', delay: 1.5 }) 
    
    // pathDraw3 타임라인에 애니메이션을 추가함.
    pathDraw3
      .fromTo('.sns-path1', { width: 0 }, { width: '100%', duration: .5, ease: 'none' })
      .fromTo('.sns-path3 rect', { width: 0 }, { width: 141, duration: .5, ease: 'none' })
      .fromTo('.sns-path2', { height: 0 }, { height: 700, duration: .5, ease: 'none' })
      .fromTo('.sns-path4 rect', { width: 0 }, { width: 141, duration: .5, ease: 'none' }) 
  }

/**********************************************************************/

// foodSwiper 함수를 선언. 이 함수는 food-swiper 섹션의 슬라이드 애니메이션을 처리함.
  const foodSwiper = () => {
    // DOM 요소를 선택하여 변수에 할당함.
    const $swiperWrapper = document.querySelector(".food-swiper .swiper-wrapper");
    const $lastSwiperSlide = document.querySelector(".food-swiper .swiper-slide:last-of-type");
    const $btnNext = document.querySelector('.food-info .btn-arrow.next');
    const $btnPrev = document.querySelector('.food-info .btn-arrow.prev');

    // Swiper 객체를 생성.
    const swiper = new Swiper(".food-swiper", {
      loop: true, // 슬라이드가 끝난 후 처음으로 돌아가는 옵션을 활성화.
      loopAdditionalSlides: 1, // 추가 슬라이드 갯수를 설정.
      observer: true, // swiper-slide의 변경 사항을 감지.
      observeParents: true, // swiper-container의 변경 사항을 감지.
      watchSlidesProgress: true, // 슬라이드 진행 상황을 감시.
      slidesPerView: 'auto', // 한 화면에서 보여줄 슬라이드 갯수를 자동으로 설정.
      initialSlide: 0, // 초기 슬라이드 인덱스를 설정.
      spaceBetween: 40, // 슬라이드 사이의 간격을 설정.
      slidesOffsetAfter: $swiperWrapper.clientWidth - 40, // 마지막 슬라이드 이후의 간격을 설정.
    });

    
    // 이전 버튼을 클릭하면 이전 슬라이드로 이동하는 이벤트를 추가.
    $btnPrev.addEventListener('click', () => swiper.slidePrev());
    // 다음 버튼을 클릭하면 다음 슬라이드로 이동하는 이벤트를 추가.
    $btnNext.addEventListener('click', () => swiper.slideNext());

    // 슬라이드 항목을 선택하여 변수에 할당.
    const $slideItems = document.querySelectorAll('.food-swiper .food-slide');
    
    
    // 각 슬라이드 항목에 대해 마우스 오버 이벤트와 마우스 아웃 이벤트를 추가.
    $slideItems.forEach((item) => {
      
      // 마우스 오버 이벤트를 추가함.
      item.addEventListener('mouseenter', (e) => {
         // 현재 슬라이드의 인덱스를 가져옴.
        const idx = e.currentTarget.dataset.index;
        // gsap 타임라인 객체를 생성함.
        const playAction = gsap.timeline();
        // playAction 타임라인에 애니메이션을 추가함.
        playAction
          .addLabel('a')
          .to(`.food-swiper .food-slide${idx} .img-wrap`, { y: -200, duration: 1, ease: 'elastic.out(1.2,1)' }, 'a')
          .to(`.food-swiper .food-slide${idx} .img-wrap .img-off`, { y: -600, duration: .5 }, 'a')
          .to(`.food-swiper .food-slide${idx} .img-wrap .img-on`, { y: -400, duration: .5 }, 'a')
          .to(`.food-swiper .food-slide${idx} .info-wrap`, { top: 430 }, 'a')
          .to(`.food-swiper .food-slide${idx} .info-wrap .name`, { scale: 1, duration: .3 }, 'a+=.1')
          .to(`.food-swiper .food-slide${idx} .info-wrap .eng-name`, { autoAlpha: 1, duration: .3 }, 'a+=.1')
        
      });

      // 마우스 아웃 이벤트를 추가함.
      item.addEventListener('mouseleave', (e) => {
        // 현재 슬라이드의 인덱스를 가져옴.
        const idx = e.currentTarget.dataset.index;
        // gsap 타임라인 객체를 생성함.
        const reverseAction = gsap.timeline();
        // reverseAction 타임라인에 애니메이션을 추가함.
        reverseAction
          .addLabel('b')
          .to(`.food-swiper .food-slide .img-wrap`, { y: 0, duration: 1, ease: 'elastic.out(1.2,1)' }, 'b')
          .to(`.food-swiper .food-slide .img-wrap .img-off`, { y: 0, duration: .5 }, 'b')
          .to(`.food-swiper .food-slide .img-wrap .img-on`, { y: 0, duration: .5 }, 'b')
          .to(`.food-swiper .food-slide .info-wrap`, { top: 600 }, 'b')
          .to(`.food-swiper .food-slide .info-wrap .name`, { scale: .9, duration: .3 }, 'b+=.1')
          .to(`.food-swiper .food-slide .info-wrap .eng-name`, { autoAlpha: 0, duration: .3 }, 'b+=.1')
      });
    });

  }

/**********************************************************************/

// hotelSwiper 함수를 선언. 이 함수는 hotel-swiper 섹션의 슬라이드 애니메이션을 처리함.
  const hotelSwiper = () => {
    
    // Swiper 객체를 생성.
    const swiper = new Swiper(".hotel-swiper", {
      loop: true, // 슬라이드가 끝난 후 처음으로 돌아가는 옵션을 활성화.
      loopAdditionalSlides: 1, // 추가 슬라이드 갯수를 설정.
      observer: true, // swiper-slide의 변경 사항을 감지.
      observeParents: true, // swiper-container의 변경 사항을 감지.
      watchSlidesProgress: true, // 슬라이드 진행 상황을 감시.
      slidesPerView: 'auto', // 한 화면에서 보여줄 슬라이드 갯수를 자동으로 설정.
      allowTouchMove: false, // 터치 슬라이드를 비활성화.
      initialSlide: 0, // 초기 슬라이드 인덱스를 설정.
      spaceBetween: 40, // 슬라이드 사이의 간격을 설정.
      speed: 3000, // 슬라이드 속도를 설정.
      autoplay: {
        delay: 0, // 자동 재생 시 딜레이 시간을 설정.
        disableOnInteraction: false, // 사용자의 스와이프 동작 후 자동 재생을 계속 진행.
      },
    });

  }


  /**********************************************************************/

  // tourSiwper 함수를 선언. 이 함수는 tour-swiper 섹션의 슬라이드 애니메이션을 처리함.
  const tourSiwper = () => {

    // DOM 요소를 선택하여 변수에 할당.
    const $swiperWrapper = document.querySelector(".tour-swiper .swiper-wrapper");
    const $lastSwiperSlide = document.querySelector(".tour-swiper .swiper-slide:last-of-type");
    const $btnNext = document.querySelector('.tour-section .top-section .title-box .btn-arrow.next');
    const $btnPrev = document.querySelector('.tour-section .top-section .title-box .btn-arrow.prev');
    
    // Swiper 객체를 생성.
    const swiper = new Swiper(".tour-swiper", {
      loop: true, // 슬라이드가 끝난 후 처음으로 돌아가는 옵션을 활성화.
      loopAdditionalSlides: 1, // 추가 슬라이드 갯수를 설정.
      direction: 'vertical', // 슬라이드 방향을 수직으로 설정.
      observer: true, // swiper-slide의 변경 사항을 감지.
      observeParents: true, // swiper-container의 변경 사항을 감지.
      watchSlidesProgress: true, // 슬라이드 진행 상황을 감시.
      slidesPerView: 'auto', // 한 화면에서 보여줄 슬라이드 갯수를 자동으로 설정.
      allowTouchMove: true, // 터치 슬라이드를 활성화.
      initialSlide: 0, // 초기 슬라이드 인덱스를 설정.
      spaceBetween: 30, // 슬라이드 사이의 간격을 설정. 
      slidesOffsetAfter: $swiperWrapper.clientWidth - $lastSwiperSlide.clientWidth, // 마지막 슬라이드 이후의 간격을 설정.
    });

    
    // 이전 버튼을 클릭하면 이전 슬라이드로 이동하는 이벤트를 추가.
    $btnPrev.addEventListener('click', () => swiper.slidePrev())
    // 다음 버튼을 클릭하면 다음 슬라이드로 이동하는 이벤트를 추가.
    $btnNext.addEventListener('click', () => swiper.slideNext())

  }


  /**********************************************************************/

  // snsSiwper 함수를 선언. 이 함수는 sns-swiper 섹션의 슬라이드 애니메이션을 처리.
  const snsSiwper = () => {

    // DOM 요소를 선택하여 변수에 할당.
    const $swiperWrapper = document.querySelector(".sns-swiper .swiper-wrapper");
    const $lastSwiperSlide = document.querySelector(".sns-swiper .swiper-slide:last-of-type");
    const $btnNext = document.querySelector('.tour-section .bot-section .btn-arrow.next');
    const $btnPrev = document.querySelector('.tour-section .bot-section .btn-arrow.prev');
    
    // Swiper 객체를 생성.
    const swiper = new Swiper(".sns-swiper", {
      loop: true, // 슬라이드가 끝난 후 처음으로 돌아가는 옵션을 활성화.
      loopAdditionalSlides: 1, // 추가 슬라이드 갯수를 설정.
      observer: true, // swiper-slide의 변경 사항을 감지.
      observeParents: true, // swiper-container의 변경 사항을 감지.
      watchSlidesProgress: true, // 슬라이드 진행 상황을 감시.
      slidesPerView: 'auto', // 한 화면에서 보여줄 슬라이드 갯수를 자동으로 설정.
      allowTouchMove: false, // 터치 슬라이드를 비활성화.
      initialSlide: 0, // 초기 슬라이드 인덱스를 설정.
      spaceBetween: 20,  // 슬라이드 사이의 간격을 설정.
      speed: 3000, // 슬라이드 속도를 설정.
      autoplay: {
        delay: 0, // 자동 재생 시 딜레이 시간을 설정.
        disableOnInteraction: false,  // 사용자의 스와이프 동작 후 자동 재생을 계속 진행.
      },
    });

    
    // 이전 버튼을 클릭하면 이전 슬라이드로 이동하는 이벤트를 추가함.
    $btnPrev.addEventListener('click', () => swiper.slidePrev())
        // 다음 버튼을 클릭하면 다음 슬라이드로 이동하는 이벤트를 추가함.
    $btnNext.addEventListener('click', () => swiper.slideNext())

  }

  /**********************************************************************/


  // quickmenu 함수를 선언합니다. 이 함수는 quick-wrap 섹션의 애니메이션을 처리함.
  const quickmenu = () => {

    // DOM 요소를 선택하여 변수에 할당.
    const $btn = document.querySelector('.quick-wrap .btn-quick');
    const $airplane = document.querySelector('.quick-wrap .airplane');
    
    // 버튼에 마우스 오버 이벤트를 추가함.
    $btn.addEventListener('mouseenter', () => {
      // gsap 타임라인 객체를 생성함.
      const tl = gsap.timeline();
      // tl 타임라인에 애니메이션을 추가함.
      tl
        .to($airplane, { top: -20, left: 70, duration: .5, ease: 'circ.out' }) // $airplane 요소의 위치를 변경하는 애니메이션을 추가함.
        .to('.quick-wrap .btn-txt', { autoAlpha: 1, duration: .5 }, '> -.5')  // .btn-txt 요소의 투명도를 변경하는 애니메이션을 추가함.
    });
    // 버튼에 마우스 아웃 이벤트를 추가함.
    $btn.addEventListener('mouseleave', () => {
      // gsap 타임라인 객체를 생성합니다.
      const tl = gsap.timeline();
      // tl 타임라인에 애니메이션을 추가함.
      tl
        .to('.quick-wrap .btn-txt', { autoAlpha: 0, duration: .5 }) // .btn-txt 요소의 투명도를 변경하는 애니메이션을 추가함.
        .fromTo($airplane, { top: 80, left: -60 }, { top: 20, left: 10, duration: .5, ease: 'circ.out' }, '> -.5') // $airplane 요소의 위치를 변경하는 애니메이션을 추가함.
        
    });
  }

  

  return {
    introMotion,
    foodMotion,
    accommodationMotion,
    hotelMotion,
    tourMotion,
    foodSwiper,
    hotelSwiper,
    tourSiwper,
    snsSiwper,
    quickmenu,


    init() {
      introMotion();
      foodMotion();
      accommodationMotion();
      hotelMotion();
      tourMotion();
      foodSwiper();
      hotelSwiper();
      tourSiwper();
      snsSiwper();
      quickmenu();


    },
  }
}(window, document);

window.addEventListener('DOMContentLoaded', function () {
  UI.init();
});

