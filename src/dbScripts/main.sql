SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- ------------------------------------------------------------
--         Script MySQL.
-- ------------------------------------------------------------


CREATE DATABASE IF NOT EXISTS SHIPPING DEFAULT CHARACTER SET UTF8 COLLATE UTF8_GENERAL_CI;
USE SHIPPING;


-- DATABASE SHIPPING

-- TABLE STRUCTURE FOR TABLE VESSEL INFORMATION

-- --------------------------------------------------
CREATE TABLE `shipping`.`vesselinformation` (`{FleetTypeName` VARCHAR(100) NULL DEFAULT NULL , `ShipTeamCurrent` VARCHAR(100) NULL DEFAULT NULL , `SisterClass` VARCHAR(100) NULL DEFAULT NULL , `Name` VARCHAR(100) NULL DEFAULT NULL , `ImoNumber` VARCHAR(100) NULL DEFAULT NULL , `VesselManagerRole` VARCHAR(100) NULL DEFAULT NULL , `VesselMgrName` VARCHAR(100) NULL DEFAULT NULL , `Builder` VARCHAR(100) NULL DEFAULT NULL , `BuilderCountry` VARCHAR(100) NULL DEFAULT NULL , `Flag` VARCHAR(100) NULL DEFAULT NULL , `FleetDirector` VARCHAR(100) NULL DEFAULT NULL , `LastDryDockYear` YEAR NULL DEFAULT NULL , `LastDryDockDate` DATE NULL DEFAULT NULL , `NextDryDockDate` DATE NULL DEFAULT NULL , `LastDryDockYard` VARCHAR(100) NULL DEFAULT NULL , `LastHullCleaning` VARCHAR(100) NULL DEFAULT NULL , `LastPropellorPolishing` VARCHAR(100) NULL DEFAULT NULL , `VesselCode` VARCHAR(100) NULL DEFAULT NULL , `Vessel` TEXT NULL DEFAULT NULL , `VoyageManager` VARCHAR(100) NULL DEFAULT NULL ) ENGINE = InnoDB;

ALTER TABLE `vesselinformation` ADD `Id` INT NOT NULL AUTO_INCREMENT FIRST, ADD PRIMARY KEY (`Id`);

ALTER TABLE `vesselinformation` ADD `CommercialOffice` VARCHAR(100) NULL DEFAULT NULL AFTER `VoyageManager`, ADD `SATB` VARCHAR(100) NULL DEFAULT NULL AFTER `CommercialOffice`, ADD `Cellular` VARCHAR(100) NULL DEFAULT NULL AFTER `SATB`, ADD `VesselType` VARCHAR(100) NULL DEFAULT NULL AFTER `Cellular`, ADD `VesselFleet` VARCHAR(100) NULL DEFAULT NULL AFTER `VesselType`, ADD `VesselOwner` VARCHAR(100) NULL DEFAULT NULL AFTER `VesselFleet`, ADD `Ownership` VARCHAR(100) NULL DEFAULT NULL AFTER `VesselOwner`, ADD `YearBuilt` DATE NULL DEFAULT NULL AFTER `Ownership`;

ALTER TABLE `vesselinformation` ADD `TradeArea` VARCHAR(100) NULL DEFAULT NULL AFTER `YearBuilt`, ADD `ClassSociety` VARCHAR(100) NULL DEFAULT NULL AFTER `TradeArea`, ADD `DropDeadDate` DATE NULL DEFAULT NULL AFTER `ClassSociety`, ADD `DWT` INT NULL DEFAULT NULL AFTER `DropDeadDate`, ADD `SpeedLaden` INT NULL DEFAULT NULL AFTER `DWT`, ADD `SpeedBallast` INT NULL DEFAULT NULL AFTER `SpeedLaden`, ADD `MasterName` VARCHAR(100) NULL DEFAULT NULL AFTER `SpeedBallast`, ADD `ROBIfo` INT NULL DEFAULT NULL AFTER `MasterName`, ADD `ROBLsf` INT NULL DEFAULT NULL AFTER `ROBIfo`, ADD `ROBLsm` INT NULL DEFAULT NULL AFTER `ROBLsf`, ADD `ROBMdo` INT NULL DEFAULT NULL AFTER `ROBLsm`, ADD `ROBHsf` INT NULL DEFAULT NULL AFTER `ROBMdo`;

ALTER TABLE `vesselinformation` ADD `ROBMgo` INT NULL DEFAULT NULL AFTER `ROBHsf`, ADD `ROBVls` INT NULL DEFAULT NULL AFTER `ROBMgo`, ADD `Charterer` VARCHAR(100) NULL DEFAULT NULL AFTER `ROBVls`, ADD `OperationType` VARCHAR(100) NULL DEFAULT NULL AFTER `Charterer`, ADD `VOPCharterer` VARCHAR(100) NULL DEFAULT NULL AFTER `OperationType`, ADD `VOPOperationType` VARCHAR(100) NULL DEFAULT NULL AFTER `VOPCharterer`, ADD `RedeliveryDate` VARCHAR(100) NULL DEFAULT NULL AFTER `VOPOperationType`, ADD `SisterVessels` VARCHAR(100) NULL DEFAULT NULL AFTER `RedeliveryDate`;

ALTER TABLE `vesselinformation` CHANGE `{FleetTypeName` `FleetTypeName` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL;

ALTER TABLE `vesselinformation` CHANGE `YearBuilt` `YearBuilt` YEAR NULL DEFAULT NULL;

ALTER TABLE `vesselinformation` CHANGE `LastDryDockDate` `LastDryDockDate` VARCHAR(250) NULL DEFAULT NULL;

ALTER TABLE `vesselinformation` CHANGE `NextDryDockDate` `NextDryDockDate` VARCHAR(250) NULL DEFAULT NULL, CHANGE `DropDeadDate` `DropDeadDate` DATE NULL DEFAULT NULL;

ALTER TABLE `vesselinformation` CHANGE `DropDeadDate` `DropDeadDate` VARCHAR(200) NULL DEFAULT NULL;

ALTER TABLE `vesselinformation` CHANGE `VoyageManager` `VoyageManager` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL;

ALTER TABLE `vesselinformation` CHANGE `SisterVessels` `SisterVessels` VARCHAR(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL;

ALTER TABLE `vesselinformation` ADD UNIQUE(`ImoNumber`);

ALTER TABLE `vesselinformation` DROP INDEX `ImoNumber`;

ALTER TABLE `vesselinformation`
  DROP `Name`,
  DROP `ImoNumber`;

ALTER TABLE `vesselinformation` ADD `fk_ImoAndNameId` INT NOT NULL AFTER `SisterVessels`;

ALTER TABLE `vesselinformation` ADD `Type` VARCHAR(8) NOT NULL AFTER `SisterVessels`;

ALTER TABLE `vesselinformation` CHANGE `InsertUtc` `InsertUtc` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- TABLE STRUCTURE FOR TABLE VESSEL IMOANDNAME

CREATE TABLE `shipping`.`vesselinfo` (`VesselName` VARCHAR(250) NOT NULL , `IMO_Number` VARCHAR(250) NOT NULL ) ENGINE = InnoDB;

ALTER TABLE `vesselimoandname` ADD `Id` INT NOT NULL AUTO_INCREMENT FIRST, ADD PRIMARY KEY (`Id`);

ALTER TABLE `vesselimoandname` ADD UNIQUE(`IMO_Number`);

-- TABLE STRUCTURE FOR VESSEL KEYS

CREATE TABLE `shipping`.`vesselkeys` (`Id` INT NOT NULL AUTO_INCREMENT , `VesselDatas` VARCHAR(100) NOT NULL , `CasingModifiedNames` VARCHAR(100) NOT NULL , PRIMARY KEY (`Id`)) ENGINE = InnoDB;


        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames) 
        VALUES ('FLEET_TYPE_NAME','FleetTypeName'); 
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('SHIP_TEAM_CURRENT','ShipTeamCurrent'); 
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('SISTER_CLASS','SisterClass') ;
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('VesselManagerRole','VesselManagerRole') ;
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('VESSEL_MGR_NAME','VesselMgrName') ;
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Builder','Builder') ;
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Builder Country','BuilderCountry') ;
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Flag','Flag') ;
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('FLEET_DIRECTOR','FleetDirector'); 
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Last Dry Dock Year','LastDryDockYear') ;
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Last Dry Dock Date','LastDryDockDate'); 
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Next Dry Dock Date','NextDryDockDate') ;
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Last Dry Dock Yard','LastDryDockYard') ;
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Last Hull Cleaning','LastHullCleaning') ;
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Last Propellor Polishing','LastPropellorPolishing'); 
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Vessel Code','VesselCode') ;
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Vessel','Vessel') ;
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Voyage Manager','VoyageManager'); 
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Commercial Office','CommercialOffice'); 
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('SATB','SATB'); 
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Cellular','Cellular'); 
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Vessel Type','VesselType'); 
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Vessel Fleet','VesselFleet'); 
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Vessel Owner','VesselOwner') ;
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Ownership','Ownership'); 
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Year Built','YearBuilt'); 
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Trade Area','TradeArea'); 
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Class Society','ClassSociety'); 
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Drop Dead Date','DropDeadDate') ;
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('DWT','DWT'); 
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Speed Laden','SpeedLaden'); 
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Speed Ballast','SpeedBallast');
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Master Name','MasterName'); 
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('ROB Ifo','ROBIfo') ;
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('ROB Lsf','ROBLsf') ;
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('ROB Lsm','ROBLsm'); 
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('ROB Mdo','ROBMdo') ;
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('ROB Hsf','ROBHsf') ;
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('ROB Mgo','ROBMgo'); 
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('ROB Vls','ROBVls') ;
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Charterer','Charterer') ;
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Operation Type','OperationType') ;
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('VOP Charterer','VOPCharterer');
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('VOP Operation Type','VOPOperationType'); 
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Redelivery Date','RedeliveryDate') ;
        INSERT INTO Vesselkeys(VesselDatas,CasingModifiedNames)
        VALUES ('Sister Vessels','SisterVessels');

        


-- TABLE STRUCTURE FOR LATANDLONG

CREATE TABLE `shipping`.`latandlong` (`Id` INT NOT NULL AUTO_INCREMENT , `CallSign` VARCHAR(100) NOT NULL , `PollingTime` VARCHAR(100) NOT NULL , `Latitude` VARCHAR(100) NOT NULL , `Longitude` VARCHAR(100) NOT NULL , `ShipSpeed` INT NOT NULL , `ShipDirection` INT NOT NULL , `fk_ImoAndNameId` INT NOT NULL , PRIMARY KEY (`Id`)) ENGINE = InnoDB;

ALTER TABLE `latandlong` ADD `FleetTypeName` VARCHAR(100) NOT NULL AFTER `Id`, ADD `ShipTeamCurrent` VARCHAR(100) NOT NULL AFTER `FleetTypeName`;

ALTER TABLE `latandlong` ADD `SisterClass` VARCHAR(100) NOT NULL AFTER `ShipTeamCurrent`;

ALTER TABLE `latandlong` CHANGE `FleetTypeName` `FleetTypeName` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL, CHANGE `ShipTeamCurrent` `ShipTeamCurrent` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL, CHANGE `SisterClass` `SisterClass` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL, CHANGE `CallSign` `CallSign` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL, CHANGE `PollingTime` `PollingTime` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL, CHANGE `Latitude` `Latitude` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL, CHANGE `Longitude` `Longitude` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL, CHANGE `ShipSpeed` `ShipSpeed` INT NULL DEFAULT NULL, CHANGE `ShipDirection` `ShipDirection` INT NULL DEFAULT NULL;

--TABLE STRUCTURE FOR INCIDENTDETAILS

CREATE TABLE `shipping`.`incidentdetails` (`IncidentId` INT NOT NULL AUTO_INCREMENT , 
`VesselName` VARCHAR(100) NOT NULL , `VesselCode` VARCHAR(100) NOT NULL , `ImoNumber` INT NOT NULL , 
`Date` DATETIME NOT NULL , `MasterName` VARCHAR(100) NOT NULL , `Latitude` VARCHAR(100) NOT NULL , 
`Longitude` VARCHAR(100) NOT NULL , `AODN` VARCHAR(100) NOT NULL , `Ballast` TINYINT NOT NULL , 
`IfInBallast` TINYINT NOT NULL , `VOC` TINYINT NOT NULL , `EnvImpact` TINYINT NOT NULL , 
`CommercialImpact` TINYINT NOT NULL , `WeatherCondition` VARCHAR(100) NOT NULL , `Details` VARCHAR(100) NOT NULL , 
`Attachment` VARCHAR(100) NOT NULL , `NextPort` VARCHAR(100) NOT NULL , `ETA` DATETIME NOT NULL , 
`Status` TINYINT NOT NULL , `Category` TINYINT NOT NULL , `Severity` TINYINT NOT NULL , 
`FirstAlertNotification` TINYINT NOT NULL , `fk_Analytics_Id` TINYINT NOT NULL , 
`InsertUtc` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , `UpdateUtc` DATETIME on update CURRENT_TIMESTAMP NOT NULL 
DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`IncidentId`)) ENGINE = InnoDB;

ALTER TABLE `incidentdetails` ADD `AlertTitile` VARCHAR(100) NOT NULL AFTER `Date`, ADD `AlertType` VARCHAR(250) NULL DEFAULT 
NULL AFTER `AlertTitle`;

ALTER TABLE `incidentdetails` ADD `TeamName` VARCHAR(100) NULL DEFAULT NULL AFTER `VesselCode`;

ALTER TABLE `incidentdetails` CHANGE `VesselCode` `VesselCode` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL, CHANGE `Date` `Date` DATETIME NULL DEFAULT NULL, CHANGE `AlertTitle` `AlertTitle` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL, CHANGE `MasterName` `MasterName` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL, CHANGE `Latitude` `Latitude` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL, CHANGE `Longitude` `Longitude` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL, CHANGE `AODN` `AODN` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL, CHANGE `Ballast` `Ballast` TINYINT NULL DEFAULT NULL, CHANGE `IfInBallast` `IfInBallast` TINYINT NULL DEFAULT NULL, CHANGE `VOC` `VOC` TINYINT NULL DEFAULT NULL, CHANGE `EnvImpact` `EnvImpact` TINYINT NULL DEFAULT NULL, CHANGE `CommercialImpact` `CommercialImpact` TINYINT NULL DEFAULT NULL, CHANGE `WeatherCondition` `WeatherCondition` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL, CHANGE `Details` `Details` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL, CHANGE `Attachment` `Attachment` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL, CHANGE `NextPort` `NextPort` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL, CHANGE `ETA` `ETA` DATETIME NULL DEFAULT NULL, CHANGE `Status` `Status` TINYINT NULL DEFAULT NULL, CHANGE `Category` `Category` TINYINT NULL DEFAULT NULL, CHANGE `Severity` `Severity` TINYINT NULL DEFAULT NULL, CHANGE `FirstAlertNotification` `FirstAlertNotification` TINYINT NULL DEFAULT NULL, CHANGE `fk_Analytics_Id` `fk_Analytics_Id` TINYINT NULL DEFAULT NULL;



--TABLE STRUCTURE FOR ALERTNOTIFCATION

        CREATE TABLE `shipping`.`alertnotification` (`Id` INT NOT NULL AUTO_INCREMENT , `FK_IncidentId` INT NOT NULL , `PiInformed` TINYINT NULL DEFAULT NULL , `FD` VARCHAR(100) NULL DEFAULT NULL , `HMInformed` TINYINT NULL DEFAULT NULL , `HseqManager` VARCHAR(100) NULL DEFAULT NULL , `ClassNotified` TINYINT NULL DEFAULT NULL , `MarineManager` VARCHAR(100) NULL DEFAULT NULL , `FlagNotified` TINYINT NULL DEFAULT NULL , `VoyageManager` VARCHAR(100) NULL DEFAULT NULL , `ChartersNotified` TINYINT NULL DEFAULT NULL , `MargineHrNotified` VARCHAR(100) NULL DEFAULT NULL , `TerminalNotified` TINYINT NULL DEFAULT NULL , `Flag_Notified` VARCHAR(100) NULL DEFAULT NULL , `MapImage` VARCHAR(100) NULL DEFAULT NULL , `InsertUTC` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , `UpdateUTC` DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`Id`)) ENGINE = InnoDB;

        ALTER TABLE `alertnotification` ADD CONSTRAINT `fk_incidentid` FOREIGN KEY (`FK_IncidentId`) REFERENCES `incidentdetails`(`IncidentId`) ON DELETE RESTRICT ON UPDATE RESTRICT;

         ALTER TABLE `alertnotification` ADD `MarineHr` VARCHAR(100) NULL DEFAULT NULL AFTER `MargineHrNotified`;
        
        --TABLE STRUCTURE FOR ALERTFOLLOWUP

        CREATE TABLE `shipping`.`alertfollowup` (`Id` INT NOT NULL AUTO_INCREMENT , `NextUpdate` DATETIME NOT NULL , `NextUpdateTime` DATETIME NOT NULL , `DetailsOfAction` TEXT NOT NULL , `UpImNo` VARCHAR(100) NOT NULL , `ShortTermCert` VARCHAR(100) NOT NULL , `RiskLevel` TINYINT NOT NULL , `TypeOfIncident` TINYINT NOT NULL , `FullClassCert` TINYINT NOT NULL , `FK_AlertNotificationId` INT NOT NULL , `FK_IncidentId` INT NOT NULL , `InsertUTC` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , `UpdateUTC` DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`Id`)) ENGINE = InnoDB;

        ALTER TABLE `alertfollowup` ADD CONSTRAINT `fk_alertnotificationid` FOREIGN KEY (`FK_AlertNotificationId`) REFERENCES `alertnotification`(`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT; ALTER TABLE `alertfollowup` ADD CONSTRAINT `fk_incidentid` FOREIGN KEY (`FK_IncidentId`) REFERENCES `incidentdetails`(`IncidentId`) ON DELETE RESTRICT ON UPDATE RESTRICT;

        ALTER TABLE `alertfollowup` ADD CONSTRAINT `fk_incidentidforfollowup` FOREIGN KEY (`FK_IncidentId`) REFERENCES `alertnotification`(`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

        ALTER TABLE `alertfollowup` CHANGE `NextUpdate` `NextUpdate` DATETIME NULL DEFAULT NULL, CHANGE `NextUpdateTime` `NextUpdateTime` DATETIME NULL DEFAULT NULL, CHANGE `DetailsOfAction` `DetailsOfAction` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL, CHANGE `UpImNo` `UpImNo` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL, CHANGE `ShortTermCert` `ShortTermCert` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL, CHANGE `RiskLevel` `RiskLevel` TINYINT NULL DEFAULT NULL, CHANGE `TypeOfIncident` `TypeOfIncident` TINYINT NULL DEFAULT NULL, CHANGE `FullClassCert` `FullClassCert` TINYINT NULL DEFAULT NULL;

       --TABLE STRUCTURE FOR ALERTTYPE

       CREATE TABLE `shipping`.`alerttype` (`Id` INT NOT NULL AUTO_INCREMENT , `Name` VARCHAR(250) NOT NULL , `Key` VARCHAR(250) NOT NULL , `InsertUtc` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , `UpdateUtc` DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`Id`)) ENGINE = InnoDB;

       INSERT INTO `alerttype` (`Id`, `Name`, `KeyName`, `InsertUtc`, `UpdateUtc`) VALUES (NULL, 'Navigation and Critical Equipment Failure', 'navigation_and_critical_equipment_failure', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

       INSERT INTO `alerttype` (`Id`, `Name`, `KeyName`, `InsertUtc`, `UpdateUtc`) VALUES (NULL, 'Pollution and Spills', 'pollution_and_spills', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

       INSERT INTO `alerttype` (`Id`, `Name`, `KeyName`, `InsertUtc`, `UpdateUtc`) VALUES (NULL, 'Breach of Security', 'breach_of_security', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

       INSERT INTO `alerttype` (`Id`, `Name`, `KeyName`, `InsertUtc`, `UpdateUtc`) VALUES (NULL, 'Allision/Collision', 'allision/collision', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

       INSERT INTO `alerttype` (`Id`, `Name`, `KeyName`, `InsertUtc`, `UpdateUtc`) VALUES (NULL, 'Health Repatriation case (HRC)', 'health_repatriation_case(hrc)', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

       INSERT INTO `alerttype` (`Id`, `Name`, `KeyName`, `InsertUtc`, `UpdateUtc`) VALUES (NULL, 'Significant Near Miss', 'significant_near_miss', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

       INSERT INTO `alerttype` (`Id`, `Name`, `KeyName`, `InsertUtc`, `UpdateUtc`) VALUES (NULL, 'Smoke/Fire/Explosion', 'smoke/fire/explosion', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

       INSERT INTO `alerttype` (`Id`, `Name`, `KeyName`, `InsertUtc`, `UpdateUtc`) VALUES (NULL, 'Loss of Electrical Power', 'loss_of_electrical_power', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

       INSERT INTO `alerttype` (`Id`, `Name`, `KeyName`, `InsertUtc`, `UpdateUtc`) VALUES (NULL, 'Search and Rescue', 'search_and_rescue', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

       INSERT INTO `alerttype` (`Id`, `Name`, `KeyName`, `InsertUtc`, `UpdateUtc`) VALUES (NULL, 'Ship Arrest', 'ship_arrest', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

       INSERT INTO `alerttype` (`Id`, `Name`, `KeyName`, `InsertUtc`, `UpdateUtc`) VALUES (NULL, 'Stranding/Grounding', 'stranding/grounding', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);