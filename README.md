# jQuery Simple and Accessible Modal Window

This jQuery plugin provides you a shiny and accessible modal window, using ARIA.

A presentation page and demo is here: http://a11y.nicolas-hoffmann.net/dialog-tooltip/

## How it works

Basically, the scripts wraps each <code>class="js-tooltip"</code> into a <code>span class="your-prefix-class-container"</code>, when you activate one, it inserts a dialog element just after the clicked element (in the container), puts the focus into it and traps focus in the dialog tooltip. When you exit it, the focus is given back to the element that opened it.

For mouse users, they can click outside the dialog tooltip to close it.

If you never activate a dialog tooltip, it won’t be anywhere in the code.

## Options and attributes

Simply put <code>class="js-tooltip"</code> on a button to activate the script.

- Attribute <code>data-tooltip-prefix-class</code>: the prefix to all style classes of the dialog tooltip.
- Attribute <code>data-tooltip-text</code>: the text of your dialog tooltip (will be put into a <code>p</code> tag).
- Attribute <code>data-tooltip-content-id</code>: the <code>id</code> of (hidden) content in your page that will be put into your dialog tooltip.
- Attribute <code>data-tooltip-title</code>: the main title of the dialog tooltip.
- Attribute <code>data-tooltip-close-text</code>: the text of the close button in your dialog tooltip.
- Attribute <code>data-tooltip-close-title</code>: the <code>title</code> attribute of the close button in your dialog tooltip.

Enjoy.

<img src="http://www.nicolas-hoffmann.net/bordel/chuck-norris1.jpg" alt="Chuck Norris approved this" />

P.S: this plugin is in [MIT license](https://github.com/nico3333fr/jquery-accessible-modal-window-aria/blob/master/LICENSE). It couldn't be done without the precious help of @ScreenFeedFr, @sophieschuermans, @johan_ramon, @goetsu and @romaingervois.
