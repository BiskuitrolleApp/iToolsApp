
class TestPlugin {
  constructor(){

  }

  install(){
    return {
      pre:(request)=>this.onRequest(request),
      post:(request,response)=>this.onResponse(request,response)
    }
  }

  onRequest(request){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        request.headers.update("Authorization","Bearer 123456");
        resolve(request);
      },5000);
    })
  }

  onResponse(request,response){
     response.data
  }
}

module.exports = TestPlugin;