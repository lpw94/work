$.fn.smart_float = function() {
    var position = function(element) {
        var top = element.position().top, pos = element.css("position");
        $(window).scroll(function() {
            var scrolls = $(this).scrollTop();
            if (scrolls > top) {
                if (window.XMLHttpRequest) {
                    element.css({
                        position: "fixed",
                        top: 0
                    });
                } else {
                    element.css({
                        top: scrolls
                    });
                }
            } else {
                element.css({
                    position: pos,
                    top: top
                });
            }
        });
    };
    return $(this).each(function() {
        position($(this));
    });
};

var ishopwindow = this.window;
var ishopjs = {
    window: ishopwindow,
    getcookie: function(name) {
        var result = null,
                myCookie = document.cookie + ";",
                searchName = name + "=",
                start = myCookie.indexOf(searchName),
                end;
        if (start > -1) {
            start += searchName.length;
            end = myCookie.indexOf(";", start);
            result = this.urldecode(myCookie.substring(start, end));
        }
        return result;
    },
    setcookie: function(name, value, expires, path, domain, secure) {
        return this.setrawcookie(name, encodeURIComponent(value), expires, path, domain, secure);
    },
    setrawcookie: function(name, value, expires, path, domain, secure) {
        if (typeof expires === 'string' && (/^\d+$/)
                .test(expires)) {
            expires = parseInt(expires, 10);
        }
        if (expires instanceof Date) {
            expires = expires.toGMTString();
        } else if (typeof expires === 'number') {
            expires = (new Date(expires * 1e3))
                    .toGMTString();
        }
        var r = [name + '=' + value],
                s = {},
                i = '';
        s = {
            expires: expires,
            path: path,
            domain: domain
        };
        for (i in s) {
            if (s.hasOwnProperty(i)) {
                // Exclude items on Object.prototype
                s[i] && r.push(i + '=' + s[i]);
            }
        }
        return secure && r.push('secure'), this.window.document.cookie = r.join(';'), true;
    },
    urldecode: function(str) {
        return decodeURIComponent(str.replace(/\+/g, '%20'));
    },
    array_shift: function(inputArr) {
        var props = false,
                shift = undefined,
                pr = '',
                allDigits = /^\d$/,
                int_ct = -1,
                _checkToUpIndices = function(arr, ct, key) {
                    if (arr[ct] !== undefined) {
                        var tmp = ct;
                        ct += 1;
                        if (ct === key) {
                            ct += 1;
                        }
                        ct = _checkToUpIndices(arr, ct, key);
                        arr[ct] = arr[tmp];
                        delete arr[tmp];
                    }
                    return ct;
                };
        if (inputArr.length === 0) {
            return null;
        }
        if (inputArr.length > 0) {
            return inputArr.shift();
        }
    },
    array_push: function(inputArr) {
        var i = 0,
                pr = '',
                argv = arguments,
                argc = argv.length,
                allDigits = /^\d$/,
                size = 0,
                highestIdx = 0,
                len = 0;
        if (inputArr.hasOwnProperty('length')) {
            for (i = 1; i < argc; i++) {
                inputArr[inputArr.length] = argv[i];
            }
            return inputArr.length;
        }
        // Associative (object)
        for (pr in inputArr) {
            if (inputArr.hasOwnProperty(pr)) {
                ++len;
                if (pr.search(allDigits) !== -1) {
                    size = parseInt(pr, 10);
                    highestIdx = size > highestIdx ? size : highestIdx;
                }
            }
        }
        for (i = 1; i < argc; i++) {
            inputArr[++highestIdx] = argv[i];
        }
        return len + i - 1;
    },
    array_reverse: function(array, preserve_keys) {
        var isArray = Object.prototype.toString.call(array) === '[object Array]',
                tmp_arr = preserve_keys ? {} : [],
                key;
        if (isArray && !preserve_keys) {
            return array.slice(0)
                    .reverse();
        }
        if (preserve_keys) {
            var keys = [];
            for (key in array) {
                keys.push(key);
            }
            var i = keys.length;
            while (i--) {
                key = keys[i];
                tmp_arr[key] = array[key];
            }
        } else {
            for (key in array) {
                tmp_arr.unshift(array[key]);
            }
        }
        return tmp_arr;
    },
    trim: function(str, charlist) {
        var whitespace, l = 0,
                i = 0;
        str += '';

        if (!charlist) {
            whitespace =
                    ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
        } else {
            // preg_quote custom list
            charlist += '';
            whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
        }
        l = str.length;
        for (i = 0; i < l; i++) {
            if (whitespace.indexOf(str.charAt(i)) === -1) {
                str = str.substring(i);
                break;
            }
        }
        l = str.length;
        for (i = l - 1; i >= 0; i--) {
            if (whitespace.indexOf(str.charAt(i)) === -1) {
                str = str.substring(0, i + 1);
                break;
            }
        }
        return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
    }
};

var ishop_goods_detail = {
    goods_view_queue: [],
    goods_view_queue_limit: 50,
    goods_view_cookie_key: 'ishop_goods_view',
    set_goods_view_history: function(goods_code) {
        var goods_view_queue = ishopjs.getcookie(this.goods_view_cookie_key);
        if (goods_view_queue) {
            this.goods_view_queue = goods_view_queue.split(',');
            this.goods_view_queue = ishopjs.array_reverse(this.goods_view_queue);
        }
        for (var i = 0; i < this.goods_view_queue.length; i++) {
            if (this.goods_view_queue[i] == goods_code) {
                this.goods_view_queue.splice(i, 1);
            }
        }
        if (this.goods_view_queue.length >= this.goods_view_queue_limit) {
            ishopjs.array_shift(this.goods_view_queue);
        }
        this.goods_view_queue[this.goods_view_queue.length] = goods_code;
        this.goods_view_queue = ishopjs.array_reverse(this.goods_view_queue);
        ishopjs.setcookie(this.goods_view_cookie_key, this.goods_view_queue.join(','), '', '/');
    },
    clear_goods_view_history: function() {
        ishopjs.setcookie(this.goods_view_cookie_key, '');
        $('.ishop_view_goods_history_list').find('ul').html('');
        window.location.reload();
    },
    load_description: function(code, position) {
        var params = {};
        params.params = {};
        params.ajax = 1;
        params.code = code;
        $.ajax({
            type: 'GET',
            url: '?app_act=goods/description',
            data: params,
            dataType: "json",
            success: function(result) {
                if (result.status == 1) {
                    position.html(result.data);
                }
            }
        });
        return true;
    }
};

var ishop_top_menu = {
    init: function() {
        $('.mainNav').find('.subContent').each(function() {
            if ($(this).find('.subContentLeft').children().length == 0) {
                $(this).remove();
            }
        });
    }
};

var ishop_search = {
	url: 'lists/',
    load_keys: false,
    init_toolbox: function() {
        $('.searchBox .btnSearch').bind('click', this.on_toolbox_submit);
        $(".searchBox input[type=text]").keyup(function(e) {
			
            if (!ishop_search.load_keyse&&(e.which==13||e.which==46|e.which==8)) {
                ishop_search.load_keys = true;
                var data = {};
                data.params = {};
                data.params.keyword = $(this).val();
                $.ajax({
                    type: 'GET',
                    url: '?app_act=goods/recommend_keys',
                    data: data,
                    dataType: "json",
                    success: function(result) {
                        console.info(result);
                        if (result.success == 1) {
                            $('.search_list .search_list_tag').html('');
                            for (var i = 0; i < result.categoryKeys.length; i++) {
                                $('.search_list .search_list_tag').append('<a href="javascript:void(0)">在<strong>' + result.categoryKeys[i].platform_category_name + '</strong>分类中搜索<span >约' + result.categoryKeys[i].count + '条</span></a>');
                            }
                            $("#resultDiv").show();
                        } else if(result.success == -1){
							location.href=ishop_search.url;
						}
                        ishop_search.load_keys = false;
                    },
                    error: function() {
                        ishop_search.load_keys = false;
                    }
                });
            }
            
            $("#resultDiv").mouseleave(function() {
                $("#resultDiv").hide();
            });
            $("#resultDiv li").click(function(event) {
                var key = $(this).find("em").text();
                window.location.href = $(this).attr('url') + '&q=' + encodeURIComponent(key);
                return false;
            });
			if(e.which==13){
				 $('.searchBox .btnSearch').click();
			}
        });
    },
    on_toolbox_submit: function() {
        var key = ishopjs.trim($('.searchBox .search').val());
        if (key == '') {
            return false;
        }
        window.location.href = $(this).attr('url') + '&q=' + encodeURIComponent(key);
        return false;
    }
};