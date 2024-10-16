
var patient_id=-1;
Cookies.remove('patient_id');
Cookies.remove('predialysis_id');
Cookies.remove('patient_name');
Cookies.remove('dialysis_id');



//const Cookies = require('js-cookie')



$('#bt_login').click(function(){
    login();
 });
 
 
function login(){
    
    d={}
    d['user']=$("#email").val();
    d['password']=$("#password").val();
    
    
    url=API_ROOT+"login";
    $.ajax({
        url:         url,
        type:        "POST",
        data:        JSON.stringify(d),
        contentType: "application/json; charset=utf-8",
        success:     function(data,status){
          res=JSON.parse(data);
          if(res['status']=='OK'){
           
            Cookies.set('token',res['token'])
            location.href='src/index.html';

          }else{
              
              Swal.fire({
                title: "Invalid credentials",
                icon: "error",
                timer: 2500
              }).then((result) => {
                
              });
              
          }
          
          
        }
      })
    
}