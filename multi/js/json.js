jQuery(function ($) {
    'use strict';
    //indexe.html

    //member.html
    function memberPhotoItem(item) {
        return `
		<div class="calculus-item ${item.job} col-md-3 col-xs-6 col-sm-4">
            <div class="calculus-item-inner" >
				<img class="img-responsive" src="images/members/${item.job}/${item.name_zh}.jpg">
                <div class="calculus-info">
                    <h3>${item.name_zh}</h3>${item.job_title}
					<a class="preview fa fa-eye" href="#${item.name_en}"></a>
                </div>
            </div>
        </div>`
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

        function researchInfoItem(item) {
            var count_key = Object.keys(item.research).length
            var count_value = Object.values(item.research)
            var researchArray = []
            for (var i = 0; i < count_key; i++) {
                researchArray += '<li>' + count_value[i] + '</li>'
            }
            return researchArray
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
		<div class="lightbox" id="${item.name_en}">
			<figure>
				<a href="#" class="close"></a>
				<figcaption>
				<h1>${item.name_zh} ${item.name_en}</h1>
                    <div class="container">
                        <div class="row">
                            <div class="calculus_info col-sm-6 col-xs-4 col-md-4">
                                <h2>${item.job_title}</h2>
                                <h3 class="fa fa-list"> 經歷</h3><br>${experienceInfoItem(item)}
                                <h3 class="fa fa-book"> 講授課程</h3><br>${courseInfoItem(item)}
                            </div>
                            <div class="calculus_info col-sm-6 col-xs-4 col-md-4">
                                <img class="img-responsive" src="images/members/${item.job}/${item.name_zh}.jpg">
                            </div>
                        </div>
                        <div class="row">
                            <div class="calculus_info col-sm-6 col-xs-4 col-md-4">
                                <h3 class="fa fa-book"> 研究領域</h3><br>${researchInfoItem(item)}
                            </div>
                            <div class="calculus_info col-sm-3 col-xs-5 col-md-2">
                                <h3 class="fa fa-book"> 聯絡資訊</h3><br>${contactInfoItem(item)}
                            </div>
                            <div class="calculus_info col-sm-3 col-xs-5 col-md-2">
                                <h3 class="fa fa-book"> 教學資源</h3><br>${teachInfoItem(item)}
                            </div>
                        </div>
                    </div>
				</figcaption>
			</figure>
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