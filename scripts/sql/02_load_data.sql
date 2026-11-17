-- Capital Greenspace Project: Air Pollution
-- 02_load_data.sql
-- Load csv data into tables in Oracle

-- To run this file, connect to sqlcl: @data/sql/02_load_data.sql

LOAD cgp_trees /home/s2975916/cgp/data/processed/trees_processed.csv;

LOAD cgp_traffic /home/s2975916/cgp/data/processed/traffic_processed.csv;

LOAD cgp_sensor_sites /home/s2975916/cgp/data/processed/sensor_sites_processed.csv
LOAD cgp_no2 /home/s2975916/cgp/data/processed/no2_data_processed.csv
LOAD cgp_no2_sensors /home/s2975916/cgp/data/processed/no2_sensors_processed.csv