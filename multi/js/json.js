jQuery(function ($) {
    'use strict';
    //indexe.html

    //member.html
    function memberPhotoItem(item) {
        return `
        <label for="${item.name_en}" class="calculus-item ${item.job} col-md-3 col-xs-6 col-sm-4">
            <div class="calculus-item-inner" >
                <img class="img-responsive" src="images/members/${item.job}/${item.name_zh}.jpg">
                <div class="calculus-info">
                    <h3>${item.name_zh}</h3>${item.job_title}
                    <a class="preview fa fa-eye"></a>
                </div>
            </div>
        </label>`
    }

    function memberInfoItem(item) {
        function experienceInfoItem(item) {
            var count_key = Object.keys(item.experience).length
            var count_value = Object.values(item.experience)
            var experienceArray = []
            for (var i = 0; i < count_key; i++) {
                experienceArray += '<li>' + count_value[i] + '</li>'
            }
            return experienceArray
        }

        function courseInfoItem(item) {
            var count_key = Object.keys(item.course).length
            var count_value = Object.values(item.course)
            var courseArray = []
            for (var i = 0; i < count_key; i++) {
                courseArray += '<li>' + count_value[i] + '</li>'
            }
            return courseArray
        }

        function contactInfoItem(item) {
            var count_key = Object.keys(item.contact).length
            var count_value = Object.values(item.contact)
            var contactArray = []
            for (var i = 0; i < count_key; i++) {
                contactArray += '<li>' + count_value[i] + '</li>'
            }
            return contactArray
        }
    
        function researchInfoItem(item) {
            var count_key = Object.keys(item.research).length
            var count_value = Object.values(item.research)
            var researchArray = []
            for (var i = 0; i < count_key; i++) {
                researchArray += '<li>' + count_value[i] + '</li>'
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
            <input type="checkbox" id="${item.name_en}" class="popup__toggler" />
            <label class="popup__mask" for="${item.name_en}"></label>
            <div class="popup">
                <label class="popup__close" for="${item.name_en}"></label>
                <div class="popup__header">
                    <h1 class="popup__title">${item.name_zh} ${item.name_en}</h1>
                </div>
                <div class="popup__content">
                    <h2>${item.job_title}</h2>
                    <div class="row calculus_info">
                        <img class="img-responsive col-md-6" src="images/members/${item.job}/${item.name_zh}.jpg">
                        <div class="col-md-6">
                            <h3 class="fa fa-list">經歷</h3>${experienceInfoItem(item)}
                            <h3 class="fa fa-book"> 講授課程</h3>${courseInfoItem(item)}
                        </div>
                    </div>
                    <div class="row calculus_info">
                        <div class="col-md-4">
                            <h3 class="fa fa-book"> 聯絡資訊</h3>${contactInfoItem(item)}
                        </div>
                        <div class="col-md-4">
                            <h3 class="fa fa-book"> 研究領域</h3><br>${researchInfoItem(item)}
                        </div>
                        <div class="col-md-4">
                            <h3 class="fa fa-book"> 教學資源</h3>${teachInfoItem(item)}
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
    fetch('/json/member.json')
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