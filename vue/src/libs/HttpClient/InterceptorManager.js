class InterceptorManager {
  constructor() {
    this._interceptors = []
  }

  apply(interceptor) {
    if (interceptor === undefined) {
      return
    }
    if ('function' !== typeof interceptor) {
      return
    }

    this._interceptors.unshift(interceptor)
  }

  async execute(request) {
    let self = this
    let next_ptr = 0
    async function applyNext(request) {
      return await self._interceptors[next_ptr](request, async request => {
        next_ptr++
        if (next_ptr >= self._interceptors.length) {
          throw 'chain has touch tail'
        }
        return await applyNext(request)
      })
    }

    return await applyNext(request)
  }
}

module.exports = InterceptorManager
