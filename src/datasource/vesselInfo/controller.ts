import { logger } from "../../log/logger";
import { Utility } from "../../utility/database/mysql/Utility";
import { provider } from "../provider/provider";
import { queryHelper } from "./queryBuilder/mysql";
import { vesselVariables } from "./enum";
import { resolve } from "path";

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
        return resolve({ status: "success", vesselList });
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
}

export const controller = new Controller();