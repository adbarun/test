!function() {
    var n, t;
    function c(n) {
        var t, e, r, o = "", h = -1;
        if (n && n.length)
            for (r = n.length; (h += 1) < r; )
                t = n.charCodeAt(h),
                e = h + 1 < r ? n.charCodeAt(h + 1) : 0,
                55296 <= t && t <= 56319 && 56320 <= e && e <= 57343 && (t = 65536 + ((1023 & t) << 10) + (1023 & e),
                h += 1),
                t <= 127 ? o += String.fromCharCode(t) : t <= 2047 ? o += String.fromCharCode(192 | t >>> 6 & 31, 128 | 63 & t) : t <= 65535 ? o += String.fromCharCode(224 | t >>> 12 & 15, 128 | t >>> 6 & 63, 128 | 63 & t) : t <= 2097151 && (o += String.fromCharCode(240 | t >>> 18 & 7, 128 | t >>> 12 & 63, 128 | t >>> 6 & 63, 128 | 63 & t));
        return o
    }
    function _(n, t) {
        var e = (65535 & n) + (65535 & t);
        return (n >> 16) + (t >> 16) + (e >> 16) << 16 | 65535 & e
    }
    function S(n, t) {
        return n << t | n >>> 32 - t
    }
    function u(n, t) {
        for (var e, r = t ? "0123456789ABCDEF" : "0123456789abcdef", o = "", h = 0, u = n.length; h < u; h += 1)
            e = n.charCodeAt(h),
            o += r.charAt(e >>> 4 & 15) + r.charAt(15 & e);
        return o
    }
    function a(n) {
        var t, e = 32 * n.length, r = "";
        for (t = 0; t < e; t += 8)
            r += String.fromCharCode(n[t >> 5] >>> 24 - t % 32 & 255);
        return r
    }
    function l(n) {
        var t, e = 32 * n.length, r = "";
        for (t = 0; t < e; t += 8)
            r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255);
        return r
    }
    function s(n) {
        var t, e = 8 * n.length, r = Array(n.length >> 2), o = r.length;
        for (t = 0; t < o; t += 1)
            r[t] = 0;
        for (t = 0; t < e; t += 8)
            r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32;
        return r
    }
    function D(n) {
        var t, e = 8 * n.length, r = Array(n.length >> 2), o = r.length;
        for (t = 0; t < o; t += 1)
            r[t] = 0;
        for (t = 0; t < e; t += 8)
            r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << 24 - t % 32;
        return r
    }
    function F(n, t) {
        var e, r, o, h, u, i, f, a, c = t.length, D = Array();
        for (h = (i = Array(Math.ceil(n.length / 2))).length,
        e = 0; e < h; e += 1)
            i[e] = n.charCodeAt(2 * e) << 8 | n.charCodeAt(2 * e + 1);
        for (; 0 < i.length; ) {
            for (u = Array(),
            e = o = 0; e < i.length; e += 1)
                o = (o << 16) + i[e],
                o -= (r = Math.floor(o / c)) * c,
                (0 < u.length || 0 < r) && (u[u.length] = r);
            D[D.length] = o,
            i = u
        }
        for (f = "",
        e = D.length - 1; 0 <= e; e--)
            f += t.charAt(D[e]);
        for (a = Math.ceil(8 * n.length / (Math.log(t.length) / Math.log(2))),
        e = f.length; e < a; e += 1)
            f = t[0] + f;
        return f
    }
    function E(n, t) {
        var e, r, o, h = "", u = n.length;
        for (t = t || "=",
        e = 0; e < u; e += 3)
            for (o = n.charCodeAt(e) << 16 | (e + 1 < u ? n.charCodeAt(e + 1) << 8 : 0) | (e + 2 < u ? n.charCodeAt(e + 2) : 0),
            r = 0; r < 4; r += 1)
                8 * e + 6 * r > 8 * n.length ? h += t : h += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(o >>> 6 * (3 - r) & 63);
        return h
    }
    n = {
        VERSION: "1.0.6",
        Base64: function() {
            var D = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
              , B = "="
              , C = !0;
            this.encode = function(n) {
                var t, e, r, o = "", h = n.length;
                for (B = B || "=",
                n = C ? c(n) : n,
                t = 0; t < h; t += 3)
                    for (r = n.charCodeAt(t) << 16 | (t + 1 < h ? n.charCodeAt(t + 1) << 8 : 0) | (t + 2 < h ? n.charCodeAt(t + 2) : 0),
                    e = 0; e < 4; e += 1)
                        o += 8 * h < 8 * t + 6 * e ? B : D.charAt(r >>> 6 * (3 - e) & 63);
                return o
            }
            ,
            this.decode = function(n) {
                var t, e, r, o, h, u, i, f, a = "", c = [];
                if (!n)
                    return n;
                for (t = f = 0,
                n = n.replace(new RegExp("\\" + B,"gi"), ""); e = (i = D.indexOf(n.charAt(t += 1)) << 18 | D.indexOf(n.charAt(t += 1)) << 12 | (h = D.indexOf(n.charAt(t += 1))) << 6 | (u = D.indexOf(n.charAt(t += 1)))) >> 16 & 255,
                r = i >> 8 & 255,
                o = 255 & i,
                c[f += 1] = 64 === h ? String.fromCharCode(e) : 64 === u ? String.fromCharCode(e, r) : String.fromCharCode(e, r, o),
                t < n.length; )
                    ;
                return a = c.join(""),
                a = C ? function(n) {
                    var t, e, r, o, h, u, i = [];
                    if (t = e = r = o = h = 0,
                    n && n.length)
                        for (u = n.length,
                        n += ""; t < u; )
                            e += 1,
                            (r = n.charCodeAt(t)) < 128 ? (i[e] = String.fromCharCode(r),
                            t += 1) : 191 < r && r < 224 ? (o = n.charCodeAt(t + 1),
                            i[e] = String.fromCharCode((31 & r) << 6 | 63 & o),
                            t += 2) : (o = n.charCodeAt(t + 1),
                            h = n.charCodeAt(t + 2),
                            i[e] = String.fromCharCode((15 & r) << 12 | (63 & o) << 6 | 63 & h),
                            t += 3);
                    return i.join("")
                }(a) : a
            }
            ,
            this.setPad = function(n) {
                return B = n || B,
                this
            }
            ,
            this.setTab = function(n) {
                return D = n || D,
                this
            }
            ,
            this.setUTF8 = function(n) {
                return "boolean" == typeof n && (C = n),
                this
            }
        },
        CRC32: function(n) {
            var t, e, r, o = 0, h = 0;
            for (n = c(n),
            t = ["00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 ", "79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 ", "84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F ", "63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD ", "A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC ", "51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 ", "B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 ", "06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 ", "E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 ", "12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 ", "D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 ", "33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 ", "CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 ", "9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E ", "7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D ", "806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 ", "60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA ", "AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 ", "5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 ", "B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 ", "05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 ", "F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA ", "11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 ", "D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F ", "30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E ", "C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D"].join(""),
            o ^= -1,
            e = 0,
            r = n.length; e < r; e += 1)
                h = 255 & (o ^ n.charCodeAt(e)),
                o = o >>> 8 ^ "0x" + t.substr(9 * h, 8);
            return (-1 ^ o) >>> 0
        },
        MD5: function(n) {
            var e = !(!n || "boolean" != typeof n.uppercase) && n.uppercase
              , r = n && "string" == typeof n.pad ? n.pad : "="
              , i = !n || "boolean" != typeof n.utf8 || n.utf8;
            function o(n) {
                return l(f(s(n = i ? c(n) : n), 8 * n.length))
            }
            function h(n, t) {
                var e, r, o, h, u;
                for (n = i ? c(n) : n,
                t = i ? c(t) : t,
                16 < (e = s(n)).length && (e = f(e, 8 * n.length)),
                r = Array(16),
                o = Array(16),
                u = 0; u < 16; u += 1)
                    r[u] = 909522486 ^ e[u],
                    o[u] = 1549556828 ^ e[u];
                return h = f(r.concat(s(t)), 512 + 8 * t.length),
                l(f(o.concat(h), 640))
            }
            function f(n, t) {
                var e, r, o, h, u, i = 1732584193, f = -271733879, a = -1732584194, c = 271733878;
                for (n[t >> 5] |= 128 << t % 32,
                n[14 + (t + 64 >>> 9 << 4)] = t,
                e = 0; e < n.length; e += 16)
                    f = A(f = A(f = A(f = A(f = C(f = C(f = C(f = C(f = B(f = B(f = B(f = B(f = D(f = D(f = D(f = D(o = f, a = D(h = a, c = D(u = c, i = D(r = i, f, a, c, n[e + 0], 7, -680876936), f, a, n[e + 1], 12, -389564586), i, f, n[e + 2], 17, 606105819), c, i, n[e + 3], 22, -1044525330), a = D(a, c = D(c, i = D(i, f, a, c, n[e + 4], 7, -176418897), f, a, n[e + 5], 12, 1200080426), i, f, n[e + 6], 17, -1473231341), c, i, n[e + 7], 22, -45705983), a = D(a, c = D(c, i = D(i, f, a, c, n[e + 8], 7, 1770035416), f, a, n[e + 9], 12, -1958414417), i, f, n[e + 10], 17, -42063), c, i, n[e + 11], 22, -1990404162), a = D(a, c = D(c, i = D(i, f, a, c, n[e + 12], 7, 1804603682), f, a, n[e + 13], 12, -40341101), i, f, n[e + 14], 17, -1502002290), c, i, n[e + 15], 22, 1236535329), a = B(a, c = B(c, i = B(i, f, a, c, n[e + 1], 5, -165796510), f, a, n[e + 6], 9, -1069501632), i, f, n[e + 11], 14, 643717713), c, i, n[e + 0], 20, -373897302), a = B(a, c = B(c, i = B(i, f, a, c, n[e + 5], 5, -701558691), f, a, n[e + 10], 9, 38016083), i, f, n[e + 15], 14, -660478335), c, i, n[e + 4], 20, -405537848), a = B(a, c = B(c, i = B(i, f, a, c, n[e + 9], 5, 568446438), f, a, n[e + 14], 9, -1019803690), i, f, n[e + 3], 14, -187363961), c, i, n[e + 8], 20, 1163531501), a = B(a, c = B(c, i = B(i, f, a, c, n[e + 13], 5, -1444681467), f, a, n[e + 2], 9, -51403784), i, f, n[e + 7], 14, 1735328473), c, i, n[e + 12], 20, -1926607734), a = C(a, c = C(c, i = C(i, f, a, c, n[e + 5], 4, -378558), f, a, n[e + 8], 11, -2022574463), i, f, n[e + 11], 16, 1839030562), c, i, n[e + 14], 23, -35309556), a = C(a, c = C(c, i = C(i, f, a, c, n[e + 1], 4, -1530992060), f, a, n[e + 4], 11, 1272893353), i, f, n[e + 7], 16, -155497632), c, i, n[e + 10], 23, -1094730640), a = C(a, c = C(c, i = C(i, f, a, c, n[e + 13], 4, 681279174), f, a, n[e + 0], 11, -358537222), i, f, n[e + 3], 16, -722521979), c, i, n[e + 6], 23, 76029189), a = C(a, c = C(c, i = C(i, f, a, c, n[e + 9], 4, -640364487), f, a, n[e + 12], 11, -421815835), i, f, n[e + 15], 16, 530742520), c, i, n[e + 2], 23, -995338651), a = A(a, c = A(c, i = A(i, f, a, c, n[e + 0], 6, -198630844), f, a, n[e + 7], 10, 1126891415), i, f, n[e + 14], 15, -1416354905), c, i, n[e + 5], 21, -57434055), a = A(a, c = A(c, i = A(i, f, a, c, n[e + 12], 6, 1700485571), f, a, n[e + 3], 10, -1894986606), i, f, n[e + 10], 15, -1051523), c, i, n[e + 1], 21, -2054922799), a = A(a, c = A(c, i = A(i, f, a, c, n[e + 8], 6, 1873313359), f, a, n[e + 15], 10, -30611744), i, f, n[e + 6], 15, -1560198380), c, i, n[e + 13], 21, 1309151649), a = A(a, c = A(c, i = A(i, f, a, c, n[e + 4], 6, -145523070), f, a, n[e + 11], 10, -1120210379), i, f, n[e + 2], 15, 718787259), c, i, n[e + 9], 21, -343485551),
                    i = _(i, r),
                    f = _(f, o),
                    a = _(a, h),
                    c = _(c, u);
                return Array(i, f, a, c)
            }
            function a(n, t, e, r, o, h) {
                return _(S(_(_(t, n), _(r, h)), o), e)
            }
            function D(n, t, e, r, o, h, u) {
                return a(t & e | ~t & r, n, t, o, h, u)
            }
            function B(n, t, e, r, o, h, u) {
                return a(t & r | e & ~r, n, t, o, h, u)
            }
            function C(n, t, e, r, o, h, u) {
                return a(t ^ e ^ r, n, t, o, h, u)
            }
            function A(n, t, e, r, o, h, u) {
                return a(e ^ (t | ~r), n, t, o, h, u)
            }
            this.hex = function(n) {
                return u(o(n), e)
            }
            ,
            this.b64 = function(n) {
                return E(o(n), r)
            }
            ,
            this.any = function(n, t) {
                return F(o(n), t)
            }
            ,
            this.raw = function(n) {
                return o(n)
            }
            ,
            this.hex_hmac = function(n, t) {
                return u(h(n, t), e)
            }
            ,
            this.b64_hmac = function(n, t) {
                return E(h(n, t), r)
            }
            ,
            this.any_hmac = function(n, t, e) {
                return F(h(n, t), e)
            }
            ,
            this.vm_test = function() {
                return "900150983cd24fb0d6963f7d28e17f72" === hex("abc").toLowerCase()
            }
            ,
            this.setUpperCase = function(n) {
                return "boolean" == typeof n && (e = n),
                this
            }
            ,
            this.setPad = function(n) {
                return r = n || r,
                this
            }
            ,
            this.setUTF8 = function(n) {
                return "boolean" == typeof n && (i = n),
                this
            }
        },
        SHA1: function(n) {
            var t = !(!n || "boolean" != typeof n.uppercase) && n.uppercase
              , e = n && "string" == typeof n.pad ? n.pad : "="
              , i = !n || "boolean" != typeof n.utf8 || n.utf8;
            function r(n) {
                return a(f(D(n = i ? c(n) : n), 8 * n.length))
            }
            function o(n, t) {
                var e, r, o, h, u;
                for (n = i ? c(n) : n,
                t = i ? c(t) : t,
                16 < (e = D(n)).length && (e = f(e, 8 * n.length)),
                r = Array(16),
                o = Array(16),
                h = 0; h < 16; h += 1)
                    r[h] = 909522486 ^ e[h],
                    o[h] = 1549556828 ^ e[h];
                return u = f(r.concat(D(t)), 512 + 8 * t.length),
                a(f(o.concat(u), 672))
            }
            function f(n, t) {
                var e, r, o, h, u, i, f, a, c, D = Array(80), B = 1732584193, C = -271733879, A = -1732584194, l = 271733878, s = -1009589776;
                for (n[t >> 5] |= 128 << 24 - t % 32,
                n[15 + (t + 64 >> 9 << 4)] = t,
                e = 0; e < n.length; e += 16) {
                    for (h = B,
                    u = C,
                    i = A,
                    f = l,
                    a = s,
                    r = 0; r < 80; r += 1)
                        D[r] = r < 16 ? n[e + r] : S(D[r - 3] ^ D[r - 8] ^ D[r - 14] ^ D[r - 16], 1),
                        o = _(_(S(B, 5), w(r, C, A, l)), _(_(s, D[r]), (c = r) < 20 ? 1518500249 : c < 40 ? 1859775393 : c < 60 ? -1894007588 : -899497514)),
                        s = l,
                        l = A,
                        A = S(C, 30),
                        C = B,
                        B = o;
                    B = _(B, h),
                    C = _(C, u),
                    A = _(A, i),
                    l = _(l, f),
                    s = _(s, a)
                }
                return Array(B, C, A, l, s)
            }
            function w(n, t, e, r) {
                return n < 20 ? t & e | ~t & r : n < 40 ? t ^ e ^ r : n < 60 ? t & e | t & r | e & r : t ^ e ^ r
            }
            this.hex = function(n) {
                return u(r(n), t)
            }
            ,
            this.b64 = function(n) {
                return E(r(n), e)
            }
            ,
            this.any = function(n, t) {
                return F(r(n), t)
            }
            ,
            this.raw = function(n) {
                return r(n)
            }
            ,
            this.hex_hmac = function(n, t) {
                return u(o(n, t))
            }
            ,
            this.b64_hmac = function(n, t) {
                return E(o(n, t), e)
            }
            ,
            this.any_hmac = function(n, t, e) {
                return F(o(n, t), e)
            }
            ,
            this.vm_test = function() {
                return "900150983cd24fb0d6963f7d28e17f72" === hex("abc").toLowerCase()
            }
            ,
            this.setUpperCase = function(n) {
                return "boolean" == typeof n && (t = n),
                this
            }
            ,
            this.setPad = function(n) {
                return e = n || e,
                this
            }
            ,
            this.setUTF8 = function(n) {
                return "boolean" == typeof n && (i = n),
                this
            }
        },
        SHA256: function(n) {
            !(!n || "boolean" != typeof n.uppercase) && n.uppercase;
            var b, e = n && "string" == typeof n.pad ? n.pad : "=", i = !n || "boolean" != typeof n.utf8 || n.utf8;
            function r(n, t) {
                return a(f(D(n = t ? c(n) : n), 8 * n.length))
            }
            function o(n, t) {
                n = i ? c(n) : n,
                t = i ? c(t) : t;
                var e, r = 0, o = D(n), h = Array(16), u = Array(16);
                for (16 < o.length && (o = f(o, 8 * n.length)); r < 16; r += 1)
                    h[r] = 909522486 ^ o[r],
                    u[r] = 1549556828 ^ o[r];
                return e = f(h.concat(D(t)), 512 + 8 * t.length),
                a(f(u.concat(e), 768))
            }
            function v(n, t) {
                return n >>> t | n << 32 - t
            }
            function m(n, t) {
                return n >>> t
            }
            function f(n, t) {
                var e, r, o, h, u, i, f, a, c, D, B, C, A, l, s, w, F, E, g, d, p = [1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225], y = new Array(64);
                for (n[t >> 5] |= 128 << 24 - t % 32,
                n[15 + (t + 64 >> 9 << 4)] = t,
                c = 0; c < n.length; c += 16) {
                    for (e = p[0],
                    r = p[1],
                    o = p[2],
                    h = p[3],
                    u = p[4],
                    i = p[5],
                    f = p[6],
                    a = p[7],
                    D = 0; D < 64; D += 1)
                        y[D] = D < 16 ? n[D + c] : _(_(_(v(d = y[D - 2], 17) ^ v(d, 19) ^ m(d, 10), y[D - 7]), v(g = y[D - 15], 7) ^ v(g, 18) ^ m(g, 3)), y[D - 16]),
                        B = _(_(_(_(a, v(E = u, 6) ^ v(E, 11) ^ v(E, 25)), (F = u) & i ^ ~F & f), b[D]), y[D]),
                        C = _(v(w = e, 2) ^ v(w, 13) ^ v(w, 22), (A = e) & (l = r) ^ A & (s = o) ^ l & s),
                        a = f,
                        f = i,
                        i = u,
                        u = _(h, B),
                        h = o,
                        o = r,
                        r = e,
                        e = _(B, C);
                    p[0] = _(e, p[0]),
                    p[1] = _(r, p[1]),
                    p[2] = _(o, p[2]),
                    p[3] = _(h, p[3]),
                    p[4] = _(u, p[4]),
                    p[5] = _(i, p[5]),
                    p[6] = _(f, p[6]),
                    p[7] = _(a, p[7])
                }
                return p
            }
            this.hex = function(n) {
                return u(r(n, i))
            }
            ,
            this.b64 = function(n) {
                return E(r(n, i), e)
            }
            ,
            this.any = function(n, t) {
                return F(r(n, i), t)
            }
            ,
            this.raw = function(n) {
                return r(n, i)
            }
            ,
            this.hex_hmac = function(n, t) {
                return u(o(n, t))
            }
            ,
            this.b64_hmac = function(n, t) {
                return E(o(n, t), e)
            }
            ,
            this.any_hmac = function(n, t, e) {
                return F(o(n, t), e)
            }
            ,
            this.vm_test = function() {
                return "900150983cd24fb0d6963f7d28e17f72" === hex("abc").toLowerCase()
            }
            ,
            this.setUpperCase = function(n) {
                return "boolean" == typeof n && n,
                this
            }
            ,
            this.setPad = function(n) {
                return e = n || e,
                this
            }
            ,
            this.setUTF8 = function(n) {
                return "boolean" == typeof n && (i = n),
                this
            }
            ,
            b = [1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993, -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987, 1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885, -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872, -1866530822, -1538233109, -1090935817, -965641998]
        },
        SHA512: function(n) {
            !(!n || "boolean" != typeof n.uppercase) && n.uppercase;
            var v, e = n && "string" == typeof n.pad ? n.pad : "=", i = !n || "boolean" != typeof n.utf8 || n.utf8;
            function r(n) {
                return a(f(D(n = i ? c(n) : n), 8 * n.length))
            }
            function o(n, t) {
                n = i ? c(n) : n,
                t = i ? c(t) : t;
                var e, r = 0, o = D(n), h = Array(32), u = Array(32);
                for (32 < o.length && (o = f(o, 8 * n.length)); r < 32; r += 1)
                    h[r] = 909522486 ^ o[r],
                    u[r] = 1549556828 ^ o[r];
                return e = f(h.concat(D(t)), 1024 + 8 * t.length),
                a(f(u.concat(e), 1536))
            }
            function f(n, t) {
                var e, r, o, h = new Array(80), u = new Array(16), i = [new m(1779033703,-205731576), new m(-1150833019,-2067093701), new m(1013904242,-23791573), new m(-1521486534,1595750129), new m(1359893119,-1377402159), new m(-1694144372,725511199), new m(528734635,-79577749), new m(1541459225,327033209)], f = new m(0,0), a = new m(0,0), c = new m(0,0), D = new m(0,0), B = new m(0,0), C = new m(0,0), A = new m(0,0), l = new m(0,0), s = new m(0,0), w = new m(0,0), F = new m(0,0), E = new m(0,0), g = new m(0,0), d = new m(0,0), p = new m(0,0), y = new m(0,0), b = new m(0,0);
                for (void 0 === v && (v = [new m(1116352408,-685199838), new m(1899447441,602891725), new m(-1245643825,-330482897), new m(-373957723,-2121671748), new m(961987163,-213338824), new m(1508970993,-1241133031), new m(-1841331548,-1357295717), new m(-1424204075,-630357736), new m(-670586216,-1560083902), new m(310598401,1164996542), new m(607225278,1323610764), new m(1426881987,-704662302), new m(1925078388,-226784913), new m(-2132889090,991336113), new m(-1680079193,633803317), new m(-1046744716,-815192428), new m(-459576895,-1628353838), new m(-272742522,944711139), new m(264347078,-1953704523), new m(604807628,2007800933), new m(770255983,1495990901), new m(1249150122,1856431235), new m(1555081692,-1119749164), new m(1996064986,-2096016459), new m(-1740746414,-295247957), new m(-1473132947,766784016), new m(-1341970488,-1728372417), new m(-1084653625,-1091629340), new m(-958395405,1034457026), new m(-710438585,-1828018395), new m(113926993,-536640913), new m(338241895,168717936), new m(666307205,1188179964), new m(773529912,1546045734), new m(1294757372,1522805485), new m(1396182291,-1651133473), new m(1695183700,-1951439906), new m(1986661051,1014477480), new m(-2117940946,1206759142), new m(-1838011259,344077627), new m(-1564481375,1290863460), new m(-1474664885,-1136513023), new m(-1035236496,-789014639), new m(-949202525,106217008), new m(-778901479,-688958952), new m(-694614492,1432725776), new m(-200395387,1467031594), new m(275423344,851169720), new m(430227734,-1194143544), new m(506948616,1363258195), new m(659060556,-544281703), new m(883997877,-509917016), new m(958139571,-976659869), new m(1322822218,-482243893), new m(1537002063,2003034995), new m(1747873779,-692930397), new m(1955562222,1575990012), new m(2024104815,1125592928), new m(-2067236844,-1578062990), new m(-1933114872,442776044), new m(-1866530822,593698344), new m(-1538233109,-561857047), new m(-1090935817,-1295615723), new m(-965641998,-479046869), new m(-903397682,-366583396), new m(-779700025,566280711), new m(-354779690,-840897762), new m(-176337025,-294727304), new m(116418474,1914138554), new m(174292421,-1563912026), new m(289380356,-1090974290), new m(460393269,320620315), new m(685471733,587496836), new m(852142971,1086792851), new m(1017036298,365543100), new m(1126000580,-1676669620), new m(1288033470,-885112138), new m(1501505948,-60457430), new m(1607167915,987167468), new m(1816402316,1246189591)]),
                r = 0; r < 80; r += 1)
                    h[r] = new m(0,0);
                for (n[t >> 5] |= 128 << 24 - (31 & t),
                n[31 + (t + 128 >> 10 << 5)] = t,
                o = n.length,
                r = 0; r < o; r += 32) {
                    for (x(c, i[0]),
                    x(D, i[1]),
                    x(B, i[2]),
                    x(C, i[3]),
                    x(A, i[4]),
                    x(l, i[5]),
                    x(s, i[6]),
                    x(w, i[7]),
                    e = 0; e < 16; e += 1)
                        h[e].h = n[r + 2 * e],
                        h[e].l = n[r + 2 * e + 1];
                    for (e = 16; e < 80; e += 1)
                        _(p, h[e - 2], 19),
                        S(y, h[e - 2], 29),
                        U(b, h[e - 2], 6),
                        E.l = p.l ^ y.l ^ b.l,
                        E.h = p.h ^ y.h ^ b.h,
                        _(p, h[e - 15], 1),
                        _(y, h[e - 15], 8),
                        U(b, h[e - 15], 7),
                        F.l = p.l ^ y.l ^ b.l,
                        F.h = p.h ^ y.h ^ b.h,
                        T(h[e], E, h[e - 7], F, h[e - 16]);
                    for (e = 0; e < 80; e += 1)
                        g.l = A.l & l.l ^ ~A.l & s.l,
                        g.h = A.h & l.h ^ ~A.h & s.h,
                        _(p, A, 14),
                        _(y, A, 18),
                        S(b, A, 9),
                        E.l = p.l ^ y.l ^ b.l,
                        E.h = p.h ^ y.h ^ b.h,
                        _(p, c, 28),
                        S(y, c, 2),
                        S(b, c, 7),
                        F.l = p.l ^ y.l ^ b.l,
                        F.h = p.h ^ y.h ^ b.h,
                        d.l = c.l & D.l ^ c.l & B.l ^ D.l & B.l,
                        d.h = c.h & D.h ^ c.h & B.h ^ D.h & B.h,
                        j(f, w, E, g, v[e], h[e]),
                        M(a, F, d),
                        x(w, s),
                        x(s, l),
                        x(l, A),
                        M(A, C, f),
                        x(C, B),
                        x(B, D),
                        x(D, c),
                        M(c, f, a);
                    M(i[0], i[0], c),
                    M(i[1], i[1], D),
                    M(i[2], i[2], B),
                    M(i[3], i[3], C),
                    M(i[4], i[4], A),
                    M(i[5], i[5], l),
                    M(i[6], i[6], s),
                    M(i[7], i[7], w)
                }
                for (r = 0; r < 8; r += 1)
                    u[2 * r] = i[r].h,
                    u[2 * r + 1] = i[r].l;
                return u
            }
            function m(n, t) {
                this.h = n,
                this.l = t
            }
            function x(n, t) {
                n.h = t.h,
                n.l = t.l
            }
            function _(n, t, e) {
                n.l = t.l >>> e | t.h << 32 - e,
                n.h = t.h >>> e | t.l << 32 - e
            }
            function S(n, t, e) {
                n.l = t.h >>> e | t.l << 32 - e,
                n.h = t.l >>> e | t.h << 32 - e
            }
            function U(n, t, e) {
                n.l = t.l >>> e | t.h << 32 - e,
                n.h = t.h >>> e
            }
            function M(n, t, e) {
                var r = (65535 & t.l) + (65535 & e.l)
                  , o = (t.l >>> 16) + (e.l >>> 16) + (r >>> 16)
                  , h = (65535 & t.h) + (65535 & e.h) + (o >>> 16)
                  , u = (t.h >>> 16) + (e.h >>> 16) + (h >>> 16);
                n.l = 65535 & r | o << 16,
                n.h = 65535 & h | u << 16
            }
            function T(n, t, e, r, o) {
                var h = (65535 & t.l) + (65535 & e.l) + (65535 & r.l) + (65535 & o.l)
                  , u = (t.l >>> 16) + (e.l >>> 16) + (r.l >>> 16) + (o.l >>> 16) + (h >>> 16)
                  , i = (65535 & t.h) + (65535 & e.h) + (65535 & r.h) + (65535 & o.h) + (u >>> 16)
                  , f = (t.h >>> 16) + (e.h >>> 16) + (r.h >>> 16) + (o.h >>> 16) + (i >>> 16);
                n.l = 65535 & h | u << 16,
                n.h = 65535 & i | f << 16
            }
            function j(n, t, e, r, o, h) {
                var u = (65535 & t.l) + (65535 & e.l) + (65535 & r.l) + (65535 & o.l) + (65535 & h.l)
                  , i = (t.l >>> 16) + (e.l >>> 16) + (r.l >>> 16) + (o.l >>> 16) + (h.l >>> 16) + (u >>> 16)
                  , f = (65535 & t.h) + (65535 & e.h) + (65535 & r.h) + (65535 & o.h) + (65535 & h.h) + (i >>> 16)
                  , a = (t.h >>> 16) + (e.h >>> 16) + (r.h >>> 16) + (o.h >>> 16) + (h.h >>> 16) + (f >>> 16);
                n.l = 65535 & u | i << 16,
                n.h = 65535 & f | a << 16
            }
            this.hex = function(n) {
                return u(r(n))
            }
            ,
            this.b64 = function(n) {
                return E(r(n), e)
            }
            ,
            this.any = function(n, t) {
                return F(r(n), t)
            }
            ,
            this.raw = function(n) {
                return r(n)
            }
            ,
            this.hex_hmac = function(n, t) {
                return u(o(n, t))
            }
            ,
            this.b64_hmac = function(n, t) {
                return E(o(n, t), e)
            }
            ,
            this.any_hmac = function(n, t, e) {
                return F(o(n, t), e)
            }
            ,
            this.vm_test = function() {
                return "900150983cd24fb0d6963f7d28e17f72" === hex("abc").toLowerCase()
            }
            ,
            this.setUpperCase = function(n) {
                return "boolean" == typeof n && n,
                this
            }
            ,
            this.setPad = function(n) {
                return e = n || e,
                this
            }
            ,
            this.setUTF8 = function(n) {
                return "boolean" == typeof n && (i = n),
                this
            }
        },
        RMD160: function(n) {
            !(!n || "boolean" != typeof n.uppercase) && n.uppercase;
            var e = n && "string" == typeof n.pad ? n.pa : "="
              , i = !n || "boolean" != typeof n.utf8 || n.utf8
              , y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]
              , b = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]
              , v = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]
              , m = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11];
            function r(n) {
                return f(a(s(n = i ? c(n) : n), 8 * n.length))
            }
            function o(n, t) {
                n = i ? c(n) : n,
                t = i ? c(t) : t;
                var e, r, o = s(n), h = Array(16), u = Array(16);
                for (16 < o.length && (o = a(o, 8 * n.length)),
                e = 0; e < 16; e += 1)
                    h[e] = 909522486 ^ o[e],
                    u[e] = 1549556828 ^ o[e];
                return r = a(h.concat(s(t)), 512 + 8 * t.length),
                f(a(u.concat(r), 672))
            }
            function f(n) {
                var t, e = "", r = 32 * n.length;
                for (t = 0; t < r; t += 8)
                    e += String.fromCharCode(n[t >> 5] >>> t % 32 & 255);
                return e
            }
            function a(n, t) {
                var e, r, o, h, u, i, f, a, c, D, B, C, A, l, s, w, F = 1732584193, E = 4023233417, g = 2562383102, d = 271733878, p = 3285377520;
                for (n[t >> 5] |= 128 << t % 32,
                n[14 + (t + 64 >>> 9 << 4)] = t,
                h = n.length,
                o = 0; o < h; o += 16) {
                    for (u = D = F,
                    i = B = E,
                    f = C = g,
                    a = A = d,
                    c = l = p,
                    r = 0; r <= 79; r += 1)
                        e = _(S(e = _(e = _(e = _(u, x(r, i, f, a)), n[o + y[r]]), 0 <= (w = r) && w <= 15 ? 0 : 16 <= w && w <= 31 ? 1518500249 : 32 <= w && w <= 47 ? 1859775393 : 48 <= w && w <= 63 ? 2400959708 : 64 <= w && w <= 79 ? 2840853838 : "rmd160_K1: j out of range"), v[r]), c),
                        u = c,
                        c = a,
                        a = S(f, 10),
                        f = i,
                        i = e,
                        e = _(S(e = _(e = _(e = _(D, x(79 - r, B, C, A)), n[o + b[r]]), 0 <= (s = r) && s <= 15 ? 1352829926 : 16 <= s && s <= 31 ? 1548603684 : 32 <= s && s <= 47 ? 1836072691 : 48 <= s && s <= 63 ? 2053994217 : 64 <= s && s <= 79 ? 0 : "rmd160_K2: j out of range"), m[r]), l),
                        D = l,
                        l = A,
                        A = S(C, 10),
                        C = B,
                        B = e;
                    e = _(E, _(f, A)),
                    E = _(g, _(a, l)),
                    g = _(d, _(c, D)),
                    d = _(p, _(u, B)),
                    p = _(F, _(i, C)),
                    F = e
                }
                return [F, E, g, d, p]
            }
            function x(n, t, e, r) {
                return 0 <= n && n <= 15 ? t ^ e ^ r : 16 <= n && n <= 31 ? t & e | ~t & r : 32 <= n && n <= 47 ? (t | ~e) ^ r : 48 <= n && n <= 63 ? t & r | e & ~r : 64 <= n && n <= 79 ? t ^ (e | ~r) : "rmd160_f: j out of range"
            }
            this.hex = function(n) {
                return u(r(n))
            }
            ,
            this.b64 = function(n) {
                return E(r(n), e)
            }
            ,
            this.any = function(n, t) {
                return F(r(n), t)
            }
            ,
            this.raw = function(n) {
                return r(n)
            }
            ,
            this.hex_hmac = function(n, t) {
                return u(o(n, t))
            }
            ,
            this.b64_hmac = function(n, t) {
                return E(o(n, t), e)
            }
            ,
            this.any_hmac = function(n, t, e) {
                return F(o(n, t), e)
            }
            ,
            this.vm_test = function() {
                return "900150983cd24fb0d6963f7d28e17f72" === hex("abc").toLowerCase()
            }
            ,
            this.setUpperCase = function(n) {
                return "boolean" == typeof n && n,
                this
            }
            ,
            this.setPad = function(n) {
                return void 0 !== n && (e = n),
                this
            }
            ,
            this.setUTF8 = function(n) {
                return "boolean" == typeof n && (i = n),
                this
            }
        }
    },
    (t = this).scpixel || (t.scpixel = {}),
    t.scpixel.Hashes = n
}();
