/* ===== Logic for creating fake Select Boxes ===== */
$('.sel').each(function() {
    $(this).children('select').css('display', 'none');

    var $current = $(this);

    $(this).find('option').each(function(i) {
        if (i == 0) {
            $current.prepend($('<div>', {
                class: $current.attr('class').replace(/sel/g, 'sel__box')
            }));

            var placeholder = $(this).text();
            $current.prepend($('<span>', {
                class: $current.attr('class').replace(/sel/g, 'sel__placeholder'),
                text: placeholder,
                'data-placeholder': placeholder
            }));

            return;
        }

        $current.children('div').append($('<span>', {
            class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
            text: $(this).text()
        }));
    });
});

// Toggling the `.active` state on the `.sel`.
$('.sel').click(function() {
    $(this).toggleClass('active');
});

// Toggling the `.selected` state on the options.
$('.sel__box__options').click(function() {
    var txt = $(this).text();
    var index = $(this).index();

    $(this).siblings('.sel__box__options').removeClass('selected');
    $(this).addClass('selected');

    var $currentSel = $(this).closest('.sel');
    $currentSel.children('.sel__placeholder').text(txt);
    $currentSel.children('select').prop('selectedIndex', index + 1);
});


//sub_nav hover

const navbar = document.querySelector(".navbar-nav");

const handleMouseOver = (e)=>{
    // console.log(e.target);
    e.preventDefault();
    if(e.target.nodeName==="I"){
        let parent = e.target.parentNode;
        parent.childNodes[1].classList.add('sub_hover');
        parent.childNodes[3].classList.add('sub_hover');
    }else if(e.target.nodeName==="A"){
        let parent = e.target;
        parent.childNodes[1].classList.add('sub_hover');
        parent.childNodes[3].classList.add('sub_hover');
    }

}

const handleMouseLeave = (e)=>{
    e.preventDefault();
    // console.log(e.target);
    if(e.target.nodeName==="I"){
        let parent = e.target.parentNode;
        parent.childNodes[1].classList.remove('sub_hover');
        parent.childNodes[3].classList.remove('sub_hover');
    }else if(e.target.nodeName==="A"){
        let parent = e.target;
        parent.childNodes[1].classList.remove('sub_hover');
        parent.childNodes[3].classList.remove('sub_hover');
    }
}

navbar.addEventListener('mouseover',handleMouseOver);
navbar.addEventListener('mouseout',handleMouseLeave);

// weather
let d = new Date();
document.getElementById("day").innerHTML = d.getDate();

let month = new Array();
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "Aug";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";
document.getElementById("month").innerHTML = month[d.getMonth()];

const API_KEY = "da7b9e362cc4a89c83fcaff9aac6cc0e";

function getWeather(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const temp = document.querySelector('#temp');
            const icon = data.weather[0].icon;
            const icon_split = icon.substr(0,2);
            console.log(icon_split);

            const temp_info = parseInt(data.main.temp);

            temp.innerText = `${Math.ceil(temp_info)}˚`;

        //    날씨 그림
            let weatherI = {
              '01d' : 'wi wi-day-sunny',
              '02d' : 'wi wi-day-sunny-overcast',
              '03d' : 'wi wi-day-cloudy',
              '04d' : 'fas fa-cloud',
              '09d' : 'wi wi-day-showers',
              '10d' : 'wi wi-day-rain',
              '11d' : 'wi wi-day-lightning',
              '13d' : 'far fa-snowflake',
              '50d' : 'wi wi-day-fog',
              '01n' : 'wi wi-night-clear',
              '02n' : 'wi wi-night-partly-cloudy',
              '03n' : 'wi wi-night-cloudy',
              '04n' : 'fas fa-cloud',
              '09n' : 'wi wi-night-alt-showers',
              '10n' : 'wi wi-night-alt-rain',
              '11n' : 'wi wi-night-alt-lightning',
              '13n' : 'far fa-snowflake',
              '50n' : 'wi wi-night-fog',
            };

            const weatherIcon = document.querySelector(".weatherIcon");
            const i = document.createElement("i");
            i.setAttribute("class",weatherI[icon]);
            weatherIcon.appendChild(i);

            const comment = document.querySelector('#comment');

            if(icon_split === ('01' || '02' || '03')){
                comment.innerText = "거래하기 좋은 날입니다.";
            }else if(icon_split === ('09' || '10')){
                comment.innerText = "비가오니 우산을 챙기세요."
            }else if(icon_split === ('04' || '50')){
                comment.innerText = "구름이 끼어 흐립니다."
            }else if(icon_split === ('13')) {
                comment.innerText = "눈길 조심하세요."
            }else if(icon_split === ('11')) {
                comment.innerText = "벼락 조심하세요."
            }else {
                comment.innerText = "위치를 찾을 수 없습니다."
            }
        });
}

function onGeoError(){
    document.querySelector('#comment').innerText = "위치를 찾을 수 없습니다.";
}

navigator.geolocation.getCurrentPosition(getWeather, onGeoError);











