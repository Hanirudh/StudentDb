var jpdbbaseurl = "http://api.login2explore.com:5577";
var jpdliml = "/api/iml";
var jpdlirl ="/api/irl";
var dbName = "SCHOOL_DB";
var rel = "STUDENT-TABLE";
var ctoken = "90932518|-31949274939978186|90949131";
$("#empid").focus();
function saveRecNo2LS(jsonObj) {
    var lvdata = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', lvdata.rec_no);
}
function getEmpIdAsJson(){
    var rid=$("#rid").val();
    var jsonStr={
        rid:rid
    };
    return JSON.stringify(jsonStr);
}
function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var data = JSON.parse(jsonObj.data).record;
    $("#stdName").val(data.name);
    $("#cls").val(data.classs);
    $("#dob").val(data.dob);
    $("#adss").val(data.address);
    $("#erd").val(data.enrolldate);
}
function resForm1() {
    $("#rid").val("");
    $("#stdName").val("");
    $("#cls").val("");
    $("#dob").val("");
    $("#adss").val("");
    $("#erd").val("");
    $("#rid").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#rid").focus();
}
function validateAndGetFormData() {
    var rollIdVar = $("#rid").val();
    if (rollIdVar === "") {
        alert("student rollno. Required Value");
        $("#rid").focus();
        return "";
    }
    var stuNameVar = $("#stdName").val();
    if (stuNameVar === "") {
        alert("Employee Name is Required Value");
        $("#stdName").focus();
        return "";
    }

    var classvar = $("#cls").val();
    if (classvar === "") {
        alert("class is Required Value");
        $("#cls").focus();
        return "";
    }
    var dobvar = $("#dob").val();
    if (dobvar === "") {
        alert("dob is Required Value");
        $("#dob").focus();
        return "";
    }
    var adress = $("#adss").val();
    if (adress === "") {
        alert("Address is Required Value");
        $("#adss").focus();
        return "";
    }
    var eid = $("#erd").val();
    if (eid === "") {
        alert("enroment date is Required Value");
        $("#erd").focus();
        return "";
    }
    var jsonStrObj = {
        rid: rollIdVar,
        name: stuNameVar,
        classs:classvar,
        dob: dobvar,
        address: adress,
        enrolldate: eid
    };
    return JSON.stringify(jsonStrObj);
}
function getStd(){
   var empIdJsonObj = getEmpIdAsJson();
    console.log(empIdJsonObj);
    var getRequest= createGET_BY_KEYRequest(ctoken, dbName, rel, empIdJsonObj);
    console.log(getRequest);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,jpdbbaseurl,jpdlirl);
     console.log(resJsonObj);
    jQuery.ajaxSetup({ async: true });
   
    if(resJsonObj.status===400){
        $("#save").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("#stdName").focus();
    }else if(resJsonObj.status===200){
        $("#rid").prop("disabled",true);
        fillData(resJsonObj);

        $("#change").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("#stdName").focus();
    }

}
function saveData1() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest(ctoken, jsonStr, dbName, rel);
    alert(putReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr,jpdbbaseurl,jpdliml);
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    resForm1();
    $("#rid").focus();
} 
function changeData1() {
    $("#change").prop("disabled", true);
    jsonchg = validateData();
    var updateReqStr = createUPDATERecordRequest(ctoken, jsonchg, dbName, rel, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resjsonObj = executeCommandAtGivenBaseUrl(updateReqStr, jpdbbaseurl, jpdliml);
    jQuery.ajaxSetup({async: true});
    console.log(resjsonObj);
    resForm1();
    $("#rid").focus();

}


