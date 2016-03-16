var auth = require('./auth'),
    rest = require('./restRequest');
exports.getRank = function(req,res){
  var types=["restaurant","cafe","bus_station","atm","taxi_stand","hospital","food"];
  var response={};
  var sum=0;
  var count=0;
  var datacount=0;
   var json={}
  var k=0;
  for(k=0;k<types.length;k++)
  { if(k<types.length)
    {
    
    var agents = rest.GET(auth.getAgreement("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+req.params.longitude+","+req.params.latitude+"&radius=1500&types="+types[k]+"&key=AIzaSyDasJUVI8bbosVeewh_cF-Su6DJGEHs2Qg",types[k]), [], function(list){
      
       if(list.status=="OK")
       {
        check(list,function(type,val){
                        console.log(type+"++"+val); 
                        
                         json[type]={"quality":val,"quantity":list.results.length}
                         if(val!="NA")
                         {sum+=parseFloat(val);
                          console.log("value"+sum)
                         datacount++;
                         }
                         count++;
                       
            });
         }
        else
        {console.log("Hello")
          json[list.ratingtype] = {"quality":"NA","quantity":0}
          count++;
      }
       if(count==types.length)
                        { 
                          response.ratings=json;
                          var qrating;
                          if(response.ratings.atm.quantity>0&&response.ratings.hospital.quantity>0)
                            {
                              qrating=2;
                              if(response.ratings.atm.quantity>2&&response.ratings.hospital.quantity>2)
                              {
                                        qrating=3;
                                        if(response.ratings.atm.quantity>3&&response.ratings.taxi_stand.quantity>0&&response.ratings.hospital.quantity>3)
                                        {
                                          qrating=4;
                                          if(response.ratings.atm.quantity>5&&response.ratings.taxi_stand.quantity>5||response.ratings.hospital.quantity>5)
                                          {
                                              qrating=5;
                                          }
                                        }
                              }
                            }
                            else
                            {
                              qrating=1
                            }
                            if(sum==0&&datacount==0)
                            {
                              quantity=0;
                            }
                            else
                            {
                            var quantity=(sum/datacount)
                            }
                           response.overall = parseFloat((qrating/2+parseInt((quantity))/2).toFixed(1));
                           response.userRating = getRandomArbitrary(3,4.5).toFixed(1);
                            var agents = rest.GETPlaces(auth.getAgreement("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+req.params.longitude+","+req.params.latitude+"&radius=5000&key=AIzaSyDasJUVI8bbosVeewh_cF-Su6DJGEHs2Qg"), [], function(list){
                                               var list=JSON.parse(list)
                                               console.log(list);
                                               var places=[]
                                               for(i=0;i<4;i++)
                                               {

                                                 places.push(list.results[i].name)
                                                  if(places.length==4)
                                                  { 
                                                       response["places"]=places;
                                                       res.send(response);
                                                  }
                                               }
                            });
                        
                        }
     });
  }
  }
  
}; 

function check(list,callback)//To Check AlertSettings for sending Push Notification
{ 
  var i=0;
  var sum=0;  
  var ratings=[]
  for(i=0;i<list.results.length;i++)
       {

        if(list.results[i].rating)
        {
         ratings.push(parseFloat(list.results[i].rating))
         sum+=list.results[i].rating
       }
          if(i==list.results.length-1)
          { 
                if(ratings.length==0)
                {
                  callback(list.ratingtype,"NA")
                }
                else
                {
                  callback(list.ratingtype,(sum/ratings.length).toFixed(1));
                }
          }
       }
 
 
}
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}