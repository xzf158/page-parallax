/**
 * @author Terry
 * @date 2013-03-21
 */

define(["jquery", "TweenMax"], function() {
    var scheme = function() {
        }, 
        timelines = {}, 
        timeScales = {}, 
        $window = $(window),
        offsetArray = [],
        sectionHeightArray = [],
        stageH,
        $elems;

    function screenResize(){
        stageH = $window.height();
        offsetArray = [];
        sectionHeightArray = [];
        $elems.each(function(i) {
            var $this = $(this);
            offsetArray.push($this.offset().top);
            sectionHeightArray.push($this.height());
        });
    };

    scheme.init = function($els) {
        $els.each(function(i) {
            var $this = $(this);
            var name = $this.attr("id");
            if (!name) {
                throw new Error("Parallax holder: " + $els.selector + " " + i + " must have id.");
                return;
            }

            var timeline = new TimelineMax({
                paused : true
            });

            timelines[name] = timeline;
            $this.find("[data-portion-parallax]").andSelf().each(function(i) {
                scheme.addTo($(this), timeline);
            });
        });
        $elems = $els;
        $window.on("resize", screenResize);
        screenResize();
    }

    scheme.getTimelineByName = function(name) {
        return timelines[name];
    }

    scheme.addTo = function($el, timeline, parallaxArr) {
        var parallaxs = parallaxArr ? parallaxArr : eval($el.attr("data-portion-parallax"));
        if ($.isArray(parallaxs)) {
            for (var i = 0, il = parallaxs.length; i < il; i++) {
                if (!parallaxs[i].duration) {
                    parallaxs[i].duration = 0;
                }
                if ( typeof timeline === "string") {
                    timeline = scheme.getTimelineByName(timeline);
                }
                if (timeline) {
                    // parallaxs[i].vars["overwrite"] = "0";
                    timeline.to($el[0], parallaxs[i].duration, parallaxs[i].vars, parallaxs[i].stone);
                }
            }
        }
    }

    scheme.update = function(top) {
        var offset;
        $elems.each(function (i){
            var name = $(this).attr('id');
            offset = top - offsetArray[i];
            if (offset > 0) {
                ratio = offset / sectionHeightArray[i] / 2 + 0.5;
            } else {
                offset += stageH;
                ratio = offset / stageH / 2;
            }
            ratio = Math.max(0, ratio);
            ratio = Math.min(1, ratio);

            // if (ratio <= 0.5 && timelines[name].timeScale() != 1) {
            //     timelines[name].timeScale(1);
            // } else if (ratio > 0.5 && timelines[name].timeScale() != timeScales[name]) {
            //     timelines[name].timeScale(timeScales[name]);
            // }
            // console.log(name, ratio);
            timelines[name].seek(ratio ? ratio : 0);
        });
    }

    scheme.setTimeScales = function(value) {
        timeScales = value;
    }
    return scheme;
});
