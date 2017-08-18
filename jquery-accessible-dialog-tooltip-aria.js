jQuery(document).ready(function($) {

    /*
     * jQuery simple and accessible dialog tooltip window, using ARIA
     * @version v1.4.2
     * Website: https://a11y.nicolas-hoffmann.net/dialog-tooltip/
     * License MIT: https://github.com/nico3333fr/jquery-accessible-dialog-tooltip-aria/blob/master/LICENSE
     */
    // loading tooltip ------------------------------------------------------------------------------------------------------------
    // init
    var $js_tooltips = $('.js-tooltip'),
        $body = $('body');

    if ($js_tooltips.length) { // if there are at least one :)

        $js_tooltips.each(function(index_to_expand) {
            var $this = $(this),
                options = $this.data(),
                $tooltip_prefix_class = typeof options.tooltipPrefixClass !== 'undefined' ? options.tooltipPrefixClass + '-' : '',
                index_lisible = index_to_expand + 1;

            $this.attr({
                'id': 'label_tooltip_' + index_lisible
            });
            // wraps element in a container
            $this.wrap('<span class="' + $tooltip_prefix_class + 'container"></span>');

        });

    }

    // jQuery formatted selector to search for focusable items
    var focusableElementsString = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";


    // events ------------------
    $body.on('click', function(event) {
            var $target = $(event.target),
                $focus_back = $('#' + $('#js-tooltip-close').attr('data-focus-back')),
                $dialog_tooltip = $('.js-dialogtooltip');

            // if click outside => close
            if ((!$target.is('.js-dialogtooltip') && !$target.is('.js-tooltip') && !$target.closest(".js-dialogtooltip").length) || ($target.is($focus_back))) {
                $dialog_tooltip.remove();
                $focus_back.removeClass('is-active');
            }
        })
        .on('click', ".js-tooltip:not('.is-active')", function(event) {
            var $this = $(this),
                options = $this.data(),
                $tooltip_prefix_class = typeof options.tooltipPrefixClass !== 'undefined' ? options.tooltipPrefixClass + '-' : '',
                $tooltip_text = options.tooltipText || '',
                $tooltip_content_id = typeof options.tooltipContentId !== 'undefined' ? '#' + options.tooltipContentId : '',
                $tooltip_title = options.tooltipTitle || '',
                $tooltip_close_text = options.tooltipCloseText || 'Close',
                $tooltip_close_title = options.tooltipCloseTitle || options.tooltipCloseText,
                $tooltip_close_img = options.tooltipCloseImg || '',
                $tooltip_starter_id = $this.attr('id'),
                $tooltip_code;

            // close tooltip and remove active one
            $('#js-tooltip').remove();
            $('.js-tooltip').removeClass('is-active');

            // insert code at the end
            $tooltip_code = '<dialog id="js-tooltip" class="js-dialogtooltip ' + $tooltip_prefix_class + 'tooltip" data-launched-by="click" aria-labelledby="tooltip-title" open aria-modal="true"><div role="document">';
            $tooltip_code += '<button id="js-tooltip-close" class="' + $tooltip_prefix_class + 'tooltip__close" data-focus-back="' + $tooltip_starter_id + '" title="' + $tooltip_close_title + '" type="button"><span class="' + $tooltip_prefix_class + 'tooltip__closetext__container">';
            if ($tooltip_close_img !== '') {
                $tooltip_code += '<img src="' + $tooltip_close_img + '" alt="' + $tooltip_close_text + '" class="' + $tooltip_prefix_class + 'tooltip__closeimg" />';
            } else {
                $tooltip_code += $tooltip_close_text;
            }
            $tooltip_code += '</span></button>';

            if ($tooltip_title !== '') {
                $tooltip_code += '<h1 id="tooltip-title" class="tooltip-title ' + $tooltip_prefix_class + 'tooltip__title">' + $tooltip_title + '</h1>';
            }
            if ($tooltip_text !== '') {
                $tooltip_code += '<p>' + $tooltip_text + '</p>';
            } else {
                if ($tooltip_content_id !== '' && $($tooltip_content_id).length) {
                    $tooltip_code += $($tooltip_content_id).html();
                }
            }
            $tooltip_code += '</div></dialog>';

            // Chrome bug
            setTimeout(function() {
                $($tooltip_code).insertAfter($this);
            }, 50);
            // fix for Chrome bug resolution…
            setTimeout(function() {
                $('#js-tooltip-close').focus();
            }, 51);

            $('#' + $tooltip_starter_id).addClass('is-active');

            event.preventDefault();

        })
    /*
     .on( 'mouseleave', '#js-tooltip', function( event ) {
          var $this = $(this),
              options = $this.data(),
              $tooltip_launched_by = options.launchedBy,
              $focus_back = $('#' + options.focusBack),
              $close_button = $this.find('.tooltip-close');

          $close_button.click();
          $focus_back.removeClass('is-active');

      })*/
    ;

    // close button and esc key
    $body.on('click', '#js-tooltip-close', function(event) {
            var $this = $(this),
                $tooltip_launched_by = $this.parents('#js-tooltip').attr('data-launched-by'),
                $focus_back = $('#' + $this.attr('data-focus-back'));

            $('#js-tooltip').remove();
            $focus_back.focus();
            $focus_back.removeClass('is-active');

        })
        .on("keydown", "#js-tooltip", function(event) {
            var $this = $(this);

            if (event.keyCode == 27) { // esc
                $('#js-tooltip-close').click();
                event.preventDefault();
            }
            if (event.keyCode == 9) { // tab or maj+tab

                // get list of all children elements in given object
                var children = $this.find('*');

                // get list of focusable items
                var focusableItems = children.filter(focusableElementsString).filter(':visible');

                // get currently focused item
                var focusedItem = $(document.activeElement);

                // get the number of focusable items
                var numberOfFocusableItems = focusableItems.length

                var focusedItemIndex = focusableItems.index(focusedItem);

                if (!event.shiftKey && (focusedItemIndex == numberOfFocusableItems - 1)) {
                    focusableItems.get(0).focus();
                    event.preventDefault();
                }
                if (event.shiftKey && focusedItemIndex == 0) {
                    focusableItems.get(numberOfFocusableItems - 1).focus();
                    event.preventDefault();
                }


            }

        });



});
