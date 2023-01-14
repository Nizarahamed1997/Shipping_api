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

  public insertNewIncidentDetails(alertTitle,vesselName,
    teamName,imoNumber,date,masterName,alertType,voyageNumber,charterer,tradingType,
     latitude,longitude,aoopn,
   ballast,ifInBallast,nextPort,eta,weatherCondition,details,
   envImpact,ifEnvImpact,commercialImpact,ifCommercialImpact,vrtrolc,status){
    let query = `INSERT INTO IncidentDetails(VesselName,TeamName,ImoNumber,Date,AlertTitle,AlertType,
      MasterName,Latitude,
    Longitude,Ballast,IfInBallast,EnvImpact,VRTROLC,CommercialImpact,WeatherCondition,Details,
    NextPort,ETA,Status,VoyageNumber,Charterer,TradingType,AOOPN,IfEnvImpact,IfCommercialImpact) VALUES('${vesselName}',
      '${teamName}',${imoNumber},'${date}','${alertTitle}','${alertType}','${masterName}','${latitude}','${longitude}',${ballast},'${ifInBallast}',
      ${envImpact},${vrtrolc},${commercialImpact},'${weatherCondition}','${details}',
      '${nextPort}','${eta}',${status},${voyageNumber},'${charterer}','${tradingType}','${aoopn}','${ifEnvImpact}','${ifCommercialImpact}')`
      return query;
  }

  public insertNewAlertNotification(fkIncidentId,laden,fd,vesselManager,hseqManager,marineManager,marineHr,hmInformed,classNotified,chartersNotified,piInformed){
      let query = `INSERT INTO AlertNotification(FK_IncidentId,PIinformed,FD,HMInformed,HseqManager,ClassNotified,
        MarineManager,VesselManager,ChartersNotified,MarineHr,Laden) VALUES(${fkIncidentId},${piInformed},'${fd}',${hmInformed},'${hseqManager}',${classNotified},
        '${marineManager}','${vesselManager}',${chartersNotified},
        '${marineHr}',${laden})`
      return query;
    }

  public insertNewAlertFollowUp(fkAlertNotificationId,fkIncidentId){
    let query = `INSERT INTO AlertFollowUp(FK_AlertNotificationId,FK_IncidentId)
    VALUES(${fkAlertNotificationId},${fkIncidentId})`
    return query;
  }
  public insertNewAttachment(fkIncidentId,attachment){
    let query = `INSERT INTO Attachments(FK_IncidentId,Attachments)
    VALUES(${fkIncidentId},'${attachment}')`
    return query;
  }
  public updateIncidentDetails(id,alertTitle,vesselName,
    teamName,imoNumber,date,masterName,alertType,voyageNumber,charterer,tradingType,
     latitude,longitude,aoopn,
   ballast,ifInBallast,nextPort,eta,weatherCondition,details,
   envImpact,ifEnvImpact,commercialImpact,ifCommercialImpact,vrtrolc,status){
    let query = `UPDATE IncidentDetails SET VesselName ='${vesselName}',
    AlertTitle = '${alertTitle}',AlertType = '${alertType}',TeamName = '${teamName}',
    ImoNumber =${imoNumber},Date='${date}',MasterName ='${masterName}',Latitude='${latitude}',
    Longitude='${longitude}',Ballast=${ballast},IfInBallast= '${ifInBallast}',
    EnvImpact =${envImpact},CommercialImpact=${commercialImpact},WeatherCondition='${weatherCondition}',
    Details= '${details}',
    NextPort= '${nextPort}',ETA ='${eta}',Status=${status},VoyageNumber = ${voyageNumber},Charterer ='${charterer}',
    TradingType ='${tradingType}',AOOPN='${aoopn}',Ballast =${ballast},IfInBallast ='${ifInBallast}',
    IfEnvImpact ='${ifEnvImpact}',IfCommercialImpact='${ifCommercialImpact}',VRTROLC =${vrtrolc} WHERE IncidentId =${id}`
      return query;
  }

  public updateAlertNotification(id,fkIncidentId,laden,fd,vesselManager,hseqManager,marineManager,marineHr,hmInformed,
    classNotified,chartersNotified,piInformed){
      let query = `UPDATE AlertNotification SET FK_IncidentId = ${fkIncidentId},PIinformed = ${piInformed},FD = '${fd}',
      HMInformed = ${hmInformed},HseqManager = '${hseqManager}',ClassNotified = ${classNotified},
      MarineManager = '${marineManager}',VesselManager = '${vesselManager}',
      ChartersNotified = ${chartersNotified},
      MarineHr = '${marineHr}',Laden = ${laden}
       WHERE Id =${id};`
      return query;
    }

  public updateAlertFollowUp(id,fkAlertNotificationId,fkIncidentId){
    let query = `UPDATE AlertFollowUp SET FK_AlertNotificationId = ${fkAlertNotificationId},
    FK_IncidentId = ${fkIncidentId} WHERE Id =${id};`
    return query;
  }


  // public insertNewVesselColumn(name : any, casingModifiedName : any) {
  //   let query =
  //     `INSERT INTO VesselKeys(VesselDatas,CasingModifiedNames) 
  //     VALUES ('${name}','${casingModifiedName}')`;
  //   return query;
  // }
  
  public getVessels(search?,limit?,offset?,fromDate?,toDate?){
    let whereCondition = '1'
    if(search){
      if(isNaN(parseInt(search))){
        whereCondition += ` AND IMV.VesselName LIKE '${search}'`
      }else{
        whereCondition += ` AND IMV.IMO_Number LIKE '${search}'`
      }
    }
    if(fromDate && toDate){
      whereCondition += ` AND VIM.InsertUtc >= '${fromDate}' && VIM.InsertUtc <='${toDate}'`
    }
    let query = `SELECT DISTINCT VIM.Id AS Id, IMV.IMO_Number AS imoNumber,
      LAL.Latitude AS latitude,LAL.Longitude AS longitude, 
       
       
      VIM.MasterName AS masterName,VIM.Charterer AS charterer
      
      FROM VesselInformation AS VIM
      LEFT JOIN VesselImoAndName AS IMV ON VIM.fk_ImoAndNameId = IMV.id
      LEFT JOIN LatAndLong AS LAL ON IMV.Id = LAL.fk_ImoAndNameId
      WHERE ${whereCondition} LIMIT ${limit} OFFSET ${offset};
      SELECT COUNT(*) AS TotalCount FROM (
        SELECT DISTINCT VIM.Id,IMV.IMO_Number
        FROM VesselInformation AS VIM
        LEFT JOIN VesselImoAndName AS IMV ON VIM.fk_ImoAndNameId = IMV.id
        LEFT JOIN LatAndLong AS LAL ON IMV.Id = LAL.fk_ImoAndNameId
        WHERE ${whereCondition}) AS TBL`;
    return query
  }
  public fetchDetailsBySearch(search?,limit?,offset?,fromDate?,toDate?){
    let whereCondition = '1'
    if(search){
      if(isNaN(parseInt(search))){
        whereCondition += ` AND VesselName LIKE '${search}'`
      }else{
        whereCondition += ` AND ImoNumber LIKE '${search}'`
      }
    }
    if(fromDate && toDate){
      whereCondition += ` AND InsertUTC >= '${fromDate}' && InsertUTC <='${toDate}'`
    }
    let query = `SELECT DISTINCT VesselName,VesselCode,ImoNumber,Date,MasterName,Latitude,
    Longitude,AODN,Ballast,IfInBallast,VOC,EnvImpact,CommercialImpact,WeatherCondition,Details,Attachment,
    NextPort,ETA,Status,Category,Severity,FirstAlertNotification,fk_Analytics_Id
    FROM IncidentDetails 

      WHERE ${whereCondition} LIMIT ${limit} OFFSET ${offset};
      SELECT COUNT(*) AS TotalCount FROM (
        SELECT DISTINCT ImoNumber
        FROM IncidentDetails
        WHERE ${whereCondition}) AS TBL`;
    return query
  }

  public fetchAlertSummary(alertId?,limit?,offset?,fromDate?,toDate?){
    let whereCondition = '1'
    if(alertId){
      if(isNaN(parseInt(alertId))){
        whereCondition += ` AND ID.VesselName LIKE '${alertId}'`
      }else{
        whereCondition += ` AND ID.IncidentId LIKE ${alertId} `
      }
    }
    if(fromDate && toDate){
      whereCondition += ` AND ID.InsertUTC >= '${fromDate}' && ID.InsertUTC <='${toDate}'`
    }
    let query = `SELECT DISTINCT ID.IncidentId AS alertId,ID.VesselName AS vesselName,
    ID.ImoNumber AS imoNumber,ID.Date AS date,ID.MasterName AS masterName,ID.Latitude AS latitude,
    ID.Longitude AS longitude,ID.AOOPN AS areaOfOperation,IF(ID.Ballast, 'yes', 'no')ballast,IF(ID.IfInBallast , 'yes', 'no')ifInBallast,
    IF(ID.EnvImpact,'yes','no')envImpact,IF(ID.VRTROLC,'yes','no') vesselRemindedOfTeam,
    IF(ID.CommercialImpact,'yes','no')commercialImpact,ID.IfenvImpact AS ifEnvImpact,
    ID.IfCommercialImpact AS ifCommercialImpact,ID.WeatherCondition AS weatherCondition,
    ID.Details AS details,Attachments.Attachments,ID.NextPort AS nextPort,ID.ETA AS eta,IF(ID.Status = 0,'closed',IF(ID.Status = 1,'open','followUp')) AS status,
    IF(AN.ChartersNotified,'yes','no')chartersNotified,
    IF(AN.PiInformed,'yes','no')piInformed,AN.FD AS fd,IF(AN.HMInformed,'yes','no')hmInformed,AN.HseqManager AS hseqManager,
    IF(AN.ClassNotified,'yes','no')classNotified,AN.MarineManager AS marineManager,IF(AN.Laden,'yes','no')laden,
    AN.VesselManager AS vesselManager,AN.MarineHr AS marineHr
    FROM IncidentDetails AS ID
    LEFT JOIN AlertNotification AS AN ON ID.IncidentId = AN.FK_IncidentId
    LEFT JOIN Attachments ON ID.IncidentId = Attachments.FK_IncidentId
      WHERE ${whereCondition} ORDER BY ID.InsertUTC DESC LIMIT ${limit} OFFSET ${offset};`;
    return query
  }
  public fetchAlertDetails(search?,limit?,offset?,fromDate?,toDate?,statusFilter?){
    let whereCondition = '1'
    if(statusFilter == "open"){
      statusFilter = '1'
    }else if(statusFilter == "closed"){
      statusFilter = '0'
    }else if(statusFilter == "followUp"){
      statusFilter = '2'
    }
    if(statusFilter){
      whereCondition += ` AND ID.Status LIKE ${statusFilter}`
    }
    if(search){
      if(isNaN(parseInt(search))){
        whereCondition += ` AND (ID.VesselName LIKE '${search}'  || ID.AlertTitle LIKE '${search}')`
      }else{
        whereCondition += ` AND ID.AlertType LIKE ${search}`
      }
    }
    
    if(fromDate && toDate){
      whereCondition += ` AND ID.InsertUTC >= '${fromDate}' && ID.InsertUTC <='${toDate}'`
    }
    let query = `SELECT DISTINCT ID.IncidentId AS alertId,ID.VesselName AS vesselName,ID.TeamName AS teamName,
    AT.Name AS alertType,
    ID.AlertTitle AS alertTitle,
    IF(ID.Status = 0,'closed',IF(ID.Status = 1,'open','followUp')) AS status,
    AFU.InsertUTC AS lastUpdated,AFU.DetailsOfAction AS updates
    FROM IncidentDetails AS ID
    LEFT JOIN AlertNotification AS AN ON ID.IncidentId = AN.FK_IncidentId
    LEFT JOIN AlertType AS AT ON AT.Id = ID.AlertType
    LEFT JOIN AlertFollowUp AS AFU ON ID.IncidentId = AFU.FK_IncidentId
      WHERE ${whereCondition} ORDER BY ID.InsertUTC DESC LIMIT ${limit} OFFSET ${offset};
      SELECT COUNT(*) AS TotalCount FROM (
        SELECT ID.IncidentId
        FROM IncidentDetails AS ID
        WHERE ${whereCondition}) AS TBL`;
    return query
  }
  public fetchAlertDetailsCount(limit,offset){

    let query = `SELECT DISTINCT ID.IncidentId AS alertId,ID.VesselName AS vesselName,ID.TeamName AS teamName,AT.Name AS alertType,
    ID.AlertTitle AS alertTitle,
    IF(ID.Status = 0,'closed',IF(ID.Status = 1,'open','followUp')) AS status,
    AFU.InsertUTC AS lastUpdated,AFU.DetailsOfAction AS updates
    FROM IncidentDetails AS ID
    LEFT JOIN AlertNotification AS AN ON ID.IncidentId = AN.FK_IncidentId
    LEFT JOIN AlertType AS AT ON AT.Id = ID.AlertType
    LEFT JOIN AlertFollowUp AS AFU ON ID.IncidentId = AFU.FK_IncidentId
      WHERE 1 ORDER BY ID.InsertUTC DESC LIMIT ${limit} OFFSET ${offset};
      SELECT COUNT(*) AS TotalCount FROM (
        SELECT ID.IncidentId
        FROM IncidentDetails AS ID
        WHERE 1) AS TBL`;
    return query
  }

  public fetchIncidentDetails(){
    let query = `SELECT * FROM IncidentDetails;`
    return query;
  }
  public fetchAlertNotification(){
    let query = `SELECT * FROM AlertNotification;`
    return query;
  }
  public fetchAlertFollowUp(){
    let query = `SELECT * FROM AlertFollowUp;`
    return query;
  }
  public fetchAlertType(){
    let query = `SELECT * FROM AlertType;`
    return query;
  }
  public deleteIncidentDetail(delid){
    let query = `DELETE FROM IncidentDetails WHERE IncidentId = ${delid}`
    return query;
  }
  public deleteAlertNotification(delid){
    let query =  `DELETE FROM AlertNotification WHERE IncidentId = ${delid}`
    return query;
  }
  public deleteAlertFollowUp(delid){
    let query =  `DELETE FROM AlertFollowUp WHERE IncidentId = ${delid}`
    return query;
  }

}

export const queryHelper = new QueryHelper();