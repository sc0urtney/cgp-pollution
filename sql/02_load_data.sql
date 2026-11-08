-- Capital Greenspace Project: Air Pollution
-- 02_load_data.sql
-- Load csv data into tables in Oracle

-- To run this file, connect to sqlcl: @sql/02_load_data.sql


LOAD cgp_council_trees /home/s2975916/cgp/data_csv/Trees.csv;
LOAD cgp_os_green /home/s2975916/cgp/data_csv/os_green_edi.csv;

LOAD cgp_traffic /home/s2975916/cgp/data_csv/traffic_clean.csv;
LOAD cgp_os_roads /home/s2975916/cgp/data_csv/os_road_edi.csv;

LOAD cgp_pollution_site_details /home/s2975916/cgp/data_csv/pollution/A02_nonautomatic_sites.csv
LOAD cgp_pollution_annual_no2 /home/s2975916/cgp/data_csv/pollution/A04_annual_NO2_diffusion_tubes.csv
LOAD cgp_pollution_no2_citycentre /home/s2975916/cgp/data_csv/pollution/A06_NO2_AQMA_trends.csv
LOAD cgp_pollution_no2_glasgow_rd /home/s2975916/cgp/data_csv/pollution/A07_NO2_AQMA_trends.csv
LOAD cgp_pollution_no2_greatjunc_st /home/s2975916/cgp/data_csv/pollution/A08_NO2_AQMA_trends.csv
LOAD cgp_pollution_stjohns_rd /home/s2975916/cgp/data_csv/pollution/A09_NO2_AQMA_trends.csv