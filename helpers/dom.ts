export function isMobileView() {
  return window.innerWidth <= 768
}

export function startConfirmDialogLoading() {
  const confirm_button = document.querySelector('div.el-overlay-message-box button.el-button--primary');
  if (confirm_button) {
    // @ts-ignore
    confirm_button.dataset.originalText = confirm_button.innerHTML
    confirm_button.innerHTML = '<div class="el-loading-spinner" style="top: 53.5%; margin-top: 0"><svg style="width: 30px" class="circular" viewBox="0 0 50 50"><circle class="path" cx="25" cy="25" r="20" fill="none"></circle></svg><!----></div>'
    confirm_button.setAttribute('disabled', 'disabled')
    confirm_button.setAttribute('aria-disabled', 'true')
    confirm_button.classList.add('is-disabled')
  }
}

export function stopConfirmDialogLoading() {
  const confirm_button = document.querySelector('div.el-overlay-message-box button.el-button--primary');
  if (confirm_button) {
    // @ts-ignore
    confirm_button.innerHTML = confirm_button.dataset.originalText
    confirm_button.classList.remove('is-disabled')
    confirm_button.removeAttribute('disabled')
    confirm_button.removeAttribute('aria-disabled')
  }
}
