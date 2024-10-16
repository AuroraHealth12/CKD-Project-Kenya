
var pain_value=0;
var patient_id=Cookies.get('patient_id');

var token=Cookies.get('token');

check_token(token);

check_preexistent();

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
//console.log(Cookies.get('patient')); 

$('.sp_yes').click(function(){
   chk=$(this).prop("name");
   $("#sp_"+chk).show();
   $("#"+chk+"_when").focus();
});

$('.sp_no').click(function(){
    chk=$(this).prop("name");
    $("#sp_"+chk).hide();
    $("#"+chk+"_when").val('');
 });

$('.sp_pain_no').click(function(){
    $("#sp_pain").hide();
    $(".pain").prop("checked",'')
    pain_value=0;
 });
 
 $('.sp_pain_yes').click(function(){
    $("#sp_pain").show();
    //$(".pain").prop("checked",'')
    //pain_value=0;
 });

 $('#bt_search').click(function(){
    location.href='index.html';
 });
 
 $('#bt_exit').click(function(){
    location.href='../';
 });
 
 $('#bt_info').click(function(){
    location.href='patient.html';
 });
 
 $('#bt_save').click(function(){
    
    save();
 });
 
 /*
$('#bt_download').click(function(){

 

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

 

    window.location="https://stats.mismlb.com/ckdapi/predialysis/download/"+patient_id;
 });
 
 */
 

 $(".pain").click(function(){
   // alert($("#pain").prop("value"))
   //alert($('input[name="pain"]:checked').val())
   pain_value=$('input[name="pain"]:checked').val();
 });
 
function saytime(){
    var dt = new Date($("#datepicker-custom").val()+" "+$("#time").val());
    
    session_date=dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()+ ' '+dt.getHours()+':'+dt.getMinutes();

    alert(session_date);

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

function view_pain(){
    alert(pain_value);
 }
 
 function patient_data(){
 
 url=API_ROOT;
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

function save(){
    
    var dt = new Date($("#datepicker-custom").val()+" "+$("#time").val());
    
    session_date=dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()+ ' '+dt.getHours()+':'+dt.getMinutes();


    d={}
    d['id']=patient_id;
    d['recent_transfusion']=$('input[name="recent_transfusion"]:checked').val();
    d['recent_transfusion_when']=$("#recent_transfusion_when").val();
    d['dialysed_other_unit']=$('input[name="dialysed_other_unit"]:checked').val();
    d['dialysed_other_unit_where']=$("#dialysed_other_unit_where").val();
    d['general_condition']=$('input[name="general_condition"]:checked').val();
    d['neurosystem_oriented']=$('input[name="neuro"]:checked').val();
    d['neurosystem_score']=$("#neuro_chart").val();
    d['pain_assessment']=$('input[name="pain_assessment"]:checked').val();
    d['pain_intensity']=pain_value;
    d['fall_risk']=$('input[name="fall"]:checked').val();
    d['breathing_rythm']=$('input[name="respiratory"]:checked').val();
    d['breathing_abnormal_explanation']=$("#abnormal_explanation").val();
    d['air_entry']=$('input[name="air_entry"]:checked').val();
    d['chest_auscultation']=$('input[name="chest"]:checked').val();
    d['edema']=$('input[name="edema"]:checked').val();
    d['edema_specification']=$("#edema_explanation").val();
    d['chest_pain']=$('input[name="chest_pain"]:checked').val();
    d['chest_pain_specification']=$("#chest_pain_explanation").val();
    d['appetite']=$('input[name="appetite"]:checked').val();
    d['diet_type']=$('input[name="diet"]:checked').val();
    d['drugs_hypertensive']=$("#drugs_hypertensive").is(':checked');
    d['drugs_hypoglycemic']=$("#drugs_hypoglycemics").is(':checked');
    
    d['ward']=$("#ward").val();
    d['drdept']=$("#doctor").val();
    d['predialysis_date']=session_date;
    
    url=API_ROOT+"dialysis/pre/save";
    $.ajax({
        url:         url,
        type:        "POST",
        data:        JSON.stringify(d),
        contentType: "application/json; charset=utf-8",
        success:     function(data,status){
          res=JSON.parse(data);
          if(res['status']=='OK'){
            $("#bt_save").hide();
            $("#bt_download").show();
            $('#bt_download').click(function(){
               window.location="https://stats.mismlb.com/ckdapi/predialysis/download/"+res['predialysis_id'];
            });
                
            
            Swal.fire({
                title: "Predialysis record saved",
                icon: "success",
                showCloseButton: true,
                buttonsStyling: false,
                timer: 2500
              }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                  Cookies.set('predialysis_id')=res['predialysis_id'];
                  location.href('dialysis.html');
                }
              });
          }
          
          
        }
      })

    

 }
 
 
 function check_preexistent(){
     
    url=API_ROOT+"dialysis/pre/check/"+patient_id;
    $.ajax({
        url:         url,
        type:        "GET",
        contentType: "application/json; charset=utf-8",
        success:     function(data,status){
          res=JSON.parse(data);
          if(res['status'] !='OK'){
            
            Swal.fire({
                title: "Pre-existing assessment",
                text: "This patient has a previous pre-dialysis assessment with no corresponding dialysis. Would you like to use that assessment or create a new one (pre-exisitng will be discarded)?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: '<p class="popupbutton">Use pre-exisitng</p>',
                cancelButtonText: '<p class="popupbutton">Create a new one</p>',
              }).then((result) => {
                if (result.isConfirmed) {
                    Cookies.set('predialysis_id',res['predialysis_id']);
                    location.href="./dialysis.html";
                }else{
                    discard_preexistent(res['predialysis_id']);
                }
                
              });;
          }
          
          
        }
      })
 }
 
 
 function discard_preexistent(pda){
     
    url=API_ROOT+"dialysis/pre/discard/"+pda;
    $.ajax({
        url:         url,
        type:        "GET",
        contentType: "application/json; charset=utf-8",
        success:     function(data,status){
          res=JSON.parse(data);
          if(res['status'] !='OK'){
            
            Swal.fire({
                title: "Error discarding pre-exisiting assessment",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: '<p class="popupbutton">OK</p>'
              }).then((result) => {
                location.href('./index.html')
                
              });
          }
          
          
        }
      })
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


