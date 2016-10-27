//digital clock
(function ( $ ) {

				// Cache some selectors
    $.fn.digitalClock = function (options) {
        this.each(function () {

            var clock = this,
                alarm = null,//clock.find('.alarm'),
                ampm = clock.getElementsByClassName('ampm'),
                settings,
                defaults;

            // Map digits to their names (this will be an array)
            var digit_to_name = 'zero one two three four five six seven eight nine'.split(' ');

            // This object will hold the digit elements
            var digits = {};

            // Positions for the hours, minutes, and seconds
            var positions = [
                'h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'];

            // Generate the digits with the needed markup,
            // and add them to the clock

            var digit_holder = clock.getElementsByClassName('digits');

            defaults = {};
            settings = $.extend({}, defaults, options);

            el = this;

            //el.size = settings.size;


            // Create Clock Structure
            display = document.createElement('div');
            display.setAttribute('class','display');
            digits = document.createElement('div');
            digits.setAttribute('class','digits');
            ampm = document.createElement('div');
            ampm.setAttribute('class','ampm');

            display.appendChild(digits);
            display.appendChild(ampm);

            this.appendChild(display);


            //setup positions
            $.each(positions, function () {

                if (this == ':') {
                    digits.append('<div class="dots">');
                } else {

                    var pos = $('<div>');

                    for (var i = 1; i < 8; i++) {
                        pos.append('<span class="d' + i + '">');
                    }

                    // Set the digits as key:value pairs in the digits object
                    digits[this] = pos;

                    // Add the digit elements to the page
                    digit_holder.append(pos);
                };

            });

            // Add the weekday names
            var weekday_names = 'Mo Tu We Th Fr Sa Su'.split(' '),
                weekday_holder = clock.getElementsByClassName('weekdays');

            $.each(weekday_names, function () {
                weekday_holder.append('<span>' + this + '</span>');
            });

            var weekdays = null;//clock.getElementsByClassName('weekdays span');

            function startClock() {
                // Use moment.js to output the current time as a string
                // hh is for the hours in 12-hour format,
                // mm - minutes, ss-seconds (all with leading zeroes),
                // d is for day of week and A is for AM/PM

                var now = moment().format("hhmmssdA");

                digits.h1.attr('class', digit_to_name[now[0]]);
                digits.h2.attr('class', digit_to_name[now[1]]);
                digits.m1.attr('class', digit_to_name[now[2]]);
                digits.m2.attr('class', digit_to_name[now[3]]);
                digits.s1.attr('class', digit_to_name[now[4]]);
                digits.s2.attr('class', digit_to_name[now[5]]);

                // The library returns Sunday as the first day of the week.
                // Stupid, I know. Lets shift all the days one position down, 
                // and make Sunday last

                var dow = now[6];
                dow--;

                // Sunday!
                if (dow < 0) {
                    // Make it last
                    dow = 6;
                }

                // Mark the active day of the week
                weekdays.removeClass('active').eq(dow).addClass('active');

                // Set the am/pm text:
                ampm.text(now[7] + now[8]);

                // Set Timer to update Time
                var synced_delay = 1000 - ((new Date().getTime()) % 1000);
                setTimeout(function () { startClock(); }, synced_delay);
            };

        });//return each this;
    };
} (jQuery));