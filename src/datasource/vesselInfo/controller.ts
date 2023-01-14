import { logger } from "../../log/logger";
import { Utility } from "../../utility/database/mysql/Utility";
import { provider } from "../provider/provider";
import { queryHelper } from "./queryBuilder/mysql";
import { vesselVariables } from "./enum";
import { resolve } from "path";
import axios from "axios";

class Controller{
  public apiPath(type){
    return new Promise(async(resolve,reject)=>{
      try {
        let vesselInfoApiDatas =  await provider.vesselInfoApi(type);
        let latAndLongApiDatas = await provider.latAndLongApi();
        await this.insertVesselDetails(vesselInfoApiDatas,latAndLongApiDatas,type)
        return resolve({
          status: "success",
          message: "New Shipping information Created!!!",
          });
      } catch (error) {
        logger.log("error", JSON.stringify(error));
        return reject(error);
      }
      
    })
  }

  public getVesselDetails(search : any,limit : any,offset : number,fromDate,toDate){
    return new Promise(async(resolve,reject)=>{
      try {
        let vesselDetails = queryHelper.getVessels(search,limit,offset,fromDate,toDate)
        let vesselList= await Utility.databaseQuery(
          vesselDetails,
          "GET Users List"
        );
        return resolve({ status: "success", "response": vesselList[0],"count" : vesselList[1][0]["TotalCount"] });
      }catch (error) { 
        logger.log("error", JSON.stringify(error));
        return reject(error);
      }
    })
  }

  public insertVesselDetails(vesselInfoApiDatas,latAndLongApiDatas,type){
    return new Promise(async(resolve,reject)=>{
      try {
        let insertNewVesselDatas : string = ''
        let insertNewLatAndLongDatas : string = ''

        await this.insertImoAndNameDetails(vesselInfoApiDatas[vesselVariables.VESSEL_DETAILS])
        for(let data of vesselInfoApiDatas[vesselVariables.VESSEL_DETAILS]){
          let queryValues = await this.queryValues(data)
          let modifiedNames = queryValues["modifiedNames"];
          let values = queryValues["values"]
          let imoAndNameId = await this.imoNameCheck(data)
          try {
            insertNewVesselDatas += queryHelper.insertNewVesselData(modifiedNames,values,imoAndNameId,type)
          } catch (error) {
            logger.log("error",JSON.stringify(error))
          }
        }

        await this.insertImoAndNameDetails(latAndLongApiDatas[vesselVariables.Get_Vessel_List_With_GPS])
        for(let data of latAndLongApiDatas[vesselVariables.Get_Vessel_List_With_GPS]){
          let queryValues = await this.queryValues(data)
          let modifiedNames = queryValues["modifiedNames"];
          let values = queryValues["values"]
          let imoAndNameId = await this.imoNameCheck(data)
          try {
            insertNewLatAndLongDatas += queryHelper.insertNewLatAndLongData(modifiedNames,values,imoAndNameId)
          } catch (error) {
            logger.log("error",JSON.stringify(error))
          }
        }
        try {
          await Utility.databaseQuery(insertNewVesselDatas,"Insert new vessel Info data");
          await Utility.databaseQuery(insertNewLatAndLongDatas,"Insert New lat and long data")
        } catch (error) {
          logger.log("error",JSON.stringify(error))
        }
       return resolve({
        status: "success",
        message: "New Shipping information Created!!!",
        });
      }catch (error) {
        logger.log("error", JSON.stringify(error));
        return reject(error);
      }  
    })
  }


  public insertImoAndNameDetails(apiDataType){
    return new Promise(async(resolve,reject)=>{
      try {
        let imoNumber = ''
        let vesselName = ''
        for(let data of apiDataType){
          imoNumber = data["IMO_NUMBER"];
          vesselName = data["NAME"]
          try {
            let insertImoAndNameQuery = queryHelper.insertNewVesselImoAndNameTable(imoNumber,vesselName)
            await Utility.databaseQuery(insertImoAndNameQuery,"Insert into ImoAndNameTable")
          } catch (error) {
            if(error.code == 'ER_DUP_ENTRY'){
              continue;
            }else{
              logger.error("error",JSON.stringify(error))
          } 
        }
      }
      return resolve("success")
      } catch (error) {
        logger.log("error",JSON.stringify(error))
        return reject(error)
      }  
    })
  }

  public queryValues(data){
    return new Promise(async(resolve,reject)=>{
      try {
        let modifiedCasingQuery = queryHelper.fetchVesselKeysTable()
        let modifiedCasingDatas = await Utility.databaseQuery(modifiedCasingQuery,"Select * from vesselColumn table")
        let modifiedNames = []
        let values = []
        for(let eachData of Object.keys(data)){
          for(let eachNameData of modifiedCasingDatas){
            if(eachData == eachNameData.VesselDatas){
              modifiedNames.push(eachNameData.CasingModifiedNames)
              values.push(data[eachData])
              break;
            }
          }  
        }
        return resolve({
          "modifiedNames" : modifiedNames,
          "values" : values
        });
      } catch (error) {
        logger.log("error",JSON.stringify(error))
        return reject(error)
      }

    })
  }

  public imoNameCheck(data: any){
    return new Promise(async(resolve,reject)=>{
      try {
        let imoAndNameId;
        let fetchImoAndNameQuery = queryHelper.fetchVesselImoAndNameTable()
        let fetchImoAndNameDatas = await Utility.databaseQuery(fetchImoAndNameQuery,"Select * from imoAndNameTable")
        for(let imoAndNamedata of fetchImoAndNameDatas){
          if((data["IMO_NUMBER"] || data["IMONumber"]) == imoAndNamedata["IMO_Number"]){
            imoAndNameId = imoAndNamedata["Id"]
            break;
          }
        }
        return resolve(imoAndNameId)
      } catch (error) {
        logger.log("error",JSON.stringify(error))
        return reject(error)
      } 
    })
  }

  public insertAlertDetails(alertTitle,vesselName,
    teamName,imoNumber,date,masterName,alertType,voyageNumber,charterer,tradingType,
     latitude,longitude,aoopn,
   ballast,ifInBallast,laden,nextPort,eta,weatherCondition,details,attachment,
   envImpact,ifEnvImpact,commercialImpact,ifCommercialImpact,vrtrolc,fd,vesselManager,hseqManager,marineManager,marineHr,hmInformed,classNotified,chartersNotified,piInformed,status
    ){
    return new Promise(async(resolve,reject)=>{
      try {
        let alertTypeQuery =queryHelper.fetchAlertType();
        let alertTypeDetails = await Utility.databaseQuery(alertTypeQuery,"alert table")
        for(let alerts of alertTypeDetails){
          if(alertType == alerts["Name"]){
            alertType = alerts["Id"]
          }
        }
        await this.insertIncidentDetails(alertTitle,vesselName,
          teamName,imoNumber,date,masterName,alertType,voyageNumber,charterer,tradingType,
           latitude,longitude,aoopn,
         ballast,ifInBallast,nextPort,eta,weatherCondition,details,
         envImpact,ifEnvImpact,commercialImpact,ifCommercialImpact,vrtrolc,status)
       
        let incidentDetailsData = await this.getIncidentDetails()
        let size = incidentDetailsData["data"].length -1
        let fkIncidentId = incidentDetailsData["data"][size]["IncidentId"];
        await this.insertAttachment(fkIncidentId,attachment);
        await this.insertAlertNotification(fkIncidentId,laden,fd,vesselManager,hseqManager,marineManager,marineHr,hmInformed,classNotified,chartersNotified,piInformed)
        let alertNotificationData = await this.getAlertNotification()
        let size2 = alertNotificationData["data"].length -1
        let fkAlertNotificationId = alertNotificationData["data"][size2]["Id"];
        console.log(fkAlertNotificationId)
        await this.insertAlertFollowUp(fkAlertNotificationId,fkIncidentId)
          return resolve("success");
      } catch (error) {
        logger.log("error",JSON.stringify(error))
        return reject(error)
      }
      
    })
  }
  public insertIncidentDetails(alertTitle,vesselName,
    teamName,imoNumber,date,masterName,alertType,voyageNumber,charterer,tradingType,
     latitude,longitude,aoopn,
   ballast,ifInBallast,nextPort,eta,weatherCondition,details,
   envImpact,ifEnvImpact,commercialImpact,ifCommercialImpact,vrtrolc,status
    ){
    return new Promise(async(resolve,reject)=>{
      try {
        let yesNoValues = [ballast,ifInBallast,envImpact,vrtrolc,commercialImpact];
        for(let i=0;i<yesNoValues.length;i++){
          if(yesNoValues[i] == "yes"){
            yesNoValues[i] = "1";
          }else if(yesNoValues[i] == "no"){
            yesNoValues[i] = "0";
          }
        }
        if(status == "open"){
          status ='1';
        }else if(status == "closed"){
          status ='0';
        }else if(status=="followUp"){
          status = '2';
        }else{
          return reject({"status" : "failure","message" : "Incorrect status value"})
        }
        [ballast,ifInBallast,envImpact,vrtrolc,commercialImpact] = yesNoValues
  
        let createAlertQuery = queryHelper.insertNewIncidentDetails(alertTitle,vesselName,
          teamName,imoNumber,date,masterName,alertType,voyageNumber,charterer,tradingType,
           latitude,longitude,aoopn,
         ballast,ifInBallast,nextPort,eta,weatherCondition,details,
         envImpact,ifEnvImpact,commercialImpact,ifCommercialImpact,vrtrolc,status)
        await Utility.databaseQuery(createAlertQuery,"Create new alert")
        return resolve(createAlertQuery);
      } catch (error) {
        logger.log("error",JSON.stringify(error))
      }
      
    })
  }

  public insertAlertNotification(fkIncidentId,laden,fd,vesselManager,hseqManager,marineManager,marineHr,hmInformed,classNotified,chartersNotified,piInformed){
      return new Promise(async(resolve,reject)=>{
        try {
          let yesNoValues = [piInformed,hmInformed,chartersNotified,classNotified,laden]
          for(let i=0;i<yesNoValues.length;i++){
            if(yesNoValues[i] == "yes"){
              yesNoValues[i] = '1';
            }else if(yesNoValues[i] == "no"){
              yesNoValues[i] = '0';
            }
          }
          [piInformed,hmInformed,chartersNotified,classNotified,laden] = yesNoValues;
          let createAlertNotification = queryHelper.insertNewAlertNotification(fkIncidentId,laden,fd,vesselManager,hseqManager,marineManager,marineHr,hmInformed,classNotified,chartersNotified,piInformed)
          await Utility.databaseQuery(createAlertNotification,"Create new alert notification")
          return resolve(createAlertNotification)
        } catch (error) {
          logger.log("error",JSON.stringify(error))
        }
        
      })
    }

  public insertAlertFollowUp(fkAlertNotificationId,fkIncidentId){
      return new Promise(async(resolve,reject)=>{
        try {
          let createAlertFollowUp = queryHelper.insertNewAlertFollowUp(fkAlertNotificationId,
            fkIncidentId)
          await Utility.databaseQuery(createAlertFollowUp,"Create new alert FOcreateAlertFollowUp")
          return resolve(createAlertFollowUp)
        } catch (error) {
          logger.log("error",JSON.stringify(error))
        }
        
      })
    }
  public insertAttachment(fkIncidentId,attachment){
      return new Promise(async(resolve,reject)=>{
        try {
          let createAttachment = queryHelper.insertNewAttachment(fkIncidentId,attachment)
          await Utility.databaseQuery(createAttachment,"Create new alert createAttahment")
          return resolve(createAttachment)
        } catch (error) {
          logger.log("error",JSON.stringify(error))
        }
        
      })
    }
    public updateAlertDetails(id,alertTitle,vesselName,
      teamName,imoNumber,date,masterName,alertType,voyageNumber,charterer,tradingType,
       latitude,longitude,aoopn,
     ballast,ifInBallast,laden,nextPort,eta,weatherCondition,details,attachment,
     envImpact,ifEnvImpact,commercialImpact,ifCommercialImpact,vrtrolc,fd,vesselManager,hseqManager,marineManager,marineHr,hmInformed,classNotified,chartersNotified,piInformed,status
      ){
      return new Promise(async(resolve,reject)=>{
        try {
        let alertTypeQuery = await queryHelper.fetchAlertType();
        let alertTypeDetails = await Utility.databaseQuery(alertTypeQuery,"alert table")
        for(let alerts of alertTypeDetails){
          if(alertType == alerts["Name"]){
            alertType = alerts["Id"]
          }
        }
          await this.updateIncidentDetails(id,alertTitle,vesselName,
            teamName,imoNumber,date,masterName,alertType,voyageNumber,charterer,tradingType,
             latitude,longitude,aoopn,
           ballast,ifInBallast,nextPort,eta,weatherCondition,details,
           envImpact,ifEnvImpact,commercialImpact,ifCommercialImpact,vrtrolc,status)
          
          let fkIncidentId = id
          await this.insertAttachment(fkIncidentId,attachment);
          await this.updateAlertNotification(id,fkIncidentId,laden,fd,vesselManager,hseqManager,marineManager,marineHr,hmInformed,classNotified,chartersNotified,piInformed)
          let alertNotificationData = await this.getAlertNotification()
          let size2 = alertNotificationData["data"].length -1
          let fkAlertNotificationId = alertNotificationData["data"][size2]["Id"];
          console.log(fkAlertNotificationId)
          await this.updateAlertFollowUp(id,fkAlertNotificationId,fkIncidentId)
            return resolve("success");
        } catch (error) {
          logger.log("error",JSON.stringify(error))
          return reject(error)
        }
        
      })
    }
  public updateIncidentDetails(id,alertTitle,vesselName,
    teamName,imoNumber,date,masterName,alertType,voyageNumber,charterer,tradingType,
     latitude,longitude,aoopn,
   ballast,ifInBallast,nextPort,eta,weatherCondition,details,
   envImpact,ifEnvImpact,commercialImpact,ifCommercialImpact,vrtrolc,status
    ){
    return new Promise(async(resolve,reject)=>{
      try {
        let yesNoValues = [ballast,ifInBallast,envImpact,vrtrolc,commercialImpact];
        for(let i=0;i<yesNoValues.length;i++){
          if(yesNoValues[i] == "yes"){
            yesNoValues[i] = "1";
          }else if(yesNoValues[i] == "no"){
            yesNoValues[i] = "0";
          }
        }
        if(status == "open"){
          status ='1';
        }else if(status == "closed"){
          status ='0';
        }else if(status=="followUp"){
          status = '2';
        }else{
          return reject({"status" : "failure","message" : "Incorrect status value"})
        }
        [ballast,ifInBallast,envImpact,vrtrolc,commercialImpact] = yesNoValues
        let updateIncidentQuery = queryHelper.updateIncidentDetails(id,alertTitle,vesselName,
          teamName,imoNumber,date,masterName,alertType,voyageNumber,charterer,tradingType,
           latitude,longitude,aoopn,
         ballast,ifInBallast,nextPort,eta,weatherCondition,details,
         envImpact,ifEnvImpact,commercialImpact,ifCommercialImpact,vrtrolc,status)
        await Utility.databaseQuery(updateIncidentQuery,"updated alert")
        return resolve(updateIncidentQuery)
      } catch (error) {
        logger.log("error",JSON.stringify(error))
      }
      
    })
  }

  public updateAlertNotification(id,fkIncidentId,laden,fd,vesselManager,hseqManager,marineManager,marineHr,hmInformed,classNotified,chartersNotified,piInformed){
      return new Promise(async(resolve,reject)=>{
        try {
          let yesNoValues = [piInformed,hmInformed,chartersNotified,classNotified,laden]
          for(let i=0;i<yesNoValues.length;i++){
            if(yesNoValues[i] == "yes"){
              yesNoValues[i] = '1';
            }else if(yesNoValues[i] == "no"){
              yesNoValues[i] = '0';
            }
          }
          [piInformed,hmInformed,chartersNotified,classNotified,laden] = yesNoValues;
          let updateAlertNotificationQuery = queryHelper.updateAlertNotification(id,fkIncidentId,laden,fd,vesselManager,hseqManager,marineManager,marineHr,hmInformed,classNotified,chartersNotified,piInformed)
          await Utility.databaseQuery(updateAlertNotificationQuery,"Create new alert notification")
          return resolve(updateAlertNotificationQuery)
        } catch (error) {
          logger.log("error",JSON.stringify(error))
        }
        
      })
    }

  public updateAlertFollowUp(id,fkAlertNotificationId,fkIncidentId){
      return new Promise(async(resolve,reject)=>{
        try {
          let updateFollowUpQuery = queryHelper.updateAlertFollowUp(id,fkAlertNotificationId,
            fkIncidentId)
          await Utility.databaseQuery(updateFollowUpQuery,"Create new alert notification")
          return resolve(updateFollowUpQuery)
        } catch (error) {
          logger.log("error",JSON.stringify(error))
        }
        
      })
    }
    public getIncidentDetails(){
      return new Promise(async(resolve,reject)=>{
        try {
          let fetchIncidentDetails = queryHelper.fetchIncidentDetails();
          let fetchIncidentDetailsData = await Utility.databaseQuery(fetchIncidentDetails,"Fetch details")
          return resolve({
            "status" : "success",
            "data" : fetchIncidentDetailsData
          })
        } catch (error) {
          
        }
      })
    }
    public getAlertNotification(){
      return new Promise(async(resolve,reject)=>{
        try {
          let fetchAlertNotification = queryHelper.fetchAlertNotification();
          let fetchAlertNotificationData = await Utility.databaseQuery(fetchAlertNotification,"Fetch details")
          return resolve({
            "status":"success",
            "data":fetchAlertNotificationData
          })
        } catch (error) {
          
        }
      })
    }
    public getAlertFollowUp(){
      return new Promise(async(resolve,reject)=>{
        try {
          let fetchAlertFollowUp = queryHelper.fetchAlertFollowUp();
          let fetchAlertFollowUpData = await Utility.databaseQuery(fetchAlertFollowUp,"Fetch details")
          return resolve(fetchAlertFollowUpData)
        } catch (error) {
          
        }
      })
    }
    public getIncientDetailBySearch(search : any,limit : any,offset : number,fromDate,toDate){
      return new Promise(async(resolve,reject)=>{
        try {
          let IncidentDetails = queryHelper.fetchDetailsBySearch(search,limit,offset,fromDate,toDate)
          let IncidentDetailsList= await Utility.databaseQuery(
            IncidentDetails,
            "GET Users List"
          );
          return resolve({ status: "success", IncidentDetailsList });
        }catch (error) { 
          logger.log("error", JSON.stringify(error));
          return reject(error);
        }
      })
    }
    public getAlertSummary(alertId : any,limit : any,offset : number,fromDate,toDate){
      return new Promise(async(resolve,reject)=>{
        try {
          let alertSummary = queryHelper.fetchAlertSummary(alertId,limit,offset,fromDate,toDate)
          let alertSummaryList= await Utility.databaseQuery(
            alertSummary,
            "GET Users List"
          );
          return resolve({
             status: "success", "response":alertSummaryList[0],
            

            });
        }catch (error) { 
          logger.log("error", JSON.stringify(error));
          return reject(error);
        }
      })
    }
    public getAlertDetails(search : any,limit : any,offset : number,fromDate,toDate,statusFilter){
      return new Promise(async(resolve,reject)=>{
        try {
        let alertTypeQuery = queryHelper.fetchAlertType();
        let alertTypeDetails = await Utility.databaseQuery(alertTypeQuery,"alert table")
        for(let alerts of alertTypeDetails){
          if(search == alerts["Name"]){
            search = alerts["Id"]
          }
        }
          let alertDetailsCount = queryHelper.fetchAlertDetailsCount(limit,offset)
          let alertDetailsCountList= await Utility.databaseQuery(
            alertDetailsCount,
            "GET Users List"
          );
          let alertDetails = queryHelper.fetchAlertDetails(search,limit,offset,fromDate,toDate,statusFilter)
          let alertDetailsList= await Utility.databaseQuery(
            alertDetails,
            "GET Users List"
          );
          let closed =0;
          let open = 0;
          let followUp =0;
          console.log(alertDetailsList[1])
          for(let alert of alertDetailsCountList[0]){
            if(alert["status"] == "closed"){
              closed++;
            }else if(alert["status"]=="open"){
              open++;
            }else if(alert["status"] == "followUp"){
              followUp++;
            }
          }
  
          let openArr = 
            {
              "name" : "open",
              "key" : "open",
              "count" : open
            }
          
          let closedArr = 
            {
              "name" : "closed",
              "key" : "closed",
              "count" : closed
            }
          
          let followUpArr = 
            {
              "name" : "follow up",
              "key" : "follow_up",
              "count" : followUp
            }
            let arr = [openArr,closedArr,followUpArr]
          return resolve({ 
            status: "success", 
            "response":alertDetailsList[0],
            "countRecord" : arr,
            "count":alertDetailsList[1][0]["TotalCount"] });
        }catch (error) { 
          logger.log("error", JSON.stringify(error));
          return reject(error);
        }
      })
    }
    public deleteIncidentDetails(id){
      return new Promise(async(resolve,reject)=>{
        try {
          let deleteIncidentDetails = queryHelper.deleteIncidentDetail(id);
          let deleteIncidentDetailsData = await Utility.databaseQuery(deleteIncidentDetails,"delete details")
          return resolve(deleteIncidentDetailsData)
        } catch (error) {
          
        }
      })
    }
    public deleteAlertNotification(id){
      return new Promise(async(resolve,reject)=>{
        try {
          let deleteAlertNotification = queryHelper.deleteAlertNotification(id);
          let deleteAlertNotificationData = await Utility.databaseQuery(deleteAlertNotification,"delete details")
          return resolve(deleteAlertNotificationData)
        } catch (error) {
          
        }
      })
    }
    public deleteAlertFollowUp(id){
      return new Promise(async(resolve,reject)=>{
        try {
          let deleteIncidentDetails = queryHelper.deleteAlertFollowUp(id);
          let deleteIncidentDetailsData = await Utility.databaseQuery(deleteIncidentDetails,"delete details")
          return resolve(deleteIncidentDetailsData)
        } catch (error) {
          
        }
      })
    }
  }

export const controller = new Controller();