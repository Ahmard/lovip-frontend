import _ from "lodash";
import {HtmlEvent} from "~/types/html.event";

export function badge(type: string, content: string) {
    return `<span class="badge bg-${type}">${_.upperFirst(content)}</span>`
}

export function nuxtLink(href: string, html: string, className: string): string {
  return `<a href="/#/${href}" class="${className}">${html}</a>`
}

export function togglePasswordVisibility() {
  let isPasswordVisible = false;
  return function (e: HtmlEvent) {
    const elVisibility = e.currentTarget.querySelector('i');
    // @ts-ignore
    const passwordInput: HTMLInputElement | null = document.querySelector(e.currentTarget.dataset.passField)

    if (elVisibility && passwordInput) {
      if (isPasswordVisible) {
        elVisibility.classList.remove('bx-show');
        elVisibility.classList.add('bx-hide');
        isPasswordVisible = false
        passwordInput.type = 'password'
      } else {
        elVisibility.classList.remove('bx-hide');
        elVisibility.classList.add('bx-show');
        isPasswordVisible = true
        passwordInput.type = 'text'
      }
    }
  }
}
