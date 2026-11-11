
-- Capital Greenspace Project: Air Pollution
-- 01_create_tables.sql
-- Create tables in Oracle: all tables start with CGP

-- To run this file, connect to sqlcl: @sql/01_create_tables.sql
-- To list all your Oracle tables: SELECT * FROM tab;
-- To delete tables: DROP TABLE table_name;

CREATE TABLE cgp_council_trees (
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
    Northing NUMBER
);

CREATE TABLE cgp_os_green (
    id VARCHAR2(255),
    function VARCHAR2(100),
    geometry_wkt CLOB
);


CREATE TABLE cgp_traffic (
    count_point_id NUMBER,
    year NUMBER,
    local_authority_name VARCHAR2(100),
    road_name VARCHAR2(255),
    road_type VARCHAR2(255),
    start_junction_road_name VARCHAR2(255),
    end_junction_road_name VARCHAR2(255),
    easting NUMBER,
    northing NUMBER,
    latitude NUMBER,
    longitude NUMBER,
    link_length_km NUMBER,
    link_length_miles NUMBER,
    estimation_method VARCHAR2(255),
    estimation_method_detailed VARCHAR2(255),
    all_motor_vehicles NUMBER
);

CREATE TABLE cgp_traffic_roads (
    identifier VARCHAR2(255),
    class VARCHAR2(255),
    roadNumber VARCHAR2(255),
    name1 VARCHAR2(255),
    length NUMBER,
    startNode ,
    endNode
    geometry_wkt clob
    count_id VARCHAR(255),
    aadf_21 NUMBER,
    aadf_22 NUMBER,
    aadf_23 NUMBER,
    aadf_24 NUMBER,
    aadf_25 NUMBER,
    assignment_distance NUMBER,
    snap_distance NUMBER,
    method  VARCHAR2(255)
);

-- AIR POLLUTION TABLES (A2, A4, A6, A7, A8, A9)

CREATE TABLE cgp_pollution_site_details (
    site_id VARCHAR2(50),
    site_name VARCHAR2(100),
    site_type VARCHAR2(100),
    easting NUMBER,
    northing NUMBER,
    pollutants_monitored VARCHAR2(255),
    aqma_status VARCHAR2(255),
    distance_to_exposure_m NUMBER,
    distance_to_kerb_m NUMBER,
    colocated_continuous_analyser VARCHAR2(255),
    tube_height_m NUMBER
);

CREATE TABLE cgp_pollution_annual_no2 (
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
    year_2024 NUMBER
);

'''
CREATE TABLE cgp_pollution_no2_citycentre (
    site_id VARCHAR2(50),
    year_2008 NUMBER,
    year_2009 NUMBER,
    year_2010 NUMBER,
    year_2011 NUMBER,
    year_2012 NUMBER,
    year_2013 NUMBER,
    year_2014 NUMBER,
    year_2015 NUMBER,
    year_2016 NUMBER,
    year_2017 NUMBER,
    year_2018 NUMBER,
    year_2019 NUMBER,
    year_2020 NUMBER,
    year_2021 NUMBER,
    year_2022 NUMBER,
    year_2023 NUMBER,
    year_2024 NUMBER
);

CREATE TABLE cgp_pollution_no2_glasgow_rd (
    site_id VARCHAR2(50),
    year_2009 NUMBER,
    year_2010 NUMBER,
    year_2011 NUMBER,
    year_2012 NUMBER,
    year_2013 NUMBER,
    year_2014 NUMBER,
    year_2015 NUMBER,
    year_2016 NUMBER,
    year_2017 NUMBER,
    year_2018 NUMBER,
    year_2019 NUMBER,
    year_2020 NUMBER,
    year_2021 NUMBER,
    year_2022 NUMBER,
    year_2023 NUMBER,
    year_2024 NUMBER
);

CREATE TABLE cgp_pollution_no2_greatjunc_st (
    site_id VARCHAR2(50),
    year_2008 NUMBER,
    year_2009 NUMBER,
    year_2010 NUMBER,
    year_2011 NUMBER,
    year_2012 NUMBER,
    year_2013 NUMBER,
    year_2014 NUMBER,
    year_2015 NUMBER,
    year_2016 NUMBER,
    year_2017 NUMBER,
    year_2018 NUMBER,
    year_2019 NUMBER,
    year_2020 NUMBER,
    year_2021 NUMBER,
    year_2022 NUMBER,
    year_2023 NUMBER,
    year_2024 NUMBER
);

CREATE TABLE cgp_pollution_stjohns_rd (
    site_id VARCHAR2(50),
    year_2008 NUMBER,
    year_2009 NUMBER,
    year_2010 NUMBER,
    year_2011 NUMBER,
    year_2012 NUMBER,
    year_2013 NUMBER,
    year_2014 NUMBER,
    year_2015 NUMBER,
    year_2016 NUMBER,
    year_2017 NUMBER,
    year_2018 NUMBER,
    year_2019 NUMBER,
    year_2020 NUMBER,
    year_2021 NUMBER,
    year_2022 NUMBER,
    year_2023 NUMBER,
    year_2024 NUMBER
);
'''