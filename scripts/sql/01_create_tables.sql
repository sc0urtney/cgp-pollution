
-- Capital Greenspace Project: Air Pollution
-- 01_create_tables.sql
-- Create tables in Oracle: all tables start with CGP

-- To run this file, connect to sqlcl: @data/sql/01_create_tables.sql
-- To list all your Oracle tables: SELECT * FROM tab;
-- To delete tables: DROP TABLE table_name;

CREATE TABLE cgp_trees (
    X NUMBER,
    Y NUMBER,
    OBJECTID NUMBER,
    PrimaryKey VARCHAR2(255) PRIMARY KEY,
    LocationOrTagNo VARCHAR2(255),
    Ward VARCHAR2(255),
    Site VARCHAR2(255), 
    LatinName VARCHAR2(255),
    CommonName VARCHAR2(255),
    Owner VARCHAR2(255),
    NTRef VARCHAR2(255),
    Height VARCHAR2(255),
    Spread VARCHAR2(255),
    AgeGroup VARCHAR2(255),
    DiameterAtBreastHeight VARCHAR2(255),
    Easting NUMBER,
    Northing NUMBER);


CREATE TABLE cgp_traffic (
    count_point_id VARCHAR(255),
    road_name VARCHAR2(255),
    road_type VARCHAR2(255),
    start_junction_road_name VARCHAR2(255),
    end_junction_road_name VARCHAR2(255),
    easting NUMBER,
    northing NUMBER,
    latitude NUMBER,
    longitude NUMBER,
    link_length_km NUMBER,
    year_2021 NUMBER,
    year_2022 NUMBER,
    year_2023 NUMBER,
    year_2024 NUMBER,
    year_2025 NUMBER);


-- AIR POLLUTION TABLES (A2, A4, A6)

CREATE TABLE cgp_sensor_sites (
    site_id VARCHAR2(100),
    site_name VARCHAR2(100),
    site_type VARCHAR2(100),
    easting NUMBER,
    northing NUMBER,
    pollutants_monitored VARCHAR2(255),
    aqma_status VARCHAR2(255),
    distance_to_exposure_m NUMBER,
    distance_to_kerb_m NUMBER,
    colocated_continuous_analyser VARCHAR2(255),
    tube_height_m NUMBER);

CREATE TABLE cgp_no2 (
    site_id_and_name VARCHAR2(255),
    easting NUMBER,
    northing NUMBER,
    site_type VARCHAR2(255),
    capture_monitoring_period_pct NUMBER,
    capture_2024_pct NUMBER,
    year_2020 NUMBER,
    year_2021 NUMBER,
    year_2022 NUMBER,
    year_2023 NUMBER,
    year_2024 NUMBER);

CREATE TABLE cgp_no2_sensors (
    site_id VARCHAR2(100),
    site_name VARCHAR2(100),
    site_type VARCHAR2(100),
    easting NUMBER,
    northing NUMBER,
    pollutants_monitored VARCHAR2(255),
    aqma_status VARCHAR2(255),
    distance_to_exposure_m NUMBER,
    distance_to_kerb_m NUMBER,
    colocated_continuous_analyser VARCHAR2(255),
    tube_height_m NUMBER,
    capture_monitoring_period_pct NUMBER,
    capture_2024_pct NUMBER,
    year_2020 NUMBER,
    year_2021 NUMBER,
    year_2022 NUMBER,
    year_2023 NUMBER,
    year_2024 NUMBER);