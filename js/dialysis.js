
var patient_id=Cookies.get('patient_id');
var predialysis_id=Cookies.get('predialysis_id');
var token=Cookies.get('token');

//alert(predialysis_id);
//var dialysis_id=0;

check_token(token);

var dialysis_id=Cookies.get('dialysis_id');
console.log('--->pre-exisitng:'+dialysis_id);

if(dialysis_id !=null){
    check_preexistent();
}else{
    $("body").fadeIn(2000);
    $("#new_dialysis").show();
    $("#existing_dialysis").hide();
}




if(patient_id==''){
    Swal.fire({
                title: "No patient has been selected",
                icon: "error",
                confirmButtonText: '<p class="popupbutton">OK</p>',
                timer: 2500
    }).then((result) => {
        location.href='./index.html';
    });
}



if(predialysis_id==''){
    Swal.fire({
                title: "A pre-dialysis record must be created first",
                icon: "error",
                confirmButtonText: '<p class="popupbutton">OK</p>',
                timer: 2500
    }).then((result) => {
        location.href='./index.html';
    });
}

$('#bt_search').click(function(){
    location.href='index.html';
 });
 
$('#bt_intra_add').click(function(){
    
     if (!$("#frm_add")[0].reportValidity()){
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
    
    save_intradialysis();
 });
 
$("#bt_end_modal").click(function(){
    $("#time_end").val(current_time);
    
});
 
$("#bt_intra_modal").click(function(){
    $("#time_intra").val(current_time);
    
});
 
 
 $('#bt_exit').click(function(){
    location.href='../';
 });
 
$('#bt_discontinue').click(function(){
    
     if (!$("#dialysis_end")[0].reportValidity()){
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
    
    discontinue_diaysis();
 });
 
 
 $("#bt_download_excel").click(function(){
    window.location="https://stats.mismlb.com/ckdapi/dialysis/download/"+dialysis_id;
    
});

 $("#bt_download_pdf").click(function(){
     window.open('https://stats.mismlb.com/ckdapi/dialysis/download/pdf/'+dialysis_id, "_blank")
    //window.location="https://stats.mismlb.com/ckdapi/dialysis/download/pdf/"+dialysis_id;
    
});


const $datepickerEl = document.getElementById('datepicker-custom');


// optional options with default values and callback functions
const options = {
    defaultDatepickerId: null,
    autohide: true,
    format: 'mm/dd/yyyy',
    maxDate: formatDate(),
    minDate: null,
    orientation: 'bottom',
    buttons: true,
    autoSelectToday: true,
    title: null,
    rangePicker: false,
    onShow: () => { alert(1); },
    onHide: () => {},
};

const instanceOptions = {
  id: 'datepicker-custom-example',
  override: true
};

const datepicker = new Datepicker($datepickerEl, options, instanceOptions);

const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);


var d = new Date();
var curr_month = padL(d.getMonth()+1);
var curr_year = d.getFullYear();
var curr_day = padL(d.getDate());

var curr_hour = padL(d.getHours());
var curr_min = padL(d.getMinutes());


//document.write(curr_hour + ":" + curr_min);
$("#datepicker-custom").val(curr_month + "/" + curr_day + "/" + curr_year);
$("#time").val(curr_hour + ":" + curr_min);


$("#patient_name").html(Cookies.get('patient_name'));
$("#patient_id").html(pad(patient_id,10));

 $('#bt_save').click(function(){
    
    save();
 });

function current_date(){
    var d = new Date();
    var curr_month = padL(d.getMonth()+1);
    var curr_year = d.getFullYear();
    var curr_day = padL(d.getDate());
    
    return curr_year+'-'+curr_month+'-'+curr_day;
}

function current_time(){
    var d = new Date();
    var curr_month = padL(d.getMonth()+1);
    var curr_year = d.getFullYear();
    var curr_day = padL(d.getDate());
    
    var curr_hour = padL(d.getHours());
    var curr_min = padL(d.getMinutes());
    
    return curr_hour+':'+curr_min;
}

function formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [month, day, year].join('/');
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}




function search_intra(){
    $("#intra_line").html('<tr><td colspan="4"><img src="../img/spinner.gif" style="max-width:10%; margin:auto"></td></tr>');
    url=API_ROOT+"dialysis/intra/"+dialysis_id;
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
                
                pat='<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 clickable" id="r'+tp['patient_id']+'">';
                pat+='<th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">'+tp['patient_surname']+'</th>';
                pat+='<td class="px-6">'+tp['patient_other_names']+'</td>';
                pat+='<td class="px-6">'+tp['patient_sex']+'</td>';
                pat+='<td class="px-6">'+tp['patient_age']+'</td>';
                pat+='</tr>';
                                           

                $("#search_results").append(pat);
                $('.clickable').unbind('click');
                $(".clickable").click(function(){
                    patient_info(this.id.replace('r',''));
                 });
                
                
                console.log(pat);
            }
            
          }else{
            $("#search_results").html('<br><tr style="margin-top:15px"><td colspan="4" style="text-align:center"><span style="margin:auto; font-size:2em">No records found</span></td></tr>');
    
          }
          
          
        }
      })


 }
 
 
 
 function save(){

    var dt = new Date($("#datepicker-custom").val()+" "+$("#time").val());
    
    session_date=dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()+ ' '+dt.getHours()+':'+dt.getMinutes();

  
    d={}
    d['id']=patient_id;
    d['predialysis_iddialysis_id']=predialysis_id;
    d['dialysis_date']=session_date;
    d['start_weight']=$("#start_weight").val();
    d['start_temp']=$("#start_temp").val();
    d['start_pulse']=$("#start_pulse").val();
    d['start_bp']=$("#start_bp").val();
    d['start_spo']=$("#start_spo").val();
    d['start_resp']=$("#start_resp").val();
    d['proposed_uf']=$("#proposed_uf").val();
    d['no_hours']=$("#no_hours").val();
    d['access']=$("#access").val();
    d['dialyser']=$("#dialyser").val();
    
    d['bathk']=$("#bathk").is(':checked');
    d['hepatinld']=$("#hepatinld").is(':checked');
    d['hepatinmd']=$("#hepatinmd").is(':checked');
    
    d['start_nurse']=$("#start_nurse").val();

    url=API_ROOT+"dialysis/save";
    $.ajax({
        url:         url,
        type:        "POST",
        data:        JSON.stringify(d),
        contentType: "application/json; charset=utf-8",
        success:     function(data,status){
          res=JSON.parse(data);
          if(res['status']=='OK'){
              
            Cookies.remove('predialysis_id');
            Swal.fire({
                title: "Dialysis session saved",
                icon: "success",
                confirmButtonText: '<p class="popupbutton">OK</p>',
                timer: 3000
            }).then((result) => {
                        
            });  
              
              
            
          }else{
              Swal.fire({
                title: "Error creating dialysis session",
                icon: "error",
                confirmButtonText: '<p class="popupbutton">OK</p>'
            })
              
              
          }
          
          
        }
      })

    

 }
 
function check_preexistent(){
     
    url=API_ROOT+"dialysis/check/"+dialysis_id;
    $.ajax({
        url:         url,
        type:        "GET",
        contentType: "application/json; charset=utf-8",
        success:     function(data,status){
          res=JSON.parse(data);
          if(res['status'] =='OK'){
              
              
              predialysis_id=res['predialysis_id'];
              if(res['open']=='NEW'){
                    $("body").fadeIn(2000);
                    $("#new_dialysis").show();
              }else{
                    //dialysis_id=res['dialysis_id'];
                    $("body").fadeIn(2000);
                    $("#intra_line").html('<tr><td colspan="4"><img src="../img/spinner.gif" style="max-width:10%; margin:auto"></td></tr>');
                    show_info(res['dialysis_info']);
                    show_preexisting(res['intradialysis'])
                    //alert(res['open']);
                    if(res['open']=='NO'){
                        $("#dialysis_buttons").hide();
                        $("#dialysis_download").show();
                    }else{
                        $("#dialysis_buttons").show();
                        $("#dialysis_download").hide();
                    }      
                         
                    
              }
          }else{
            
            Swal.fire({
                title: "Pre-existing assessment",
                text: "This patient doesn't have either a previous pre-dialysis assessment or an open dialysis session",
                icon: "error",
                confirmButtonText: '<p class="popupbutton">OK</p>',
                timer: 500000
              }).then((result) => {
                location.href="./index.html";
                
              });
          }
          
          
        }
      })
 }
 
 
 function check_previous(){
    console.log('pre-exisitng:'+dialysis_id);
    url=API_ROOT+"dialysis/previous/"+dialysis_id;
    $.ajax({
        url:         url,
        type:        "GET",
        headers: {
          'Authorization':token
        },
        contentType: "application/json; charset=utf-8",
        success:     function(data,status){
          res=JSON.parse(data);
         
          if(res['status'] =='OK'){
             
              if(res['open']=='YES'){
                    dialysis_id=res['dialysis_id'];
                    $("body").fadeIn(2000);
                    $("#intra_line").html('<tr><td colspan="4"><img src="../img/spinner.gif" style="max-width:10%; margin:auto"></td></tr>');
                    $("#dialysis_buttons").hide();
                    show_preexisting(res['intradialysis'])
                   
              }else{
                    
                    predialysis_id=res['predialysis_id'];
                    $("body").fadeIn(2000);
                    $("#new_dialysis").show();
                    $("#dialysis_download").show();
              }
          }else{
            
            Swal.fire({
                title: "Pre-existing assessment",
                text: "This patient doesn't have either a previous pre-dialysis assessment or an open dialysis session",
                icon: "error",
                confirmButtonText: '<p class="popupbutton">OK</p>',
                timer: 500000
              }).then((result) => {
                location.href="./index.html";
                
              });
          }
          
          
        }
      })
 }
 
 
 
 function show_preexisting(intra){
     if(intra.length>0){
        $("#intra_line").html('');
         for(i=0;i<intra.length;i++){
             idl='<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 clickable">';
             idl+='<th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">'+intra[i]['intra_time']+'</th>';
             idl+='<td class="px-6">'+intra[i]['pulse']+'</td>';
             idl+='<td class="px-6">'+intra[i]['bp']+'</td>';
             idl+='<td class="px-6">'+intra[i]['hep']+'</td>';
             idl+='<td class="px-6">'+intra[i]['uf']+'</td>';
             idl+='<td class="px-6">'+intra[i]['bfr']+'</td>';
             idl+='<td class="px-6">'+intra[i]['vp']+'</td>';
             idl+='<td class="px-6">'+intra[i]['tmp']+'</td>';
             idl+='<td class="px-6">'+intra[i]['c_temp']+'</td>';
             idl+='<td class="px-6">'+intra[i]['dfr']+'</td>';
                
             idl+='</tr>';
             $("#intra_line").append(idl);
         }
     }else{
         $("#intra_line").append('no intradialysis records');
     }
     $("#intradialysis").show();
 }
 
function save_intradialysis(){

    var dt = new Date($("#datepicker-custom").val()+" "+$("#time_intra").val());
    
    event_date=dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()+ ' '+dt.getHours()+':'+dt.getMinutes();

  
    d={}
    d['dialysis_id']=dialysis_id;
    d['intradialysis_time']=event_date;
    d['pulse']=$("#pulse_intra").val();
    d['bp']=$("#bp_intra").val();
    d['hep']=$("#hep_intra").val();
    d['uf']=$("#uf_intra").val();
    d['bfr']=$("#bfr_intra").val();
    d['vp']=$("#vp_intra").val();
    d['tmp']=$("#tmp_intra").val();
    d['c_temp']=$("#cond_intra").val();
    d['dfr']=$("#dfr_intra").val();
    d['comments']=$("#fluids_intra").val();
    
    url=API_ROOT+"intradialysis/save";
    $.ajax({
        url:         url,
        type:        "POST",
        data:        JSON.stringify(d),
        contentType: "application/json; charset=utf-8",
        success:     function(data,status){
          res=JSON.parse(data);
          if(res['status']=='OK'){
              
            Cookies.remove('predialysis_id');
            Swal.fire({
                title: "Intradialysis record saved",
                icon: "success",
                confirmButtonText: '<p class="popupbutton">OK</p>',
                timer: 3000
            }).then((result) => {
                $("#frm_add").get(0).reset();
                $("#close_intra").click();
                check_preexistent();
            });  
              
              
            
          }else{
              Swal.fire({
                title: "Error creating intradialysis record",
                icon: "error",
                confirmButtonText: '<p class="popupbutton">OK</p>'
            })
              
              
          }
          
          
        }
      })
    
}


function discontinue_diaysis(){
    
     var dt = new Date($("#datepicker-custom").val()+" "+$("#time").val());
    
    session_date=dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()+ ' '+dt.getHours()+':'+dt.getMinutes();

  
    d={}
    d['dialysis_id']=dialysis_id;
    d['time']=current_date()+' '+$("#time_end").val();
    d['nurse_ending']=$("#nurse_ending").val();
    d['finish_weight']=$("#finish_weight").val();
    
    url=API_ROOT+"dialysis/end";
    $.ajax({
        url:         url,
        type:        "POST",
        data:        JSON.stringify(d),
        contentType: "application/json; charset=utf-8",
        success:     function(data,status){
          res=JSON.parse(data);
          if(res['status']=='OK'){
              
            Cookies.remove('predialysis_id');
            Swal.fire({
                title: "Dialysis session closed",
                icon: "success",
                confirmButtonText: '<p class="popupbutton">OK</p>',
                timer: 3000
            }).then((result) => {
                 $("#dialysis_end").get(0).reset();
                 $("#close_end").click(); 
                 $("#dialysis_buttons").hide();
            });  
              
              
            
          }else{
              Swal.fire({
                title: "Error closing dialysis session",
                icon: "error",
                confirmButtonText: '<p class="popupbutton">OK</p>'
            })
              
              
          }
          
          
        }
      })
    
    
}


function show_info(d){
    $("#info_predialysis").html(d['predialysis_id']);
    $("#info_date").html(d['dialysis_date']);
    $("#info_weight").html(d['dialysis_start_weight']);
    $("#info_temperature").html(d['dialysis_temperature']);
    $("#info_pulse").html(d['dialysis_pulse']);
    $("#info_bp").html(d['dialysis_bp']);
    $("#info_spo").html(d['dialysis_spo']);
    $("#info_resp").html(d['dialysis_resprate']);
    $("#info_hours").html(d['dialysis_hours']);
    $("#info_uf").html(d['dialysis_proposed_uf']);
    $("#info_access").html(d['dialysis_access']);
    $("#info_dialyser").html(d['dialysis_dialyser']);
    (d['dialysis_bathk']==1) ? $("#info_bathk").html('YES')  : $("#info_bathk").html('NO') ;
    //if (d['dialysis_bathk']==1) $("#info_bathk").html('YES') else $("#info_bathk").html('NO') ;
    (d['dialysis_hepatinld']==1) ? $("#info_hepatinld").html('YES')  : $("#info_hepatinld").html('NO') ;
    //$("#info_hepatinld").html(d['dialysis_hepatinld']);
    (d['dialysis_hepatinmd']==1) ? $("#info_hepatinmd").html('YES')  : $("#info_hepatinmd").html('NO') ;
    //$("#info_hepatinmd").html(d['dialysis_hepatinmd']);
    $("#info_nurse").html(d['nurse_commencing']);
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

