/**
 * Created by Lin on 2017/3/20.
 */
define("common:static/js/mercatorProjection.js", function (t, e, a) {
    "use strict";
    a.exports = {
        EARTHRADIUS: 6370996.81,
        MCBAND: [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0],
        LLBAND: [75, 60, 45, 30, 15, 0],
        MC2LL: [[1.410526172116255e-8, 898305509648872e-20, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -.03801003308653, 17337981.2], [-7.435856389565537e-9, 8983055097726239e-21, -.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 10260144.86], [-3.030883460898826e-8, 898305509983578e-20, .30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, .32710905363475, 6856817.37], [-1.981981304930552e-8, 8983055099779535e-21, .03278182852591, 40.31678527705744, .65659298677277, -4.44255534477492, .85341911805263, .12923347998204, -.04625736007561, 4482777.06], [3.09191371068437e-9, 8983055096812155e-21, 6995724062e-14, 23.10934304144901, -.00023663490511, -.6321817810242, -.00663494467273, .03430082397953, -.00466043876332, 2555164.4], [2.890871144776878e-9, 8983055095805407e-21, -3.068298e-8, 7.47137025468032, -353937994e-14, -.02145144861037, -1234426596e-14, .00010322952773, -323890364e-14, 826088.5]],
        LL2MC: [[-.0015702102444, 111320.7020616939, 0x60e374c3105a3, -0x24bb4115e2e164, 0x5cc55543bb0ae8, -0x7ce070193f3784, 0x5e7ca61ddf8150, -0x261a578d8b24d0, 0x665d60f3742ca, 82.5], [.0008277824516172526, 111320.7020463578, 647795574.6671607, -4082003173.641316, 10774905663.51142, -15171875531.51559, 12053065338.62167, -5124939663.577472, 913311935.9512032, 67.5], [.00337398766765, 111320.7020202162, 4481351.045890365, -23393751.19931662, 79682215.47186455, -115964993.2797253, 97236711.15602145, -43661946.33752821, 8477230.501135234, 52.5], [.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245, 992013.7397791013, -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.9293806241, 37.5], [-.0003441963504368392, 111320.7020576856, 278.2353980772752, 2485758.690035394, 6070.750963243378, 54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5], [-.0003218135878613132, 111320.7020701615, .00369383431289, 823725.6402795718, .46104986909093, 2351.343141331292, 1.58060784298199, 8.77738589078284, .37238884252424, 7.45]],
        convertMC2LL: function (t) {
            var e, a;
            e = {lng: Math.abs(t.lng), lat: Math.abs(t.lat)};
            for (var n = 0; n < this.MCBAND.length; n++)if (e.lat >= this.MCBAND[n]) {
                a = this.MC2LL[n];
                break
            }
            var r = this.convertor(t, a), t = {lng: r.lng.toFixed(6), lat: r.lat.toFixed(6)};
            return t
        },
        convertLL2MC: function (t) {
            var e, a;
            t.lng = this.getLoop(t.lng, -180, 180), t.lat = this.getRange(t.lat, -74, 74), e = {lng: t.lng, lat: t.lat};
            for (var n = 0; n < this.LLBAND.length; n++)if (e.lat >= this.LLBAND[n]) {
                a = this.LL2MC[n];
                break
            }
            if (!a)for (var n = this.LLBAND.length - 1; n >= 0; n--)if (e.lat <= -this.LLBAND[n]) {
                a = this.LL2MC[n];
                break
            }
            var r = this.convertor(t, a), t = {lng: r.lng.toFixed(2), lat: r.lat.toFixed(2)};
            return t
        },
        convertor: function (t, e) {
            if (t && e) {
                var a = e[0] + e[1] * Math.abs(t.lng), n = Math.abs(t.lat) / e[9], r = e[2] + e[3] * n + e[4] * n * n + e[5] * n * n * n + e[6] * n * n * n * n + e[7] * n * n * n * n * n + e[8] * n * n * n * n * n * n;
                return a *= t.lng < 0 ? -1 : 1, r *= t.lat < 0 ? -1 : 1, {lng: a, lat: r}
            }
        },
        getRange: function (t, e, a) {
            return null != e && (t = Math.max(t, e)), null != a && (t = Math.min(t, a)), t
        },
        getLoop: function (t, e, a) {
            for (; t > a;)t -= a - e;
            for (; e > t;)t += a - e;
            return t
        }
    }
});
;
define("common:widget/util/map-util.js", function (n, e, t) {
    var i = ["=", ".", "-", "*"], o = 1 << 23;
    t.exports = {
        geoToPoint: function (n) {
            if ("string" == typeof n) {
                var e, t, i = n.split("|");
                return 1 === parseInt(i[0], 10) ? (e = i[1].split(","), t = {
                    lng: parseFloat(e[0]),
                    lat: parseFloat(e[1])
                }) : void 0
            }
        }, need2ShowTraffic: function (e) {
            for (var t = n("core:widget/geolocation/location.js"), i = n("core:widget/url/url.js"), o = i.get().query, r = e || o && o.code || t.getCityCode(), a = r && parseInt(r), g = [131, 289, 257, 340, 348, 75, 167, 92, 178, 53, 132, 315, 163, 218, 180, 150, 300, 333, 58, 317, 244, 179, 332, 158, 194, 134, 119, 138, 140, 187, 236, 261, 104, 224, 233, 288], u = 0; u < g.length; u++)if (a === g[u])return !0;
            return !1
        }, ifSupportSubway: function (n) {
            var e, t;
            if (window.subwaySupport) {
                e = window.subwaySupport;
                for (var i, o = 0, r = e.length, a = {}; r > o; o++)i = e[o].split(","), a[i[2]] = e[o], a[i[0]] = e[o];
                t = a
            } else t = {
                131: "beijing,北京,131",
                289: "shanghai,上海,289",
                257: "guangzhou,广州,257",
                340: "shenzhen,深圳,340",
                2912: "hongkong,香港,2912",
                75: "chengdu,成都,75",
                53: "changchun,长春,53",
                132: "chongqing,重庆,132",
                167: "dalian,大连,167",
                138: "foshan,佛山,138",
                179: "hangzhou,杭州,179",
                104: "kunming,昆明,104",
                315: "nanjing,南京,315",
                58: "shenyang,沈阳,58",
                224: "suzhou,苏州,224",
                332: "tianjin,天津,332",
                218: "wuhan,武汉,218",
                233: "xian,西安,233",
                48: "haerbin,哈尔滨,48",
                268: "zhengzhou,郑州,268",
                158: "changsha,长沙,158",
                180: "ningbo,宁波,180",
                317: "wuxi,无锡,317",
                9002: "taibei,台北,9002",
                9019: "gaoxiong,高雄,9019",
                236: "qingdao,青岛,236",
                163: "nanchang,南昌,163",
                300: "fuzhou,福州,300",
                119: "dongguan,东莞,119",
                261: "nanning,南宁,261",
                beijing: "beijing,北京,131",
                shanghai: "shanghai,上海,289",
                guangzhou: "guangzhou,广州,257",
                shenzhen: "shenzhen,深圳,340",
                hongkong: "hongkong,香港,2912",
                chengdu: "chengdu,成都,75",
                changchun: "changchun,长春,53",
                chongqing: "chongqing,重庆,132",
                dalian: "dalian,大连,167",
                foshan: "foshan,佛山,138",
                hangzhou: "hangzhou,杭州,179",
                kunming: "kunming,昆明,104",
                nanjing: "nanjing,南京,315",
                shenyang: "shenyang,沈阳,58",
                suzhou: "suzhou,苏州,224",
                tianjin: "tianjin,天津,332",
                wuhan: "wuhan,武汉,218",
                xian: "xian,西安,233",
                haerbin: "haerbin,哈尔滨,48",
                zhengzhou: "zhengzhou,郑州,268",
                changsha: "changsha,长沙,158",
                ningbo: "ningbo,宁波,180",
                wuxi: "wuxi,无锡,317",
                taibei: "taibei,台北,9002",
                gaoxiong: "gaoxiong,高雄,9019",
                qingdao: "qingdao,青岛,236",
                nanchang: "nanchang,南昌,163",
                fuzhou: "fuzhou,福州,300",
                dongguan: "dongguan,东莞,119",
                nanning: "nanning,南宁,261"
            };
            var g = navigator.userAgent, u = /android((\s)*|\/)(1\.\d|2\.[12])/i, h = /FlyFlow/i, s = !(u.test(g) || h.test(g));
            return s ? t[n] : !1
        }, convertMC2LL: function (e) {
            var t = n("common:static/js/mercatorProjection.js");
            return t.convertMC2LL(e)
        }, convertLL2MC: function (e) {
            var t = n("common:static/js/mercatorProjection.js");
            return t.convertLL2MC(e)
        }, decode_geo_diff: function (n) {
            for (var e = this._decode_type(n.charAt(0)), t = n.substr(1), o = 0, r = t.length, a = [], g = [], u = []; r > o;)if (t.charAt(o) === i[0]) {
                if (13 > r - o)return 0;
                if (u = this._decode_6byte_(t.substr(o, 13), a), 0 > u)return 0;
                o += 13
            } else if (";" === t.charAt(o))g.push(a.slice(0)), a.length = 0, ++o; else {
                if (8 > r - o)return 0;
                if (u = this._decode_4byte_(t.substr(o, 8), a), 0 > u)return 0;
                o += 8
            }
            for (var h = 0, s = g.length; s > h; h++)for (var c = 0, d = g[h].length; d > c; c++)g[h][c] /= 100;
            return {geoType: e, geo: g}
        }, _decode_type: function (n) {
            var e = -1;
            return n === i[1] ? e = 2 : n === i[2] ? e = 1 : n === i[3] && (e = 0), e
        }, _decode_6byte_: function (n, e) {
            for (var t = 0, i = 0, o = 0, r = 0; 6 > r; r++) {
                if (o = this._char2num_(n.substr(1 + r, 1)), 0 > o)return -1 - r;
                if (t += o << 6 * r, o = this._char2num_(n.substr(7 + r, 1)), 0 > o)return -7 - r;
                i += o << 6 * r
            }
            return e.push(t), e.push(i), 0
        }, _decode_4byte_: function (n, e) {
            var t = e.length;
            if (2 > t)return -1;
            for (var i = 0, r = 0, a = 0, g = 0; 4 > g; g++) {
                if (a = this._char2num_(n.substr(g, 1)), 0 > a)return -1 - g;
                if (i += a << 6 * g, a = this._char2num_(n.substr(4 + g, 1)), 0 > a)return -5 - g;
                r += a << 6 * g
            }
            return i > o && (i = o - i), r > o && (r = o - r), e.push(e[t - 2] + i), e.push(e[t - 1] + r), 0
        }, _char2num_: function (n) {
            var e = n.charCodeAt(0);
            return n >= "A" && "Z" >= n ? e - "A".charCodeAt(0) : n >= "a" && "z" >= n ? 26 + e - "a".charCodeAt(0) : n >= "0" && "9" >= n ? 52 + e - "0".charCodeAt(0) : "+" === n ? 62 : "/" === n ? 63 : -1
        }, getPoiPoint: function (e) {
            var t = [], i = null;
            if ("Point" === e.toString())i = e; else {
                if ("string" == typeof e) {
                    if (t = $.trim(e).split(","), t.length < 2)return;
                    t[0] = parseFloat($.trim(t[0])), t[1] = parseFloat($.trim(t[1]))
                } else if (t = e.slice(0), t.length < 2)return;
                n.async("common:widget/map/map.js", function (n) {
                    var e = n.getBMap();
                    i = new e.Point(t[0], t[1])
                })
            }
            return i
        }, parseGeo: function (n) {
            if ("string" == typeof n) {
                var e = n.split("|"), t = parseInt(e[0]), i = e[1], o = e[2], r = o.split(";"), a = [];
                switch (t) {
                    case 1:
                        a.push(r[0]);
                        break;
                    case 2:
                    case 3:
                        for (var g = 0; g < r.length - 1; g++) {
                            var u = r[g];
                            if (u.length > 100)u = u.replace(/(-?[1-9]\d*\.\d*|-?0\.\d*[1-9]\d*|-?0?\.0+|0|-?[1-9]\d*),(-?[1-9]\d*\.\d*|-?0\.\d*[1-9]\d*|-?0?\.0+|0|-?[1-9]\d*)(,)/g, "$1,$2;"), a.push(u); else {
                                for (var h = [], s = u.split(","), c = 0; c < s.length; c += 2) {
                                    var d = s[c], f = s[c + 1];
                                    h.push(d + "," + f)
                                }
                                a.push(h.join(";"))
                            }
                        }
                }
                return a.length <= 1 && (a = a.toString()), {type: t, bound: i, points: a}
            }
        }, parse2Geo: function (n, e) {
            e ? .25 > e ? e = 0 : e > .25 && 1 > e ? e = 1 : e > 32 && (e = 32) : e = 0;
            var t, i = n.split("|");
            if (1 === i.length)return t = this.decode_geo_diff(i[0]), {
                type: t.type,
                bound: "",
                points: t.geo.join(",")
            };
            if (i.length > 1) {
                for (var o = n.split(";.="), r = [], a = [], g = 0, u = o.length, h = 0; u > h; h++) {
                    var s = o[h];
                    u > 1 && (0 === h && (s += ";"), h > 0 && u - 1 > h && (s = ".=" + s + ";"), h === u - 1 && (s = ".=" + s));
                    var c = s.split("|"), d = this.decode_geo_diff(c[0]), f = this.decode_geo_diff(c[1]);
                    r.push(d.geo.join(",")), r.push(f.geo.join(",")), t = this.decode_geo_diff(c[2]), g = t.type;
                    var p = t.geo.join(",");
                    if (p = p.replace(/(-?[1-9]\d*\.\d*|-?0\.\d*[1-9]\d*|-?0?\.0+|0|-?[1-9]\d*),(-?[1-9]\d*\.\d*|-?0\.\d*[1-9]\d*|-?0?\.0+|0|-?[1-9]\d*)(,)/g, "$1,$2;"), e > 0) {
                        var l = new RegExp("(((-?\\d+)(\\.\\d+)?),((-?\\d+)(\\.\\d+)?);)(((-?\\d+)(\\.\\d+)?),((-?\\d+)(\\.\\d+)?);){" + e + "}", "ig");
                        p = p.replace(l, "$1")
                    }
                    a.push(p)
                }
                return 1 >= u && (a = a.join(";")), {type: g, bound: r.join(";"), points: a}
            }
        }, getPointByStr: function (e) {
            if ("string" == typeof e) {
                var t = e.split(",");
                if (!(t.length < 2)) {
                    var i;
                    return n.async("common:widget/map/map.js", function (n) {
                        i = n.getBMap()
                    }), i ? new i.Point(t[0], t[1]) : {lng: parseFloat(t[0]), lat: parseFloat(t[1])}
                }
            }
        }, getBPoints: function (n) {
            if (n && 0 !== n.length) {
                for (var e = [], t = 0; t < n.length; t++)if (n[t])for (var i = n[t].split(";"), o = 0; o < i.length; o++) {
                    var r = this.getPointByStr(i[o]);
                    e.push(r)
                }
                return e
            }
        }
    }
});
;
define("common:widget/monitor/maplog.js", function (e, t, n) {
    "use strict";
    function i() {
        r = (new Date).getTime(), a.isSingleLanding() && /vt=map/.test(location.href) && (r = c_t0)
    }

    function o(e, t) {
        var n = t;
        n.addEventListener("ontilesloaded", function i() {
            var e = (new Date).getTime(), t = {z_webapptilesmaptime: e - r};
            alog("cus.fire", "time", t), alog("cus.fire", "count", "z_webapptilescount"), n.removeEventListener("tilesloaded", i)
        }), n.addEventListener("onvectorloaded", function o(e) {
            var t = e.drawingTime, i = (new Date).getTime(), a = {z_webappvectormaptime: i - r, z_webappdrawingtime: t};
            alog("cus.fire", "time", a), alog("cus.fire", "count", "z_webappvectorcount"), n.removeEventListener("vectorloaded", o)
        })
    }

    var a = e("core:widget/pagemgr/pagemgr.js"), r = (new Date).getTime();
    n.exports = {
        init: function () {
            listener.once("common.map", "start", i), listener.once("common.map", "init", o)
        }
    }
});
;
define("common:widget/map/config.js", function (e, t, i) {
    "use strict";
    function a(e) {
        if (u)return u;
        e = e || navigator.userAgent;
        var t = parseInt(window._WISE_INFO.netspeed) || 0, i = parseInt(window._WISE_INFO.netype) || 0, a = p, r = w.plantform[c].enable, o = w.plantform[c].disable;
        return t >= w.netspeed || w.nettype.indexOf(i) >= 0 ? a = l : r && o ? a = r.test(e) ? o.test(e) ? p : l : p : (r && (a = r.test(e) ? l : p), o && (a = o.test(e) ? p : l)), a
    }

    function r() {
        if (a() === p && window.devicePixelRatio > 1) {
            var e = parseInt(window._WISE_INFO.netspeed) || 0, t = parseInt(window._WISE_INFO.netype) || 0;
            return 300 >= e && 1 === t ? !0 : !1
        }
        return !1
    }

    function o() {
        return a() === l ? 3 : 99
    }

    function n() {
        return window.devicePixelRatio || 1
    }

    function d(e) {
        e = e || {};
        var t = $.extend(I, e);
        for (var i in t)this[i] = t[i]
    }

    var s = e("common:widget/util/device-util.js"), l = "vector", p = "raster", c = s.isIPad() ? "iPad" : s.isIPhone() ? "iPhone" : s.isAndroid() ? "Android" : "other", w = {
        netspeed: 800,
        nettype: [2],
        plantform: {
            iPad: {},
            iPhone: {
                enable: /iphone os ([6-9]|10|11)/i,
                disable: /OS 8_(\d|\s|\w|\(|\)|\/|\.|\,)+Version\/8\.0 Mobile(\/|\d|\.|\w|\s)+Safari/i
            },
            Android: {
                enable: /android((\s)*|\/)(4\.[1-9]|[5-9])/i,
                disable: /UCBrowser|Huawei|Xiaomi_2013022|Xiaomi_2013023|baiduboxmapplugin|X9077.*baiduboxapp|MX4 Pro.*baiduboxapp|MX4 Pro.*baidubrowser/i
            },
            other: {}
        }
    }, u = "";
    try {
        var m = location.href;
        /drawtype=vector/.test(m) && localStorage && localStorage.setItem("drawtype", "vector"), /drawtype=raster/.test(m) && localStorage && localStorage.setItem("drawtype", "raster"), u = localStorage.getItem("drawtype")
    } catch (b) {
    }
    var I = {
        drawMargin: 0,
        maxZoom: 18,
        minZoom: 3,
        enableFulltimeSpotClick: !0,
        enableInertialDragging: !0,
        drawType: a(),
        vectorMapLevel: o(),
        devicePixelRatio: n(),
        enableHighResolution: r()
    };
    i.exports = d
});
;
define("common:widget/map/iwcontroller.js", function (i, n, o) {
    "use strict";
    o.exports = {
        _instances: {
            0: "PoiInfoWindow",
            1: "PoiInfoWindow",
            2: "TrsInfoWindow",
            3: "PoiInfoWindow",
            4: "TrsInfoWindow",
            5: "TrsInfoWindow",
            6: "TrsInfoWindow",
            7: "PoiInfoWindow",
            10: "TfcInfoWindow",
            11: "PoiInfoWindow",
            12: "AddrInfoWindow"
        }, _infoWindows: {}, _overlay: null, init: function (i, n) {
            return this._map = i, this._BMap = n, this
        }, get: function (i) {
            if (!this._instances[i])return this._overlay;
            var n, o;
            this._infoWindows[i] ? n = this._infoWindows[i] : (o = this[this._instances[i]], n = this._infoWindows[i] = o.init(i), n._type = i);
            for (var t = this._map.getOverlays(), s = 0, e = t.length; e > s; s++)if (n === t[s])return this._setOverlay(n);
            return n instanceof this._BMap.Overlay && this._map.addOverlay(n), this._setOverlay(n)
        }, _setOverlay: function (i) {
            return this._overlay && this._overlay !== i && this._overlay.hide(), this._overlay = i, this._overlay.show(), i
        }
    }
});
;
define("common:widget/map/map.js", function (e, t, i) {
    "use strict";
    var o = e("common:static/js/mapconst.js"), n = e("core:widget/pagemgr/pagemgr.js"), a = e("common:widget/util/device-util.js"), r = e("common:widget/util/map-util.js"), s = e("core:widget/url/url.js"), l = e("common:widget/appresize/appresize.js"), d = e("core:widget/geolocation/location.js"), c = e("common:widget/map/iwcontroller.js"), m = e("common:widget/map/config.js"), h = e("common:widget/monitor/maplog.js"), p = e("common:widget/callnatohere/callnatohere.js"), g = new m;
    i.exports = {
        DEST_MKR_PATH: "//webmap1.bdimg.com/mobile/simple/static/common/images/dest_mkr_a126707.png",
        BUS_DIRECTION_PATH: "//webmap1.bdimg.com/mobile/simple/static/common/images/bus_direction_dc5899a.png",
        _initialized: !1,
        _isBindMapClick: !0,
        opts: {},
        driveRoutes: [],
        destPois: [],
        init: function (e, t) {
            t = t || {}, this.opts = $.extend(!0, {disableMapClick: !1}, t), this._initialized ? (this.show(), e && e(this._BMap), this.trafficControl.update(), this.streetviewControl.isPanoCity(), this.streetviewControl._ajaxInstance && this.streetviewControl._ajaxInstance.abort(), this._isBindMapClick === !1 && this.opts.disableMapClick === !1 && (this._isBindMapClick = !0, this._bindMapClick()), listener.trigger("common.map", "mapcontrolcomplete")) : this._init(e), this._destroyUnusedData()
        },
        _destroyUnusedData: function () {
            var e, t;
            if (this.driveRoutes) {
                for (e = 0, t = this.driveRoutes.length; t > e; e++)this.driveRoutes[e] = null;
                this.driveRoutes = []
            }
            if (this.destPois) {
                for (e = 0, t = this.destPois.length; t > e; e++)this.destPois[e] = null;
                this.destPois = []
            }
        },
        _init: function (e) {
            var t = this;
            h.init(), listener.trigger("common.map", "start");
            var i = localStorage.getItem("mapapi:widget/api/api.js") ? !0 : !1;
            this._getAsyncWidget(function () {
                var o = t._BMap = arguments[0];
                listener.trigger("common.map", "jsloaded", {isCache: i}), $.each(arguments, function (e, i) {
                    i._className_ && (/InfoWindow/.test(i._className_) ? c[i._className_] = i : t[i._className_] = i)
                }), t._initMap(), t._initialized = !0, e && e(o)
            })
        },
        getMapOptions: function () {
            return g
        },
        setViewport: function (e, t) {
            var i = this._map.getViewport(e, t), o = i.center, n = i.zoom;
            this._centerAndZoom(o, n)
        },
        _centerAndZoom: function (e, t) {
            e && t || (e = new this._BMap.Point(d.getPointX(), d.getPointY()), t = d.getLevel()), this._map.enableLoadTiles = !0, this._map.centerAndZoom(e, t)
        },
        _initMap: function () {
            this.DEST_MARKER_SIZE = new this._BMap.Size(29, 35), this.DEST_MARKER_ANCHOR = new this._BMap.Size(15, 34), this.DEST_DRIVER_DIR_SIZE = new this._BMap.Size(18, 18), this.show();
            var e = this._map = new this._BMap.Map("map-holder", g);
            e.enableLoadTiles = !1, this._bindEvent(), this._initControl(), listener.trigger("common.map", "init", e)
        },
        hide: function () {
            $(".common-widget-map").css("visibility", "hidden"), $(".common-widget-map").css("z-index", -10)
        },
        show: function () {
            l.update(), $(".common-widget-map").css("visibility", "visible"), $(".common-widget-map").css("z-index", 0), this._fixCenterPos()
        },
        _bindEvent: function () {
            var e = this, t = this._map, i = this._BMap;
            this.opts.disableMapClick === !1 && (this._isBindMapClick = !0, this._bindMapClick()), listener.on("common.geolocation", "success", function (t, o) {
                var r = s.get(), l = r.module, c = r.action, m = r.pageState || {}, h = n.isLandingPage(), p = new i.Point(o.point.x, o.point.y);
                o.isExactPoi && null != o.type && (o.isInitGeo === !1 || 1 === m.showmygeo || "index" === l && "index" === c && h) && !d.isUserInput() ? e.addGLCenter(p) : null == o.type && void 0 !== e.geolocationMarker && d.isUserInput() && (e._map.removeOverlay(e.geolocationMarker), e.geolocationMarker = void 0);
                var g = o.addr.accuracy;
                null !== g && e.addGLCircle(p, g), (o.isInitGeo === !1 || 1 === m.showmygeo || "index" === l && "index" === c && h) && e._map.centerAndZoom(p, d.getLevel()), a.isIPad() && (o.isExactPoi && null != o.type && "index" === l && "index" === c ? e.addGLCenter(p) : e.iwController.get().hide(), "index" === l && "index" === c && e._map.centerAndZoom(p, d.getLevel()))
            }, this), t.addEventListener("ontilesloaded", function o() {
                e._addLazyControl(), t.removeEventListener("ontilesloaded", o)
            }), t.addEventListener("onvectorloaded", function r() {
                e._addLazyControl(), t.removeEventListener("onvectorloaded", r)
            }), t.addEventListener("onresize", function () {
                if ($(".map-geo")) {
                    var e = $(".map-geo").offset();
                    if (e && e.top) {
                        var t = e.top - 35 - 12;
                        $(".common-widget-mapbanner").css("top", t + "px")
                    }
                }
            }), e.addControlTimer = window.setTimeout(function () {
                e._addLazyControl()
            }, 3e3), listener.on("common.page", "pageloaded", function () {
                /map/.test(window._APP_HASH.page) || e.hide()
            })
        },
        _bindMapClick: function () {
            var e = this, t = this._map;
            listener.on("infowindow." + o.IW_VCT, "click", function (e, t) {
                var i = t.id, o = t.data, n = t.instance;
                switch (i) {
                    case"iw-l":
                        n.nbSearch(o.name, o.geo);
                        break;
                    case"iw-c":
                        n.detailSearch(o.uid);
                        break;
                    case"iw-r":
                        if (n.lineSearch(o.name, o.geo), o.name && o.uid && o.geo) {
                            var a = o.geo, r = a.split("|"), s = "";
                            if (2 === r.length && (s = r[1]), s) {
                                var l = "/mobile/webapp/place/linesearch/foo=bar/from=place&end=" + encodeURIComponent("word=" + o.name + "&point=" + s + "&uid=" + o.uid) + "&tab=line";
                                p.gotoHere(l, {stat: "callnatohereinfowindow"})
                            }
                        }
                }
            }), t.addEventListener("onvectorclick", function (i) {
                if ("madian" !== i.form) {
                    var n = e.iwController.get();
                    if (!(n && n.skipClickHandler || "base" !== i.from)) {
                        var a = i.iconInfo;
                        if (a.uid && a.name && a.point) {
                            var r = t.pixelToPoint(a.point);
                            n = e.iwController.get(o.IW_VCT), n.setData(o.IW_VCT, {
                                json: [{
                                    uid: a.uid,
                                    name: a.name,
                                    geo: "1|" + r.lng + "," + r.lat
                                }]
                            }).switchTo(0)
                        }
                    }
                }
            }), t.addEventListener("click", function () {
                var t = e.iwController.get();
                t && (t.handled ? (t.handled = !1, t.skipClickHandler = !0) : (t.skipClickHandler = !1, t.hide()))
            }), t.addEventListener("touchstart", function () {
                e.geoControl && e.geoControl.hideInfoBar()
            })
        },
        _addSyncControl: function () {
            var e = this._BMap, t = this._map;
            if (this.isMyCenter()) {
                var i = d.getCenterPoi(), o = new e.Point(i.x, i.y), n = d.getAccuracy();
                this.addGLOverlay(o, n)
            }
            this.lineStepControl = new this.LineStepControl, t.addControl(this.lineStepControl), this.lineStepControl.hide(), this.iwController = c.init(t, e), t.addOverlay(this.iwController.get())
        },
        _addLazyControl: function () {
            if (!this._isAddControl) {
                this._isAddControl = !0;
                var e = this._map;
                e.addControl(this.trafficControl), e.addControl(this.zoomControl), e.addControl(this.geoControl), e.addControl(this.scaleControl), e.addControl(this.streetviewControl), listener.trigger("common.map", "addlazycontrol"), listener.trigger("common.map", "mapcontrolcomplete")
            }
        },
        _initControl: function () {
            var e = this, t = this._BMap;
            this.trafficControl = new this.TrafficControl, this.trafficControl.addEventListener("click", function (t) {
                var i = e.iwController.get(o.IW_TFC);
                i.setData(o.IW_TFC, {json: [t.data]}).switchTo(0), e._singleMarker && e._singleMarker.hide(), e.grMarker && e.grMarker.hide()
            }), this.trafficControl.addEventListener("turnofftraffic", function () {
                e.iwController.get(o.IW_TFC).hide()
            }), this.streetviewControl = new this.StreetviewControl, this.zoomControl = new this.ZoomControl, this.geoControl = new this.GeoControl;
            var i = BMAP_ANCHOR_BOTTOM_LEFT, n = new t.Size(52, 22);
            a.isIPad() && (i = BMAP_ANCHOR_BOTTOM_RIGHT, n = new t.Size(16, 16)), this.scaleControl = new t.ScaleControl({
                anchor: i,
                offset: n
            }), this._addSyncControl()
        },
        _getAsyncWidget: function (t) {
            e.async(["mapapi:widget/api/api.js", "common:widget/apiext/circleoverlay.js", "common:widget/apiext/customicon.js", "common:widget/apiext/custommarker.js", "common:widget/apiext/geocontrol.js", "common:widget/apiext/linestepcontrol.js", "common:widget/apiext/zoomcontrol.js", "common:widget/apiext/streetviewcontrol.js", "common:widget/apiext/trafficcontrol.js", "common:widget/apiext/userheading.js", "common:widget/apiext/poiinfowindow.js", "common:widget/apiext/trsinfowindow.js", "common:widget/apiext/tfcinfowindow.js", "common:widget/apiext/addrinfowindow.js"], t)
        },
        isMyCenter: function () {
            var e = d.getCenterPoi(), t = d.getMyCenterPoi();
            return d.hasExactPoi() && !d.isUserInput() && t && t.x === e.x && t.y === e.y ? !0 : !1
        },
        getCustomMarker: function () {
            return this.CustomMarker
        },
        getBMap: function () {
            return this._BMap
        },
        getMap: function () {
            return this._map || {}
        },
        getInfoWindow: function (e) {
            return this.iwController.get(e)
        },
        getLineStepControl: function () {
            return this.lineStepControl
        },
        openGeoIw: function () {
            if (this.opts.disableMapClick !== !0) {
                var e = d.getMyCenterPoi(), t = this.iwController.get(o.IW_CNT);
                t.setData(o.IW_CNT, {
                    json: [{
                        name: o.MY_GEO,
                        html: "<b>{0}</b><p>{1}</p>".format(o.MY_GEO, d.getAddress()),
                        geo: "1|" + e.x + "," + e.y
                    }]
                }).switchTo(0)
            }
        },
        _bindGeoIWEvent: function () {
            listener.on("infowindow." + o.IW_CNT, "click", function (e, t) {
                var i = t.id, o = t.data, n = t.instance;
                switch (i) {
                    case"iw-l":
                        n.nbSearch(o.name, o.geo);
                        break;
                    case"iw-c":
                        s.update({module: "index", action: "mylocation"}, {
                            trigger: !0,
                            queryReplace: !0,
                            pageStateReplace: !0
                        });
                        break;
                    case"iw-r":
                        n.lineSearch(o.name, o.geo)
                }
            })
        },
        _fixCenterPos: function () {
            var e = this;
            setTimeout(function () {
                e.geolocationMarker && e.geolocationMarker.draw()
            }, 100)
        },
        addGLCenter: function (e) {
            var t = this, i = this._map, n = this._BMap;
            if (this.geolocationMarker)this.geolocationMarker.setPoint(e); else {
                var a = new n.Icon(o.DEST_MKR_PATH, new n.Size(14, 14), {
                    anchor: new n.Size(7, 7),
                    imageOffset: new n.Size(80, 0)
                }), r = new this.CustomMarker(a, e, {
                    className: "dest_mkr", click: function () {
                        t.openGeoIw()
                    }
                });
                r.enableMassClear = !1, i.addOverlay(r), this.geolocationMarker = r, this.addUserHeading(r), this._bindGeoIWEvent(), this._fixCenterPos()
            }
            return listener.trigger("common.map", "addcenter"), this.geolocationMarker
        },
        addUserHeading: function (e) {
            if (e) {
                var t = this._BMap;
                this.UserHeading.isSupport() && !d.isUserInput() && (e.setIcon(new t.Icon(o.NAVI_MKR_PATH, new t.Size(38, 40), {anchor: new t.Size(19, 20)})), e.setClassName("navi_mkr"), this.UserHeading.start(e.getContainer()))
            }
        },
        addGLCircle: function (e, t) {
            if (/MI 2S/i.test(navigator.userAgent) && (t = t > 100 ? 100 : t), this.geolocationCircle)this.geolocationCircle.setInfo(e, t); else {
                var i = new this.CircleOverlay(e, t);
                this._map.addOverlay(i), this.geolocationCircle = i
            }
            return this.geolocationCircle
        },
        addGLOverlay: function (e, t) {
            var i, o = this.addGLCenter(e);
            return null !== t && this.addGLCircle(e, t), {center: o, circle: i}
        },
        clearOverlays: function () {
            this.geoControl && this.geoControl.hideInfoBar(), this.spotshotLayer && this._map.removeTileLayer(this.spotshotLayer), this.grControl && this.grControl.clearCache();
            var e = this.iwController.get();
            e && e.hide(), this.lineStepControl && this.lineStepControl.hide(), this._map.clearOverlays()
        },
        removeOverlayInArray: function (e) {
            for (var t = 0; t < e.length; t++)this._map.removeOverlay(e[t]);
            e = []
        },
        addRoute: function (e, t) {
            var i = o.ROUTE_DICT;
            if ("undefined" == typeof t && (t = 0), i[t]) {
                var n = i[t], a = {
                    strokeWeight: n.stroke,
                    strokeColor: n.color,
                    strokeOpacity: n.opacity,
                    strokeStyle: n.strokeStyle
                }, r = new this._BMap.Polyline(e, a);
                return this._map.addOverlay(r), r._routeType = t, r
            }
        },
        addTrafficRoute: function (e, t, i) {
            var n = o.TRAFFIC_ROUTE_DICT, t = t || "noneData", i = i || {};
            if (n[t]) {
                var a = n[t];
                i = $.extend({
                    strokeWeight: a.stroke,
                    strokeColor: a.color,
                    strokeOpacity: a.opacity || 1,
                    strokeLineCap: "square",
                    strokeLineJoin: "round"
                }, i);
                var r = new this._BMap.Polyline(e, i);
                return this._map.addOverlay(r), r._routeType = t, r
            }
        },
        addDriveTrafficRoute: function (e, t, i) {
            var t = t || "notActive", i = i || {}, o = this.addTrafficRoute(e, t, i);
            return this.driveRoutes.push(o), o
        },
        addDriveRoute: function (e) {
            var t = this.addRoute(e, o.ROUTE_TYPE_DRIVE);
            return this.driveRoutes.push(t), t
        },
        removeDriveRoute: function () {
            this.removeOverlayInArray(this.driveRoutes)
        },
        removeRoute: function (e) {
            this._map.removeOverlay(e), e = null
        },
        selectRoute: function (e) {
            if (e instanceof this._BMap.Polyline) {
                var t = ["#ff0103", "#ff0103", "#ff0103", "#ff0103", "#ff0103", "#ff0103", "#ff0103"];
                t[e._routeType] && e.setStrokeColor(t[e._routeType])
            }
        },
        unselectRoute: function (e) {
            if (e instanceof this._BMap.Polyline) {
                var t = ["#3a6bdb", "#3a6bdb", "#30a208", "#3a6bdb", "#3a6bdb", "#30a208", "#575757"];
                t[e._routeType] && e.setStrokeColor(t[e._routeType])
            }
        },
        addKeyPoiMarker: function (e, t, i) {
            var n = r.getPoiPoint(e);
            if (n) {
                var a = i ? 0 : 22, s = new this._BMap.Icon(o.DRV_KEY_POI_PATH, new this._BMap.Size(24, 22), {
                    anchor: new this._BMap.Size(12, 22),
                    imageOffset: new this._BMap.Size(0, a)
                }), l = new this.CustomMarker(s, n), d = document.createElement("div");
                return d.className = "nplb", d.style.width = t.length + "em", d.innerHTML = t, this._map.addOverlay(l), l._div.appendChild(d), l
            }
        },
        addDirectionMarker: function (e, t) {
            var i = r.getPoiPoint(e);
            if (i) {
                (0 > t || t > 12) && (t = 0);
                var n = 18 * t, a = new this._BMap.Icon(o.DRV_DIRECTION_PATH, this.DEST_DRIVER_DIR_SIZE, {
                    anchor: new this._BMap.Size(9, 9),
                    imageOffset: new this._BMap.Size(n, 0)
                }), s = new this.CustomMarker(a, i, {className: "drv_dest"});
                return this._map.addOverlay(s), s
            }
        },
        addDestPoi: function (e, t) {
            if (e = r.getPoiPoint(e)) {
                var i = new this._BMap.Icon(o.DEST_MKR_PATH, this.DEST_MARKER_SIZE, {
                    anchor: this.DEST_MARKER_ANCHOR,
                    imageOffset: new this._BMap.Size(29 * t, 0)
                }), n = new this.CustomMarker(i, e, {className: "dest_mkr"});
                return this._map.addOverlay(n), n.setZIndex(400), this.destPois.push(n), n
            }
        },
        removeDestPoi: function () {
            this.removeOverlayInArray(this.destPois)
        }
    }
});
;
define("common:widget/map/preloader/preloader.js", function (i, a, e) {
    "use strict";
    var t = i("common:widget/map/config.js");
    e.exports = {
        _initialized: !1, init: function () {
            var a = new t;
            i.async(99 !== a.vectorMapLevel ? ["mapapi:widget/api/api.js", "mapapi:widget/api/bmap/vectormap/VectorDrawLib_Impl2.js", "common:widget/apiext/tfcinfowindow.js"] : ["mapapi:widget/api/api.js", "common:widget/apiext/tfcinfowindow.js"]), this._initialized = !0
        }
    }
});