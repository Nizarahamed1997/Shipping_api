import express from "express";
import { logger } from "../../log/logger";
import { controller } from "./controller";

class VesselInfo{
    router;
  constructor () {
    this.router = express.Router();
    this.initialize();
  }
  private initialize(){
    this.router.get('/details',async(req,res)=>{
      try{
        let { search,page,fromDate,toDate }  = req.query;
        if(!page){
          return res.send({
            "status" : "failure",
            "message" : "Necessary parameter missing"
          })
        }
        let limit = 50;
        page = page*limit - limit;
        console.log(search)
        let vesselDetails = await controller.getVesselDetails(search,limit,page,fromDate,toDate)
        return res.send(vesselDetails)
      }catch(error){
        logger.log("error",error)
        return res.send({
          status: "failure",
          message: "Internal Server Error!!!",
        });
      }
    })

    // this.router.get('/vessel_info_api/:type',async(req,res)=>{
    //   try {
    //     let type = req.params.type;
    //     console.log(type)
    //     let finalResponse = await controller.apiPath(type);
    //     return res.send((finalResponse));
    //   }catch (error) {
    //     logger.log("error", error);
    //     return res.send({
    //       status: "failure",
    //       message: "Internal Server Error!!!",
    //     });
    //   }
    // });

    this.router.get('/getIncidentDetails',async(req,res)=>{
      try {
        let finalResponse = await controller.getIncidentDetails();
        res.send(finalResponse);
      } catch (error) {
        
      }
    })
    this.router.get('/getAlertNotification',async(req,res)=>{
      try {
        let finalResponse = await controller.getAlertNotification();
        res.send(finalResponse);
      } catch (error) {
        
      }
    })
    this.router.get('/getAlertFollowUp',async(req,res)=>{
      try {
        let finalResponse = await controller.getAlertFollowUp();
        res.send(finalResponse);
      } catch (error) {
        
      }
    })
    this.router.get('/getAlertSummary',async(req,res)=>{
      try{
        let { alertId,page,fromDate,toDate }  = req.query;
        if(!page){
          return res.send({
            "status" : "failure",
            "message" : "Necessary parameter missing"
          })
        }
        let limit = 50;
        page = page*limit - limit;
       
        let alertSummary = await controller.getAlertSummary(alertId,limit,page,fromDate,toDate)
        return res.send(
          alertSummary)
      }catch(error){
        logger.log("error",error)
        return res.send({
          status: "failure",
          message: "Internal Server Error!!!",
        });
      }
    })
    this.router.get('/getAlertDetails',async(req,res)=>{
      try{
        let { search,page,fromDate,toDate,statusFilter }  = req.query;
        if(!page){
          return res.send({
            "status" : "failure",
            "message" : "Necessary parameter missing"
          })
        }
        let limit = 50;
        page = page*limit - limit;
        console.log(search)
        let alertDetails = await controller.getAlertDetails(search,limit,page,fromDate,toDate,statusFilter)
        return res.send(alertDetails)
      }catch(error){
        logger.log("error",error)
        return res.send({
          status: "failure",
          message: "Internal Server Error!!!",
        });
      }
    })

    this.router.post('/createAlert',async (req,res)=>{
      try {
        let {alertTitle,vesselName,
         teamName,imoNumber,date,masterName,alertType,voyageNumber,charterer,tradingType,
          latitude,longitude,aoopn,
        ballast,ifInBallast,laden,nextPort,eta,weatherCondition,details,attachment,
        envImpact,ifEnvImpact,commercialImpact,ifCommercialImpact,vrtrolc,fd,vesselManager,hseqManager,marineManager,marineHr,hmInformed,classNotified,chartersNotified,piInformed,status
          
        } = req.body
       

        let createAlert = await controller.insertAlertDetails(alertTitle,vesselName,
          teamName,imoNumber,date,masterName,alertType,voyageNumber,charterer,tradingType,
           latitude,longitude,aoopn,
         ballast,ifInBallast,laden,nextPort,eta,weatherCondition,details,attachment.name,
         envImpact,ifEnvImpact,commercialImpact,ifCommercialImpact,vrtrolc,fd,vesselManager,hseqManager,marineManager,marineHr,hmInformed,classNotified,chartersNotified,piInformed,status
          )
        return res.send({"status":"Success",
        "message" : "new alert created"})
      } catch (error) {
        logger.log("error",JSON.stringify(error))
      }
    })

    this.router.post('/createAlert/attachments',async(req,res)=>{
      try {
        let file = req.files.attachment.name;
        let alertId = req.body.alertId
        await controller.insertAttachment(alertId,file);
        return res.send({"status" : "success","message" : "file Uploaded"})
      } catch (error) {
        logger.log("error",JSON.stringify(error))
      }

    })
    this.router.put('/updateAlert/:id',async (req,res)=>{
      try {
        let {
          alertTitle,vesselName,
          teamName,imoNumber,date,masterName,alertType,voyageNumber,charterer,tradingType,
           latitude,longitude,aoopn,
         ballast,ifInBallast,laden,nextPort,eta,weatherCondition,details,attachment,
         envImpact,ifEnvImpact,commercialImpact,ifCommercialImpact,vrtrolc,fd,vesselManager,hseqManager,marineManager,marineHr,hmInformed,classNotified,chartersNotified,piInformed,status
        } = req.body
        let id = req.params.id;
        let createAlert = await controller.updateAlertDetails(id,alertTitle,vesselName,
          teamName,imoNumber,date,masterName,alertType,voyageNumber,charterer,tradingType,
           latitude,longitude,aoopn,
         ballast,ifInBallast,laden,nextPort,eta,weatherCondition,details,attachment,
         envImpact,ifEnvImpact,commercialImpact,ifCommercialImpact,vrtrolc,fd,vesselManager,hseqManager,marineManager,marineHr,hmInformed,classNotified,chartersNotified,piInformed,status
          )
        return res.send({"status":"Success",
        "message" : "alert Updated"})
      } catch (error) {
        logger.log("error",JSON.stringify(error))
        return res.send(error)
      }
    })
    // this.router.post('/createIncidentDetails',async (req,res)=>{
    //   try {
    //     let {
    //       vesselName,
    //       vesselCode,
    //       imoNumber,
    //       date,
    // alertTitle,
    // alertType,
    //       masterName,
    //       latitude,
    //       longitude,
    //       AODN,
    //       ballast,
    //       ifInBallast,
    //       VOC,
    //       envImpact,
    // vrtrOlc,
    //       commercialImpact,
    //       weatherCondition,
    //       details,
    //       attachment,
    //       nextPort,
    //       ETA,
    //       status,
    //       category,
    //       severity,
    //       firstAlertNotification,
    //       fkAnalyticsId,
          
    //     } = req.body

    //     let createAlert = await controller.insertIncidentDetails(vesselName,vesselCode,imoNumber,date,masterName,latitude,
    //       longitude,AODN,ballast,ifInBallast,VOC,envImpact,commercialImpact,weatherCondition,details,attachment,
    //       nextPort,ETA,status,category,severity,firstAlertNotification,fkAnalyticsId
    //       )
    //     return res.send({"status":"Success",
    //     "message" : "new alert created"})
    //   } catch (error) {
    //     logger.log("error",JSON.stringify(error))
    //   }
    // })

    // this.router.post('/createAlertNotification',async (req,res)=>{
    //   try {
    //     let {
    //       fkIncidentId,
    //       PIInformed,
    //       FD,
    //       HMInformed,
    //       HSEQManager,
    //       classNotified,
    //       marineManager,
    //       flag_Notified,
    //       voyageManager,
    //       chartersNotified,
    //       margineHrNotified,
    //       terminalNotifed,
    //       flagNotified,
    //       mapImage
    //     } = req.body
    //     let createAlertNotification = await controller.insertAlertNotification(
    //       fkIncidentId,PIInformed,FD,HMInformed,HSEQManager,classNotified,marineManager,flag_Notified,voyageManager,
    //       chartersNotified,margineHrNotified,terminalNotifed,flagNotified,mapImage
    //     )
    //     return res.send({"status":"Success",
    //     "message" : "new alert created"})
    //   } catch (error) {
    //     logger.log("error",JSON.stringify(error))
    //   }
    // })

    // this.router.post('/createAlertFollowUp',async (req,res)=>{
    //   try {
    //     let {
    //       nextUpdate,
    //       nextUpdateTime,
    //       detailsOfAction,
    //       upImNo,
    //       shortTermCert,
    //       riskLevel,
    //       typeOfIncident,
    //       fullClassCert,
    //       fkAlertNotificationId,
    //       fkIncidentId
    //     } = req.body
    //     let createAlertFollowUp = await controller.insertAlertFollowUp(nextUpdate,nextUpdateTime,detailsOfAction,
    //       upImNo,shortTermCert,riskLevel,typeOfIncident,fullClassCert,fkAlertNotificationId,fkIncidentId)
    //     return res.send({"status":"Success",
    //     "message" : "new alert created"})
    //   } catch (error) {
    //     logger.log("error",JSON.stringify(error))
    //   }
    // })
    // this.router.put('/updateIncidentDetails/:id',async (req,res)=>{
    //   try {
    //     let {
    //       vesselName,
    //       vesselCode,
    //       imoNumber,
    //       date,
    //       masterName,
    //       latitude,
    //       longitude,
    //       AODN,
    //       ballast,
    //       ifInBallast,
    //       VOC,
    //       envImpact,
    //       commercialImpact,
    //       weatherCondition,
    //       details,
    //       attachment,
    //       nextPort,
    //       ETA,
    //       status,
    //       category,
    //       severity,
    //       firstAlertNotification,
    //       fkAnalyticsId,
    //     } = req.body;
    //     let id = req.params.id;

    //     let createAlert = await controller.updateIncidentDetails(id,vesselName,vesselCode,imoNumber,date,masterName,latitude,
    //       longitude,AODN,ballast,ifInBallast,VOC,envImpact,commercialImpact,weatherCondition,details,attachment,
    //       nextPort,ETA,status,category,severity,firstAlertNotification,fkAnalyticsId
    //       )
    //     return res.send({"status":"Success",
    //     "message" : "alert updated"})
    //   } catch (error) {
    //     logger.log("error",JSON.stringify(error))
    //   }
    // })

    // this.router.put('/updateAlertNotification/:id',async (req,res)=>{
    //   try {
    //     let {
    //       fkIncidentId,
    //       PIInformed,
    //       FD,
    //       HMInformed,
    //       HSEQManager,
    //       classNotified,
    //       marineManager,
    //       flag_Notified,
    //       voyageManager,
    //       chartersNotified,
    //       margineHrNotified,
    //       terminalNotifed,
    //       flagNotified,
    //       mapImage
    //     } = req.body
    //     let id = req.params.id;
    //     let createAlertNotification = await controller.updateAlertNotification(
    //       id,fkIncidentId,PIInformed,FD,HMInformed,HSEQManager,classNotified,marineManager,flag_Notified,voyageManager,
    //       chartersNotified,margineHrNotified,terminalNotifed,flagNotified,mapImage
    //     )
    //     return res.send({"status":"Success",
    //     "message" : "new alert created"})
    //   } catch (error) {
    //     logger.log("error",JSON.stringify(error))
    //   }
    // })

    // this.router.put('/updateAlertFollowUp/:id',async (req,res)=>{
    //   try {
    //     let {
    //       nextUpdate,nextUpdateTime,detailsOfAction,upImNo,shortTermCert,riskLevel,typeOfIncident,fullClassCert,fkAlertNotificationId,fkIncidentId
    //     } = req.body
    //     let id = req.params.id;
    //     let createAlertFollowUp = await controller.updateAlertFollowUp(id,nextUpdate,nextUpdateTime,detailsOfAction,
    //       upImNo,shortTermCert,riskLevel,typeOfIncident,fullClassCert,fkAlertNotificationId,fkIncidentId)
    //     return res.send({"status":"Success",
    //     "message" : "new alert created"})
    //   } catch (error) {
    //     logger.log("error",JSON.stringify(error))
    //   }
    // })

    // this.router.delete('/deleteIncidentDetails/:id',async(req,res)=>{
    //   try {
    //     let id = req.params.id
    //     let finalResponse = await controller.deleteIncidentDetails(id);
    //     res.send(finalResponse);
    //   } catch (error) {
        
    //   }
    // })
    // this.router.delete('/deleteAlertNotification/:id',async(req,res)=>{
    //   try {
    //     let id = req.params.id
    //     let finalResponse = await controller.deleteAlertNotification(id);
    //     res.send(finalResponse);
    //   } catch (error) {
        
    //   }
    // })
    // this.router.delete('/deleteAlertFollowUp/:id',async(req,res)=>{
    //   try {
    //     let id = req.params.id
    //     let finalResponse = await controller.deleteAlertFollowUp(id);
    //     res.send(finalResponse);
    //   } catch (error) {
        
    //   }
    // })
  }
  
  public getRoute(){
    return this.router; 
  }
}

export const vesselInfo = new VesselInfo()