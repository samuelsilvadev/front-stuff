(function() {
	const ACTIVE_CLASS = 'btn-active';
	const $buttons = document.querySelectorAll('[data-js="slider-control"]');

	for (const $button of $buttons) {
		$button.addEventListener('click', _handleClickSliderControl);
	}

	function _applyActiveClass($button) {
		$button.classList.toggle(ACTIVE_CLASS);
	}

	function _removeActiveClassFromActiveButton() {
		const $activeButton = document.querySelector(`.${ACTIVE_CLASS}`);

		$activeButton.classList.remove(ACTIVE_CLASS);
	}

	function _handleClickSliderControl(event) {
		const target = event.target;

		_removeActiveClassFromActiveButton();
		_applyActiveClass(target);
	}
})();
