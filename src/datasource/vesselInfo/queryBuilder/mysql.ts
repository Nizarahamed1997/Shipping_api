class QueryHelper{
  public fetchVesselKeysTable(){
    let query = `SELECT * FROM VesselKeys`;
    return query;
  }

  public fetchVesselImoAndNameTable(){
    let query = `SELECT * FROM VesselImoAndName`;
    return query;
  }

  
  public insertNewVesselImoAndNameTable(ImoNumber : any, vesselName : any) {
    let query =
      `INSERT INTO VesselImoAndName(VesselName,IMO_Number) 
      VALUES ('${vesselName}','${ImoNumber}')`;
    return query;
  }
    
  public insertNewVesselData(modifiedNames : string[],values : string[],imoAndNameId : any,type) {   
    let query;
    let nameQuery = ''
    let valueQuery = ''
    for(let key of modifiedNames){
      nameQuery += key + ", "
    }
    nameQuery += "Type, fk_ImoAndNameId"
    for(let value of values){
      if(typeof(value) == 'string'){
        valueQuery += `"${value}"` + ", "
      }else{
        valueQuery += `${value}` + ", "
      }
    }
    valueQuery += `'${type}',${imoAndNameId}`
    query = `INSERT INTO VesselInformation(${nameQuery}) 
      VALUES (${valueQuery});`;
    return query;
  }

  public insertNewLatAndLongData(modifiedNames : string[],values : string[],imoAndNameId : any){
    let query;
    let nameQuery = ''
    let valueQuery = ''
    for(let key of modifiedNames){
      nameQuery += key + ", "
    }
    nameQuery += "fk_ImoAndNameId"
    for(let value of values){
      if(typeof(value) == 'string'){
        valueQuery += `"${value}"` + ", "
      }else{
        valueQuery += `${value}` + ", "
      }
    }
    valueQuery += `${imoAndNameId}`
    query = `INSERT INTO LatAndLong(${nameQuery}) 
      VALUES (${valueQuery});`;
    return query;

  }

  // public insertNewVesselColumn(name : any, casingModifiedName : any) {
  //   let query =
  //     `INSERT INTO VesselKeys(VesselDatas,CasingModifiedNames) 
  //     VALUES ('${name}','${casingModifiedName}')`;
  //   return query;
  // }
  
  public getVessels(search?,limit?,offset?){
    let whereCondition = '1'
    if(search){
      if(isNaN(parseInt(search))){
        whereCondition = `IMV.VesselName LIKE '${search}'`
      }else{
        whereCondition = `IMV.IMO_Number LIKE '${search}'`
      }
    }
    let query = `SELECT DISTINCT VIM.FleetTypeName,VIM.ShipTeamCurrent,VIM.SisterClass,IMV.VesselName,IMV.IMO_Number,LAL.Latitude,LAL.Longitude,VIM.VesselManagerRole,VIM.VesselMgrName,VIM.Builder,VIM.BuilderCountry,VIM.Flag, 
      VIM.FLEETDIRECTOR,VIM.LastDryDockYear,VIM.LastDryDockDate,VIM.NextDryDockDate,VIM.LastDryDockYard, 
      VIM.LastHullCleaning,VIM.LastPropellorPolishing,VIM.VesselCode,VIM.Vessel,VIM.VoyageManager, 
      VIM.CommercialOffice,VIM.SATB,VIM.Cellular,VIM.VesselType,VIM.VesselFleet,VIM.VesselOwner,VIM.Ownership, 
      VIM.YearBuilt,VIM.TradeArea,VIM.ClassSociety,VIM.DropDeadDate,VIM.DWT,VIM.SpeedLaden,VIM.SpeedBallast, 
      VIM.MasterName,VIM.ROBIfo,VIM.ROBLsf,VIM.ROBLsm,VIM.ROBMdo,VIM.ROBHsf,VIM.ROBMgo,VIM.ROBVls,VIM.Charterer 
      FROM VesselInformation AS VIM
      LEFT JOIN VesselImoAndName AS IMV ON VIM.fk_ImoAndNameId = IMV.id
      LEFT JOIN LatAndLong AS LAL ON IMV.Id = LAL.fk_ImoAndNameId
      WHERE ${whereCondition} LIMIT ${limit} OFFSET ${offset}`;
    return query
  }

}

export const queryHelper = new QueryHelper();