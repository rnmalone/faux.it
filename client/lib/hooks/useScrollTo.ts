export default function useScrollTo(smooth = true) {
    return (offset = 0) => {
        if (!smooth) {
            return void window.scrollTo({top: offset, left: 0})
        }

        if (!('scrollBehaviour' in document.documentElement.style)) {
            (async () => {
                const {default: smoothScroll} = await import(
                    /* webpackChunkName: 'polyfill-modern' */
                    'smoothscroll-polyfill'
                    );
                smoothScroll.polyfill()
            })();
        }
        try {
            window.scrollTo({top: offset, left: 0, behavior: 'smooth'})
        } catch {
            console.debug('Browser does not support auto scroll')
        }
    }
}