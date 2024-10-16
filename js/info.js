
var patient_id=-1;
Cookies.remove('patient_id');
Cookies.remove('predialysis_id');
Cookies.remove('patient_name');
Cookies.remove('dialysis_id');

var token=Cookies.get('token');

check_token(token)

//alert(token);

//const Cookies = require('js-cookie')



$('#bt_dialysis').click(function(){
    location.href='predialysis.html';
 });

 $('#bt_new').click(function(){
    location.href='patient.html';
 });
 
  $('#bt_exit').click(function(){
    location.href='../';
 });

 $('#bt_search').click(function(){
    location.href='index.html';
 });


 $(".clickable").click(function(){
    alert('ok');
    alert($(this).prop("id"));
 });




 $("#searchdata").on('keypress',function(e) {
    if(e.which == 13) {
        search();
    }
});

$("#bt_meh").click(function(){
  alert('ok');
  id2();
  //alert($(this).prop("id"));
});

$("#bt_punk").click(function(){
  //alert('ok');
  getid2();
  //alert($(this).prop("id"));
});

function id2(){
  $.ajax({
          url: 'http://127.0.0.1:8565/login',
          type: 'POST',
          credentials: 'include',
          success: function(result){
            //$("#session_value").append(result);
            alert(result);
          },
          error: function(result){
            //$("#session_value").append(result);
            alert(result);
          }
        });
 }


 function id3(){
  $.ajax({
          url: 'http://127.0.0.1:8565/set_session2',
          type: 'GET',
          optionxhrFields: { withCredentials: true },
          data: {arg1: 'updated value 1', arg2: 'updated value 2'},
          success: function(result){
            //$("#session_value").append(result);
            alert(result);
          },
          error: function(result){
            //$("#session_value").append(result);
            alert(result);
          }
        });
 }
 
 
  function getid2(){
    $.ajax({
          url: 'http://127.0.0.1:8565/',
          type: 'GET',
          credentials: 'include',
          success: function(result){
            //$("#session_value").append("Val1: "+result.val1);
            //$("#session_value").append("Val2: "+result.val1);
           //console.log("Val2: "+result.val1);
           alert(JSON.parse(result));
          },
          error: function(result){
            //$("#session_value").append(result);
            console.log(result);
          }
        });
 }

 $('#bt_send').click(function(){

    if ($('input[name="religious_concerns"]:checked').val()==null){
        Swal.fire({
            title: "Error",
            text: "Please indicate if there are religious concerns",
            icon: "error",
            showCloseButton: true,
            buttonsStyling: false,
            timer: 2500
          });
          return;
    }
  
    if ($('input[name="smoking"]:checked').val()==null){
        Swal.fire({
            title: "Error",
            text: "Please indicate is the patient smokes",
            icon: "error",
            showCloseButton: true,
            buttonsStyling: false,
            timer: 2500
          });
          return;
    }

    if ($('input[name="alcohol"]:checked').val()==null){
        Swal.fire({
            title: "Error",
            text: "Please indicate is the patient drinks alcohol",
            icon: "error",
            showCloseButton: true,
            buttonsStyling: false,
            timer: 2500
          });
          return;
    }

    if ($('input[name="social_concerns"]:checked').val()==null){
        Swal.fire({
            title: "Error",
            text: "Please indicate if there are social concerns",
            icon: "error",
            showCloseButton: true,
            buttonsStyling: false,
            timer: 2500
          });
          return;
    }

    if ($('input[name="counseling"]:checked').val()==null){
        Swal.fire({
            title: "Error",
            text: "Please indicate if counseling is required",
            icon: "error",
            showCloseButton: true,
            buttonsStyling: false,
            timer: 2500
          });
          return;
    }

    if (!$("#finfo")[0].reportValidity()){
        Swal.fire({
            title: "Error",
            text: "Please complete all required fields",
            icon: "error",
            showCloseButton: true,
            buttonsStyling: false,
            timer: 2500
          });
          return;
    }

   

    download();
 });


$('#bt_download').click(function(){

    /*

    if ($('input[name="religious_concerns"]:checked').val()==null){
        Swal.fire({
            title: "Error",
            text: "Please indicate if there are religious concerns",
            icon: "error",
            showCloseButton: true,
            buttonsStyling: false,
            timer: 2500
          });
          return;
    }
  
    if ($('input[name="smoking"]:checked').val()==null){
        Swal.fire({
            title: "Error",
            text: "Please indicate is the patient smokes",
            icon: "error",
            showCloseButton: true,
            buttonsStyling: false,
            timer: 2500
          });
          return;
    }

    if ($('input[name="alcohol"]:checked').val()==null){
        Swal.fire({
            title: "Error",
            text: "Please indicate is the patient drinks alcohol",
            icon: "error",
            showCloseButton: true,
            buttonsStyling: false,
            timer: 2500
          });
          return;
    }

    if ($('input[name="social_concerns"]:checked').val()==null){
        Swal.fire({
            title: "Error",
            text: "Please indicate if there are social concerns",
            icon: "error",
            showCloseButton: true,
            buttonsStyling: false,
            timer: 2500
          });
          return;
    }

    if ($('input[name="counseling"]:checked').val()==null){
        Swal.fire({
            title: "Error",
            text: "Please indicate if counseling is required",
            icon: "error",
            showCloseButton: true,
            buttonsStyling: false,
            timer: 2500
          });
          return;
    }

    if (!$("#finfo")[0].reportValidity()){
        Swal.fire({
            title: "Error",
            text: "Please complete all required fields",
            icon: "error",
            showCloseButton: true,
            buttonsStyling: false,
            timer: 2500
          });
          return;
    }

   */

    window.location=API_ROOT+"patient/download/"+patient_id;
 });


 $('#bt_save').click(function(){
    
    save();
 });
 
  $('#bt_save_changes').click(function(){
    save_changes();
 });

 $('#bt_search_patient').click(function(){
    search();
 });


 function download(){

    d={}
    d['surname']=$("#surname").val();
    d['other_names']=$("#other_names").val();
    d['age']=$("#age").val();
    d['sex']=$("#sex").val();
    d['marital_status']=$("#marital_status").val();
    d['employment']=$("#employment").val();
    d['religion']=$("#religion").val();
    d['religious_concerns']=$('input[name="religious_concerns"]:checked').val();
    d['smoking']=$('input[name="smoking"]:checked').val();
    d['alcohol']=$('input[name="alcohol"]:checked').val();
    d['social_concerns']=$('input[name="social_concerns"]:checked').val();
    d['counseling']=$('input[name="counseling"]:checked').val();
    d['diagnosis']=$("#diagnosis").val();

    

    window.location="https://stats.mismlb.com/ckdapi/info_xls/"+JSON.stringify(d);

 }


 function download2(){
    /*
    d={}
    d['surname']=$("#surname").val();
    d['other_names']=$("#other_names").val();
    d['age']=$("#age").val();
    d['sex']=$("#sex").val();
    d['marital_status']=$("#marital_status").val();
    d['employment']=$("#employment").val();
    d['religion']=$("#religion").val();
    d['religious_concerns']=$('input[name="religious_concerns"]:checked').val();
    d['smoking']=$('input[name="smoking"]:checked').val();
    d['alcohol']=$('input[name="alcohol"]:checked').val();
    d['social_concerns']=$('input[name="social_concerns"]:checked').val();
    d['counseling']=$('input[name="counseling"]:checked').val();
    d['diagnosis']=$("#diagnosis").val();
    */
    window.location="https://stats.mismlb.com/ckdapi/patient/download/"+patient_id;
    //https://stats.mismlb.com/ckdapi/info_xls/%7B%22surname%22:%22CASTELLANOS%22,%22other_names%22:%22JUAN%20CARLOS%22,%22age%22:%2253%22,%22sex%22:%22M%22,%22marital_status%22:%22SINGLE%22,%22employment%22:%22SELF-EMPLOYED%22,%22religion%22:%22CATHOLIC%22,%22religious_concerns%22:%22NO%22,%22smoking%22:%22NO%22,%22alcohol%22:%22YES%22,%22social_concerns%22:%22NO%22,%22counseling%22:%22NO%22,%22diagnosis%22:%22TEST%20DIAGNOSIS%22%7D

 }


 function save(){

    d={}
    d['surname']=$("#surname").val();
    d['other_names']=$("#other_names").val();
    d['age']=$("#age").val();
    d['sex']=$("#sex").val();
    d['marital_status']=$("#marital_status").val();
    d['employment']=$("#employment").val();
    d['religion']=$("#religion").val();
    d['religious_concerns']=$('input[name="religious_concerns"]:checked').val();
    d['smoking']=$('input[name="smoking"]:checked').val();
    d['alcohol']=$('input[name="alcohol"]:checked').val();
    d['social_concerns']=$('input[name="social_concerns"]:checked').val();
    d['counseling']=$('input[name="counseling"]:checked').val();
    d['diagnosis']=$("#diagnosis").val();
    d['ward']=$("#ward").val();
    d['doctor']=$("#doctor").val();
    d['referral']=$("#referral").val();
    d['admission']=$("#admission").val();
    d['arrival']=$("#arrival").val();
    d['hbags']=$("#hbags").is(':checked');
    d['hiv']=$("#hiv").is(':checked');
    d['hcs']=$("#hcs").is(':checked');

    url=API_ROOT+"patient/save";
    $.ajax({
        url:         url,
        type:        "POST",
        data:        JSON.stringify(d),
        contentType: "application/json; charset=utf-8",
        success:     function(data,status){
          res=JSON.parse(data);
          if(res['status']=='OK'){
              
              
            Swal.fire({
                title: "Patient Record saved",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: '<p class="popupbutton">Go to Predialysis assessment</p>',
                cancelButtonText: '<p class="popupbutton">Go to patients</p>',
            }).then((result) => {
                        if (result.isConfirmed) {
                            Cookies.set('patient_id',res['patient_id']);
                            Cookies.set('patient_name',$("#surname").val()+', '+$("#other_names").val());
                            location.href="./predialysis.html";
                        }else{
                            location.href="./index.html";
                        }
              });  
              
              
              /*
              
            Swal.fire({
                title: "Patient Record",
                text: "Patient record saved successfully",
                icon: "success",
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Go to Predialysis",
                cancelButtonText: "Home",
                buttonsStyling: false,
                timer: 25000
              }).then((result) => {
                if (result.isConfirmed) {
                    Cookies.set('patient_id',res['patient_id']);
                    location.href="./predialysis.html";
                }else{
                    location.href="./index.html";
                }
              });
              
              */
          }else{
              Swal.fire({
                title: "Error creating patient",
                icon: "error",
                confirmButtonText: '<p class="popupbutton">OK</p>'
            })
              
              
          }
          
          
        }
      })

    

 }


function save_changes(){

    d={}
    d['id']=patient_id;
    d['surname']=$("#surname").val();
    d['other_names']=$("#other_names").val();
    d['age']=$("#age").val();
    d['sex']=$("#sex").val();
    d['marital_status']=$("#marital_status").val();
    d['employment']=$("#employment").val();
    d['religion']=$("#religion").val();
    d['religious_concerns']=$('input[name="religious_concerns"]:checked').val();
    d['smoking']=$('input[name="smoking"]:checked').val();
    d['alcohol']=$('input[name="alcohol"]:checked').val();
    d['social_concerns']=$('input[name="social_concerns"]:checked').val();
    d['counseling']=$('input[name="counseling"]:checked').val();
    d['diagnosis']=$("#diagnosis").val();
    d['ward']=$("#ward").val();
    d['doctor']=$("#doctor").val();
    d['referral']=$("#referral").val();
    d['admission']=$("#admission").val();
    d['arrival']=$("#arrival").val();
    d['hbags']=$("#hbags").is(':checked');
    d['hiv']=$("#hiv").is(':checked');
    d['hcs']=$("#hcs").is(':checked');

    url=API_ROOT+"patient/edit";
    $.ajax({
        url:         url,
        type:        "POST",
        data:        JSON.stringify(d),
        contentType: "application/json; charset=utf-8",
        success:     function(data,status){
          res=JSON.parse(data);
          if(res['status']=='OK'){
            Swal.fire({
                title: "Patient Record",
                text: "Patient record saved successfully",
                icon: "success",
                showCloseButton: true,
                buttonsStyling: false,
                timer: 2500
              }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                  console.log("I was closed by the timer");
                }
              });
          }
          
          
        }
      })

    

 }


 function search(){
    $("#search_results").html('<tr><td colspan="4"><img src="../img/spinner.gif" style="max-width:10%; margin:auto"></td></tr>');
    url=API_ROOT+"patient/search?c="+$("#criteria").val()+"&d="+$("#searchdata").val();
    $.ajax({
        url:         url,
        type:        "GET",
        contentType: "application/json; charset=utf-8",
        success:     function(data,status){
          res=JSON.parse(data);
          if(res.length > 0){
            console.log(res)    
            $("#search_results").html('');
            for (i=0; i<res.length; i++) {
                tp=res[i];
                in_session=''
                if (tp['dialysis_id'] >0){
                    in_session='<svg onclick="return goto_dialysis(event,'+tp['patient_id']+','+tp['dialysis_id']+',\''+tp['patient_surname']+', '+tp['patient_other_names']+'\'); return false;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>';
                }
                pat='<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 clickable" id="r'+tp['patient_id']+'" open-session="'+tp['dialysis_id']+'">';
                pat+='<th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">'+tp['patient_surname']+'</th>';
                pat+='<td class="px-6">'+tp['patient_other_names']+'</td>';
                pat+='<td class="px-6">'+tp['patient_sex']+'</td>';
                pat+='<td class="px-6">'+tp['patient_age']+'</td>';
                pat+='<td class="px-6">'+in_session+'</td>';
                
                pat+='</tr>';
                                           

                $("#search_results").append(pat);
                $('.clickable').unbind('click');
                $(".clickable").click(function(){
                    patient_info(this.id.replace('r',''), this.getAttribute("open-session"));
                 });
                
                
                console.log(pat);
            }
            
          }else{
            $("#search_results").html('<br><tr style="margin-top:15px"><td colspan="4" style="text-align:center"><span style="margin:auto; font-size:2em">No records found</span></td></tr>');
    
          }
          
          
        }
      })


 }


 function patient_info(p,s){
    patient_id=p;
    //token='y*k=LACR6#}E2grA';

    if (s >0){
        $("#link_predialysis").hide();
        $("#link_dialysis").show();
        Cookies.set('dialysis_id',s);
    }else{
        $("#link_predialysis").show();
        $("#link_dialysis").hide();
    }
    
    //document.cookie = "authorization="+token+"; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/";
    //document.cookie = "authorization="+token;
    
    //alert(document.cookie);
    //console.log(Cookies.get('name')); 
    
    url=API_ROOT+"patient/info/"+p;
    $.ajax({
        url:         url,
        type:        "GET",
        headers: {
          'Authorization':token
        },
        contentType: "application/json; charset=utf-8",
        success:     function(data,status){
          res=JSON.parse(data);
          if(res['status']=="OK"){
            Cookies.set('patient_id',p )
            Cookies.set('patient_name',res['patient_surname']+', '+res['patient_other_names']);
            //console.log(res);
            //console.log('------>'+document.cookie);
            $("#patient_id").html(p);
            $("#surname").val(res['patient_surname']);
            $("#other_names").val(res['patient_other_names']);
            $("#age").val(res['patient_age']);
            $("#sex").val(res['patient_sex']);
            $("#marital_status").val(res['patient_marital_status']);
            $("#employment").val(res['patient_employment']);
            $("#religion").val(res['patient_religion']);
            //$("input[name='religious_concerns'][value=" + res['religious_concerns'] + "]").prop('checked', true);
            //$("#sex").val(res['patient_sex']);
            $('[name="religious_concerns"]').val([res['patient_religious_concerns'] ]);
            $('[name="smoking"]').val([res['patient_smoking'] ]);
            $('[name="alcohol"]').val([res['patient_alcohol'] ]);
            $('[name="social_concerns"]').val([res['patient_social_concerns'] ]);
            $('[name="counseling"]').val([res['patient_counseling'] ]);
            $("#ward").val(res['patient_ward']);
            $("#doctor").val(res['patient_drdept']);
            $("#diagnosis").val(res['patient_diagnosis']);
            $("#referral").val(res['patient_source_referral']);
            $("#admission").val(res['patient_type_admission']);
            $("#arrival").val(res['patient_mode_arrival']);
            //if
            $("#hbags").prop("checked",res['patient_serology_hbags']);
            $("#hiv").prop("checked",res['patient_serology_hiv']);
            $("#hcs").prop("checked",res['patient_serology_hcs']);
            
            $(".previous-dialysis-record").remove();
            
            for(i=0; i< res['previous'].length; i++){
                prev='<li id="" class="previous-dialysis-record"><a href="#" onclick="gotoprevious('+res["previous"][i]["dialysis_id"]+')" previous="'+res["previous"][i]["dialysis_id"]+'" class="previous-d flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>-Dialysis on '+res["previous"][i]["dialysis_date"]+'</a></li>';
                $("#dialysis_events").append(prev);
                console.log(prev);
                console.log(res["previous"][i]["dialysis_date"]);
                
            }
            
            
            
            $("#patient_modal").click();
            
          }
          
          
        }
      })


 }

function gotoprevious(p){
    //alert(p);
    Cookies.set('dialysis_id',p);
    location.href='dialysis.html';
}

 function show_patient(pid){
    //$("#patient_modal").click();

 }

 function id(){

  url=API_ROOT+"id";
  $.ajax({
      url:         url,
      type:        "GET",
      contentType: "application/json; charset=utf-8",
      success:     function(data,status){
        //res=JSON.parse(data);
        alert(data);
        
        
      }
    })

 }
 
 function testswal(){
     
     Swal.fire({
                title: "Error creating patient",
                icon: "error",
                confirmButtonText: '<p class="popupbutton">OK</p>'
            })
       /*
    Swal.fire({
                title: "Patient Record saved",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: '<p class="popupbutton"> Go to Predialysis assessment</p>',
                cancelButtonText: '<p class="popupbutton">Go to patients</p>',
    }).then((result) => {
                if (result.isConfirmed) {
                    Cookies.set('patient_id',3);
                    Cookies.set('patient_name',$("#surname").val()+', '+$("#other_names").val());
                    location.href="./predialysis.html";
                }else{
                    location.href="./index.html";
                }
              });
   
     swal({
            title: "Apakah anda yakin?",
            text: "Anda dapat mengaktifkannya lagi nanti...",
            icon: "warning",
            buttons: {
                confirm : {text:'Ubah',className:'sweet-warning'},
                cancel : 'Batalkan'
            },
        }).then((will)=>{
            if(will){
                $(".onoffswitch-checkbox").prop('checked',false);
            }else{
                $("#all_petugas").click();
            }
        });
        
        */
             
 }


function goto_dialysis(ev,pid,did,pname){
    
    ev = ev || window.event;
    ev.preventDefault();
    Cookies.set('patient_id',pid);
    Cookies.set('patient_name',pname);
    Cookies.set('dialysis_id',did)
    location.href='dialysis.html';
}


function check_token(){
    
    if (token==null)
        location.href='../';
      
    url=API_ROOT+"check_token/"+token;
    $.ajax({
      url:         url,
      type:        "GET",
      contentType: "application/json; charset=utf-8",
      success:     function(data,status){
        res=JSON.parse(data);
        $("#user").html(res['username']);
        
        
      }
    })
  
    
    
}



 


