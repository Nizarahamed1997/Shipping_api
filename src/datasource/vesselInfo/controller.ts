import { logger } from "../../log/logger";
import { Utility } from "../../utility/database/mysql/Utility";
import { provider } from "../provider/provider";
import { queryHelper } from "./queryBuilder/mysql";
import { vesselVariables } from "./enum";

class Controller{
  public getVesselDetails(search : any,limit : any,offset : number){
    return new Promise(async(resolve,reject)=>{
      try {
        let vesselDetails = queryHelper.getVessels(search,limit,offset)
        let vesselList= await Utility.databaseQuery(
          vesselDetails,
          "GET Users List"
        );
        
        return resolve({ status: "success", vesselList });
      }catch (error) { 
        logger.log("error", JSON.stringify(error));
        return reject(error);
      }
    })
  }

  public createImoAndName(){
    return new Promise(async(resolve,reject)=>{
      try {
        let imoNumber = ''
        let vesselName = ''
        let vesselInfoApiDatas =  await provider.vesselInfoApi();
        for(let data of vesselInfoApiDatas[vesselVariables.VESSEL_DETAILS]){
        imoNumber = data["IMO_NUMBER"];
        vesselName = data["NAME"]
          try {
            let vesselImoAndName = queryHelper.insertNewVesselImoAndNameTable(imoNumber,vesselName)
            await Utility.databaseQuery(vesselImoAndName,"Insert into ImoAndNameTable")
          } catch (error) {
            logger.error("error",JSON.stringify(error))
          }
        }
        return resolve({
          "status" : "success",
          "message" : "Imo and Name table datas inserted"
        })
      } catch (error) {
        logger.log("error",JSON.stringify(error))
        return reject(error)
      }
    })
  }

  public insertVesselDetails(){
    return new Promise(async(resolve,reject)=>{
      try {
        let vesselInfoApiDatas =  await provider.vesselInfoApi();
        let insertNewVesselDatas : string = ''
        let modifiedCasingQuery = queryHelper.fetchVesselKeysTable()
        let modifiedCasingDatas = await Utility.databaseQuery(modifiedCasingQuery,"Select * from vesselColumn table")
        let imoAndNameCheckQuery = queryHelper.fetchVesselImoAndNameTable()
        let imoAndNameCheckDatas = await Utility.databaseQuery(imoAndNameCheckQuery,"Select * from imoAndNameTable")
        let imoNumbersArr = []
        for(let imos of imoAndNameCheckDatas){
          imoNumbersArr.push(imos.IMO_Number)
        }
        for(let data of vesselInfoApiDatas[vesselVariables.VESSEL_DETAILS]){
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
          if(imoNumbersArr.includes(data["IMO_NUMBER"])){
            insertNewVesselDatas += queryHelper.insertNewVesselData(modifiedNames,values)
          } 
        }
        await Utility.databaseQuery(insertNewVesselDatas, "Insert New Vessel data");
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

  
  // public createNewVessel(){
  //   return new Promise(async(resolve,reject)=>{
  //     try {
  //       let ImoNumber = '';
  //       let vesselName = '';
  //       let datas =  await provider.vesselInfoApi();
  //       let data = {}
  //       let arr = ['FleetTypeName','ShipTeamCurrent','SisterClass','Name','ImoNumber','VesselManagerRole',
  //         'VesselMgrName','Builder','BuilderCountry','Flag','FleetDirector','LastDryDockYear','LastDryDockDate',
  //         'NextDryDockDate','LastDryDockYard','LastHullCleaning','LastPropellorPolishing','VesselCode','Vessel',
  //         'VoyageManager','CommercialOffice','SATB','Cellular','VesselType','VesselFleet','VesselOwner','Ownership',
  //         'YearBuilt','TradeArea','ClassSociety','DropDeadDate','DWT','SpeedLaden','SpeedBallast','MasterName','ROBIfo',
  //         'ROBLsf','ROBLsm','ROBMdo','ROBHsf','ROBMgo','ROBVls','Charterer','OperationType','VOPCharterer',
  //         'VOPOperationType','RedeliveryDate','SisterVessels'] ;
  //         let d = datas[vesselVariables.VESSEL_DETAILS][0]
  //         for(let i=0;i< Object.keys(d).length;i++){
  //           try {
  //             let insertNewVesselColumn : string = queryHelper.insertNewVesselColumn(Object.keys(d)[i],arr[i])
              
  //              await Utility.databaseQuery(insertNewVesselColumn, "Insert New Vessel Column");
  //           } catch (error) {
  //             if(error.code == "ER_DUP_ENTRY" ){
  //               continue
  //             }
  //           }
  //         }
        
          // for(data of datas[vesselVariables.VESSEL_DETAILS]){
          //   ImoNumber = data["IMO_NUMBER"];
          //   vesselName = data["NAME"]
          //   let FLEET_TYPE_NAME,SHIP_TEAM_CURRENT,SISTER_CLASS,NAME,IMO_NUMBER,VesselManagerRole,VESSEL_MGR_NAME,Builder,Builder_Country,Flag,FLEET_DIRECTOR,Last_Dry_Dock_Year,Last_Dry_Dock_Date,Next_Dry_Dock_Date,Last_Dry_Dock_Yard,Last_Hull_Cleaning,Last_Propellor_Polishing,Vessel_Code,Vessel,Voyage_Manager,Commercial_Office,SATB,Cellular,Vessel_Type,Vessel_Fleet,Vessel_Owner,Ownership,Year_Built,Trade_Area,Class_Society,Drop_Dead_Date,DWT,Speed_Laden,Speed_Ballast,Master_Name,ROB_Ifo,ROB_Lsf,ROB_Lsm,ROB_Mdo,ROB_Hsf,ROB_Mgo,ROB_Vls,Charterer,Operation_Type,VOP_Charterer,VOP_Operation_Type,Redelivery_Date,Sister_Vessels;
          //   [FLEET_TYPE_NAME,SHIP_TEAM_CURRENT,SISTER_CLASS,NAME,IMO_NUMBER,VesselManagerRole,VESSEL_MGR_NAME,Builder,Builder_Country,Flag,FLEET_DIRECTOR,Last_Dry_Dock_Year,Last_Dry_Dock_Date,Next_Dry_Dock_Date,Last_Dry_Dock_Yard,Last_Hull_Cleaning,Last_Propellor_Polishing,Vessel_Code,Vessel,Voyage_Manager,Commercial_Office,SATB,Cellular,Vessel_Type,Vessel_Fleet,Vessel_Owner,Ownership,Year_Built,Trade_Area,Class_Society,Drop_Dead_Date,DWT,Speed_Laden,Speed_Ballast,Master_Name,ROB_Ifo,ROB_Lsf,ROB_Lsm,ROB_Mdo,ROB_Hsf,ROB_Mgo,ROB_Vls,Charterer,Operation_Type,VOP_Charterer,VOP_Operation_Type,Redelivery_Date,Sister_Vessels] = Object.values(data)
          //   try {
          //       let insertNewVesselInfo : string = queryHelper.insertNewVesselInfo(ImoNumber,vesselName)
          //       await Utility.databaseQuery(insertNewVesselInfo, "Insert New VesselInfo");
          //       let insertVesselDetail = queryHelper.insertVesselDetail(FLEET_TYPE_NAME,SHIP_TEAM_CURRENT,SISTER_CLASS,NAME,IMO_NUMBER,VesselManagerRole,VESSEL_MGR_NAME,Builder,Builder_Country,Flag,FLEET_DIRECTOR,Last_Dry_Dock_Year,Last_Dry_Dock_Date,Next_Dry_Dock_Date,Last_Dry_Dock_Yard,Last_Hull_Cleaning,Last_Propellor_Polishing,Vessel_Code,Vessel,Voyage_Manager,Commercial_Office,SATB,Cellular,Vessel_Type,Vessel_Fleet,Vessel_Owner,Ownership,Year_Built,Trade_Area,Class_Society,Drop_Dead_Date,DWT,Speed_Laden,Speed_Ballast,Master_Name,ROB_Ifo,ROB_Lsf,ROB_Lsm,ROB_Mdo,ROB_Hsf,ROB_Mgo,ROB_Vls,Charterer,Operation_Type,VOP_Charterer,VOP_Operation_Type,Redelivery_Date,Sister_Vessels)
          //       await Utility.databaseQuery(insertVesselDetail, "Insert VesselDetails");
          //   } catch (error) {
          //     if(error.code == "ER_DUP_ENTRY" ){
          //       continue
          //     }
          //   }
          // }
    //       return resolve({
    //         status: "success",
    //         message: "New Shipping info Created!!!",
    //       });
    //     }catch (error) {
    //       logger.log("error", JSON.stringify(error));
    //       return reject(error);
    //     }
    //   })  
    // }


}

export const controller = new Controller();