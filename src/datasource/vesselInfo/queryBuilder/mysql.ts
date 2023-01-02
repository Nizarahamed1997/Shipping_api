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
      `INSERT INTO VesselImoAndName(uuid,VesselName,IMO_Number) 
      VALUES (UUID(),'${vesselName}','${ImoNumber}')`;
    return query;
  }
    
  public insertNewVesselData(modifiedNames : string[],values : string[]) {   
    let query;
    let nameQuery = ''
    let valueQuery = ''
    for(let key of modifiedNames){
      nameQuery += key + ", "
    }
    nameQuery = nameQuery.slice(0,-2)
    for(let value of values){
      if(typeof(value) == 'string'){
        valueQuery += `"${value}"` + ", "
      }else{
        valueQuery += `${value}` + ", "
      }
    }
    valueQuery = valueQuery.slice(0,-2)
    query = `INSERT INTO VesselInformation(${nameQuery}) 
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
        whereCondition = `VIM.Name LIKE '${search}'`
      }else{
        whereCondition = `VIM.ImoNumber LIKE '${search}'`
      }
    }
    let query = `SELECT DISTINCT VIM.FleetTypeName,VIM.ShipTeamCurrent,VIM.SisterClass,VIM.Name, 
      VIM.ImoNumber,VIM.VesselManagerRole,VIM.VesselMgrName,VIM.Builder,VIM.BuilderCountry,VIM.Flag, 
      VIM.FLEETDIRECTOR,VIM.LastDryDockYear,VIM.LastDryDockDate,VIM.NextDryDockDate,VIM.LastDryDockYard, 
      VIM.LastHullCleaning,VIM.LastPropellorPolishing,VIM.VesselCode,VIM.Vessel,VIM.VoyageManager, 
      VIM.CommercialOffice,VIM.SATB,VIM.Cellular,VIM.VesselType,VIM.VesselFleet,VIM.VesselOwner,VIM.Ownership, 
      VIM.YearBuilt,VIM.TradeArea,VIM.ClassSociety,VIM.DropDeadDate,VIM.DWT,VIM.SpeedLaden,VIM.SpeedBallast, 
      VIM.MasterName,VIM.ROBIfo,VIM.ROBLsf,VIM.ROBLsm,VIM.ROBMdo,VIM.ROBHsf,VIM.ROBMgo,VIM.ROBVls,VIM.Charterer 
      FROM VesselInformation AS VIM 
      WHERE ${whereCondition} LIMIT ${limit} OFFSET ${offset}`;
    return query
  }

  public insertVesselDetail(FLEET_TYPE_NAME: any,SHIP_TEAM_CURRENT: any,SISTER_CLASS: any,NAME: any,IMO_NUMBER: any,VesselManagerRole: any,VESSEL_MGR_NAME: any,Builder: any,Builder_Country: any,Flag: any,FLEET_DIRECTOR: any,Last_Dry_Dock_Year: any,Last_Dry_Dock_Date: any,Next_Dry_Dock_Date: any,Last_Dry_Dock_Yard: any,Last_Hull_Cleaning: any,Last_Propellor_Polishing: any,Vessel_Code: any,Vessel: any,Voyage_Manager: any,Commercial_Office: any,SATB: any,Cellular: any,Vessel_Type: any,Vessel_Fleet: any,Vessel_Owner: any,Ownership: any,Year_Built: any,Trade_Area: any,Class_Society: any,Drop_Dead_Date: any,DWT: any,Speed_Laden: any,Speed_Ballast: any,Master_Name: any,ROB_Ifo: any,ROB_Lsf: any,ROB_Lsm: any,ROB_Mdo: any,ROB_Hsf: any,ROB_Mgo: any,ROB_Vls: any,Charterer: any,Operation_Type: any,VOP_Charterer: any,VOP_Operation_Type: any,Redelivery_Date: any,Sister_Vessels: any) {
    let query =
      `INSERT INTO VesselInformation(FleetTypeName,ShipTeamCurrent,SisterClass,Name,ImoNumber,VesselManagerRole,VesselMgrName,Builder,BuilderCountry,Flag,FLEETDIRECTOR,LastDryDockYear,LastDryDockDate,NextDryDockDate,LastDryDockYard,LastHullCleaning,LastPropellorPolishing,VesselCode,Vessel,VoyageManager,CommercialOffice,SATB,Cellular,VesselType,VesselFleet,VesselOwner,Ownership,YearBuilt,TradeArea,ClassSociety,DropDeadDate,DWT,SpeedLaden,SpeedBallast,MasterName,ROBIfo,ROBLsf,ROBLsm,ROBMdo,ROBHsf,ROBMgo,ROBVls,Charterer,OperationType,VOPCharterer,VOPOperationType,RedeliveryDate,SisterVessels) 
      VALUES ('${FLEET_TYPE_NAME}','${SHIP_TEAM_CURRENT}','${SISTER_CLASS}','${NAME}','${IMO_NUMBER}','${VesselManagerRole}',
      '${VESSEL_MGR_NAME}','${Builder}', '${Builder_Country}','${Flag}','${FLEET_DIRECTOR}',${Last_Dry_Dock_Year},'${Last_Dry_Dock_Date}','${Next_Dry_Dock_Date}','${Last_Dry_Dock_Yard}','${Last_Hull_Cleaning}','${Last_Propellor_Polishing}','${Vessel_Code}','${Vessel}','${Voyage_Manager}','${Commercial_Office}','${SATB}','${Cellular}','${Vessel_Type}','${Vessel_Fleet}','${Vessel_Owner}','${Ownership}',${Year_Built},'${Trade_Area}','${Class_Society}','${Drop_Dead_Date}',${DWT},${Speed_Laden},${Speed_Ballast},"${Master_Name}",${ROB_Ifo},${ROB_Lsf},${ROB_Lsm},${ROB_Mdo},${ROB_Hsf},${ROB_Mgo},${ROB_Vls},'${Charterer}','${Operation_Type}','${VOP_Charterer}','${VOP_Operation_Type}','${Redelivery_Date}','${Sister_Vessels}')`;
    return query;
  }
}

export const queryHelper = new QueryHelper();