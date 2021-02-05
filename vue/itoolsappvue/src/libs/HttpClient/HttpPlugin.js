
class HttpPlugin {
  constructor(){}

  pre(request,next){ next(); }
  post(request,response){ return response;}
}