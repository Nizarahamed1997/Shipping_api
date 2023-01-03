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