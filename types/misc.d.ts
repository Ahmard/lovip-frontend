import {NuxtApp} from "@nuxt/types/app";

export interface MiscSelect2 {
    url: string,
    onChange: CallableFunction
}

export interface MiscScoped {
    $: jQuery,
    $nuxt: NuxtApp,
}

export interface jQuery extends JQuery {
  select2: (selector: string) => jQuery
}

export interface $ extends jQuery {
  cachedScript: (url:string) => Promise<string>
}
