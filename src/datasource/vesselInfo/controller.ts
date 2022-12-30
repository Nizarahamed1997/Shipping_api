import { logger } from "../../log/logger";
import { Utility } from "../../utility/database/mysql/Utility";
import { provider } from "../provider/provider";
import { queryHelper } from "./queryBuilder/mysql";
import { vesselVariables } from "./enum";

class Controller{
  public getVesselDetails(search : any){
    return new Promise(async(resolve,reject)=>{
      try {
        let vesselDetails = queryHelper.getVessels(search)
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

  public insertVesselDetails(){
    return new Promise(async(resolve,reject)=>{
      try {
        let datas =  await provider.vesselInfoApi();
        let data = {}
        let vesselColumn = queryHelper.fetchVesselColumn()
        let fetchedData = await Utility.databaseQuery(vesselColumn,"Select * from vesselColumn table")
        for(data of datas[vesselVariables.VESSEL_DETAILS]){
          let q1 = []
          let q2 = []
          for(let i of Object.keys(data)){
            for(let j of fetchedData){
              if(i == j.VesselDatas){
                q1.push(j.CasingModifiedNames)
                q2.push(data[i])
                break;
              }
            }  
          }
          try{
            let insertNewVesselData : string = queryHelper.insertNewVesselData(q1,q2)
            await Utility.databaseQuery(insertNewVesselData, "Insert New Vessel data");
          }catch (error) {
            if(error.code == "ER_DUP_ENTRY" ){
              continue
            }
          }
        }
       return resolve({
        status: "success",
        message: "New Shipping info Created!!!",
        });
      }catch (error) {
        logger.log("error", JSON.stringify(error));
        return reject(error);
      }
        
    })
  }
}

export const controller = new Controller();