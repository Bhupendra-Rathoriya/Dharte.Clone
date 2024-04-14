/*! Striking MultiFlex
 * https://kaptinlin.com/themes/strikingr
 * Copyright (c) 2015 Lyon Holding Limited */

//Match media
window.matchMedia || (window.matchMedia = function() {
        "use strict";
        var a = window.styleMedia || window.media;
        if (!a) {
            var b = document.createElement("style"),
                c = document.getElementsByTagName("script")[0],
                d = null;
            b.type = "text/css", b.id = "matchmediajs-test", c.parentNode.insertBefore(b, c), d = "getComputedStyle" in window && window.getComputedStyle(b, null) || b.currentStyle, a = {
                matchMedium: function(a) {
                    var c = "@media " + a + "{ #matchmediajs-test { width: 1px; } }";
                    return b.styleSheet ? b.styleSheet.cssText = c : b.textContent = c, "1px" === d.width
                }
            }
        }
        return function(b) {
            return {
                matches: a.matchMedium(b || "all"),
                media: b || "all"
            }
        }
    }()),

    //Match media Add Listerners
    function() {
        if (window.matchMedia && window.matchMedia("all").addListener) return !1;
        var a = window.matchMedia,
            b = a("only all").matches,
            c = !1,
            d = 0,
            e = [],
            f = function() {
                clearTimeout(d), d = setTimeout(function() {
                    for (var b = 0, c = e.length; c > b; b++) {
                        var d = e[b].mql,
                            f = e[b].listeners || [],
                            g = a(d.media).matches;
                        if (g !== d.matches) {
                            d.matches = g;
                            for (var h = 0, i = f.length; i > h; h++) f[h].call(window, d)
                        }
                    }
                }, 30)
            };
        window.matchMedia = function(d) {
            var g = a(d),
                h = [],
                i = 0;
            return g.addListener = function(a) {
                b && (c || (c = !0, window.addEventListener("resize", f, !0)), 0 === i && (i = e.push({
                    mql: g,
                    listeners: h
                })), h.push(a))
            }, g.removeListener = function(a) {
                for (var b = 0, c = h.length; c > b; b++) h[b] === a && h.splice(b, 1)
            }, g
        }
    }(),

    //jquery-nav
    ! function(a, b) {
        "use strict";
        var d = "nav",
            e = b.nav = function(a, c) {
                function h() {
                    e.windowDimensions = g.getWindowDimensions(), i(), b(window).on("resize", g.resize)
                }

                function i() {
                    f = !0;
                    var a = g.$nav.find("> li");
                    j(a, g.settings.root), j(a.find("li"), g.settings.child)
                }

                function j(a, c) {
                    g.hover(a, c.hoverIntent, c.delay, function() {
                        var a = this,
                            d = b(this).find("> ul");
                        if (c.beforeHoverIn.call(a), d.length > 0) {
                            var f = b(a).data("check");
                            "undefined" === typeof f && c.beforeFirstRender.call(a), ("undefined" === typeof f || f !== e.windowDimensions) && (c.position.call(a, d, g), b(a).data("check", e.windowDimensions)), "fade" === c.effect ? d.hide().css("visibility", "visible").fadeIn(c.inDuration, function() {
                                c.afterHoverIn.call(a)
                            }) : d.hide().css("visibility", "visible").slideDown(c.inDuration, function() {
                                c.afterHoverIn.call(a)
                            })
                        } else c.afterHoverIn.call(a)
                    }, function() {
                        var a = this,
                            d = b(this).find("> ul");
                        c.beforeHoverOut.call(a), d.length > 0 ? "fade" === c.effect ? d.fadeOut(c.outDuration, function() {
                            d.css("visibility", "hidden"), c.afterHoverOut.call(a)
                        }) : d.slideUp(c.outDuration, function() {
                            d.css("visibility", "hidden"), c.afterHoverOut.call(a)
                        }) : c.afterHoverOut.call(a)
                    })
                }
                this.nav = a, this.$nav = b(a), this.settings = b.extend(!0, {}, e.defaults, c);
                var f = !1,
                    g = this;
                null == this.settings.rtl && (this.settings.rtl = function(a) {
                    if ("rtl" === ("" + a.attr("dir")).toLowerCase()) return !0;
                    var c = !1;
                    return a.parents("[dir]").each(function() {
                        return /rtl/i.test(b(this).attr("dir")) ? (c = !0, !1) : void 0
                    }), c
                }(this.$nav)), this.settings.rtl ? (this.dirAttribute = "right", this.$nav.addClass(d + "_rtl")) : this.dirAttribute = "left", b.extend(g, {
                    getNav: function() {
                        return this.$nav
                    },
                    getCurrent: function() {
                        var a = this.$nav.find(this.settings.currentSelector);
                        return 0 === a.length && (a = this.$nav.find("li:first")), a.find("> a")
                    },
                    getWindowDimensions: function() {
                        return {
                            w: b(window).width(),
                            h: b(window).height()
                        }
                    },
                    resize: function() {
                        e.windowDimensions = g.getWindowDimensions()
                    },
                    isBuilted: function() {
                        return f
                    },
                    hover: function(a, c, d, e, f) {
                        "undefined" !== typeof b.fn.hoverIntent ? b(a).hoverIntent({
                            sensitivity: 30,
                            interval: c,
                            timeout: d,
                            over: e,
                            out: f
                        }) : (b(a).on("mouseenter", e), b(a).on("mouseleave", f))
                    }
                }), h()
            };
        e.defaults = {
            root: {
                effect: "slide",
                delay: 100,
                hoverIntent: 100,
                inDuration: 200,
                outDuration: 200,
                beforeHoverIn: function() {},
                afterHoverIn: function() {
                    b(this).addClass("is-open")
                },
                beforeHoverOut: function() {},
                afterHoverOut: function() {
                    b(this).removeClass("is-open")
                },
                beforeFirstRender: function() {},
                position: function(a, c) {
                    var d = this,
                        f = b(this);
                    a.css({
                        left: "",
                        right: ""
                    });
                    var g = {
                            left: f.offset().left,
                            top: f.offset().top
                        },
                        h = {
                            w: a.outerWidth(),
                            h: a.outerHeight()
                        };
                    a.css(c.settings.rtl ? g.left > h.w ? {
                        right: 0
                    } : g.left + d.offsetWidth < h.w ? {
                        right: -h.w + d.offsetWidth
                    } : {
                        right: "auto",
                        left: 0
                    } : g.left + h.w < e.windowDimensions.w ? {
                        left: 0
                    } : g.left + d.offsetWidth < h.w ? g.left < e.windowDimensions.w / 2 ? {
                        left: -g.left + c.$nav.offset().left
                    } : {
                        left: e.windowDimensions.w - g.left - h.w - c.$nav.offset().left
                    } : {
                        left: "auto",
                        right: 0
                    })
                }
            },
            child: {
                effect: "fade",
                delay: 150,
                hoverIntent: 0,
                inDuration: 200,
                outDuration: 200,
                beforeHoverIn: function() {},
                afterHoverIn: function() {
                    b(this).addClass("is-open")
                },
                beforeHoverOut: function() {},
                afterHoverOut: function() {
                    b(this).removeClass("is-open")
                },
                beforeFirstRender: function() {},
                position: function(a, c) {
                    var d = this,
                        f = b(d);
                    a.css({
                        left: "",
                        right: ""
                    });
                    var g = {
                            left: f.offset().left,
                            top: f.offset().top
                        },
                        h = {
                            w: a.outerWidth(),
                            h: a.outerHeight()
                        };
                    a.css(c.settings.rtl ? d.offsetWidth < g.left ? {
                        right: d.offsetWidth
                    } : {
                        right: 0 - d.offsetWidth
                    } : g.left + d.offsetWidth + h.w < e.windowDimensions.w ? {
                        left: d.offsetWidth
                    } : {
                        left: 0 - d.offsetWidth
                    })
                }
            }
        }, b.fn.nav = function(a) {
            return this.each(function() {
                b.data(this, d) || b.data(this, d, new e(this, a))
            })
        }
    }(document, jQuery),

    //NavtoSelect
    ! function(a, b, c) {
        "use strict";
        var e = function(b, d) {
            this.element = b, this.$element = c(b), this._isBuilded = !1, this.options = c.extend(e.defaults, d);
            var f = this;
            c.extend(f, {
                init: function() {
                    var b = f.getItems();
                    f.build(b), f.$select.on("change", f.options.onChange), f.$element.trigger("navToSelect::ready"), c(a).on("orientationchange", function() {
                        f.$select.is(":hidden") && f.$select.is(":focus") && f.$select.trigger("blur")
                    })
                },
                build: function(a) {
                    f.$select = c("<select />", {
                        "class": f.options.namespace
                    }).html(f.buildOptions(a, 1)), null === f.options.prependTo ? f.$element.after(f.$select) : f.$select.prependTo(f.options.prependTo), f._isBuilded = !0
                },
                buildOption: function(a, b) {
                    var c = new Array(b).join(f.options.indentString);
                    return 1 !== b && f.options.indentSpace && (c += "&nbsp;"), '<option value="' + a.value + '"' + (a.linkable === !1 ? ' data-linkable="false"' : "") + (a.actived === !0 ? ' selected="selected"' : "") + ">" + c + a.label + "</option>"
                },
                buildOptions: function(a, b) {
                    if (b > f.options.maxLevel) return "";
                    var d = "";
                    return c.each(a, function(a, c) {
                        c.linkable === !1 && "undefined" !== typeof c.items && 1 === b && f.options.useOptgroup && (d += '<optgroup label="' + c.label + '">', d += f.buildOptions(c.items, b + 1), d += "</optgroup>"), "undefined" !== typeof c.items ? (d += f.buildOption(c, b), d += f.buildOptions(c.items, b + 1)) : d += f.buildOption(c, b)
                    }), d
                },
                getItems: function() {
                    var a = [];
                    return f.options.placeholder && (a = a.concat({
                        value: "#",
                        label: f.options.placeholder,
                        linkable: !1
                    })), a = a.concat(f.options.getItemsFromList.call(f, f.$element, 1))
                },
                getItemValue: function(a) {
                    return a.find(f.options.linkSelector).attr("href")
                },
                isLinkable: function(a) {
                    return "#" !== f.getItemValue(a)
                },
                isActived: function(a) {
                    return a.is("." + f.options.activeClass)
                },
                isBuilded: function() {
                    return f._isBuilded
                }
            }), this.init()
        };
        e.defaults = {
            maxLevel: 4,
            prependTo: null,
            activeClass: "active",
            linkSelector: "a:first",
            indentString: "&ndash;",
            indentSpace: !0,
            placeholder: "Navigate to...",
            useOptgroup: !1,
            namespace: "navToSelect",
            itemFilter: function() {
                return !0
            },
            getItemLabel: function(a) {
                return a.find(this.options.linkSelector).text()
            },
            getItemsFromList: function(a, b) {
                var d = this,
                    e = [];
                return a.children("li").each(function() {
                    var a = c(this);
                    if (d.options.itemFilter(a)) {
                        var f = {
                            value: d.getItemValue(a),
                            label: d.options.getItemLabel.call(d, a),
                            linkable: d.isLinkable(a),
                            actived: d.isActived(a)
                        };
                        a.children("ul, ol").length && (f.items = [], a.children("ul, ol").each(function() {
                            f.items = f.items.concat(d.options.getItemsFromList.call(d, c(this), b + 1))
                        })), e.push(f)
                    }
                }), e
            },
            onChange: function() {
                c(this).data("linkable") !== !1 && (b.location.href = this.value)
            }
        }, e.prototype = {
            constructor: e,
            getSelect: function() {
                return this.$select
            },
            destroy: function() {
                this.$select.remove(), this.$element.data("NavToSelect", null)
            }
        }, c.fn.navToSelect = function(a) {
            if ("string" !== typeof a) return this.each(function() {
                var b = c.data(this, "navToSelect");
                b || (b = new e(this, a), c.data(this, "navToSelect", b))
            });
            var b = a,
                d = Array.prototype.slice.call(arguments, 1);
            if (!/^(getSelect)$/.test(b)) return this.each(function() {
                var a = c.data(this, "navToSelect");
                a && "function" === typeof a[b] && a[b].apply(a, d)
            });
            var f = this.first().data("navToSelect");
            return f && "function" === typeof f[b] ? f[b].apply(f, d) : void 0
        }
    }(window, document, jQuery),

    //enquire.js
    function(a, b, c) {
        var d = window.matchMedia;
        "undefined" != typeof module && module.exports ? module.exports = c(d) : "function" == typeof define && define.amd ? define(function() {
            return b[a] = c(d)
        }) : b[a] = c(d)
    }("enquire", this, function(a) {
        "use strict";

        function b(a, b) {
            var c, d = 0,
                e = a.length;
            for (d; e > d && (c = b(a[d], d), c !== !1); d++);
        }

        function c(a) {
            return "[object Array]" === Object.prototype.toString.apply(a)
        }

        function d(a) {
            return "function" == typeof a
        }

        function e(a) {
            this.options = a, !a.deferSetup && this.setup()
        }

        function f(b, c) {
            this.query = b, this.isUnconditional = c, this.handlers = [], this.mql = a(b);
            var d = this;
            this.listener = function(a) {
                d.mql = a, d.assess()
            }, this.mql.addListener(this.listener)
        }

        function g() {
            if (!a) throw new Error("matchMedia not present, legacy browsers require a polyfill");
            this.queries = {}, this.browserIsIncapable = !a("only all").matches
        }
        return e.prototype = {
            setup: function() {
                this.options.setup && this.options.setup(), this.initialised = !0
            },
            on: function() {
                !this.initialised && this.setup(), this.options.match && this.options.match()
            },
            off: function() {
                this.options.unmatch && this.options.unmatch()
            },
            destroy: function() {
                this.options.destroy ? this.options.destroy() : this.off()
            },
            equals: function(a) {
                return this.options === a || this.options.match === a
            }
        }, f.prototype = {
            addHandler: function(a) {
                var b = new e(a);
                this.handlers.push(b), this.matches() && b.on()
            },
            removeHandler: function(a) {
                var c = this.handlers;
                b(c, function(b, d) {
                    return b.equals(a) ? (b.destroy(), !c.splice(d, 1)) : void 0
                })
            },
            matches: function() {
                return this.mql.matches || this.isUnconditional
            },
            clear: function() {
                b(this.handlers, function(a) {
                    a.destroy()
                }), this.mql.removeListener(this.listener), this.handlers.length = 0
            },
            assess: function() {
                var a = this.matches() ? "on" : "off";
                b(this.handlers, function(b) {
                    b[a]()
                })
            }
        }, g.prototype = {
            register: function(a, e, g) {
                var h = this.queries,
                    i = g && this.browserIsIncapable;
                return h[a] || (h[a] = new f(a, i)), d(e) && (e = {
                    match: e
                }), c(e) || (e = [e]), b(e, function(b) {
                    d(b) && (b = {
                        match: b
                    }), h[a].addHandler(b)
                }), this
            },
            unregister: function(a, b) {
                var c = this.queries[a];
                return c && (b ? c.removeHandler(b) : (c.clear(), delete this.queries[a])), this
            }
        }, new g
    }),

    //jquery.imagesloaded.js
    ! function(t, e) {
        "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
    }("undefined" != typeof window ? window : this, (function() {
        function t() {}
        let e = t.prototype;
        return e.on = function(t, e) {
            if (!t || !e) return this;
            let i = this._events = this._events || {},
                s = i[t] = i[t] || [];
            return s.includes(e) || s.push(e), this
        }, e.once = function(t, e) {
            if (!t || !e) return this;
            this.on(t, e);
            let i = this._onceEvents = this._onceEvents || {};
            return (i[t] = i[t] || {})[e] = !0, this
        }, e.off = function(t, e) {
            let i = this._events && this._events[t];
            if (!i || !i.length) return this;
            let s = i.indexOf(e);
            return -1 != s && i.splice(s, 1), this
        }, e.emitEvent = function(t, e) {
            let i = this._events && this._events[t];
            if (!i || !i.length) return this;
            i = i.slice(0), e = e || [];
            let s = this._onceEvents && this._onceEvents[t];
            for (let n of i) {
                s && s[n] && (this.off(t, n), delete s[n]), n.apply(this, e)
            }
            return this
        }, e.allOff = function() {
            return delete this._events, delete this._onceEvents, this
        }, t
    })),

    function(t, e) {
        "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
    }("undefined" != typeof window ? window : this, (function(t, e) {
        let i = t.jQuery,
            s = t.console;

        function n(t, e, o) {
            if (!(this instanceof n)) return new n(t, e, o);
            let r = t;
            var h;
            ("string" == typeof t && (r = document.querySelectorAll(t)), r) ? (this.elements = (h = r, Array.isArray(h) ? h : "object" == typeof h && "number" == typeof h.length ? [...h] : [h]), this.options = {}, "function" == typeof e ? o = e : Object.assign(this.options, e), o && this.on("always", o), this.getImages(), i && (this.jqDeferred = new i.Deferred), setTimeout(this.check.bind(this))) : s.error(`Bad element for imagesLoaded ${r||t}`)
        }
        n.prototype = Object.create(e.prototype), n.prototype.getImages = function() {
            this.images = [], this.elements.forEach(this.addElementImages, this)
        };
        const o = [1, 9, 11];
        n.prototype.addElementImages = function(t) {
            "IMG" === t.nodeName && this.addImage(t), !0 === this.options.background && this.addElementBackgroundImages(t);
            let {
                nodeType: e
            } = t;
            if (!e || !o.includes(e)) return;
            let i = t.querySelectorAll("img");
            for (let t of i) this.addImage(t);
            if ("string" == typeof this.options.background) {
                let e = t.querySelectorAll(this.options.background);
                for (let t of e) this.addElementBackgroundImages(t)
            }
        };
        const r = /url\((['"])?(.*?)\1\)/gi;

        function h(t) {
            this.img = t
        }

        function d(t, e) {
            this.url = t, this.element = e, this.img = new Image
        }
        return n.prototype.addElementBackgroundImages = function(t) {
            let e = getComputedStyle(t);
            if (!e) return;
            let i = r.exec(e.backgroundImage);
            for (; null !== i;) {
                let s = i && i[2];
                s && this.addBackground(s, t), i = r.exec(e.backgroundImage)
            }
        }, n.prototype.addImage = function(t) {
            let e = new h(t);
            this.images.push(e)
        }, n.prototype.addBackground = function(t, e) {
            let i = new d(t, e);
            this.images.push(i)
        }, n.prototype.check = function() {
            if (this.progressedCount = 0, this.hasAnyBroken = !1, !this.images.length) return void this.complete();
            let t = (t, e, i) => {
                setTimeout((() => {
                    this.progress(t, e, i)
                }))
            };
            this.images.forEach((function(e) {
                e.once("progress", t), e.check()
            }))
        }, n.prototype.progress = function(t, e, i) {
            this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount === this.images.length && this.complete(), this.options.debug && s && s.log(`progress: ${i}`, t, e)
        }, n.prototype.complete = function() {
            let t = this.hasAnyBroken ? "fail" : "done";
            if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
                let t = this.hasAnyBroken ? "reject" : "resolve";
                this.jqDeferred[t](this)
            }
        }, h.prototype = Object.create(e.prototype), h.prototype.check = function() {
            this.getIsImageComplete() ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.img.crossOrigin && (this.proxyImage.crossOrigin = this.img.crossOrigin), this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.proxyImage.src = this.img.currentSrc || this.img.src)
        }, h.prototype.getIsImageComplete = function() {
            return this.img.complete && this.img.naturalWidth
        }, h.prototype.confirm = function(t, e) {
            this.isLoaded = t;
            let {
                parentNode: i
            } = this.img, s = "PICTURE" === i.nodeName ? i : this.img;
            this.emitEvent("progress", [this, s, e])
        }, h.prototype.handleEvent = function(t) {
            let e = "on" + t.type;
            this[e] && this[e](t)
        }, h.prototype.onload = function() {
            this.confirm(!0, "onload"), this.unbindEvents()
        }, h.prototype.onerror = function() {
            this.confirm(!1, "onerror"), this.unbindEvents()
        }, h.prototype.unbindEvents = function() {
            this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
        }, d.prototype = Object.create(h.prototype), d.prototype.check = function() {
            this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
        }, d.prototype.unbindEvents = function() {
            this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
        }, d.prototype.confirm = function(t, e) {
            this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
        }, n.makeJQueryPlugin = function(e) {
            (e = e || t.jQuery) && (i = e, i.fn.imagesLoaded = function(t, e) {
                return new n(this, t, e).jqDeferred.promise(i(this))
            })
        }, n.makeJQueryPlugin(), n
    })),

    //jquery-adapttext.js
    function(a, b, c) {
        "use strict";
        var d = [],
            e = c(a).width(),
            f = c.AdaptText = function(a, b) {
                this.element = a, this.$element = c(a), this.options = c.extend(!0, {}, f.defaults, b, this.$element.data()), this.width = this.$element.width();
                var e = this;
                c.extend(e, {
                    init: function() {
                        e.resize(), e.options.scrollable && e.scrollOnHover()
                    },
                    scrollOnHover: function() {
                        e.$element.css({
                            overflow: "hidden",
                            "text-overflow": "ellipsis",
                            "white-space": "nowrap"
                        }), e.$element.hover(function() {
                            var a = e.element.scrollWidth - e.$element.width();
                            if (a > 0) {
                                var b = Math.sqrt(a / e.width) * e.options.scrollSpeed;
                                return e.$element.css("cursor", "e-resize"), e.$element.stop().animate({
                                    "text-indent": -a
                                }, b, function() {
                                    return e.$element.css("cursor", "text")
                                })
                            }
                        }, function() {
                            return e.$element.stop().animate({
                                "text-indent": 0
                            }, e.options.scrollResetSpeed)
                        })
                    }
                }), this.init(), d.push(this)
            };
        f.defaults = {
            compression: 10,
            max: Number.POSITIVE_INFINITY,
            min: Number.NEGATIVE_INFINITY,
            scrollable: !1,
            scrollSpeed: 1e3,
            scrollResetSpeed: 300,
            onResizeEvent: !0
        }, f.prototype = {
            constructor: f,
            resize: function() {
                this.width = this.$element.width(), 0 !== this.width && this.$element.css("font-size", Math.floor(Math.max(Math.min(this.width / this.options.compression, parseFloat(this.options.max)), parseFloat(this.options.min))))
            }
        }, f.resize = function(b) {
            (b || c(a).width() !== e) && (e = c(a).width(), c.each(d, function() {
                this.options.onResizeEvent && this.resize()
            }))
        }, c.fn.adaptText = function(a) {
            if ("string" == typeof a) {
                var b = a,
                    d = Array.prototype.slice.call(arguments, 1);
                return this.each(function() {
                    var a = c.data(this, "adaptText");
                    "function" == typeof a[b] && a[b].apply(a, d)
                })
            }
            return this.each(function() {
                c.data(this, "adaptText") || c.data(this, "adaptText", new f(this, a))
            })
        };
        var g = function(a, b) {
            var c, d, e, f = Date.now || function() {
                    return (new Date).getTime()
                },
                g = null,
                h = 0,
                i = function() {
                    h = f(), g = null, e = a.apply(c, d), c = d = null
                };
            return function() {
                var j = f(),
                    k = b - (j - h);
                return c = this, d = arguments, 0 >= k ? (clearTimeout(g), g = null, h = j, e = a.apply(c, d), c = d = null) : g || (g = setTimeout(i, k)), e
            }
        };
        a.addEventListener ? a.addEventListener("resize", g(f.resize, 200), !1) : a.attachEvent && a.attachEvent("onresize", g(f.resize, 200))
    }(window, document, jQuery),

    //jquery.countTo.js
    function(a) {
        function b(a, b) {
            return a.toFixed(b.decimals)
        }
        a.fn.countTo = function(b) {
            return b = b || {}, a(this).each(function() {
                function c() {
                    k += g, j++, d(k), "function" == typeof e.onUpdate && e.onUpdate.call(h, k), j >= f && (i.removeData("countTo"), clearInterval(l.interval), k = e.to, "function" == typeof e.onComplete && e.onComplete.call(h, k))
                }

                function d(a) {
                    var b = e.formatter.call(h, a, e);
                    i.text(b)
                }
                var e = a.extend({}, a.fn.countTo.defaults, {
                        from: a(this).data("from"),
                        to: a(this).data("to"),
                        speed: a(this).data("speed"),
                        refreshInterval: a(this).data("refresh-interval"),
                        decimals: a(this).data("decimals")
                    }, b),
                    f = Math.ceil(e.speed / e.refreshInterval),
                    g = (e.to - e.from) / f,
                    h = this,
                    i = a(this),
                    j = 0,
                    k = e.from,
                    l = i.data("countTo") || {};
                i.data("countTo", l), l.interval && clearInterval(l.interval), l.interval = setInterval(c, e.refreshInterval), d(k)
            })
        }, a.fn.countTo.defaults = {
            from: 0,
            to: 0,
            speed: 1e3,
            refreshInterval: 100,
            decimals: 0,
            formatter: b,
            onUpdate: null,
            onComplete: null
        }
    }(jQuery),

    //jquery.easypiechart.js
    ! function(a, b) {
        "object" === typeof exports ? module.exports = b(require("jquery")) : "function" === typeof define && define.amd ? define(["jquery"], b) : b(a.jQuery)
    }(this, function(a) {
        var b = function(a, b) {
                var c, d = document.createElement("canvas");
                a.appendChild(d), "undefined" !== typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(d);
                var e = d.getContext("2d");
                d.width = d.height = b.size;
                var f = 1;
                window.devicePixelRatio > 1 && (f = window.devicePixelRatio, d.style.width = d.style.height = [b.size, "px"].join(""), d.width = d.height = b.size * f, e.scale(f, f)), e.translate(b.size / 2, b.size / 2), e.rotate((-0.5 + b.rotate / 180) * Math.PI);
                var g = (b.size - b.lineWidth) / 2;
                b.scaleColor && b.scaleLength && (g -= b.scaleLength + 2), Date.now = Date.now || function() {
                    return +new Date
                };
                var h = function(a, b, c) {
                        c = Math.min(Math.max(-1, c || 0), 1);
                        var d = c <= 0 ? !0 : !1;
                        e.beginPath(), e.arc(0, 0, g, 0, 2 * Math.PI * c, d), e.strokeStyle = a, e.lineWidth = b, e.stroke()
                    },
                    i = function() {
                        var a, c;
                        e.lineWidth = 1, e.fillStyle = b.scaleColor, e.save();
                        for (var d = 24; d > 0; --d) d % 6 === 0 ? (c = b.scaleLength, a = 0) : (c = .6 * b.scaleLength, a = b.scaleLength - c), e.fillRect(-b.size / 2 + a, 0, c, 1), e.rotate(Math.PI / 12);
                        e.restore()
                    },
                    j = function() {
                        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(a) {
                            window.setTimeout(a, 1e3 / 60)
                        }
                    }(),
                    k = function() {
                        b.scaleColor && i(), b.trackColor && h(b.trackColor, b.lineWidth, 1)
                    };
                this.getCanvas = function() {
                    return d
                }, this.getCtx = function() {
                    return e
                }, this.clear = function() {
                    e.clearRect(b.size / -2, b.size / -2, b.size, b.size)
                }, this.draw = function(a) {
                    b.scaleColor || b.trackColor ? e.getImageData && e.putImageData ? c ? e.putImageData(c, 0, 0) : (k(), c = e.getImageData(0, 0, b.size * f, b.size * f)) : (this.clear(), k()) : this.clear(), e.lineCap = b.lineCap;
                    var d;
                    d = "function" === typeof b.barColor ? b.barColor(a) : b.barColor, h(d, b.lineWidth, a / 100)
                }.bind(this), this.animate = function(a, c) {
                    var d = Date.now();
                    b.onStart(a, c);
                    var e = function() {
                        var f = Math.min(Date.now() - d, b.animate.duration),
                            g = b.easing(this, f, a, c - a, b.animate.duration);
                        this.draw(g), b.onStep(a, c, g), f >= b.animate.duration ? b.onStop(a, c) : j(e)
                    }.bind(this);
                    j(e)
                }.bind(this)
            },
            c = function(a, c) {
                var d = {
                    barColor: "#ef1e25",
                    trackColor: "#f9f9f9",
                    scaleColor: "#dfe0e0",
                    scaleLength: 5,
                    lineCap: "round",
                    lineWidth: 3,
                    size: 110,
                    rotate: 0,
                    animate: {
                        duration: 1e3,
                        enabled: !0
                    },
                    easing: function(a, b, c, d, e) {
                        return b /= e / 2, b < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
                    },
                    onStart: function() {},
                    onStep: function() {},
                    onStop: function() {}
                };
                if ("undefined" !== typeof b) d.renderer = b;
                else {
                    if ("undefined" === typeof SVGRenderer) throw new Error("Please load either the SVG- or the CanvasRenderer");
                    d.renderer = SVGRenderer
                }
                var e = {},
                    f = 0,
                    g = function() {
                        this.el = a, this.options = e;
                        for (var b in d) d.hasOwnProperty(b) && (e[b] = c && "undefined" !== typeof c[b] ? c[b] : d[b], "function" === typeof e[b] && (e[b] = e[b].bind(this)));
                        e.easing = "string" === typeof e.easing && "undefined" !== typeof jQuery && "function" === typeof jQuery.easing[e.easing] ? jQuery.easing[e.easing] : d.easing, "number" === typeof e.animate && (e.animate = {
                            duration: e.animate,
                            enabled: !0
                        }), "boolean" !== typeof e.animate || e.animate || (e.animate = {
                            duration: 1e3,
                            enabled: e.animate
                        }), this.renderer = new e.renderer(a, e), this.renderer.draw(f), a.dataset && a.dataset.percent ? this.update(parseFloat(a.dataset.percent)) : a.getAttribute && a.getAttribute("data-percent") && this.update(parseFloat(a.getAttribute("data-percent")))
                    }.bind(this);
                this.update = function(a) {
                    return a = parseFloat(a), e.animate.enabled ? this.renderer.animate(f, a) : this.renderer.draw(a), f = a, this
                }.bind(this), this.disableAnimation = function() {
                    return e.animate.enabled = !1, this
                }, this.enableAnimation = function() {
                    return e.animate.enabled = !0, this
                }, g()
            };
        a.fn.easyPieChart = function(b) {
            return this.each(function() {
                var d;
                a.data(this, "easyPieChart") || (d = a.extend({}, b, a(this).data()), a.data(this, "easyPieChart", new c(this, d)))
            })
        }
    }),

    //jquery.tools.tabs.min.js
    ! function(a) {
        function e(c, d, e) {
            var j, f = this,
                g = c.add(this),
                h = c.find(e.tabs),
                i = d.jquery ? d : c.children(d);
            h.length || (h = c.children()), i.length || (i = c.parent().find(d)), i.length || (i = a(d)), a.extend(this, {
                click: function(d, i) {
                    var k = h.eq(d),
                        l = !c.data("tabs");
                    if ("string" == typeof d && d.replace("#", "") && (k = h.filter('[href*="' + d.replace("#", "") + '"]'), d = Math.max(h.index(k), 0)), e.rotate) {
                        var m = h.length - 1;
                        if (d < 0) return f.click(m, i);
                        if (d > m) return f.click(0, i)
                    }
                    if (!k.length) {
                        if (j >= 0) return f;
                        d = e.initialIndex, k = h.eq(d)
                    }
                    if (d === j) return f;
                    if (i = i || a.Event(), i.type = "onBeforeClick", g.trigger(i, [d]), !i.isDefaultPrevented()) {
                        var n = l ? e.initialEffect && e.effect || "default" : e.effect;
                        return b[n].call(f, d, function() {
                            j = d, i.type = "onClick", g.trigger(i, [d])
                        }), h.removeClass(e.current), k.addClass(e.current), f
                    }
                },
                getConf: function() {
                    return e
                },
                getTabs: function() {
                    return h
                },
                getPanes: function() {
                    return i
                },
                getCurrentPane: function() {
                    return i.eq(j)
                },
                getCurrentTab: function() {
                    return h.eq(j)
                },
                getIndex: function() {
                    return j
                },
                next: function() {
                    return f.click(j + 1)
                },
                prev: function() {
                    return f.click(j - 1)
                },
                destroy: function() {
                    return h.off(e.event).removeClass(e.current), i.find('a[href^="#"]').off("click.T"), f
                }
            }), a.each("onBeforeClick,onClick".split(","), function(b, c) {
                "function" === typeof e[c] && a(f).on(c, e[c]), f[c] = function(b) {
                    return b && a(f).on(c, b), f
                }
            }), e.history && a.fn.history && (a.tools.history.init(h), e.event = "history"), h.each(function(b) {
                a(this).on(e.event, function(a) {
                    return f.click(b, a), a.preventDefault()
                })
            }), i.find('a[href^="#"]').on("click.T", function(b) {
                f.click(a(this).attr("href"), b)
            }), location.hash && "a" == e.tabs && c.find('[href="' + location.hash + '"]').length ? f.click(location.hash) : (0 === e.initialIndex || e.initialIndex > 0) && f.click(e.initialIndex)
        }
        a.tools = a.tools || {
            version: "1.2.7"
        }, a.tools.tabs = {
            conf: {
                tabs: "a",
                current: "current",
                onBeforeClick: null,
                onClick: null,
                effect: "default",
                initialEffect: !1,
                initialIndex: 0,
                event: "click",
                rotate: !1,
                slideUpSpeed: 400,
                slideDownSpeed: 400,
                history: !1
            },
            addEffect: function(a, c) {
                b[a] = c
            }
        };
        var c, d, b = {
            "default": function(a, b) {
                this.getPanes().hide().eq(a).show(), b.call()
            },
            fade: function(a, b) {
                var c = this.getConf(),
                    d = c.fadeOutSpeed,
                    e = this.getPanes();
                d ? e.fadeOut(d) : e.hide(), e.eq(a).fadeIn(c.fadeInSpeed, b)
            },
            slide: function(a, b) {
                var c = this.getConf();
                this.getPanes().slideUp(c.slideUpSpeed), this.getPanes().eq(a).slideDown(c.slideDownSpeed, b)
            },
            ajax: function(a, b) {
                this.getPanes().eq(0).load(this.getTabs().eq(a).attr("href"), b)
            }
        };
        a.tools.tabs.addEffect("horizontal", function(b, e) {
            if (!c) {
                var f = this.getPanes().eq(b),
                    g = this.getCurrentPane();
                d || (d = this.getPanes().eq(0).width()), c = !0, f.show(), g.animate({
                    width: 0
                }, {
                    step: function(a) {
                        f.css("width", d - a)
                    },
                    complete: function() {
                        a(this).hide(), e.call(), c = !1
                    }
                }), g.length || (e.call(), c = !1)
            }
        }), a.fn.tabs = function(b, c) {
            var d = this.data("tabs");
            return d && (d.destroy(), this.removeData("tabs")), "function" === typeof c && (c = {
                onBeforeClick: c
            }), c = a.extend({}, a.tools.tabs.conf, c), this.each(function() {
                d = new e(a(this), b, c), a(this).data("tabs", d)
            }), c.api ? d : this
        }
    }(jQuery),

    //jquery tools history js
    function(a) {
        function f(a) {
            if (a) {
                var b = c.contentWindow.document;
                b.open().close(), b.location.hash = a
            }
        }
        var b, c, d, e;
        a.tools = a.tools || {
            version: "1.2.7"
        }, a.tools.history = {
            init: function(g) {
                e || (setInterval(function() {
                    var c = location.hash;
                    c !== b && a(window).trigger("hash", c)
                }, 100), d = d ? d.add(g) : g, g.on("click", function(b) {
                    var d = a(this).attr("href");
                    return c && f(d), "#" != d.slice(0, 1) ? (location.href = "#" + d, b.preventDefault()) : void 0
                }), e = !0)
            }
        }, a(window).on("hash", function(c, e) {
            e ? d.filter(function() {
                var b = a(this).attr("href");
                return b == e || b == e.replace("#", "")
            }).trigger("history", [e]) : d.eq(0).trigger("history", [e]), b = e
        }), a.fn.history = function(b) {
            return a.tools.history.init(this), this.on("history", b)
        }
    }(jQuery);

//scrollspy.js
! function(a) {
    function h(b, d, e, f) {
        var g = [];
        return a.each(c, function(a, c) {
            var h = c.offset().top,
                i = c.offset().left,
                j = i + c.width(),
                k = h + c.height(),
                l = !(i > d || j < f || h > e || k < b);
            l && g.push(c)
        }), g
    }

    function i() {
        ++f;
        var c = b.scrollTop(),
            e = b.scrollLeft(),
            i = e + b.width(),
            j = c + b.height(),
            k = h(c + g.top, i + g.right, j + g.bottom, e + g.left);
        a.each(k, function(a, b) {
            var c = b.data("scrollSpy:ticks");
            "number" != typeof c && b.triggerHandler("scrollSpy:enter"), b.data("scrollSpy:ticks", f)
        }), a.each(d, function(a, b) {
            var c = b.data("scrollSpy:ticks");
            "number" == typeof c && c !== f && (b.triggerHandler("scrollSpy:exit"), b.data("scrollSpy:ticks", null))
        }), d = k
    }

    function j() {
        b.trigger("scrollSpy:winSize")
    }

    function l(a, b, c) {
        var d, e, f, g = null,
            h = 0;
        c || (c = {});
        var i = function() {
            h = c.leading === !1 ? 0 : k(), g = null, f = a.apply(d, e), d = e = null
        };
        return function() {
            var j = k();
            h || c.leading !== !1 || (h = j);
            var l = b - (j - h);
            return d = this, e = arguments, l <= 0 ? (clearTimeout(g), g = null, h = j, f = a.apply(d, e), d = e = null) : g || c.trailing === !1 || (g = setTimeout(i, l)), f
        }
    }
    var b = a(window),
        c = [],
        d = [],
        e = !1,
        f = 0,
        g = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        k = Date.now || function() {
            return (new Date).getTime()
        };
    a.scrollSpy = function(d, f) {
        d = a(d), d.each(function(b, d) {
            c.push(a(d))
        }), f = f || {
            throttle: 100
        }, g.top = f.offsetTop || 0, g.right = f.offsetRight || 0, g.bottom = f.offsetBottom || 0, g.left = f.offsetLeft || 0;
        var h = l(i, f.throttle || 100),
            j = function() {
                a(document).ready(h)
            };
        return e || (b.on("scroll", j), b.on("resize", j), e = !0), setTimeout(j, 0), d
    }, a.winSizeSpy = function(c) {
        return a.winSizeSpy = function() {
            return b
        }, c = c || {
            throttle: 100
        }, b.on("resize", l(j, c.throttle || 100))
    }, a.fn.scrollSpy = function(b) {
        return a.scrollSpy(a(this), b)
    }
}(jQuery),

//theme custom.js
jQuery.noConflict(), document.documentElement.className = document.documentElement.className.replace(/(^|\s)no-js(\s|$)/, "$1js$2");

//Theme Enable Lightbox Function
var themeEnableLightbox = function(a, b) {
    if (!jQuery("body").is(".no_fancybox")) {
        var c = {
            width: fancybox_options.width,
            height: fancybox_options.height,
            autoSize: fancybox_options.autoSize,
            autoWidth: fancybox_options.autoWidth,
            autoHeight: fancybox_options.autoHeight,
            fitToView: fancybox_options.fitToView,
            aspectRatio: fancybox_options.aspectRatio,
            arrows: fancybox_options.arrows,
            closeBtn: fancybox_options.closeBtn,
            closeClick: fancybox_options.closeClick,
            nextClick: fancybox_options.nextClick,
            autoPlay: fancybox_options.autoPlay,
            playSpeed: fancybox_options.playSpeed,
            preload: fancybox_options.preload,
            loop: fancybox_options.loop,
            isMobile: jQuery("body").is(".isMobile"),
            iframe: {
                preload: !1
            },
            beforeLoad: function() {
                if (this.element.is(".fancyaudio")) {
                    var c, d, a = this.element.data("loop"),
                        b = this.element.data("autoplay"),
                        e = this.element.data("source");
                    c = "false" !== a ? ' loop="true"' : ' loop="false"', d = "false" !== b ? " autoplay" : "";
                    var f = Math.round(1e4 * Math.random() + 1);
                    this.content = '<div class="audio_frame" style="width:380px;height:100%"><audio id="audio' + f + '" width="100%" height="100%" controls="controls"' + c + ' type="audio/mp3" src="' + e + '"/></div>', this.wrapCSS = this.wrapCSS + " skin-audio", this.arrows = !1, this.width = 380, this.height = 30, this.minHeight = 30, this.scrolling = "no";
                    var g;
                    this.beforeShow = function() {
                        void 0 !== MediaElementPlayer && (g = new MediaElementPlayer("#audio" + f), "false" !== b && g.play())
                    }, this.helpers.media = !1, this.beforeChange = function() {
                        g && (g.pause(), g.remove())
                    }, this.beforeClose = function() {
                        g && (g.pause(), g.remove())
                    }
                } else if (this.element.is(".fancyvideo")) {
                    var d, h, e = this.element.data("source"),
                        b = this.element.data("autoplay");
                    "false" !== b ? (d = " autoplay", h = "autoplay=true&amp;", this.helpers.media = {}) : (d = "", h = "", this.helpers.media = {
                        youtube: {
                            params: {
                                autoplay: 0
                            }
                        },
                        vimeo: {
                            params: {
                                autoplay: 0
                            }
                        }
                    }), this.width = parseInt(this.element.data("width"), 10), this.height = parseInt(this.element.data("height"), 10), this.isMobile && this.width > jQuery("body").width() && (this.height = parseInt((jQuery("body").width() - 20) * this.height / this.width, 10), this.width = jQuery("body").width() - 20);
                    var i = this.width,
                        j = this.height,
                        f = Math.round(1e4 * Math.random() + 1),
                        k = "";
                    k = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase()) ? ' preload="none"' : "", this.content = '<div class="video_frame" style="width:' + this.width + 'px"><video id="video' + f + '" width="' + this.width + '" height="' + this.height + '" autoplay="' + b + '" controls="controls"' + k + '><source type="video/mp4" src="' + e + '" /></video></div>', this.wrapCSS = this.wrapCSS + " skin-video", this.scrolling = "no";
                    var l;
                    this.beforeShow = function() {
                        return this.element.is(".fancymobile") || void 0 === MediaElementPlayer ? void jQuery("#video" + f).css("height", j) : void(l = new MediaElementPlayer("#video" + f, {
                            defaultVideoWidth: i,
                            defaultVideoHeight: j,
                            pluginWidth: i,
                            pluginHeight: j,
                            enableAutosize: !1
                        }))
                    }, this.helpers.media = !1, this.beforeChange = function() {}, this.beforeClose = function() {}
                } else this.closeBtn = fancybox_options.closeBtn, this.arrows = fancybox_options.arrows, this.width = fancybox_options.width, this.height = fancybox_options.height, this.minHeight = 100, this.beforeShow = null, this.scrolling = "auto", this.beforeChange = null, this.beforeClose = null, this.wrapCSS = "theme" === fancybox_options.skin ? "skin-theme" : "skin-fancybx";
                this.element.data("width") && (this.width = parseInt(this.element.data("width"), 10)), this.element.data("height") && (this.height = parseInt(this.element.data("height"), 10)), void 0 !== this.element.attr("data-autoSize") && (this.autoSize = "true" === this.element.attr("data-autoSize") ? !0 : !1), void 0 !== this.element.attr("data-autowidth") && (this.autoWidth = "false" === this.element.attr("data-autowidth") ? !1 : !0), void 0 !== this.element.attr("data-autoheight") && (this.autoHeight = "false" === this.element.attr("data-autoheight") ? !1 : !0), void 0 !== this.element.attr("data-fittoview") && (this.fitToView = "false" === this.element.attr("data-fittoview") ? !1 : !0), void 0 !== this.element.attr("data-aspectratio") && (this.aspectRatio = "false" === this.element.attr("data-aspectratio") ? !1 : !0), void 0 !== this.element.attr("data-close") && (this.closeBtn = "true" === this.element.attr("data-close") ? !0 : !1), void 0 !== this.element.attr("data-closeclick") && (this.closeClick = "true" === this.element.attr("data-closeclick") ? !0 : !1);
                var m = this.element.data("type");
                "iframe" === m && (this.type = m), ("inline" === m || "html" === m || "ajax" === m) && (this.element.data("width") && (this.autoWidth = !1), this.element.data("height") && (this.autoHeight = !1))
            },
            helpers: {
                media: {},
                title: {
                    type: fancybox_options.title_type
                }
            }
        };
        "theme" === fancybox_options.skin ? (c.padding = 0, c.wrapCSS = "skin-theme") : c.wrapCSS = "skin-fancybx", fancybox_options.thumbnail && (c.helpers.thumbs = {
            width: fancybox_options.thumbnail_width,
            height: fancybox_options.thumbnail_height,
            position: fancybox_options.thumbnail_position,
            source: function(a) {
                var b;
                return a.element && (b = a.element.data("thumb") ? a.element.data("thumb") : jQuery(a.element).find("img").attr("src")), !b && "image" === a.type && a.href && (b = a.href), b
            }
        }), jQuery(b).find(a).fancybx(c)
    }
};

//theme image resizer
var themeUpdateImages = function(a) {
    function d(a) {
        return a.complete ? "undefined" != typeof a.naturalWidth && 0 == a.naturalWidth ? !1 : !0 : !1
    }
    responsve_image_resize !== !1 && a.each(function() {
        function e() {
            var d = parseInt(a.width(), 10),
                e = parseInt(a.height(), 10),
                f = a.attr("data-minwidth"),
                g = a.attr("data-minheight");
            "undefined" !== typeof f && d < f && (d = f), "undefined" !== typeof g && e < g && (e = g);
            var h = a.data("images"),
                i = a.data("images_x2"),
                j = b + "_" + d + "." + e;
            if (h || (h = [], a.data("images", h)), i || (i = [], a.data("images_x2", i)), !(d <= 0 || e <= 0))
                if (d === a[0].naturalWidth && e === a[0].naturalHeight) {
                    if (h[j] = a.attr("src"), c) {
                        i[j] = "";
                        var k = a.attr("srcset");
                        if ("undefined" !== typeof k && k !== !1)
                            if (-1 != k.indexOf(" " + theme_retina_multiplier)) {
                                var l = k.substr(0, k.lastIndexOf(" " + theme_retina_multiplier));
                                i[j] = l
                            } else i[j] = a.attr("srcset")
                    }
                } else if ("undefined" !== typeof h[j]) {
                if (a.attr("src", h[j]), c && "undefined" != typeof i && "undefined" !== typeof i[j] && "" != i[j]) {
                    var k = a.attr("srcset");
                    "undefined" !== typeof k && k !== !1 && -1 != k.indexOf("@" + theme_retina_multiplier) && a.attr("srcset", i[j] + " " + theme_retina_multiplier)
                }
            } else jQuery.post(window.location.href, {
                imageAjax: !0,
                width: d,
                height: e,
                thumbnail_id: b,
                global_post_id: theme_global_post_id,
                has_theme_retina_image: c
            }, function(b) {
                var d = JSON.parse(b),
                    e = d.image_src,
                    f = d.image_src_x2,
                    g = new Image;
                g.onload = function() {
                    if (a.attr("src", e), h[j] = e, a.data("images", h), c)
                        if (i[j] = "", "" != f) {
                            var b = a.attr("srcset");
                            "undefined" !== typeof b && b !== !1 && -1 != b.indexOf("@" + theme_retina_multiplier) && (a.attr("srcset", f + " " + theme_retina_multiplier), i[j] = f, a.data("images_x2", i))
                        } else i[j] = ""
                }, g.src = e, g.srcset = f
            })
        }
        var a = jQuery(this),
            b = a.attr("data-thumbnail"),
            c = a.attr("data-theme-retina-image");
        "undefined" === typeof c && (c = !1), c = "true" == c ? !0 : !1, b && (d(a[0]) ? e() : a.one("load", function() {
            e()
        }))
    })
};

jQuery(document).ready(function($) {
    function splitTable(a) {
        a.wrap("<div class='table-wrapper' />");
        var b = a.clone();
        b.find("td:not(:first-child), th:not(:first-child)").css("display", "none"), b.removeClass("responsive"), a.closest(".table-wrapper").prepend(b), b.wrap("<div class='pinned' />"), a.wrap("<div class='scrollable' />"), setCellHeights(a, b)
    }

    function unsplitTable(a) {
        a.closest(".table-wrapper").find(".pinned").remove(), a.unwrap(), a.unwrap()
    }

    function setCellHeights(a, b) {
        var c = a.find("tr"),
            d = b.find("tr"),
            e = [];
        c.each(function(a) {
            var b = $(this),
                c = b.find("th, td");
            c.each(function() {
                var b = $(this).outerHeight(!0);
                e[a] = e[a] || 0, b > e[a] && (e[a] = b)
            })
        }), d.each(function(a) {
            $(this).height(e[a])
        })
    }

    function fillBrokenImage(a, b) {
        var c = document.createElement("canvas");
        return c.width = a, c.height = b, c.toDataURL()
    }

    function preloader(a) {
        a.each(function() {
            $(this).addClass("image-on-loading")
        }).imagesLoaded().progress(function(a, b) {
            if (b.isLoaded) {
                var c = $(b.img),
                    d = c.closest(".image_frame"),
                    b = c.closest("a");
                d.is(".effect-grayscale") ? enable_image_grayscale_hover(b) : d.is(".effect-icon") && enable_image_hover(b), c.css("visibility", "visible"), c.removeClass("image-on-loading")
            } else {
                var c = $(b.img);
                c.addClass("image-is-broken"), c.attr("broken_src", c.attr("src"));
                var e = c.attr("width"),
                    f = c.attr("height");
                c.attr("src", theme_url + "/includes/broken.php?width=" + e + "&height=" + f)
            }
        })
    }

    function updateVideos() {
        $(".video_frame").each(function() {
            var a = $(this).data("ratio");
            if (a) {
                var b = $(this).width() / a;
                $(this).css("height", b)
            }
        })
    }

    function updateImages() {
        themeUpdateImages($(".image_styled img, .product-thumbnail, .woocommerce-main-image img, .easy-image"))
    }
    if ($(".form-submit #submit").attr('tabindex', '6'),

        $(function() {
            $(".single-product.woocommerce .variations a.reset_variations").on("click", function() {
                $("img.attachment-shop_single.wp-post-image.on_the_fly_resize").each(function() {
                    var a = $(this).attr("data-thumbnail-default");
                    "undefined" != typeof a && ($(this).attr("data-thumbnail", a), $(this).attr("data_woo_variable_image", "woocommerce_variable_image_reset"), themeUpdateImages($(".woocommerce-main-image img.on_the_fly_resize")))
                })
            })
        }),

        $(".variations_form").on("woocommerce_variation_select_change", function() {
            $("img.attachment-shop_single.wp-post-image.on_the_fly_resize").each(function() {
                var a = $(this).attr("data-thumbnail-default");
                void 0 !== a && ($(this).attr("data-thumbnail", a), $(this).attr("data_woo_variable_image", "woocommerce_variable_image_reset"))
            })
        }),

        $(".single_variation_wrap").on("show_variation", function(a, b) {
            var c;
            $(".woocommerce-product-gallery__wrapper .woocommerce-product-gallery__image").each(function() {
                c = $(this).attr("data-thumb")
            }), $("img.attachment-shop_single.wp-post-image.on_the_fly_resize").each(function() {
                var a = $(this).attr("alt"),
                    b = "variable_image_thumbnail_id=[";
                if (-1 != $(this).attr("alt").indexOf(b)) {
                    altHasIDEnd = a.indexOf("]");
                    var e = a.slice(b.length, altHasIDEnd);
                    $(this).attr("alt", a.substring(altHasIDEnd + 1)), $(this).attr("data-thumbnail", e), void 0 !== c && $(this).attr("src", c), $(this).attr("data_woo_variable_image", "woocommerce_variable_image_set[" + e + "]"), themeUpdateImages($(".woocommerce-main-image img.on_the_fly_resize"))
                }
            })
        }),

        $("#navigation > ul").nav({
            child: {
                beforeFirstRender: function() {
                    $(this).find(".cufon").length > 0 && Cufon.replace($("> a", this))
                }
            },
            root: {
                afterHoverIn: function() {},
                afterHoverOut: function() {},
                beforeHoverIn: function() {
                    $(this).addClass("hover"), $(this).find(".cufon").length > 0 && Cufon.replace($("> a", this))
                },
                beforeHoverOut: function() {
                    $(this).removeClass("hover"), $(this).find(".cufon").length > 0 && Cufon.replace($("> a", this))
                }
            }
        }),

        $("body").is(".responsive")) {
        $(".table_style table").addClass("responsive");
        var isMobile = $("body").is(".isMobile");
        $("#navigation > ul").navToSelect({
            namespace: "nav2select",
            activeClass: "current_page_item",
            indentString: nav2select_indentString,
            placeholder: nav2select_defaultText,
            indentSpace: !0,
            itemFilter: function(a) {
                return !a.is(".not_show_in_mobile")
            },
            getItemLabel: function(a) {
                var b = a.find(this.options.linkSelector).clone();
                return b.find(".menu-subtitle").remove(), b.text()
            }
        })
    }

    $("#sidebar_content .widget:last-child").css("margin-bottom", "20px"),
        $(".home #sidebar_content .widget:last-child").css("margin-bottom", "0px"),

        $(".top a").on('click', function() {
            return $("html, body").animate({
                scrollTop: 0
            }, "slow"), !1
        }),
        $("body").is(".scroll-to-top") && ($("body").append($("body").is(".scroll-to-top-square") ? '<a href="#top" class="style-square" id="back-to-top">Back To Top</a>' : '<a href="#top" id="back-to-top">Back To Top</a>'), $(function() {
            $(window).on("scroll",
                function() {
                    $(this).scrollTop() > 100 ? $("#back-to-top").fadeIn() : $("#back-to-top").fadeOut()
                }), $("#back-to-top").on("click", function() {
                var a = $(window).scrollTop();
                return $("body,html").animate({
                    scrollTop: 0
                }, 500 * Math.atan(a / 3e3)), !1
            })
        })),

        $(".milestone_number").on("scrollSpy:enter", function() {
            var a = $(this).data("animations");
            void 0 == a && (a = 1);
            var b = $(this).data("countAnimations");
            if (void 0 == b ? $(this).data("countAnimations", 1) : (b++, $(this).data("countAnimations", b)), !$(this).data("visibled")) {
                b >= a && 0 != a && $(this).data("visibled", 1);
                var c = $(this).data("separator");
                $(this).countTo({
                    refreshInterval: 25,
                    formatter: function(a, b) {
                        if ("" == c) return a.toFixed(b.decimals);
                        var d = a.toFixed(b.decimals).toString().split(".");
                        return d[0] = d[0].replace(/\B(?=(\d{3})+(?!\d))/g, c), d.join(".")
                    }
                })
            }
        }).scrollSpy(),

        $(".pie_progress_wrap").on("scrollSpy:enter", function() {
            if (!$(this).data("visibled")) {
                $(this).data("visibled", 1);
                var a = $(this),
                    b = 150,
                    c = 7,
                    d = pie_progress_track_color,
                    e = pie_progress_bar_color;
                a.is(".pie_progress_small") ? (b = 120, c = 6) : a.is(".pie_progress_large") && (b = 180, c = 8), a.data("trackcolor") && (d = a.data("trackcolor")), a.data("barcolor") && (e = a.data("barcolor")), a.find(".pie_progress").easyPieChart({
                    size: b,
                    scaleLength: 0,
                    trackColor: d,
                    barColor: e,
                    lineCap: "square",
                    lineWidth: c
                })
            }
        }).scrollSpy(),

        $(".progress").on("scrollSpy:enter", function() {
            var a = $(this).data("animations");
            void 0 == a && (a = 1);
            var b = $(this).data("countAnimations");
            if (void 0 == b ? $(this).data("countAnimations", 1) : (b++, $(this).data("countAnimations", b)), !$(this).data("visibled")) {
                b >= a && 0 != a && $(this).data("visibled", 1);
                var c = $(this).data("meter");
                $(this).find(".progress-meter").css("width", ""), $(this).find(".progress-meter").animate({
                    width: c + "%"
                }, 1500)
            }
        }).scrollSpy(),

        $(".icon_email").each(function() {
            void 0 !== $(this).attr("href") && $(this).attr("href", $(this).attr("href").replace("*", "@")), $(this).html($(this).html().replace("*", "@"))
        }),

        $(".tabs_container").each(function() {
            var a = $(this).attr("data-history");
            a = void 0 !== a && "true" === a;
            var b = $(this).attr("data-initialIndex");
            (void 0 === b || a) && (b = 0);
            var c = $("ul.tabs li, ul.theme_tabs li", this).length;
            b == -1 && (b = 0), b > c - 1 && (b = c - 1), $("ul.tabs, ul.theme_tabs", this).tabs("div.panes > div, div.theme_panes > div", {
                tabs: "a",
                effect: "fade",
                fadeOutSpeed: -400,
                history: a,
                initialIndex: b
            })
        }).addClass("tabs_inited"),

        $(".vertical_tabs_container").each(function() {
            var a = $(this).attr("data-history");
            a = void 0 !== a && "true" === a;
            var b = $(this).attr("data-initialIndex");
            (void 0 === b || a) && (b = 0);
            var c = $("ul.vertical_tabs li, ul.theme_vertical_tabs li", this).length;
            b == -1 && (b = 0), b > c - 1 && (b = c - 1), $("ul.vertical_tabs, ul.theme_vertical_tabs", this).tabs("div.panes > div, div.theme_panes > div", {
                tabs: "a",
                effect: "fade",
                fadeOutSpeed: -400,
                history: a,
                initialIndex: b
            }), $("div.panes, div.theme_panes", this).css("min-height", $("ul.vertical_tabs, ul.theme_vertical_tabs", this).height())
        }).addClass("tabs_inited"),

        $(".mini_tabs_container").each(function() {
            var a = $(this).attr("data-history");
            a = void 0 !== a && "true" === a;
            var b = $(this).attr("data-initialIndex");
            (void 0 === b || a) && (b = 0);
            var c = $("ul.mini_tabs li, ul.theme_mini_tabs li", this).length;
            b == -1 && (b = 0), b > c - 1 && (b = c - 1), $("ul.mini_tabs, ul.theme_mini_tabs", this).tabs("div.panes > div, div.theme_panes > div", {
                tabs: "a",
                effect: "fade",
                fadeOutSpeed: -400,
                history: a,
                initialIndex: b
            })
        }).addClass("tabs_inited"),

        void 0 !== $.tools && void 0 !== $.tools.tabs && $.tools.tabs.addEffect("slide", function(a, b) {
            this.getPanes().slideUp(), this.getPanes().eq(a).slideDown(function() {
                b.call()
            })
        }),

        $(".accordion, .theme_accordion").each(function() {
            var a = $(this).attr("data-initialIndex");
            void 0 === a && (a = 0), $(this).tabs("div.pane, div.theme_pane", {
                tabs: ".tab, .theme_tab",
                effect: "slide",
                initialIndex: a
            })
        }),

        $(".toggle_title").on("click", function() {
            var a = $(this).parent(".toggle");
            a.is(".toggle_active") ? (a.removeClass("toggle_active"), $(this).siblings(".toggle_content").slideUp("fast"), $(this).trigger("toggle::close")) : (a.addClass("toggle_active"), $(this).siblings(".toggle_content").slideDown("fast"), $(this).trigger("toggle::open"))
        }),

        $(".responsive_text").each(function() {
            var a = $(this).parents(".tabs_container,.mini_tabs_container,.accordion, .theme_accordion"),
                b = $(this).parents(".toggle"),
                c = this;
            0 != a.length ? a.each(function() {
                var b = null;
                b = $(this).is(".accordion, .theme_accordion") ? $(this).data("tabs") : $(this).find(".tabs, .theme_tabs, .mini_tabs, .theme_mini_tabs").data("tabs"), a.find(".current").on("change", function() {
                    $.data(c, "adaptText") ? $(c).adaptText("resize", !0) : $(c).adaptText()
                }).trigger("change"), b.onClick(function(a) {
                    $.data(c, "adaptText") ? $(c).adaptText("resize", !0) : $(c).adaptText()
                })
            }) : 0 != b.length ? b.find(".toggle_title").on("toggle::open", function() {
                $.data(c, "adaptText") ? $(c).adaptText("resize", !0) : $(c).adaptText()
            }) : $(this).adaptText()
        }),

        $(".button, .theme_button").on("mouseenter", function() {
            var a = $(this).attr("data-hoverBg"),
                b = $(this).attr("data-hoverColor");
            void 0 !== a && $(this).css("background-color", a), void 0 !== b && $("span", this).css("color", b)
        }).on("mouseleave", function() {
            var a = $(this).attr("data-hoverBg"),
                b = $(this).attr("data-hoverColor"),
                c = $(this).attr("data-bg"),
                d = $(this).attr("data-color");
            void 0 !== a && (void 0 !== c ? $(this).css("background-color", c) : $(this).css("background-color", "")), void 0 !== b && (void 0 !== d ? $("span", this).css("color", d) : $("span", this).css("color", ""))
        }),

        $(".testimonials").each(function() {
            function update(a) {
                $content.hide().html(a.content).fadeIn(), $name.hide().html(a.author).fadeIn(), a.meta ? a.link ? $meta.hide().html('<a href="' + a.link + '" target="_blank" rel="nofollow">' + a.meta + "</a>").fadeIn() : $meta.hide().html(a.meta).fadeIn() : $meta.hide().html("").fadeIn(), $avatar.attr("src", a.avatar), autoplay === !0 && (clearTimeout(autoplay_timeout), autoplay_timeout = setTimeout(function() {
                    next()
                }, duration))
            }

            function previous() {
                0 == current ? current = items.length - 1 : current -= 1, update(items[current])
            }

            function next() {
                var a = $("#" + $id + ".testimonials .testimonial:hover").length > 0;
                a ? autoplay === !0 && (clearTimeout(autoplay_timeout), autoplay_timeout = setTimeout(function() {
                    next()
                }, duration)) : (current == items.length - 1 ? current = 0 : current += 1, update(items[current]))
            }
            var autoplay = $(this).data("autoplay"),
                duration = $(this).data("duration");
            eval("var items = testimonials_" + $(this).data("items"));
            var current = 0,
                $content = $(this).find(".testimonial_content > div"),
                $name = $(this).find(".testimonial_name"),
                $meta = $(this).find(".testimonial_meta"),
                $avatar = $(this).find(".testimonial_avatar"),
                autoplay_timeout, $id = $(this).attr("id");
            autoplay === !0 && (autoplay_timeout = setTimeout(function() {
                next()
            }, duration)), $(this).find(".testimonial_previous").on("click", function() {
                return previous(), !1
            }), $(this).find(".testimonial_next").on("click", function() {
                return next(), !1
            })
        });

    // Enable Lightbox Functionality
    $(".wp_lightbox").each(function() {
            var t = $(this);
            t.attr("title") || t.attr("title", t.children("img").attr("alt"))
        }),
        themeEnableLightbox(".lightbox, .wp_lightbox", document), themeEnableLightbox(".fancybx, .colorbox", document), themeEnableLightbox("a[rel^='productLightbox']", document), themeEnableLightbox(".woocommerce a.zoom", document), themeEnableLightbox(".woocommerce a.show_review_form", document);

    var enable_image_grayscale_hover = function() {},
        enable_image_hover = function(a) {
            a.is(".image_icon_zoom,.image_icon_play,.image_icon_doc,.image_icon_link") && (a.on("mouseenter", ".image_overlay", function() {
                $(this).animate({
                    opacity: "1"
                }, "fast")
            }).on("mouseleave", ".image_overlay", function() {
                $(this).animate({
                    opacity: "0"
                }, "fast")
            }), 0 == a.find(".image_overlay").length && a.children("img").after($('<span class="image_overlay"></span>').css({
                opacity: "0",
                visibility: "visible"
            })))
        };

    $(".image_no_link").on('click', function() {
            return !1
        }),

        $(".portfolios").each(function() {
            var $section = $(this),
                $pagenavi = $(".wp-pagenavi", this),
                _ajax = !1;
            if (void 0 !== $section.attr("data-options")) eval("var _options = " + $section.attr("data-options")), _ajax = !0;
            else var _options = {};
            var _cufon = !1;
            if ($section.find(".portfolio_title .cufon").length > 0 && (_cufon = !0), $section.is(".sortable")) {
                var _preferences = {
                        duration: 1e3,
                        adjustHeight: !1,
                        adjustWidth: !1,
                        easing: "easeInOutQuad",
                        attribute: function(a) {
                            return $(a).attr("data-id")
                        },
                        enhancement: function() {
                            "undefined" !== typeof Cufon && _cufon === !0 && Cufon.replace(".portfolio_title")
                        }
                    },
                    $list = $("ul.portfolio_container", this),
                    $clone = $list.clone();
                $clone.find(".image_frame img").css("visibility", "visible"), "undefined" !== typeof Cufon && _cufon === !0 && $clone.find(".portfolio_title").each(function() {
                    $("a", this).length > 0 ? $("a", this).html(this.textContent) : $(this).html(this.textContent)
                });
                var callback = function() {
                        themeEnableLightbox(".lightbox", $list), $list.find(".image_frame").css("background-image", "none"), $list.find(".image_frame").each(function() {
                            $(this).is(".effect-grayscale") ? 0 === $(this).find(".grayscale-wrapper").length && 0 === $(this).find(".image-on-loading").length && enable_image_grayscale_hover($("a", this)) : $(this).is(".effect-icon") && enable_image_hover($("a", this))
                        })
                    },
                    ajax_callback = function(a) {
                        var b = $(a);
                        b.find(".image_frame img").css("visibility", "visible");
                        var c = b.find(".wp-pagenavi");
                        $list.quicksand(b.find(".portfolio_item"), _preferences, callback), themeUpdateImages($list.find(".image_frame img")), c.length > 0 ? ($pagenavi = $section.find(".wp-pagenavi"), $pagenavi.length > 0 ? $pagenavi.html(c.html()) : c.appendTo($section)) : $section.find(".wp-pagenavi").remove()
                    };
                _ajax && $(this).on("click", ".wp-pagenavi a", function(a) {
                    var b = "all";
                    $section.find(".sort_by_cat a.current").length > 0 && (b = $section.find(".sort_by_cat a.current").attr("data-value")), $.post(window.location.href, {
                        portfolioAjax: !0,
                        portfolioOptions: _options,
                        category: b,
                        portfolioPage: $(this).attr("data-page"),
                        cache: !0
                    }, ajax_callback), a.preventDefault()
                }), $(".sort_by_cat a", this).on("click", function(a) {
                    if ($(this).siblings(".current").removeClass("current"), $(this).addClass("current"), _ajax) {
                        var b = $(this).attr("data-value");
                        $.post(window.location.href, {
                            portfolioAjax: !0,
                            portfolioOptions: _options,
                            category: b,
                            cache: !0
                        }, ajax_callback)
                    } else {
                        var c;
                        c = "all" === $(this).attr("data-value") ? $clone.find(".portfolio_item").clone() : $clone.find(".portfolio_item[data-cat*=" + $(this).attr("data-value") + "]").clone(), $list.quicksand(c, _preferences, callback)
                    }
                    a.preventDefault()
                })
            } else _ajax && $(this).on("click", ".wp-pagenavi a", function(a) {
                $.post(window.location.href, {
                    portfolioAjax: !0,
                    portfolioOptions: _options,
                    portfolioPage: $(this).attr("data-page"),
                    cache: !0
                }, function(a) {
                    $section.html(a), themeEnableLightbox(".lightbox", $section), "undefined" !== typeof Cufon && _cufon === !0 && Cufon.replace(".portfolio_title"), preloader($section.find(".portfolio_image .image_frame img"))
                }), a.preventDefault()
            })
        }),

        preloader($(".portfolios").find(".portfolio_image .image_frame img")),
        preloader($("body").find(".image_styled:not(.portfolio_image) .image_frame img")),
        $(".gallery .gallery-image,.carousel .carousel-image,.woo-image-overlay .image-overlay").imagesLoaded(function(a) {
            $.each(a.images, function(a, b) {
                var c = $(b.img);
                setTimeout(function() {
                    c.css("visibility", "visible").animate({
                        opacity: 1
                    }, 500, function() {
                        $(this).parent().is(".effect-grayscale") ? enable_image_grayscale_hover($(this).parent()) : enable_image_hover($(this).parent())
                    })
                }, 100 * (a + 1))
            })
        }),

        $(".contact_info_wrap .icon_email").each(function() {
            $(this).attr("href", $(this).attr("href").replace("*", "@")), $(this).html($(this).html().replace("*", "@"))
        }),

        void 0 !== $.tools.validator && ($.tools.validator.addEffect("contact_form", function(a) {
            $.each(a, function(a, b) {
                var c = b.input;
                c.addClass("invalid")
            })
        }, function(a) {
            a.removeClass("invalid")
        }), $(".widget_contact_form .contact_form").validator({
            effect: "contact_form"
        }).on("submit", function(a) {
            var b = $(this);
            a.isDefaultPrevented() || ($.post(this.action, {
                theme_contact_form_submit: 1,
                to: $('input[name="contact_to"]').val().replace("*", "@"),
                name: $('input[name="contact_name"]').val(),
                email: $('input[name="contact_email"]').val(),
                content: $('textarea[name="contact_content"]').val(),
                consent: $('input[name="contact_consent"]').is(":checked")
            }, function() {
                b.fadeOut("fast", function() {
                    $(this).siblings("p").show()
                }).delay(3e3).fadeIn("fast", function() {
                    $(this).find('input[name="contact_name"]').val(""), $(this).find('input[name="contact_email"]').val(""), $(this).find('textarea[name="contact_content"]').val(""), $(this).find('input[name="contact_consent"]').prop("checked", ""), $(this).siblings("p").hide()
                })
            }), a.preventDefault())
        }), $(".contact_form_wrap .contact_form").validator({
            effect: "contact_form"
        }).on("submit", function(a) {
            var b = $(this);
            if (!a.isDefaultPrevented()) {
                var c = b.find('input[name="contact_widget_id"]').val();
                $.post(this.action, {
                    theme_contact_form_submit: 1,
                    to: $('input[name="contact_' + c + '_to"]').val().replace("*", "@"),
                    name: $('input[name="contact_' + c + '_name"]').val(),
                    email: $('input[name="contact_' + c + '_email"]').val(),
                    content: $('textarea[name="contact_' + c + '_content"]').val(),
                    consent: $('input[name="contact_' + c + '_consent"]').is(":checked")
                }, function() {
                    b.fadeOut("fast", function() {
                        $(this).siblings(".success").show()
                    }).delay(3e3).fadeIn("fast", function() {
                        $(this).find('input[name="contact_' + c + '_name"]').val(""), $(this).find('input[name="contact_' + c + '_email"]').val(""), $(this).find('textarea[name="contact_' + c + '_content"]').val(""), $(this).find('input[name="contact_' + c + '_consent"]').prop("checked", ""), $(this).siblings(".success").hide()
                    })
                }), a.preventDefault()
            }
        })),

        $("body").is(".responsive") && enquire.register("screen and (min-width: 980px)", {
            match: function() {
                updateImages(), updateVideos()
            }
        }).register("screen and (min-width: 768px) and (max-width: 979px)", {
            match: function() {
                updateImages(), updateVideos()
            }
        }).register("screen and (min-width: 568px) and (max-width: 767px)", {
            match: function() {
                updateImages(), updateVideos()
            }
        }).register("screen and (min-width: 480px) and (max-width: 567px)", {
            match: function() {
                updateImages(), updateVideos()
            }
        }).register("screen and (max-width: 479px)", {
            match: function() {
                updateImages(), updateVideos()
            }
        }).register("screen and (max-width: 767px)", {
            match: function() {
                $("table.responsive").each(function(a, b) {
                    splitTable($(b))
                })
            },
            unmatch: function() {
                $("table.responsive").each(function(a, b) {
                    unsplitTable($(b))
                })
            }
        })
});