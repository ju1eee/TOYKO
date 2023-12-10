

   
// '#dynamic-placeholder' 셀렉터에 해당하는 요소를 선택.
var input = document.querySelector('#dynamic-placeholder');
// placeholder로 보여줄 텍스트 배열을 선언.
var placeholders = ['디즈니랜드 최저가', '도쿄 숙소 추천', '맛집 리스트', '여행 코스 추천'];
// placeholders 배열의 인덱스를 관리하는 변수를 선언.
var i = 0;

var placeholder = document.createElement('div'); // 새로운 div 요소를 생성.
placeholder.style.position = 'absolute'; // placeholder 요소의 CSS position 속성을 'absolute'로 설정.
placeholder.style.top = '0'; // placeholder 요소의 CSS top 속성을 '0'으로 설정.
placeholder.style.left = '0'; // placeholder 요소의 CSS left 속성을 '0'으로 설정.
placeholder.style.transition = 'opacity 0.5s'; // placeholder 요소의 CSS transition 속성을 'opacity 0.5s'로 설정.
placeholder.style.fontSize = '24px'; // placeholder 요소의 CSS fontSize 속성을 '24px'로 설정.
placeholder.style.padding = '28px'; // placeholder 요소의 CSS padding 속성을 '28px'로 설정.
placeholder.style.width = 'calc(100% - 80px)'; // placeholder 요소의 CSS width 속성을 'calc(100% - 80px)'로 설정.
placeholder.style.height = '100%'; // placeholder 요소의 CSS height 속성을 '100%'로 설정.

input.style.position = 'relative'; // input 요소의 CSS position 속성을 'relative'로 설정.

input.parentNode.insertBefore(placeholder, input); // input 요소의 부모 노드에 placeholder 요소를 input 요소 앞에 삽입.


// 특정 텍스트를 타이핑하는 함수를 선언함. onComplete는 타이핑이 끝난 후 실행될 콜백 함수임.
function typeText(text, onComplete) {
    var j = 0;
    // 일정 시간마다 텍스트를 하나씩 타이핑.
    var timer = setInterval(function() {
        placeholder.textContent += text[j++];
        // 텍스트를 모두 타이핑한 경우, 타이머를 중지하고 콜백 함수를 실행.
        if (j >= text.length) {
            clearInterval(timer);
            onComplete();
        }
    }, 100); 
}

// 텍스트를 하나씩 삭제하는 함수를 선언함. onComplete는 삭제가 끝난 후 실행될 콜백 함수임.
function deleteText(onComplete) {
    var timer = setInterval(function() {
        placeholder.textContent = placeholder.textContent.slice(0, -1);
        // 텍스트를 모두 삭제한 경우, 타이머를 중지하고 콜백 함수를 실행.
        if (placeholder.textContent.length === 0) {
            clearInterval(timer);
            onComplete();
        }
    }, 100);
}

// placeholder를 바꾸는 함수를 선언.
function changePlaceholder() {
    placeholder.style.opacity = '0'; // placeholder 요소의 opacity를 0으로 변경하여 투명하게 만듬.
    setTimeout(function () {
        var text = placeholders[i++ % placeholders.length]; // placeholders 배열에서 순서대로 텍스트를 가져옴.
        placeholder.textContent = ''; // placeholder 요소의 텍스트를 비움.
        placeholder.style.opacity = '';  // placeholder 요소의 opacity를 원래대로 복구함.
        // 가져온 텍스트를 타이핑합니다. 타이핑이 끝난 후에는 일정 시간 후에 텍스트를 삭제함.
        typeText(text, function() {
            setTimeout(function() {
                deleteText(function() {});
            }, 2000); 
        });
    }, 500);
}

changePlaceholder(); // 첫 placeholder를 변경.
setInterval(changePlaceholder, 5000);  // 5초마다 placeholder를 변경.



/**********************************************************************/


$(document).ready(function () { // 문서가 준비되면 함수를 실행.
    $(".menu li").click(function () { // .menu li 요소를 클릭하면 함수를 실행.
        if ($(this).text() === "ISSUE") { // 클릭한 요소의 텍스트가 "ISSUE"인 경우
            $('html, body').animate({ // html, body 요소에 애니메이션을 적용.
                scrollTop: $(".visual-wrap").offset().top // 스크롤 위치를 .visual-wrap 요소의 상단으로 이동.
            }, 1000); // 애니메이션의 지속 시간을 1초로 설정.
        }

        else if ($(this).text() === "FOOD") { // 클릭한 요소의 텍스트가 "FOOD"인 경우
            $('html, body').animate({
                scrollTop: $(".food-section").offset().top // 스크롤 위치를 .food-section요소의 상단으로 이동.
            }, 1000); // 애니메이션의 지속 시간을 1초로 설정.
        }

        else if ($(this).text() === "ACCOMMODATION") {  // 클릭한 요소의 텍스트가 "ACCOMMODATION"인 경우
            $('html, body').animate({
                scrollTop: $(".cont-wrap").offset().top // 스크롤 위치를 .cont-section 요소의 상단으로 이동.
            }, 1000); // 애니메이션의 지속 시간을 1초로 설정.
        }

        else if ($(this).text() === "TOUR") { // 클릭한 요소의 텍스트가 "TOUR"인 경우
            $('html, body').animate({
                scrollTop: $(".tour-section").offset().top // 스크롤 위치를 .tour-section 요소의 상단으로 이동.
            }, 1000); // 애니메이션의 지속 시간을 1초로 설정.
        }

    });
});


window.onload = function() {
    var tokyoMap = document.querySelector('.tokyoMap');
    tokyoMap.style.opacity = '0';  // 이미지의 opacity 속성을 1로 변경하여 이미지를 서서히 보이게 합니다.

    setTimeout(function() {
        tokyoMap.style.opacity = '1';  // 2초 후에 이미지의 opacity 속성을 0으로 변경하여 이미지를 서서히 사라지게 합니다.
    }, 1000);
};

