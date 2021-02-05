


class AuthPlugin {

  constructor(options){
      this.accessKey="";
      this.accessSecret="";
      this.refreshEndpoint="";
      this.token="";
      this.unAuthorizeRedirect="";
  }

  

  preRequest(request,chain){
    
  }

  install(httpConfig){
    return {
      preRequest:(request,chain)=>this.preRequest(request,chain)
    }
  }
}

module.exports = AuthPlugin;