uni.loading = title => {
	// plus.nativeUI.closeWaiting()
	// plus.nativeUI.showWaiting(title)
	uni.showLoading({ title })
}
// #ifdef APP-PLUS
uni.loading = title => {
	plus.nativeUI.closeWaiting()
	plus.nativeUI.showWaiting(title)
}
// #endif

uni.uloading = () => uni.hideLoading()
// #ifdef APP-PLUS
uni.uloading = () => {
	plus.nativeUI.closeWaiting()
}
// #endif

// uni.toast = title => plus.nativeUI.toast(title, { verticalAlign: 'center' })
uni.toast = title => uni.showToast({ title, icon: 'none' })

// #ifdef APP-PLUS
uni.toast = title => plus.nativeUI.toast(title, { verticalAlign: 'center' })
// #endif

uni.model = (...args) => {
	return new Promise((resolve, reject) => {
		uni.showModal({
		    title: args.length > 1 ? args[0] : '提示',
		    content: args.length > 1 ? args[1] : args[0],
		    success: ({ confirm }) => {
		        if (confirm) {
		            resolve()
		        } else {
					reject()
				}
		    }
		})
	})
}