var pages = ['index.html', 'contacts.html', 'support.html', 'dates.html', 'complex-table.html', 'simple-table.html', 'user-table.html', 'table-pages.html', 'different-elements.html', 'metals-colors.html', 'performance.html']
var num = -1;
var linum = -1;
var testLocArr = '';
var testLoc = '';

var data = {};
var sliderCheck = {};

$(document).ready(function () {
	getPageState();
	includeHeader();
	includeSideBar();
	initLeftNavMenu();
    checkLogin();
    if ($('.pagination')) {
		includePagination();
	}
	if ($('.right-side-bar')) {
		includeLogBar();
	}
	includeFooter()
    reformTitle('salad');


    $('html').click(function () {
        closeSearch();
        $('.salad ul').hide();
    });
    $('.metals input').val($('.metals select').val());
    $(':radio').bind('click', function (event) {
        var descr = (this.name == 'custom_radio_odd') ? 'Summary (Odd)' : '';
        descr = (this.name == 'custom_radio_even') ? 'Summary (Even)' : descr;
        logEvent(this, descr);
    });

    if ($('.uui-table.dynamic').length > 0) {
        var table = $('.uui-table.dynamic').DataTable();

        $('.uui-table.dynamic').on('length.dt', function (e, settings, len) {
            logDataTable('length, new value=' + len)
        });
        $('.uui-table.dynamic').on('draw.dt', function (e) {
            logDataTable('draw')
        });
        $('.uui-table.dynamic').on('search.dt', function (e, b) {
            logDataTable('search, search value=' + table.search())
        });
        $('.uui-table.dynamic').on('page.dt', function (e) {
            var info = table.page.info();
            logDataTable('page, ' + 'Showing page: ' + (info.page + 1) + ' of ' + info.pages)
        });
        $('.uui-table.dynamic').on('order.dt', function (e) {
            var order = table.order();

            logDataTable('order,' + ' Column ' + order[0][0] + ' sorted by ' + order[0][1])
        });
        var logDataTable = function (event) {

            if (event) {
                var item = '<li>' + getTimeString() + ' Datatable Events: ' + event + ' ' + '</li>';
                $('.logs').prepend(item);
            }

        }
    }
    $(document).on('click', '.seeMore', function () {
        logEvent(this);
    });
    $(document).on('click', ':checkbox', function () {
        logEvent(this);
    });
    $(':button').bind('click', function () {
        var text = (this.innerText) ? this.innerText.toLowerCase() : this.textContent.toLowerCase();
        if (!text)text = $(this).val().toLowerCase();

        if (text === 'calculate') {
            logEvent(this);
            calculateValue();
            return false;
        } else if (text === 'submit') {
            logEvent(this);
            data = {};
            submitForm();
            return false;
        } else if (text === 'enter') {
            login();
            return false;
        } else if (text === 'logout') {
            logout();
            return false;
        } else if (text === 'default button') {
            logEvent(this);
            return false;
        } else if (text === 'button') {
            logEvent(this);
            return false;
        } else if (text === 'reestablish') {
            reestablish();
            logEvent(this);
            return false;
        } else if (text === 'apply') {
            deleteColumn();
            logEvent(this);
            return false;
        }
    });
    deleteColumn();
    function deleteColumn() {
        var valuesForShow = $('#columns select').val();
        if (!window.Columns) {
            var columnsHeader = $('.table-delete>thead>tr>th');
            var columns = [];
            $('.table-delete-body tr').each(function (i, obj) {
                columns.push($(this).find('td'));
            });
            var columnsFooter = $('.table-delete>tfoot>tr>th');
            window.Columns = {
                columnsHeader: columnsHeader,
                columns: columns,
                columnsFooter: columnsFooter
            }
        } else {
            appendAll()
        }

        var valuesForRemove = ['Column 1', 'Column 2', 'Column 3'];
        if (valuesForShow && valuesForShow.length > 0) {
            $.each(valuesForShow, function (i, obj) {
                var index = valuesForRemove.indexOf(obj);
                if (index > -1) {
                    valuesForRemove.splice(index, 1);
                }
            });
        }


        var arrayForRemove = [];
        $.each(valuesForRemove, function (i, obj) {
            var optId = 0;
            if (obj == 'Column 1')  optId = 1;
            if (obj == 'Column 2')  optId = 2;
            if (obj == 'Column 3')  optId = 3;

            $('.table-delete>thead>tr>th').each(function (index, obj) {
                if (index == optId) {
                    arrayForRemove.push($(obj));
                }
            });
            $('.table-delete-body>tbody>tr').each(function (i, obj) {
                arrayForRemove.push($($(this).find('td')[optId]));
            });

            $('.table-delete>tfoot>tr>th').each(function (index, obj) {
                if (index == optId) {
                    arrayForRemove.push($(obj));
                }
            });

        });


        $.each(arrayForRemove, function (i, remove) {
            remove.remove();
        });
    }

    function appendAll() {
        //$('.table-delete>thead>tr>th').remove();
        $.each(window.Columns.columnsHeader, function (i, th) {
            $('.table-delete>thead>tr').append(th);
        });
        $.each(window.Columns.columnsFooter, function (i, th) {
            $('.table-delete>tfoot>tr').append(th);
        });
        $.each(window.Columns.columns, function (i, tr) {
            // $($($('.table-delete-body tr')[i]).find('td')).remove();
            $($('.table-delete-body tr')[i]).append(tr);
        });
    }

    function reestablish() {
        $('#columns select').selectpicker('selectAll');
        appendAll();
    }

    $('td.title-col span').on('click', function () {

        $('.table-delete-body tr').removeClass('active');
        $(this).closest('tr').addClass('active');
        logEvent($(this).closest('tr')[0]);
    });
    $('.table-click tr').on('click', function (event) {
        $('.table-click tr').removeClass('active');
        $(this).addClass('active');

        logEvent(this);
    });
    $('.table-td-click tr td').on('click', function (event) {
        $('.table-td-click td').removeClass('active');
        $(this).addClass('active');

        logEvent(this);
    });
    $('#Name').bind('change', function () {
        logEvent(this);
    });
    $('#LastName').bind('change', function () {
        logEvent(this);
    });
    $('#Description').bind('change', function () {
        logEvent(this);
    });
    $('.colors select').bind('change', function () {
        logEvent(this, 'Colors');
    });
    $('#columns select').bind('change', function () {
        logEvent(this, 'Columns');
    });
    $('.metals select').bind('change', function () {
        $('.metals input').val($('.metals select').val());
        logEvent(this, 'Metals');
    });
    $('.metals input').bind('change', function () {
        logEvent(this, 'Metals');
    });
    $('#datepicker input').bind('change', function () {
        logEvent(this, 'Period');
    });
    $('#timepicker').bind('change', function () {
        logEvent(this, 'Time');
    });

    if ($('.range-from input').length === 2) {
        $($('.range-from input')[0]).bind('change', function () {
            logEvent(this, 'Range 1(From)');
        });
        $($('.range-from input')[1]).bind('change', function () {
            logEvent(this, 'Range 1(To)');
        });
    }
    $('.search > .icon-search').bind('click', function () {
        if ($('.search-active').hasClass('hidden')) {
            openSearch();
        }
    });
    $('.search').bind('click', function (event) {
        event.stopPropagation();
        if ($(event.target).hasClass('active') && $('.search input').val()) {
            location.href = pages[2];
        }
    });
    $('.uui-profile-menu a').bind('click', function () {
        $('.login-txt').addClass('hidden');
    });
    $('.salad').bind('click', function (event) {
        event.stopPropagation();
        reformTitle('salad');
        $('.salad ul').show();
    });
    if ($('.uui-slider.range').length > 0) {
        var pos = [20, 100];
        $('.uui-slider.range').slider({
                range: true,
                min: 0,
                max: 100,
                values: pos,
                slide: function (event, ui) {
                    $($('.uui-slider.range a span')[0]).text(ui.values[0]);
                    $($('.uui-slider.range a span')[1]).text(ui.values[1]);
                }
            }
        );
        $('.uui-slider.range a').each(function (index) {
            $(this).append('<span>' + pos[index] + '</span>');
        });
        $($('.uui-slider.range a')[0]).bind('mousedown', function () {
            sliderCheck['elem'] = this;
            sliderCheck['descr'] = 'Range 2(From)';
        });
        $($('.uui-slider.range a')[1]).bind('mousedown', function () {
            sliderCheck['elem'] = this;
            sliderCheck['descr'] = 'Range 2(To)';
        });
        $('html').bind('mouseup', function () {
            if (Object.keys(sliderCheck).length > 0) {
                logEvent(sliderCheck['elem'], sliderCheck['descr']);
                sliderCheck = {};
            }
        });

    }
    $('.fileinput a').bind('click', function () {
        $('input[type=file]').click();
        return false;
    });
    $('input[type=file]').bind('change', function () {
        $('.filename').removeClass('hidden');
        $('.filename span').text($('input[type=file]')[0].files[0].name)
        logEvent(this, 'FileUpload');
    });

});

function openSearch() {
    $('.search-active').removeClass('hidden');
    $('.search > .icon-search').addClass('hidden');
    $('.search-field input').focus();
}

function closeSearch() {
    $('.search-active').addClass('hidden');
    $('.search > .icon-search').removeClass('hidden');
}

function login() {
    if ($('input#Name').val() == 'epam' && $('input#Password').val() == '1234') {
        $.cookie('authUser', 'true');
        $('.login-txt').addClass('hidden');
        checkLogin();
    } else {
        $('.login-txt').removeClass('hidden');
    }
}

function logout() {
    $.cookie('authUser', null)
    checkLogin();
}

function checkLogin() {
    if ($.cookie('authUser') && $.cookie('authUser') != 'null') {
        $('.dropdown-menu-login form').addClass('hidden');
        $('.dropdown-menu-login .logout').removeClass('hidden');
        $('.profile-photo span').removeClass('hidden');
    } else {
        if (location.pathname.indexOf(pages[0]) < 0)
            location.href = pages[0];
        $('.dropdown-menu-login form').removeClass('hidden');
        $('.dropdown-menu-login .logout').addClass('hidden');
        $('.profile-photo span').addClass('hidden');
    }
    $('#Name').val('');
    $('#Password').val('');
}

function passwordFocus() {
    $('#Password').focus();
}

function reformTitle(cname) {
    if ($('.' + cname + ' button').length > 0) {
        var title = '';
        $('.' + cname + ' :checkbox:checked').each(function () {
            if (this.labels) {
                title += this.labels[0].innerText;
            } else {
                title += this.nextElementSibling.innerHTML;
            }
            title += ', ';
        });
        if (title.length > 0) title = title.substring(0, title.length - 2)
        title = '<span class="caret"></span>' + title;
        $('.' + cname + ' button').html(title);

    }
}
function getPageState() {	
    testLocArr = location.pathname.split('/');
    if (testLocArr.length > 0)
        testLoc = testLocArr[testLocArr.length - 1];
    else testLoc = location.pathname;
    num = pages.indexOf(testLoc);
    linum = (num < 2) ? num : num + 1;
}
function includeHeader() {
	var code = ' <div class="uui-header dark-gray">\
        <nav role="navigation">\
            <div class="sidebar-toggle-box blue" style="display: none;">\
                <div data-toggle="tooltip" data-placement="right" title="Toggle Navigation" class="sidebar-tooltip">\
                    <span class="fa fa-reorder"></span>\
                </div>\
            </div>\
            <div class="epam-logo">\
				<a href="/JDI/index.html">\
					<span>Information<br>Framework</span>\
					<img src="images/Logo_Epam_Color.svg" alt="ALT" id="epam_logo" width="86" />\
				</a>\
            </div>\
			<ul class="uui-navigation nav navbar-nav m-l8">\
                <li>\
                    <a href="index.html">Home</a>\
                </li>\
                <li>\
                    <a href="contacts.html">Contact form</a>\
                </li>\
                <li class="dropdown">\
                    <a class="dropdown-toggle" data-toggle="dropdown"> Service\
                        <span class="caret"></span>\
                    </a>\
                    <ul class="dropdown-menu" role="menu">\
                        <li><a href="support.html">Support</a></li>\
                        <li><a href="dates.html">Dates</a></li>\
                        <li><a href="complex-table.html">Complex Table </a></li>\
                        <li><a href="simple-table.html">Simple Table </a></li>\
                        <li><a href="user-table.html">User Table </a></li>\
                        <li><a href="table-pages.html">Table with pages</a></li>\
                        <li><a href="different-elements.html">Different elements</a></li>\
						<li><a href="performance.html">Performance</a></li>\
                    </ul>\
                </li>\
                <li>\
                    <a href="metals-colors.html">Metals & Colors</a>\
                </li>\
            </ul>\
            <ul class="uui-navigation navbar-nav navbar-right">\
                <li class="dropdown uui-profile-menu">\
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">\
                        <div class="profile-photo">\
                            <!--i class="fa fa-user"></i-->\
                            <img src="images/icons/user-icon.jpg" alt="" id="user-icon">\
                            <span ui="label">Piter Chailovskii</span>\
                        </div>\
                        <span class="caret"></span>\
                    </a>\
                    <div class="dropdown-menu dropdown-menu-login" role="menu">\
                        <form class="form-horizontal login hidden" id="login-form">\
                            <div class="form-horizontal-pad">\
                                <div class="form-group form-group10">\
                                    <label for="Name" class="col-sm-3">Login</label>\
                                    <div class="col-sm-9">\
                                        <input id="Name" type="text" class="uui-form-element">\
                                    </div>\
                                </div>\
                                <div class="form-group form-group10">\
                                    <label for="Password" class="col-sm-3">Password</label>\
                                    <div class="col-sm-9">\
                                        <input id="Password" type="password" class="uui-form-element">\
                                    </div>\
                                </div>\
                                <span class="login-txt hidden">* Login Faild</span>\
                            </div>\
                            <button type="submit" class="uui-button dark-blue btn-login"><i class="fa fa-sign-in"></i><span>Enter</span></button>\
                        </form>\
                        <div class="logout">\
                            <button type="submit" class="uui-button dark-blue btn-login"><i class="fa fa-sign-out"></i><span>Logout</span></button>\
                        </div>\
                    </div>\
                </li>\
            </ul>\
            <div class="search">\
                <span class="icon-search"></span>\
                <div class="search-active hidden">\
                    <span class="search-title">Search this Site</span>\
                    <span class="icon-search active"></span>\
                    <div class="search-field">\
                        <input type="text">\
                    </div>\
                </div>\
            </div>\
        </nav>\
    </div>';
	$('.replace.site-header').replaceWith(code);
}
function includeSideBar() {
	var code = '<div name="navigation-sidebar" class="uui-side-bar mCustomScrollbar _mCS_1 mCS_no_scrollbar" style="max-height: inherit; display: block;"><div id="mCSB_1" class="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside" tabindex="0" style="max-height: inherit;"><div id="mCSB_1_container" class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style="position:relative; top:0; left:0;" dir="ltr">\
        <ul class="sidebar-menu">\
            <li ui="label">\
                <a href="index.html">\
                    <span>Home</span>\
                </a>\
            </li>\
            <li ui="label">\
                <a href="contacts.html">\
                    <span>Contact form</span>\
                </a>\
            </li>\
            <li>\
                <a>\
                    <span>Service</span>\
                    <div class="fa fa-caret-down arrow"></div>\
                </a>\
                <ul class="sub" style="display: block;">\
                    <li ui="label">\
                        <a href="support.html">\
                            <p>\
                                <span>Support</span>\
                            </p>\
                        </a>\
                    </li>\
                    <li ui="label">\
                        <a href="dates.html">\
                            <p>\
                                <span>Dates</span>\
                            </p>\
                        </a>\
                    </li>\
                    <li ui="label"><a href="complex-table.html"><p>\
                        <span>Complex Table </span>\
                    </p></a></li>\
                    <li ui="label"><a href="simple-table.html"><p>\
                        <span>Simple Table</span>\
                    </p></a></li>\
                    <li ui="label"><a href="user-table.html"><p>\
                        <span>User Table</span>\
                    </p></a></li>\
                    <li ui="label"><a href="table-pages.html"><p>\
                        <span>Table with pages</span>\
                    </p></a></li>\
                    <li ui="label"><a href="different-elements.html"><p>\
                        <span>Different elements</span>\
                    </p></a></li>\
                    <li><a href="performance.html"><p>\
                        <span>Performance</span>\
                    </p></a></li>\
                </ul>\
            </li>\
            <li ui="label">\
                <a href="metals-colors.html">\
                    <span>Metals &amp; Colors</span>\
                </a>\
            </li>\
        </ul>\
    </div><div id="mCSB_1_scrollbar_vertical" class="mCSB_scrollTools mCSB_1_scrollbar mCS-light mCSB_scrollTools_vertical" style="display: none;"><div class="mCSB_draggerContainer"><div id="mCSB_1_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 30px; top: 0px; height: 0px;" oncontextmenu="return false;"><div class="mCSB_dragger_bar" style="line-height: 30px;"></div></div><div class="mCSB_draggerRail"></div></div></div></div></div>';
	$('.replace.left-side-bar').replaceWith(code);
}
function includeLogBar() {
	var code = '<div  name="log-sidebar" class="uui-side-bar right-fix-panel mCustomScrollbar _mCS_2 mCS_no_scrollbar"><div id="mCSB_2" class="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside" tabindex="0" style="max-height: inherit;"><div id="mCSB_2_container" class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style="position:relative; top:0; left:0;" dir="ltr">\
        <section class="uui-info-panel-horizontal">\
            <div class="info-panel-header">\
                Log\
            </div>\
            <div class="info-panel-body info-panel-body-log">\
                <div class="info-panel-section">\
                    <ul class="panel-body-list logs">\
                    </ul>\
                </div>\
            </div>\
        </section>\
        <section class="uui-info-panel-horizontal">\
            <div class="info-panel-header">\
                Result\
            </div>\
            <div class="info-panel-body info-panel-body-result">\
                <div class="info-panel-section">\
                    <ul class="panel-body-list results">\
                    </ul>\
                </div>\
            </div>\
        </section>\
    </div><div id="mCSB_2_scrollbar_vertical" class="mCSB_scrollTools mCSB_2_scrollbar mCS-light mCSB_scrollTools_vertical" style="display: none;"><div class="mCSB_draggerContainer"><div id="mCSB_2_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 30px; top: 0px; height: 0px;" oncontextmenu="return false;"><div class="mCSB_dragger_bar" style="line-height: 30px;"></div></div><div class="mCSB_draggerRail"></div></div></div></div></div>';
	$('.replace.right-side-bar').replaceWith(code);
}
function includeFooter() {
var code = '<div class="footer-bg">\
        <div class="footer-content overflow">\
            <div>Powered by EPAM System</div>\
            <ul class="footer-menu">\
				<li><a href="support.html" title="Tip title">About</a></li>\
                <li>|</li>\
                <li><a href="">Report a bug</a></li>\
            </ul>\
        </div>\
    </div>';
	$('.replace.footer').replaceWith(code);
}

function initLeftNavMenu() {
    $('.sidebar-menu li').removeClass('active');
    $($('.sidebar-menu li')[linum]).addClass('active');
    if (linum > 2 && linum <pages.length) {
        $($('.sidebar-menu li')[2]).addClass('active');
        $('.sidebar-menu li .sub').show();
    }
}
function includePagination() {
	var paginator = '<ul class="uui-pagination"><li class="prev"><a href="#"><i class="fa fa-long-arrow-left"></i></a></li><li class="first"><a href="contacts.html">First</a></li>'
	for (var i = 1; i < pages.length; i++) {
		var str = (i == num) ? ' class="active"' : '';
		paginator += '<li' + str + '><a href="' + pages[i] + '">' + i + '</a></li>'
	}
	paginator += '<li class="last"><a href="metals-colors.html">Last</a></li> <li class="next"><a href="index.html"><i class="fa fa-long-arrow-right"></i></a></li> </ul>'
	$('div.pagination').replaceWith(paginator);		
	if (num == 1) {
		$('.prev').addClass('disable');
		$('.first').addClass('disable');
	} else if (num == pages.length - 1) {
		$('.next').addClass('disable');
		$('.last').addClass('disable');
	}
	if (num != pages.length - 1) $('.next:not(.disable) a').attr('href', pages[num + 1]);
	if (num > 1) $('.prev:not(.disable) a').attr('href', pages[num - 1]);
	$('.first:not(.disable) a').attr('href', pages[1]);
	$('.last:not(.disable) a').attr('href', pages[pages.length - 1]);
}

function calculateValue() {
    if ($('input[name=custom_radio_odd]:checked').length > 0 && $('input[name=custom_radio_even]:checked').length > 0) {
        var sum = 0
        if ($('input[name=custom_radio_odd]:checked')[0].labels)
            sum = parseInt($('input[name=custom_radio_odd]:checked')[0].labels[0].innerText) + parseInt($('input[name=custom_radio_even]:checked')[0].labels[0].innerText);
        else
            sum = parseInt($('input[name=custom_radio_odd]:checked')[0].nextElementSibling.innerHTML) + parseInt($('input[name=custom_radio_even]:checked')[0].nextElementSibling.innerHTML);
        if ($('.summ-res').length === 0) {
            $('.results').append('<li class="summ-res"></li>');
        }
        $('.summ-res').text('Summary: ' + sum);
    }
}

function submitForm() {

    var data = [];

    /*Name*/
    data.push({'key': 'name', 'value': $('#Name').val(), 'description': 'Name'});
    /*LastName*/
    data.push({'key': 'lname', 'value': $('#LastName').val(), 'description': 'Last Name'});
    /*Description*/
    data.push({'key': 'descr', 'value': $('#Description').val(), 'description': 'Description'});
    /*Summary*/
    calculateValue();
    /*Elements*/
    var el = '';
    $('.elements :checkbox:checked').each(function () {
        if (this.labels)
            el += this.labels[0].innerText;
        else
            el += this.nextElementSibling.innerHTML;
        el += ', ';
    });
    if (el.length > 0) {
        el = el.substring(0, el.length - 2);
        data.push({'key': 'elem', 'value': el, 'description': 'Elements'});
    }
    /*Colors*/
    data.push({'key': 'col', 'value': $('.colors select').val(), 'description': 'Color'});
    /*Metals*/
    data.push({'key': 'met', 'value': $('.metals input').val(), 'description': 'Metal'});
    /*Salad*/
    if ($('.salad button').length > 0) {
        data.push({
            'key': 'sal',
            'value': ($('.salad button').text()) ? $('.salad button').text() : ' ',
            'description': 'Vegetables'
        });
    }
    /*Period*/
    data.push({'key': 'date', 'value': $('#datepicker input').val(), 'description': 'Period'});
    /*Time*/
    data.push({'key': 'time', 'value': $('input#timepicker').val(), 'description': 'Time'});
    /*Range 1*/
    if ($('.range-from input').length === 2 && $('.range-from input')[0].value && $('.range-from input')[1].value) {
        data.push({
            'key': 'range',
            'value': 'from ' + $('.range-from input')[0].value + ' to ' + $('.range-from input')[1].value,
            'description': 'Range 1'
        });
    }
    /*Range 2*/
    if ($('.uui-slider.range').length > 0) {
        data.push({
            'key': 'slider',
            'value': 'from ' + $('.uui-slider.range a span')[0].innerHTML + ' to ' + $('.uui-slider.range a span')[1].innerHTML,
            'description': 'Range 2'
        });
    }
    /*FileUpload*/
    if ($('input[type=file]').length > 0 && $('input[type=file]')[0].files.length > 0) {
        data.push({
            'key': 'upload',
            'value': 'File "' + $('input[type=file]')[0].files[0].name + '"',
            'description': 'File Upload'
        });
    }

    /*Submit*/
    submitHelper(data);
}

function submitHelper(data) {
    $.each(data, function (index, item) {
        if (item.value) {
            if ($('.' + item.key + '-res').length === 0) $('.results').append('<li class="' + item.key + '-res"></li>');
            var res = item.description + ': ' + $('<div/>').text(item.value).html();
            $('.' + item.key + '-res').text(res);
        }
    });
}

function logEvent(elem) {
    logEvent(elem, '');
}

function logEvent(elem, descr) {
    var value;
    var name;
    switch (elem.type) {
        case 'radio':
            if (elem.labels)
                value = ' value changed to ' + elem.labels[0].innerText;
            else
                value = ' value changed to ' + elem.nextElementSibling.innerHTML;
            break;
        case 'checkbox':
            if (elem.labels)
                name = elem.labels[0].innerText;
            else
                name = elem.nextElementSibling.innerHTML;
            value = ' condition changed to ' + elem.checked;
            break;
        case 'button':
            if (elem.textContent.toLowerCase() === 'calculate' || elem.textContent.toLowerCase() === 'submit') {
                value = elem.textContent.toLowerCase() + 'button clicked';
            } else {
                value = 'button clicked';
            }
            break;
        case 'text':
            value = ' value changed to ' + $('<div/>').text(elem.value).html();
            break;
        case 'file':
            value = ' file "' + elem.files[0].name + '" has been uploaded';
            break;
        case 'textarea':
            value = ' value changed to ' + $('<div/>').text(elem.value).html();
            break;
        case 'select-one':
            value = ' value changed to ' + elem.value;
            break;
        case 'select-multiple':
            var val = $(elem).val();
            value = ' value changed to ' + ((val != null && val.length > 0) ? val.join(', ') : '');
            break;

        default:
            if (elem.tagName.toUpperCase() == 'TR') {
                if ($(elem).hasClass('active')) {
                    value = (elem.rowIndex + 1) + ' row has been selected'
                } else {
                    value = (elem.rowIndex + 1) + ' row has been unselected'
                }
            }
            if (elem.tagName.toUpperCase() == 'TD') {
                if ($(elem).hasClass('active')) {
                    value = 'value=' + (elem.innerText) + '; cell has been selected'
                }
            }
            else if (elem.tagName.toUpperCase() == 'BUTTON') {
                value = 'button clicked';
            } else if (elem.tagName.toUpperCase() == 'A') {
                value = elem.innerText + ' link clicked';
            }
            else if ($(elem).hasClass('ui-slider-handle')) {
                value = ' value changed to ' + elem.text;
            } else {
                value = '';
            }
            break;
    }
    if (!name) {
        name = (descr) ? descr : ((elem.name) ? elem.name : ((elem.id) ? elem.id : elem.type));
    }
    if (value) {
        var item = '<li>' + getTimeString() + ' ' + (name || '') + ':' + value + '</li>';
        $('.logs').prepend(item);
    }
}

function getTimeString() {
    var time = new Date();
    var hrs = time.getHours();
    var min = time.getMinutes();
    var sec = time.getSeconds();
    return ((hrs > 9) ? hrs : '0' + hrs) + ':' + ((min > 9) ? min : '0' + min) + ':' + ((sec > 9) ? sec : '0' + sec);
}