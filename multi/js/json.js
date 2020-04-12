jQuery(function ($) {
    'use strict';
    //indexe.html

    //member.html
    function memberPhotoItem(item) {
        return `
        <label for="${item.gsx$nameen.$t}" class="calculus-item ${item.gsx$job.$t} col-md-3 col-xs-6 col-sm-4">
            <div class="calculus-item-inner" >
                <img class="img-responsive" src="images/members/${item.gsx$job.$t}/${item.gsx$namezh.$t}.jpg" onerror="javascript: src='../images/members/男生頭像.png'">
                <div class="calculus-info">
                    <h3>${item.gsx$namezh.$t}</h3>${item.gsx$jobtitle.$t}
                    <a class="preview fa fa-eye"></a>
                </div>
            </div>
        </label>`
    }

    function memberInfoItem(item) {
        /*function experienceInfoItem(item) {
            var count_key = Object.keys(item.experience).length
            var count_value = Object.values(item.experience)
            var experienceArray = []
            for (var i = 0; i < count_key; i++) {
                experienceArray += '<li>' + count_value[i] + '</li>'
            }
            return experienceArray
        }*/

        function courseInfoItem(item) {
            var list = [item.gsx$course1.$t, item.gsx$course2.$t, item.gsx$course3.$t, item.gsx$course4.$t, item.gsx$course5.$t]
            var courseArray = []
            for (var i = 0; i < 5; i++) {
                if (list[i] == "") continue;
                courseArray += '<li>' + list[i] + '</li>'
            }
            return courseArray
        }

        function contactInfoItem(item) {
            var list = [item.gsx$mail.$t, item.gsx$room.$t, item.gsx$phone.$t]
            var contactArray = []
            for (var i = 0; i < list.length; i++) {
                if (list[i] == "") continue;
                contactArray += '<li>' + list[i] + '</li>';
            }
            return contactArray
        }

        function researchInfoItem(item) {
            var list = [item.gsx$research1.$t, item.gsx$research2.$t, item.gsx$research3.$t]
            var researchArray = []
            for (var i = 0; i < list.length; i++) {
                if (list[i] == "") continue;
                researchArray += '<li>' + list[i] + '</li>'
            }
            return researchArray
        }

        function teachInfoItem(item) {
            var count_key = Object.keys(item.teach).length
            var count_value = Object.values(item.teach)
            var teachArray = []
            for (var i = 0; i < count_key; i++) {
                teachArray += '<li>' + count_value[i] + '</li>'
            }
            return teachArray
        }
        return `
        <div class="popup__container">
            <input type="checkbox" id="${item.gsx$nameen.$t}" class="popup__toggler" />
            <label class="popup__mask" for="${item.gsx$nameen.$t}"></label>
            <div class="popup">
                <label class="popup__close" for="${item.gsx$nameen.$t}"></label>
                <div class="popup__header">
                    <h1 class="popup__title">${item.gsx$namezh.$t} ${item.gsx$nameen.$t}</h1>
                </div>
                <div class="popup__content">
                    <h2>${item.gsx$jobtitle.$t}</h2>
                    <div class="row calculus_info">
                        <img class="img-responsive col-md-6" src="images/members/${item.gsx$job.$t}/${item.gsx$namezh.$t}.jpg" onerror="javascript: src='../images/members/男生頭像.png'">
                        <div class="col-md-6">
                            <h3 class="fa fa-list"> 經歷</h3><br>
                            <h3 class="fa fa-book"> 講授課程</h3>${courseInfoItem(item)}
                        </div>
                    </div>
                    <div class="row calculus_info">
                        <div class="col-md-4">
                            <h3 class="fa fa-phone"> 聯絡資訊</h3>${contactInfoItem(item)}
                        </div>
                        <div class="col-md-4">
                            <h3 class="fa fa-book"> 研究領域</h3><br>${researchInfoItem(item)}
                        </div>
                        <div class="col-md-4">
                            <h3 class="fa fa-book"> 教學資源</h3>
                        </div>
                    </div>
                    <div>
                        <h3>科技部研究案</h3>
                        <h3>期刊論文</h3>
                        <h3>會議論文</h3>
                    </div>
                </div>
            </div>
        </div>`
    }
    let JSON_url = '../json/member.json'
    fetch(JSON_url)
        .then(function (response) {
            return response.json()
        })
        .then(function (memberInfo) {
            var wrapperphoto = document.getElementById('memberPhoto')
            var wrapperInfo = document.getElementById('memberInfo')
            memberInfo.forEach(function (response) {
                wrapperphoto.innerHTML += memberPhotoItem(response)
                wrapperInfo.innerHTML += memberInfoItem(response)
            })
        });
});