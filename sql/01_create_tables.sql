
-- Capital Greenspace Project: Air Pollution
-- 01_create_tables.sql
-- Create tables in Oracle

CREATE TABLE cgp_council_trees (
    X NUMBER,
    Y NUMBER,
    OBJECTID NUMBER,
    PrimaryKey VARCHAR2(100) PRIMARY KEY,
    LocationOrTagNo VARCHAR2(255),
    Ward VARCHAR2(100),
    Site VARCHAR2(255), 
    LatinName VARCHAR2(255),
    CommonName VARCHAR2(255),
    Owner VARCHAR2(255),
    NTRef VARCHAR2(100),
    Height VARCHAR2(100),
    Spread VARCHAR2(100),
    AgeGroup VARCHAR2(100),
    DiameterAtBreastHeight VARCHAR2(100),
    Easting NUMBER,
    Northing NUMBER
);

CREATE TABLE cgp_os_green (
    id VARCHAR2(255),
    function VARCHAR2(255),
    distName1 VARCHAR2(255),
    distName2 VARCHAR2(255),
    distName3 VARCHAR2(255),
    distName4 VARCHAR2(255),
    geometry SDO_GEOMETRY
);

CREATE TABLE cgp_traffic (
    count_point_id NUMBER,
    year NUMBER,
    region_id NUMBER,
    region_name VARCHAR2(255),
    local_authority_id NUMBER,
    local_authority_name VARCHAR2(255),
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
    pedal_cycles NUMBER,
    two_wheeled_motor_vehicles NUMBER,
    cars_and_taxis NUMBER,
    buses_and_coaches NUMBER,
    lgvs NUMBER,
    hgvs_2_rigid_axle NUMBER,
    hgvs_3_rigid_axle NUMBER,
    hgvs_4_or_more_rigid_axle NUMBER,
    hgvs_3_or_4_articulated_axle NUMBER,
    hgvs_5_articulated_axle NUMBER,
    hgvs_6_articulated_axle NUMBER,
    all_hgvs NUMBER,
    all_motor_vehicles NUMBER
);

CREATE TABLE cgp_os_roads (
    fictitious VARCHAR2(255),
    identifier VARCHAR2(255),
    class VARCHAR2(255),
    roadNumber VARCHAR2(255),
    name1 VARCHAR2(255),
    name1_lang VARCHAR2(255),
    name2 VARCHAR2(255),
    name2_lang VARCHAR2(255),
    formOfWay VARCHAR2(255),
    length NUMBER,
    primary VARCHAR2(255),
    trunkRoad VARCHAR2(255),
    loop VARCHAR2(255),
    startNode VARCHAR2(255),
    endNode VARCHAR2(255),
    structure VARCHAR2(255),
    nameTOID VARCHAR2(255),
    numberTOID VARCHAR2(255),
    function VARCHAR2(255),
    geometry SDO_GEOMETRY
);


-- AIR POLLUTION TABLES (A1-A4,A6-A10, A12)

-- CREATE TABLE pollution_a1 ();
-- CREATE TABLE pollution_a1 ();
-- CREATE TABLE pollution_a1 ();
