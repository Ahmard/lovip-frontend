export const usePageLoader = () => useState('pageLoader', () => ElLoading.service({ fullscreen: true }))
